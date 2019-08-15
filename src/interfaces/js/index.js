const {ipcRenderer} = require('electron');

const aboutBtn = document.querySelector('.row.about.btn');
const playPauseBtn = document.querySelector('.play-pause');
const playPauseText = document.querySelector('.barra-opcoes p');
const options = ['Iniciar', 'Parar'];

const togglePlayPause = (option) => {
    playPauseText.textContent = options[0];
    playPauseBtn.setAttribute('src', `imgs/${options[0]}.svg`);
}

const getNextOption = (options) => {
    return options.reverse()[0];
}

playPauseBtn.addEventListener('click', () => {
    togglePlayPause(getNextOption(options));
});

aboutBtn.addEventListener('click', () => ipcRenderer.send('open-window-about'));