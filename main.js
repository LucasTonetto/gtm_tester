const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const runServer = require('./src/server/server');
const insertGtm = require('./src/server/insertGtmInSite');

let {port} = require('./src/config/config.json');
let mainWindow = null;
let windowInsertGtm = null;
let editPortWindow = null;
let windowAbout = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 650,
        height: 530,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.on('closed', () => app.quit());

    mainWindow.loadURL(`file://${__dirname}/src/client/index.html`);

    Menu.setApplicationMenu(new Menu());
});

ipcMain.on('open-window-about', () => {
    if(!windowAbout) {
        windowAbout = new BrowserWindow({
            width: 600,
            height: 570,
            webPreferences: {
                nodeIntegration: true
            }
        });
        windowAbout.loadURL(`file://${__dirname}/src/client/about.html`);
        windowAbout.on('closed', () => windowAbout = null);
    } else {
        windowAbout.focus();
    }
});

ipcMain.on('open-gtm-insertion', function() {
    if(!windowInsertGtm) {
        const site = arguments[1];
        windowInsertGtm = new BrowserWindow({
            width: 400,
            height: 570,
            webPreferences: {
                nodeIntegration: true
            }
        });
        windowInsertGtm.loadURL(`file://${__dirname}/src/client/insertGtm.html`);
        windowInsertGtm.webContents.on('dom-ready', () => {
            windowInsertGtm.webContents.send('site-name', site);
        });
        windowInsertGtm.on('closed', () => windowInsertGtm = null);
    } else {
        windowInsertGtm.focus();
    }
});

ipcMain.on('play-stop-server', () => {
    runServer(port);
});

ipcMain.on('insert-gtm', (event, site, tags) => {
    try {
        insertGtm(site, tags);
        windowInsertGtm.webContents.send('insert-gtm-success', `Tags inseridas com sucesso!`);
    } catch(error) {
        console.log(error.message);
        windowInsertGtm.webContents.send('insert-gtm-error', "Diretório não encontrado!");
    }
});

ipcMain.on('edit-port-number', () => {
    if(!editPortWindow) {
        editPortWindow = new BrowserWindow({
            width: 400,
            height: 270,
            webPreferences: {
                nodeIntegration: true
            }
        });
        editPortWindow.loadURL(`file://${__dirname}/src/client/editPort.html`);
        editPortWindow.on('closed', () => editPortWindow = null);
    } else {
        editPortWindow.focus();
    }
});

ipcMain.on('update-port', (event, newPort) => {
    port = newPort;
    mainWindow.webContents.send('update-port', newPort);
});