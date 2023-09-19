const { BrowserWindow } = require('electron');

function createWindow(mainWindow) {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    mainWindow.maximize();

    mainWindow.loadFile('index.html');   

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    return mainWindow;
}

module.exports = { createWindow };
