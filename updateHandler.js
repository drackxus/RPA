const { dialog } = require('electron');

function checkForUpdates(autoUpdater, app) {
    console.log('Checking for updates...');
    autoUpdater.checkForUpdates();
    console.log(`Checking for updates. Current version ${app.getVersion()}`);
}

function handleUpdateEvents(autoUpdater, app) {
    autoUpdater.on("update-available", async (info) => {
        console.log(`Update available. Current version ${app.getVersion()}`);

        const choice = await dialog.showMessageBox({
            type: 'question',
            buttons: ['Actualizar ahora', 'Posponer'],
            defaultId: 0,
            title: 'Actualización disponible',
            message: 'Hay una nueva actualización disponible. ¿Deseas actualizar ahora o posponerla?',
        });

        if (choice.response === 0) {
            autoUpdater.downloadUpdate();
        }
    });

    autoUpdater.on("update-not-available", (info) => {
        console.log(`No update available. Current version ${app.getVersion()}`);
    });

    /* Download Completion Message */
    autoUpdater.on("update-downloaded", async (info) => {
        console.log(`Update downloaded. Current version ${app.getVersion()}`);

        const choice = await dialog.showMessageBox({
            type: 'question',
            buttons: ['Instalar ahora', 'Más tarde'],
            defaultId: 0,
            title: 'Actualización descargada',
            message: 'La actualización se ha descargado. ¿Deseas instalarla ahora o más tarde?',
        });

        if (choice.response === 0) {
            autoUpdater.quitAndInstall();
        }
    });
}

module.exports = { checkForUpdates, handleUpdateEvents };
