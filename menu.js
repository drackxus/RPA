const { Menu } = require('electron');

function createMainMenu(mainWindow, app_version, user_pc) {
   console.log(app_version);
   console.log(user_pc);
   const template = [
      {
         label: 'Acciones', // Opción principal "Acciones"
         submenu: [
            {
               label: 'Recargar', // Submenú "Recargar"
               accelerator: 'CmdOrCtrl+R', // Atajo de teclado para recargar la vista
               click: () => {
                  mainWindow.reload(); // Recargar la vista principal
               },
            },
            {
               label: 'Mostrar DevTools',
               accelerator: 'CmdOrCtrl+Shift+I', // Atajo para mostrar las DevTools
               click: () => {
                  mainWindow.webContents.toggleDevTools();
               },
            },
            {
               label: 'Salir',
               click: () => {
                  app.quit();
               },
            }
         ],
      },
      {
         label: 'Ayuda',
         submenu: [
            {
               label: 'Acerca',
               click: () => {
                  const { version } = require('./package.json'); // Obtener la versión desde package.json
                  dialog.showMessageBox({
                     type: 'info',
                     title: 'Acerca de Mi Aplicación',
                     message: `Versión ${version}`,
                  });
               },
            },
         ],
      },
   ];

   const menu = Menu.buildFromTemplate(template);
   Menu.setApplicationMenu(menu);
   mainWindow.webContents.send('set-version', app_version);
   mainWindow.webContents.send('set-userpc', user_pc);

}

module.exports = { createMainMenu };
