const {ipcRenderer} = require('electron');
const title = document.querySelector('h1');
const btnInsertGtm = document.querySelector("#insert-gtm");
const tag = document.querySelector('textarea');
const error = document.querySelector('#error');
const success = document.querySelector('#success');

const verifyTag = (tag) => {
    return tag.match(/<script>.+?<\/script>/);
};

const notifyError = (msg) => {
    error.textContent = msg;
    error.style.display = 'inline';
    success.style.display = 'none';
}

const notifySuccess = (msg) => {
    success.textContent = msg;
    success.style.display = 'inline';
    error.style.display = 'none';
}

ipcRenderer.on('site-name', (event, msg) => {
    title.textContent = msg.charAt(0).toUpperCase() + msg.slice(1);
});

ipcRenderer.on('insert-gtm-success', (event, msg) => {
    notifySuccess(msg);
});

ipcRenderer.on('insert-gtm-error', (event, msg) => {
    notifyError(msg);
});

btnInsertGtm.addEventListener('click', (e) => {
    e.preventDefault();
    if(verifyTag(tag.value)) {
        ipcRenderer.send('insert-gtm', title.textContent, tag.value);
    } else {
        notifyError('Tag inválida');
    }
});