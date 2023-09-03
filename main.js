const { app, BrowserWindow, dialog, ipcMain, Menu } = require('electron')
const fs = require('fs')
const matter = require('gray-matter')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.loadFile('index.html')

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send('ready')
    })

    // Function to open file
    function openFile() {
        dialog.showOpenDialog({
            filters: [
                {
                    name: 'Markdown Files',
                    extensions: ['md', 'markdown']
                }
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

    // IPC event to open file
    ipcMain.on('manual-open-file', (event) => {
        openFile()
    })

    // IPC event to close file
    ipcMain.on('close-file', (event) => {
        mainWindow.webContents.send('close-file')
    })

    // Adding menu
    const isMac = process.platform === 'darwin'
    const menu = Menu.buildFromTemplate([
        ...(isMac ? [{ role: 'appMenu' }] : []),
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open File',
                    accelerator: 'CmdOrCtrl+O',
                    click() {
                        openFile()
                    }
                },
                {
                    label: 'Close File',
                    accelerator: 'CmdOrCtrl+W',
                    click() {
                        mainWindow.webContents.send('close-file')
                    }
                }
            ]
        },
        { role: 'editMenu' },
        { role: 'viewMenu' },
        { role: 'windowMenu' }
    ])
    Menu.setApplicationMenu(menu)
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
