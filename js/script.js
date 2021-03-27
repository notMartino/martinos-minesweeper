// Funzione creatore celle e layer
function cellCreator(bombs){
    let gameWindow = $('#matrix');
    let gameWindowList = '';

    for (let i = 0; i < (25 * 30); i++) {
        if (bombs.includes(i + 1)) {
            gameWindowList = gameWindowList + '<li class="cell" data-pos="' + (i) +'" data-bomb="1"><img class="bomb" src="img/mine.png" alt=""><div class="cover"></div></li>';
        }else{
            gameWindowList = gameWindowList + '<li class="cell" data-pos="' + (i) +'"><div class="cover"></div></li>';
        }
    }
    gameWindow.html(gameWindowList);
}

// Funzione creatore bombe
function bombCreator(){
    let min = 1;
    let max = 750 - min + 1;
    let rndBombs = [];
    for (let i = 0; i < 100; i++) {
        let rnd = Math.floor(Math.random ()* max) + min;
        rndBombs[i] = rnd;
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
    let cells = $('.cell');
    let bombCounter = 0;

    // for (let i = 0; i < 25; i++) {
    //     for (let j = 0; j < 30; j++) {
    //         let counter = 0;
    //         // Ogni riga (i) vale 30 cells
    //         let cellsNumb = i * 30;
        // while(bombCounter < 5){
            let posY = '';
            let posX = '';
            let posNum = -1;

            for (let j = 31; j <40; j++) {
                let bomb = $(cells[j]);
                if (bomb.data('bomb') == 1) {
                    posNum = bomb.data('pos');
                    let pos = '';
                    bombCount(pos, posNum);
                    bombCounter ++;
                }
            }
            
            // if (bombs.includes(j + cellsNumb + 1)) {
            // if () {
        
            //     if (i == 0) {
            //         posY = 'top';
            //     }else if(i == 24){
            //         posY = 'bottom';
            //     }
                
            //     if (j == 0) {
            //         posX = 'left';
            //     }else if (j == 29) {
            //         posX = 'right';
            //     }

            //     let pos = posY + posX;
                
            //     bombCount(pos);
            //     // console.log('pos bomb: ' + pos);
            // }

    //     }
        // }
    // }
}

// Funzione inseirmento num bombe
function bombCount(pos, posNum) {
    switch (pos){
        case 'top':
            console.log('TOP');
            break;
        case 'bottom':
            console.log('BOTTOM');
            break;
        case 'left':
            console.log('LEFT');
            break;
        case 'right':
            console.log('RIGHT');
            break;
        case 'topright':
            console.log('TOP RIGHT');
            break;
        case 'topleft':
            console.log('TOP LEFT');
            break;
        case 'bottomleft':
            console.log('BOTTOM LEFT');
            break;
        case 'bottomright':
            console.log('BOTTOM RIGHT');
            break;
        default:
            console.log('POSIZIONE ' + posNum);
            let cellList = $('.cell');
            posNum -= 31;
            console.log('DEFAULT CASE');
            for (let i = 0; i < 3; i++) {
                // let isBomb = $(cellList[posNum -1]).hasData('bomb');
                // console.log(isBomb);
                for (let j = 0; j < 3; j++) {
                    let num = 0;
                    // console.log(posNum);
                    
                    console.log('Nuova POS:' +posNum);
                    let cellLi = $(cellList[posNum]);
                    let text = cellLi.html();

                    let isValue = parseInt(cellLi.text());
                    console.log('IS VALUE: ' + isValue);
                    console.log('HA BOMBA ' + cellLi.data('bomb'));
                    if (isNaN(isValue) && cellLi.data('bomb') != 1) {
                        console.log('ENTRA');
                        console.log('TEXT HTML: ' + text);
                        num = num + 1;
                        cellLi.html(text + '<span class="blue">' + num + '</span>')
                        console.log('NUOVO HTML: ' + cellLi.html());
                    }
                    else if(isNaN(isValue) == false && cellLi.data('bomb') != 1){
                        console.log('ENTRA2');
                        num = isValue + 1;
                        console.log(num);
                        console.log(cellLi.html(text + '<span>' + num <'</span>'));
                    }

                        // $(cellList[posNum - 1]).data('bomb') != "1"
                    // }
                    
                    // if (){
                       
                    // }
                    // $(cellList[posNum]).text()
                    posNum++;
                }   
                posNum = (posNum - 3) + 30;
            // for (let i = posizioneStart; i < posizioneStart + 3; i++) {
                
            //     // console.log(cellList);
            //     // if (cellList == 1) {
                    
            //     // }
            //     // console.log(cellpos);
            //     // if (condition) {
                    
            //     // }
            // }
            // console.log(celldata);
            }
        
    }
}

// Funzione principale
function minesweeper(){
    // Creo le bombe
    let bombs = bombCreator();
    // Creo le celle
    cellCreator(bombs);

    // Rimuovo cover al click
    clikcedCell();

    // Bomba vicina
    nearBomb(bombs);
}
// Richiamo funz. principale
$(document).ready(minesweeper);