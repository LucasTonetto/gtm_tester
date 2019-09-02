const {ipcRenderer} = require('electron');

const title = document.querySelector('h1');
const btnInsertGtm = document.querySelector("#insert-gtm");
const tagHead = document.querySelector('#tag-gtm-head');
const tagBody = document.querySelector('#tag-gtm-body');
const error = document.querySelector('#error');
const success = document.querySelector('#success');

const removeLineBreak = (text) => {
    return text.replace(/\n/g, "");
};

const verifyTag = (tag) => {
    return removeLineBreak(tag).match(/(<script>.+?<\/script>)|(<noscript>.+?<\/noscript>)/);
};

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

ipcRenderer.on('insert-gtm-success', (event, msg) => {
    notifySuccess(msg);
});

ipcRenderer.on('insert-gtm-error', (event, msg) => {
    notifyError(msg);
});

btnInsertGtm.addEventListener('click', (e) => {
    e.preventDefault();
    if(verifyTag(tagHead.value) && verifyTag(tagBody.value)) {
        ipcRenderer.send('insert-gtm', title.textContent, [tagHead.value, tagBody.value]);
    } else {
        notifyError('Tag inválida');
    }
});