const { ipcRenderer } = require('electron')
const { marked } = require('marked')

// Cache frequently accessed DOM elements
const helperWindow = document.getElementById('helper-window')

// Utility function to toggle display
function toggleDisplay(element, condition) {
    if (element) {
        element.style.display = condition ? 'block' : 'none'
    }
}

// Event handler for 'ready' IPC event
ipcRenderer.on('ready', (event) => {
    ipcRenderer.send('open-file')
    toggleDisplay(helperWindow, true)
})

// Event handler for 'file-content' IPC event
ipcRenderer.on('file-content', (event, fileContent) => {
    const markdownContainer = document.getElementById('markdown-container')
    const renderedMarkdown = marked(fileContent)
    markdownContainer.innerHTML = renderedMarkdown
    toggleDisplay(helperWindow, false)
})

// Event handler for 'clear-content' IPC event
ipcRenderer.on('clear-content', (event) => {
    const markdownContainer = document.getElementById('markdown-container')
    markdownContainer.innerHTML = ''
    toggleDisplay(helperWindow, true)
})
