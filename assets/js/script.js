//Estamos pegando TODO o Body do site e colocando um Listener
document.body.addEventListener('keyup', (event)=>{
    //Os sons já foram salvos em lowercase na pasta SOUNDS pensando nisso, vamos aproveitar eles já passando aqui para lower tbm
    playSound(event.code.toLocaleLowerCase()); //ex: keyt, keyq, etc
});

//adiciona um Listener para o botão quando for clicado executa a função
document.querySelector('.composer button').addEventListener('click', ()=>{
    let song = document.querySelector('#input').value; //Pega o valor do input digitado

    if(song !== '') {//se n tiver vazio
        let songArray = song.split('');//transforma cada letra em um elemento do array
        plauComposition(songArray);
    }
});

function playSound(sound){
//Salvamos os IDs das tags html AUDIOs como s_key(x) que executam os sons, template string irá simplicar isso tornando dinamico
    let audioElement = document.querySelector(`#s_${sound}`);
//Estamos pegando agora as tags html DIVS que representam visualmente as teclas válidas através do data-key de cada uma
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);
// Se ele achou aquele elemento (pois o usuário pode digitar outras teclas n inclusas)
    if(audioElement){
        audioElement.currentTime = 0; //se clicar mais de uma vez, o som vai parar e iniciar denovo, isso evita o bug de apertar várias vezes a tecla e sair só uma vez o som.
        audioElement.play(); //Toca o audio, play é uma função nativa do JS
    }
    if(keyElement){
        keyElement.classList.add('active'); //Adiciona a classe active
//Depois de 300ms, remove a classe para n ficar efeito permanente
        setTimeout(() => {
            keyElement.classList.remove('active');
        }, 300);
    }
}

function plauComposition(songArray){ //função passada para o segundo evento listener
    let wait = 0;
    for(let songItem of songArray){ //for of é o ideal para array
        setTimeout(() => {//Para que todas as teclas não sejam tocadas de uma vez só
            playSound(`key${songItem}`); //chama a função de tocar o som para cada tecla
        }, wait);
        wait += 250;//a cada iteração adiciona 250ms no tempo para tocar o proximo som      
    }
}