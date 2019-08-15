const {app, BrowserWindow, Menu, ipcMain} = require('electron');

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 650,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.on('closed', () => app.quit());

    mainWindow.loadURL(`file://${__dirname}/src/interfaces/index.html`);

    Menu.setApplicationMenu(new Menu());
});

ipcMain.on('open-window-about', () => {
    const windowAbout = new BrowserWindow({
        width: 600,
        height: 540,
        //frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    windowAbout.loadURL(`file://${__dirname}/src/interfaces/about.html`);
});
