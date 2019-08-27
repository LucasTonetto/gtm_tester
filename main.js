const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const runServer = require('./src/server/server');
const insertGtmIn = require('./src/server/insertGtmInSite');

let mainWindow = null;
let windowInsertGtm = null;

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

ipcMain.on('open-gtm-insertion', function() {
    const site = arguments[1];
    windowInsertGtm = new BrowserWindow({
        width: 400,
        height: 355,
        webPreferences: {
            nodeIntegration: true
        }
    });
    windowInsertGtm.loadURL(`file://${__dirname}/src/client/insertGtm.html`);
    windowInsertGtm.webContents.on('dom-ready', () => {
        windowInsertGtm.webContents.send('site-name', site);
    });
});

ipcMain.on('play-stop-server', () => {
    runServer();
});

ipcMain.on('insert-gtm', (event, site, tag) => {
    try {
        insertGtmIn(site, tag);
        windowInsertGtm.webContents.send('insert-gtm-success', `Tag inserida com sucesso!`);
    } catch(error) {
        console.log(error.message);
        windowInsertGtm.webContents.send('insert-gtm-error', error.message);
    }
});