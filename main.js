const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
            preload: path.join(__dirname, 'renderer.js'),
            contextIsolation: true,
            nodeIntegration: false
        },
  })

  mainWindow.loadFile('index.html')

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('ready')
  })

  ipcMain.on('open-file', (event) => {
    dialog.showOpenDialog({
      filters: [
        { name: 'Markdown Files', extensions: ['md', 'markdown'] }
      ],
      properties: ['openFile']
    }).then(result => {
      if (!result.canceled && result.filePaths.length > 0) {
        const filePath = result.filePaths[0]
        const fileContent = fs.readFileSync(filePath, 'utf8')
        mainWindow.webContents.send('file-content', fileContent)
      }
    })
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
