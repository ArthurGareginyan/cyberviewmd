const { ipcRenderer } = require('electron')
const { marked } = require('marked')

ipcRenderer.on('ready', (event) => {
  ipcRenderer.send('open-file')
  document.getElementById('main-title').style.display = 'block';
})

ipcRenderer.on('file-content', (event, fileContent) => {
  const markdownContainer = document.getElementById('markdown-container')
  const renderedMarkdown = marked(fileContent)
  markdownContainer.innerHTML = renderedMarkdown
  document.getElementById('main-title').style.display = 'none';
})

ipcRenderer.on('clear-content', (event) => {
  const markdownContainer = document.getElementById('markdown-container')
  markdownContainer.innerHTML = ''
  document.getElementById('main-title').style.display = 'block';
})
