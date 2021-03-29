// Funzione creatore celle e layer
function cellCreator(bombs){
    let gameWindow = $('#matrix');
    let gameWindowList = '';

    for (let i = 0; i < (25 * 30); i++) {
        if (bombs.includes(i)) {
            gameWindowList = gameWindowList + '<li class="cell" data-pos="' + (i) +'" data-bomb="1"><img class="bomb" src="img/mine.png" alt=""><div class="cover"></div></li>';
        }else{
            gameWindowList = gameWindowList + '<li class="cell" data-pos="' + (i) +'"><div class="cover"></div></li>';
        }
    }
    gameWindow.html(gameWindowList);
}

// Funzione creatore bombe
function bombCreator(){
    let min = 0;
    let max = 749 - min + 1;
    let rndBombs = [];

    let i = 0;
    while(i< 100) {
        let rnd = Math.floor(Math.random ()* max) + min;
        if (rndBombs.includes(rnd) == false) {
            rndBombs[i] = rnd;
            i++;
        }
    }
    rndBombs.sort(function(a, b){return a-b});
    console.log('Bombs: ');
    console.log(rndBombs);
    
    return rndBombs;
}

// Funzione rimozione cover al click
function clikcedCell(){
    let cells = $('.cell');

    cells.click(function (){
        let cell = $(this);
        cell.children('.cover').hide();
    });
}

// Funzione calcolo bombe vicine
function nearBomb(bombs) {
    // Ciclo le 100 bombe che conosco già
    // E richiamo il contatore bombe vicine passando la posizione
    // della bomba come parametro
    let posNum = -1;
    for (let j = 0; j <100; j++) {
        let bomb = $(bombs[j]);
        posNum = bomb[0];
        bombCount(posNum);
    }
}

// Funzione inseirmento num bombe
function bombCount(posNum) {
    let cellList = $('.cell');
    posNum -= 31;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let cellLi = $(cellList[posNum]);
            let liSpan = cellLi.children('span');
            
            // Verifico se posNum è nel range consentito
            if(posNum >= 0 && posNum <= 749) {
                let pos2 = posNum + 1;
                //Se mi trovo in ultima cell SX
                if ((pos2 % 30 == 0) && j == 1) {
                    j = 3;
                    posNum++;
                } 
                // Se invece mi trovo in prima cell DX
                else if ((pos2 % 30 == 0) && j == 0) {
                    posNum++;
                    continue;
                }
                // Se mi trovo in ultima cell, in riga 1
                else if(posNum == 0 && j == 2){
                    posNum++;
                    break;
                }
                // Prendo i contenuti della cell
                let num = 0;
                let textHTML = cellLi.html();
                let isValue = parseInt(cellLi.text());
                
                // Controllo se cell è NaN e non è una bomba
                if (isNaN(isValue) && cellLi.data('bomb') != 1) {
                    num = num + 1;
                    cellLi.html(textHTML + '<span class="blue">' + num + '</span>')
                }
                // Altrimenti se non è una bomba ed ha un valore
                // diverso da NaN, cambio valore e colore
                else if(isNaN(isValue) == false && cellLi.data('bomb') != 1){
                    num = isValue + 1;
                    switch (num) {
                        case 2:
                            liSpan.removeClass('blue');
                            liSpan.addClass('green');
                            liSpan.text(num);
                            break;
                        case 3:
                            liSpan.removeClass('green');
                            liSpan.addClass('red');
                            liSpan.text(num);
                        break;
                        default:
                            if (liSpan.hasClass('red')) {
                                liSpan.removeClass('red');
                                liSpan.addClass('dark');
                            }
                            liSpan.text(num);
                            break;
                    }
                }
            }
            posNum++;
        }   
        posNum = (posNum - 3) + 30;
    }
}

// Funzione principale
function minesweeper(){
    // Creo le bombe
    let bombs = bombCreator();
    // Creo le celle
    cellCreator(bombs);

    // Bomba vicina
    nearBomb(bombs);

    // Rimuovo cover al click
    clikcedCell();
}
// Richiamo funz. principale
$(document).ready(minesweeper);