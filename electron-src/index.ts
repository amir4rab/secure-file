// Native
import { join } from 'path'
import { format } from 'url'

// Packages
import { BrowserWindow, app, nativeImage } from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./')
  const appIcon =  nativeImage.createFromPath(join(__dirname, isDev ? '../public/assets/electron/icon.png' : '../out/assets/electron/icon.png' ));

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: appIcon,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      // preload: join(__dirname, 'preload.js'),
      // devTools: isDev,
    },
    darkTheme: true
  })

  mainWindow.setMenuBarVisibility(false);

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
        pathname: join(__dirname, '../out/index.html'),
        protocol: 'file:',
        slashes: true,
      })

  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit);