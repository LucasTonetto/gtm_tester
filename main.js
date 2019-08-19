const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const runServer = require('./src/server/server');

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 650,
        height: 520,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.on('closed', () => app.quit());

    mainWindow.loadURL(`file://${__dirname}/src/client/index.html`);

    //Menu.setApplicationMenu(new Menu());
});

ipcMain.on('open-window-about', () => {
    const windowAbout = new BrowserWindow({
        width: 600,
        height: 540,
        webPreferences: {
            nodeIntegration: true
        }
    });
    windowAbout.loadURL(`file://${__dirname}/src/client/about.html`);
});

ipcMain.on('play-stop-server', () => {
    runServer();
});