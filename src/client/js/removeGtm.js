const {ipcRenderer} = require('electron');

const title         = document.querySelector('h1');
const btnRemoveGtm  = document.querySelector('#remove-gtm');
const gtmId         = document.querySelector('#id-gtm');
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

ipcRenderer.on('site-name', (event, msg) => {
    title.textContent = msg.charAt(0).toUpperCase() + msg.slice(1);
});

ipcRenderer.on('remove-gtm-success', (event, msg) => {
    notifySuccess(msg);
});

ipcRenderer.on('remove-gtm-error', (event, msg) => {
    notifyError(msg);
});

const verifyGtmId = id => {
    return id.replace(/ /g, '').match(/^(GTM|gtm)-.*/g);
}

btnRemoveGtm.addEventListener('click', (e) => {
    e.preventDefault();
    if (verifyGtmId(gtmId.value)) ipcRenderer.send('remove-gtm', title.textContent, gtmId.value);
    else notifyError('Id inválido');
})