const { app, BrowserWindow, dialog, ipcMain, Menu } = require('electron')
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
            preload: path.join(__dirname, 'renderer.js'),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
  })

  mainWindow.loadFile('index.html')

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('ready')
  })

  const isMac = process.platform === 'darwin'

  const template = [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    {
      label: 'File',
      submenu: [
        {
          label: 'Open File',
          accelerator: 'CmdOrCtrl+O',
          click() {
            openFile(mainWindow)
          }
        },
        {
          label: 'Clear Content',
          accelerator: 'CmdOrCtrl+D',
          click() {
            mainWindow.webContents.send('clear-content')
          }
        }
      ]
    },
    { role: 'editMenu' },
    { role: 'viewMenu' },
    { role: 'windowMenu' }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  function openFile(mainWindow) {
    dialog.showOpenDialog({
      filters: [
        { name: 'Markdown Files', extensions: ['md', 'markdown'] }
      ],
      properties: ['openFile']
    }).then(result => {
      if (!result.canceled && result.filePaths.length > 0) {
        const filePath = result.filePaths[0]
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const parsedContent = matter(fileContent)
        mainWindow.webContents.send('file-content', parsedContent.content)
      }
    })
  }
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
