const process = require('process');

const nodeVersion = document.querySelector('#version-node');
const electronVersion = document.querySelector('#version-electron');
const versions = process.versions;

console.log(versions);

window.onload = () => {
    nodeVersion.textContent = versions.node;
    electronVersion.textContent = versions.electron;
};