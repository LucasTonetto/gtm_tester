const {app, BrowserWindow, Menu} = require('electron');

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });

    mainWindow.on('closed', () => app.quit());

    mainWindow.loadURL(`file://${__dirname}/src/interfaces/index.html`);

    Menu.setApplicationMenu(new Menu());
});