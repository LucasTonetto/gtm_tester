const { ipcRenderer, remote }   = require('electron');
const {notifyError, clearMsg}   = require('./siteToolsGeneral');

const title             = document.querySelector('h1');
const btnDefault        = document.querySelector('#enable-default-datalayer');
const btnCustom         = document.querySelector('#enable-custom-datalayer');
const btnCustomCursor   = document.querySelector('#enable-custom-datalayer + span');
const inputFile         = document.querySelector('.input-file span');
const btnInsert         = document.querySelector('#insert-datalayer');
const btnRemove         = document.querySelector('#remove-datalayer');

var filePath            = '';
const disabledClass     = 'disabled-btn';

ipcRenderer.on('verified-site', (event, datalayerEnabled, emptyCustomDatalayerParam) => {
    btnDefault.checked = datalayerEnabled[0];
    btnCustom.checked = datalayerEnabled[1];
    emptyCustomDatalayer(emptyCustomDatalayerParam);
});

btnDefault.addEventListener('change', (e) => {
    e.preventDefault();
    ipcRenderer.send('enable-datalayer', title.textContent, btnDefault.checked, 'default');
    if (btnDefault.checked && btnCustom.checked) btnCustom.checked = false;
});

btnCustom.addEventListener('change', (e) => {
    e.preventDefault();
    ipcRenderer.send('enable-datalayer', title.textContent, btnCustom.checked, 'custom');
    if (btnDefault.checked && btnCustom.checked) btnDefault.checked = false;
});

function insertCustomEvent(e){
    e.preventDefault();
    ipcRenderer.send('insert-custom-datalayer', title.textContent, filePath);
    emptyCustomDatalayer(false);
}

function removeCustomEvent(e) {
    e.preventDefault();
    ipcRenderer.send('remove-custom-datalayer', title.textContent);
    if (btnCustom.checked) {
        btnCustom.checked = false;
        ipcRenderer.send('enable-datalayer', title.textContent, btnCustom.checked, 'custom');
    }
        emptyCustomDatalayer(true);
}

inputFile.addEventListener('click', (e) => {
    e.preventDefault();
    remote.dialog.showOpenDialog({
        title: 'Selecione o arquivo',
        buttonLabel: 'Ok'
    }).then(file => {
        filePath = file.filePaths[0];
        if (filePath){
            let filePathArray = filePath.split(/\\|\//g);
            let fullName = filePathArray[filePathArray.length - 1]
            inputFile.textContent = '(' + fullName + ')';
            let fileType = fullName.split('.')[1];
            if (fileType.match(/js|mjs/)) {
                btnInsert.addEventListener('click', insertCustomEvent);
                btnInsert.classList.remove(disabledClass);
                clearMsg();
            } else {
                btnInsert.removeEventListener('click', insertCustomEvent);
                btnInsert.classList.add(disabledClass);
                notifyError('Insira um arquivo .js');
            }
        }  
    })
});

const emptyCustomDatalayer = status => {
    if (status){
        btnCustomCursor.classList.add(disabledClass);
        btnCustom.setAttribute('disabled', true);
        btnRemove.classList.add(disabledClass);
        btnRemove.removeEventListener('click', removeCustomEvent);
    } else {
        btnCustomCursor.classList.remove(disabledClass);
        btnCustom.removeAttribute('disabled');
        btnRemove.classList.remove(disabledClass);
        btnRemove.addEventListener('click', removeCustomEvent);
    }
}