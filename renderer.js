const { ipcRenderer } = require('electron')
const { marked } = require('marked')

ipcRenderer.on('ready', (event) => {
  ipcRenderer.send('open-file')
})

ipcRenderer.on('file-content', (event, fileContent) => {
  const markdownContainer = document.getElementById('markdown-container')
  const renderedMarkdown = marked(fileContent)
  markdownContainer.innerHTML = renderedMarkdown
})
