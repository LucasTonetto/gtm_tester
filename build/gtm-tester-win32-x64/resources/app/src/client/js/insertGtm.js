const {ipcRenderer} = require('electron');
const {notifyError} = require('./siteToolsGeneral');

const title         = document.querySelector('h1');
const btnInsertGtm  = document.querySelector("#insert-gtm");
const tagHead       = document.querySelector('#tag-gtm-head');
const tagBody       = document.querySelector('#tag-gtm-body');

const removeLineBreak = (text) => {
    return text.replace(/\n/g, "");
};

const verifyTag = (tag) => {
    return removeLineBreak(tag).match(/(<script>.+?<\/script>)|(<noscript>.+?<\/noscript>)/);
};

btnInsertGtm.addEventListener('click', (e) => {
    e.preventDefault();
    if(verifyTag(tagHead.value) && verifyTag(tagBody.value)) {
        ipcRenderer.send('insert-gtm', title.textContent, [tagHead.value, tagBody.value]);
    } else {
        notifyError('Tag inválida');
    }
});