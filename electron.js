import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  const indexHtmlPath = path.join(__dirname, 'dist', 'index.html')
  win.loadFile(indexHtmlPath)
}

app.whenReady().then(createWindow)
