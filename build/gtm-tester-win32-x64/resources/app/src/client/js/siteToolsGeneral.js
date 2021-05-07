const {ipcRenderer} = require('electron');

const title         = document.querySelector('h1');
const error         = document.querySelector('#error');
const success       = document.querySelector('#success');

const notifyError = (msg) => {
    error.textContent = msg;
    error.style.display = 'inline';
    success.style.display = 'none';
};

const notifySuccess = (msg) => {
    success.textContent = msg;
    success.style.display = 'inline';
    error.style.display = 'none';
};

const clearMsg = () => {
    error.style.display = 'none';
    success.style.display = 'none';
}

ipcRenderer.on('site-name', (event, msg) => {
    title.textContent = msg.charAt(0).toUpperCase() + msg.slice(1);
});

ipcRenderer.on('notify-msg', (event, type, msg) => {
    if (type == 'error') notifyError(msg);
    else notifySuccess(msg);
});

module.exports = {
    notifyError,
    notifySuccess,
    clearMsg
}