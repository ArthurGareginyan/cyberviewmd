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
    toggleDisplay(helperWindow, true)
})

// Event handler for 'file-content' IPC event
ipcRenderer.on('file-content', (event, fileContent) => {
    const markdownContainer = document.getElementById('markdown-container')
    const renderedMarkdown = marked(fileContent)
    markdownContainer.innerHTML = renderedMarkdown
    toggleDisplay(helperWindow, false)
})

// Event handler for 'close-file' IPC event
ipcRenderer.on('close-file', (event) => {
    const markdownContainer = document.getElementById('markdown-container')
    markdownContainer.innerHTML = ''
    toggleDisplay(helperWindow, true)
})

// Function to initialize upload button
document.addEventListener('DOMContentLoaded', () => {
    const uploadButton = document.getElementById('upload-button');
    if (uploadButton) {
        uploadButton.addEventListener('click', () => {
            ipcRenderer.send('manual-open-file')
        })
    }
})
