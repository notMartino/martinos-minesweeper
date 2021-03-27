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
            for (let j = 0; j <750; j++) {
                // if (bombCounter >= 100) {
                //     break;
                // }
                let bomb = $(cells[j]);
                if (bomb.data('bomb') == 1) {
                    posNum = bomb.data('pos');
                    let pos = '';
                    bombCount(pos, posNum);
                    bombCounter ++;
                }
            }
                
            // }
            
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
            let cellList = $('.cell');
            posNum -= 31;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let cellLi = $(cellList[posNum]);
                    console.log(cellLi);
                    console.log('POS prima:' + posNum);
                    
                    if(posNum >= 0 && posNum <= 749){
                        let pos2 = posNum + 1;
                        let pos3 = posNum + 2
                        if ((pos2 % 30 == 0) && j == 1) {
                            console.log('WABAAAAAAAAAAAAA');
                            j = 3;
                            posNum++;
                        } else if ((pos2 % 30 == 0) && j == 0) {
                            console.log('UMSSSSSSSDDADS222222');
                            posNum++;
                            continue;
                        }
                        else if(posNum == 0 && j == 2){
                            posNum++;
                            break;
                        }
                        let num = 0;
                        let textHTML = cellLi.html();
                        let isValue = parseInt(cellLi.text());
                        
                        console.log('IS VALUE: ' + isValue);
                        console.log('HA BOMBA ' + cellLi.data('bomb'));
                        if (isNaN(isValue) && cellLi.data('bomb') != 1) {
                            num = num + 1;
                            cellLi.html(textHTML + '<span class="blue">' + num + '</span>')
                        }
                        else if(isNaN(isValue) == false && cellLi.data('bomb') != 1){
                            console.log(isValue);
                            num = isValue + 1;
                            if (num == 2) {
                                cellLi.html(textHTML + '<span class="green">' + num + '</span>');
                                cellLi.children('.blue').remove(); 
                            }else if(num == 3){
                                cellLi.html(textHTML + '<span class="red">' + num + '</span>');
                                cellLi.children('.green').remove(); 
                            }else if(num == 4){
                                cellLi.html(textHTML + '<span class="dark">' + num + '</span>');
                                cellLi.children('.red').remove(); 
                            }else{
                                cellLi.html(textHTML + '<span class="dark">' + num + '</span>');
                                cellLi.children('.dark:first-of-type').remove(); 
                            }
                        }
                    }
                    posNum++;
                }   
                posNum = (posNum - 3) + 30;
            }
            break;
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