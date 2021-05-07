const {ipcRenderer, shell}          = require('electron');
const {nodeListMap, getNextOption}  = require("../../utils/utils");

const portNumber        = document.querySelector("#port-number");
const aboutBtn          = document.querySelector('.row.about.btn');
const playPauseBtn      = document.querySelector('.play-pause');
const playPauseText     = document.querySelector('.barra-opcoes p');
const editPort          = document.querySelector("#port span");
const linksCopyright    = document.querySelectorAll(".copyright");
const sites             = document.querySelectorAll(".site");
const gtmInsertions     = document.querySelectorAll(".insert-gtm-text");
const gtmRemovals       = document.querySelectorAll(".remove-gtm-text");
const datalayerOptions  = document.querySelector('.datalayer-options');

let {port} = require("../../config/config.json");
let sitesHabilitation = ['site-disabled', 'site-enabled'];
let options = ['Iniciar', 'Parar'];

const togglePlayPause = (option) => {
    playPauseText.textContent = option;
    playPauseBtn.setAttribute('src', `images/${option}.svg`);
}

const toggleEnableDisableSites = () => {
    const nextOption = getNextOption(sitesHabilitation);
    nodeListMap(sites, (site) => site.classList = nextOption);
};

window.onload = () => {
    portNumber.textContent = port;
};

ipcRenderer.on('update-port', (event, newPort) => {
    portNumber.textContent = newPort;
    port = newPort;
});

playPauseBtn.addEventListener('click', () => {
    togglePlayPause(getNextOption(options));
    toggleEnableDisableSites();
    ipcRenderer.send('play-stop-server');
});

nodeListMap(sites, (site) => {
    site.addEventListener('click', function() {
        const siteName = this.textContent.toLowerCase();
        if(this.classList.contains("site-enabled")) {
            shell.openExternal(`http://localhost:${port}/${siteName}/index.html`);
        }
    });
});

nodeListMap(gtmInsertions, (gtm) => {
    gtm.addEventListener('click', function() {
        ipcRenderer.send('open-gtm-insertion', this.getAttribute("site"));
    });
});

nodeListMap(gtmRemovals, (gtm) => {
    gtm.addEventListener('click', function(){
        ipcRenderer.send('open-gtm-removal', this.getAttribute("site"));
    })
})

datalayerOptions.addEventListener('click', function(){
    ipcRenderer.send('open-datalayer-options', this.getAttribute('site'));
})

nodeListMap(linksCopyright, (linkCopyright) => {
    linkCopyright.addEventListener('click', function(e) {
        e.preventDefault();
        shell.openExternal(this.querySelector('a').getAttribute('href'));
    });
});


editPort.addEventListener('click', () => ipcRenderer.send('edit-port-number'));

aboutBtn.addEventListener('click', () => ipcRenderer.send('open-window-about'));