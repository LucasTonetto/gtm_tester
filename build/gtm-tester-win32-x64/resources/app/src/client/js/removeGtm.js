const {ipcRenderer} = require('electron');
const {notifyError} = require('./siteToolsGeneral');

const title         = document.querySelector('h1');
const btnRemoveGtm  = document.querySelector('#remove-gtm');
const gtmId         = document.querySelector('#id-gtm');

const verifyGtmId = id => {
    return id.replace(/ /g, '').match(/^(GTM|gtm)-.*/g);
}

btnRemoveGtm.addEventListener('click', (e) => {
    e.preventDefault();
    if (verifyGtmId(gtmId.value)) ipcRenderer.send('remove-gtm', title.textContent, gtmId.value);
    else notifyError('Id inválido');
})