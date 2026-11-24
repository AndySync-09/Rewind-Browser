const {app,BrowserWindow,WebContentsView,ipcMain,session}=require('electron');
const path=require('node:path');
let win,view;
function url(s){s=String(s).trim();if(!s)return null;try{const u=new URL(s.includes('://')?s:'https://'+s);if(!['https:','http:'].includes(u.protocol)||u.username||u.password)return null;if(!u.hostname.includes('.')&&u.hostname!=='localhost')throw Error();return u.href}catch{return 'https://www.google.com/search?q='+encodeURIComponent(s)}}
app.enableSandbox();
app.whenReady().then(()=>{
win=new BrowserWindow({width:1200,height:800,webPreferences:{preload:path.join(__dirname,'preload.js'),sandbox:true,contextIsolation:true,nodeIntegration:false}});
const ses=session.fromPartition('persist:rewind');
ses.setPermissionRequestHandler((_w,_p,cb)=>cb(false));ses.setPermissionCheckHandler(()=>false);
view=new WebContentsView({webPreferences:{session:ses,sandbox:true,contextIsolation:true,nodeIntegration:false,webSecurity:true}});
win.contentView.addChildView(view);
const resize=()=>{const [width,height]=win.getContentSize();view.setBounds({x:0,y:112,width,height:Math.max(0,height-24-112)})};win.on('resize',resize);resize();
const wc=view.webContents;
wc.setWindowOpenHandler(()=>({action:'deny'}));
wc.on('will-navigate',(e,u)=>{if(!/^https?:\/\//i.test(u))e.preventDefault()});
wc.on('will-redirect',(e,u)=>{if(!/^https?:\/\//i.test(u))e.preventDefault()});
const notify=()=>{if(!win.isDestroyed())win.webContents.send('location',wc.getURL())};wc.on('did-navigate',notify);wc.on('did-navigate-in-page',notify);
win.webContents.setWindowOpenHandler(()=>({action:'deny'}));win.webContents.on('will-navigate',e=>e.preventDefault());
ipcMain.on('navigate',(e,s)=>{if(e.sender!==win.webContents)return;const u=url(s);if(u)wc.loadURL(u).catch(()=>{})});
ipcMain.on('command',(e,c)=>{if(e.sender!==win.webContents)return;switch(c){case 'back':if(wc.navigationHistory.canGoBack())wc.navigationHistory.goBack();break;case 'forward':if(wc.navigationHistory.canGoForward())wc.navigationHistory.goForward();break;case 'reload':wc.reload();break;case 'stop':wc.stop();break;case 'home':wc.loadURL('https://www.google.com').catch(()=>{});break;case 'chat':wc.loadURL('https://chatgpt.com').catch(()=>{});break;}});
win.loadFile('index.html');wc.loadURL('https://www.google.com').catch(()=>{});
win.on('closed',()=>{if(!wc.isDestroyed())wc.close();});
});app.on('window-all-closed',()=>app.quit());
