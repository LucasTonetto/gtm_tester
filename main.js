const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const runServer = require('./src/server/server');
const {htmlManipulate} = require('./src/server/htmlManipulate');
const {insertGtm, removeGtmById} = require('./src/server/gtmManipulate');
const {insertDatalayerTag, removeDatalayerTag, dataLayerEnabled, insertCustomDatalayer, removeCustomDatalayer, emptyCustomDatalayer} = require('./src/server/dataLayerManipulate');

let {port} = require('./src/config/config.json');

let mainWindow = null;
let windowInsertGtm = null;
let windowRemoveGtm = null;
let windowDatalayerOptions = null;
let editPortWindow = null;
let windowAbout = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 650,
        height: 600,
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

ipcMain.on('open-gtm-insertion', function(){
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

ipcMain.on('open-gtm-removal', function(){
    if (!windowRemoveGtm){
        const site = arguments[1];
        windowRemoveGtm = new BrowserWindow({
            width: 400,
            height: 390,
            webPreferences: {
                nodeIntegration: true
            }
        });
        windowRemoveGtm.loadURL(`file://${__dirname}/src/client/removeGtm.html`);
        windowRemoveGtm.webContents.on('dom-ready', () => {
            windowRemoveGtm.webContents.send('site-name', site);
        });
        windowRemoveGtm.on('closed', () => windowRemoveGtm = null);
    } else {
        windowRemoveGtm.focus();
    }
})

ipcMain.on('open-datalayer-options', function(){
    if (!windowDatalayerOptions){
        const site = arguments[1];
        windowDatalayerOptions = new BrowserWindow({
            width: 400,
            height: 520,
            webPreferences: {
                nodeIntegration: true
            }
        });
        windowDatalayerOptions.loadURL(`file:\\${__dirname}/src/client/datalayerOptions.html`);
        windowDatalayerOptions.webContents.on('dom-ready', () => {
            windowDatalayerOptions.webContents.send('site-name', site);
            windowDatalayerOptions.webContents.send('verified-site', dataLayerEnabled(site), emptyCustomDatalayer(site));
        });
        windowDatalayerOptions.on('closed', () => windowDatalayerOptions = null);
    } else {
        windowDatalayerOptions.focus();
    }
})

ipcMain.on('play-stop-server', () => {
    runServer(port);
});

ipcMain.on('insert-gtm', (event, site, tags) => {
    try {
        htmlManipulate(site, insertGtm, tags);
        windowInsertGtm.webContents.send('insert-gtm-success', `Tags inseridas com sucesso!`);
    } catch(error) {
        console.log(error.message);
        windowInsertGtm.webContents.send('insert-gtm-error', "Diretório não encontrado!");
    }
});

ipcMain.on('remove-gtm', (event, site, gtmId) => {
    try {
        htmlManipulate(site, removeGtmById, gtmId);
        windowRemoveGtm.webContents.send('remove-gtm-success', 'GTM removido com sucesso!');
    } catch(error) {
        windowRemoveGtm.webContents.send('remove-gtm-error', 'Diretório não encontrado!')
    }
})

ipcMain.on('enable-datalayer', (event, site, action, type) => {
    try {
        if (action) htmlManipulate(site, insertDatalayerTag, type);
        else htmlManipulate(site, removeDatalayerTag);
    } catch(error) {
        console.log(error.message);
    }
});

ipcMain.on('insert-custom-datalayer', (event, site, filePath) => {
    try {
        insertCustomDatalayer(site, filePath);
    } catch (error) {
        console.log(error.message);
    }
});

ipcMain.on('remove-custom-datalayer', (event, site) => {
    try {
        removeCustomDatalayer(site);
    } catch (error) {
        console.log(error.message);
    }
})

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
