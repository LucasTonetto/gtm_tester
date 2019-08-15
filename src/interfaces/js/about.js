const process = require('process');
const {shell} = require('electron');

const nodeVersion = document.querySelector('#version-node');
const electronVersion = document.querySelector('#version-electron');
const versions = process.versions;

const github = document.querySelector('.github');

console.log(versions);

window.onload = () => {
    nodeVersion.textContent = versions.node;
    electronVersion.textContent = versions.electron;
};

github.addEventListener('click', () => shell.openExternal('https://github.com/LucasTonetto/gtm_tester'));