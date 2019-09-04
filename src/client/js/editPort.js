const {ipcRenderer} = require("electron");
const {port}        = require("../../config/config.json");
const {editPort}    = require("../../config/config.js");

const oldPortNumber = document.querySelector("#old-port-number");
const newPortNumber = document.querySelector("#new-port-number");
const success       = document.querySelector("#success");
const error         = document.querySelector("#error");
const btnPort       = document.querySelector("#btn-port");

const verifyPort = (newPort) => {
    return !/[^\d]/.test(newPort);
};

const errorMessage = (msg) => {
    success.style.display = "none";
    error.style.display = "block";
    error.textContent = msg;
};

const successMessage = (msg) => {
    error.style.display = "none";
    success.style.display = "block";
    success.textContent = msg;
};

window.onload = () => {
    oldPortNumber.textContent = port;
    newPortNumber.setAttribute("value", port);
};

btnPort.addEventListener("click", (e) => {
    e.preventDefault();
    if(verifyPort(newPortNumber.value)) {
        editPort(newPortNumber.value, `${__dirname}/../../config/config.json`);
        oldPortNumber.textContent = newPortNumber.value;
        successMessage("Porta alterada com sucesso!");
        ipcRenderer.send('update-port', newPortNumber.value);
    } else {
        errorMessage("Porta inválida!");
    }
});