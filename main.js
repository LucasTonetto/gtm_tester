const {app, BrowserWindow, Menu} = require('electron');

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 650,
        height: 500
    });

    mainWindow.on('closed', () => app.quit());

    mainWindow.loadURL(`file://${__dirname}/src/interfaces/index.html`);

    //Menu.setApplicationMenu(new Menu());
});