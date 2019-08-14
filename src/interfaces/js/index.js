const playPauseBtn = document.querySelector('.play-pause');
const playPauseText = document.querySelector('.barra-opcoes p');
const options = ['Iniciar', 'Parar'];

playPauseBtn.addEventListener('click', () => {
    options.reverse();
    playPauseText.textContent = options[0];
    playPauseBtn.setAttribute('src', `imgs/${options[0]}.svg`);
});