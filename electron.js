const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },

    width: 1000,
    height: 800,
  });

  win.loadURL("http://localhost:3000"); // Load React app
}

app.whenReady().then(createWindow);
