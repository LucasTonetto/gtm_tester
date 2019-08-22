const {ipcRenderer} = require('electron');
const title = document.querySelector('h1');
const btnInsertGtm = document.querySelector("#insert-gtm");
const tag = document.querySelector('textarea');

ipcRenderer.on('site-name', (event, msg) => {
    title.textContent = msg.charAt(0).toUpperCase() + msg.slice(1);
});

btnInsertGtm.addEventListener('click', (e) => {
    e.preventDefault();
    ipcRenderer.send('insert-gtm', title.textContent, tag.value);
});