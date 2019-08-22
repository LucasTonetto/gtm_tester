const {ipcRenderer} = require('electron');
const title = document.querySelector('h1');

ipcRenderer.on('site-name', (event, msg) => {
    title.textContent = msg.charAt(0).toUpperCase() + msg.slice(1);;
});
