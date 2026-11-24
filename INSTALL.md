# Installation — v0.1.0 experimental

All three packaging jobs passed in [build #8](https://github.com/AndySync-09/Rewind-Browser/actions/runs/45463415876). Runtime and security validation are pending. These unsigned development artifacts expire on February 22, 2027. GitHub sign-in may be required.

| Platform | Download archive |
| --- | --- |
| Windows EXE | [Download](https://github.com/AndySync-09/Rewind-Browser/actions/runs/45463415876/artifacts/14954286222) |
| macOS DMG | [Download](https://github.com/AndySync-09/Rewind-Browser/actions/runs/45463415876/artifacts/14953376851) |
| Linux AppImage | [Download](https://github.com/AndySync-09/Rewind-Browser/actions/runs/45463415876/artifacts/14955225077) |

## Windows
1. Download and extract the ZIP.
2. Open the EXE installer and follow the prompts.
3. Launch Rewind from the Start menu.

## macOS
1. Download and extract the ZIP.
2. Open the DMG and drag Rewind into Applications.
3. Launch from Applications.

## Linux
1. Download and extract the ZIP.
2. Open a terminal in the extracted directory.
3. Run:
```sh
chmod +x ./*.AppImage
./*.AppImage
```

Do not disable OS security protections or browser sandboxing to launch the application. If installation is blocked, report the error. Architecture-specific compatibility is not yet verified. Do not use experimental builds for sensitive browsing.

Permanent GitHub Release assets, DEB/RPM packages, signing, notarization and architecture-specific builds remain pending.
