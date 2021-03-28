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

    let posNum = -1;
    for (let j = 0; j <750; j++) {
        let bomb = $(cells[j]);
        if (bomb.data('bomb') == 1) {
            posNum = bomb.data('pos');
            let pos = '';
            bombCount(posNum);
            bombCounter ++;
        }
    }
}

// Funzione inseirmento num bombe
function bombCount(posNum) {
    let cellList = $('.cell');
    posNum -= 31;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let cellLi = $(cellList[posNum]);
            console.log(cellLi);
            console.log('POS prima:' + posNum);
            
            if(posNum >= 0 && posNum <= 749) {
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