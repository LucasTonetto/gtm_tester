const {ipcRenderer, shell} = require('electron');
const {nodeListMap} = require("../../utils/utils");
const {getNextOption} = require("../../utils/utils");

const aboutBtn = document.querySelector('.row.about.btn');
const playPauseBtn = document.querySelector('.play-pause');
const playPauseText = document.querySelector('.barra-opcoes p');
const sites = document.querySelectorAll(".site");
const gtms = document.querySelectorAll(".insert-gtm-text");
let options = ['Iniciar', 'Parar'];
let sitesHabilitation = ['site-disabled', 'site-enabled'];

const togglePlayPause = (option) => {
    playPauseText.textContent = options[0];
    playPauseBtn.setAttribute('src', `images/${options[0]}.svg`);
}

const toggleEnableDisableSites = () => {
    const nextOption = getNextOption(sitesHabilitation);
    nodeListMap(sites, (site) => site.classList = nextOption);
};

playPauseBtn.addEventListener('click', () => {
    togglePlayPause(getNextOption(options));
    toggleEnableDisableSites();
    ipcRenderer.send('play-stop-server');
});

nodeListMap(sites, (site) => {
    site.addEventListener('click', function() {
        if(this.classList.contains("site-enabled")) {
            shell.openExternal('http://localhost:3000/dopetrope/index.html');
        }
    });
});

nodeListMap(gtms, (gtm) => {
    gtm.addEventListener('click', function() {
        console.log(this);
        ipcRenderer.send('open-gtm-insertion', this.getAttribute("id"));
    });
});

aboutBtn.addEventListener('click', () => ipcRenderer.send('open-window-about'));