const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const { autoUpdater } = require("electron-updater");
const os = require('os');
const { createWindow } = require('./createWindow');
const { createMainMenu } = require('./menu');
const { checkForUpdates, handleUpdateEvents } = require('./updateHandler');

const user_pc = os.userInfo().username;
const app_version = app.getVersion();

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

let mainWindow;

app.on('ready', () => {
    mainWindow = createWindow();
    checkForUpdates(autoUpdater, app);
    handleUpdateEvents(autoUpdater, app);
    createMainMenu(mainWindow, app_version, user_pc);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow(mainWindow);
    }
});

ipcMain.on('openNewWindow', (event, url) => {
    // Crear una nueva ventana sin barra de menú
    const newWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // Cargar la URL específica en la nueva ventana
    newWindow.loadURL(url);
});
