import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import Store from 'electron-store'

const store = new Store({
  name: 'config',
  cwd: app.getPath('userData'),
  defaults: {
    deviceName: 'TSC TE210',
    apiUrl: 'http://192.168.2.251:6006',
    timeout: 500,
    silent: true
  }
})

console.log(app.getPath('exe'))

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  const printWindow = new BrowserWindow({
    parent: mainWindow,
    show: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    if (!store.get('silent')) {
      printWindow.show()
    }
    mainWindow.maximize()

    ipcMain.on('print-label', async (e, data) => {
      printWindow.webContents.send('print-label', data)

      await new Promise((resolve) => setTimeout(() => resolve(true), store.get('timeout')))

      printWindow.webContents.print(
        { silent: store.get('silent'), deviceName: store.get('deviceName'), printBackground: true },
        (success, fail) => {
          console.log(success, fail)
        }
      )
    })
  })

  printWindow.on('ready-to-show', () => {})

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    printWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '#print')
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('_set', (e, { key, value }) => store.set(key, value))
ipcMain.handle('_get', (e, key) => store.get(key))
ipcMain.handle('_delete', (e, key) => store.delete(key))

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
