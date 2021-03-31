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

// Funzione inserimento num bombe vicine
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

// Funzione rimozione cover al click
function clikcedCell(bombs){
    let cells = $('.cell');

    cells.click(function (event) {
        let cell = $(this);
        let isWin = isClick(bombs, cell);
        if (isWin == false) {
            console.log('Is Win: ' + isWin);
            cells.off('click');
        }
    });
}
function isClick(bombs, cell, event) {
    cell.children('.cover').remove();
    let isWin = wildfireDiscover(cell, bombs);
    return winLose(isWin);
}

// Funzione rimozione cover a macchia d'olio
function wildfireDiscover(cell, bombs) {
    cellContent = cell.children(); 
    let cells = $('.cell');

    // Controllo se viene cliccata una bomba
    if (cellContent.hasClass('bomb')) {
        cell.attr('id', 'active');
        for (let i = 0; i < bombs.length; i++) {
            let bombCell = bombs[i];
            $(cells[bombCell]).children('.cover').remove();
        }

        let isWin = false;
        return isWin;
    }
    // Se viene cliccata una cella vuota
    else if(cellContent[0] == undefined){
        // let contSX = true;
        let position = cell.data('pos')
        // console.log(position);
        let cellNextDx = ($(cells[(position + 1)]));
        removeDX(cellNextDx, cell, cells);

        let cellNextSx = ($(cells[(position - 1)]));
        removeSX(cellNextSx, cell, cells);

        let cellNextUp = ($(cells[(position -30)]));
        removeUP(cellNextUp, cell, cells);

        let cellNextDown = ($(cells[(position +30)]));
        removeDOWN(cellNextDown, cell, cells);
        
    }
}

// Funzione rimozione covers DX
function removeDX(cellNextDx, cell, cells) {
    let contDX = true;

    while (contDX == true){
        // if ((cell.data('pos') + 1) % 30 == 0) {
            if ((cellNextDx.data('pos')) % 30 == 0) {
                break;
            }
        
        //     break;
        // }

        if (cellNextDx.children('span').length > 0) {
            contDX = false;
            cellNextDx.children('.cover').remove();
        }
        else if(cellNextDx.children('.cover').length < 1){
            break;
        } 
        else {
            cellNextDx.children('.cover').remove();
            
            let position = cellNextDx.data('pos');

            let cellNextUp = ($(cells[(position -30)]));
            removeUP(cellNextUp, cell, cells);
    
            let cellNextDown = ($(cells[(position + 30)]));
            removeDOWN(cellNextDown, cell, cells);

            cellNextDx = ($(cells[(cellNextDx.data('pos') + 1)]));
        }

        
    }
}

// Funzione rimozione covers SX
function removeSX(cellNextSx, cell, cells) {
    let contSX = true;
    while (contSX == true){
        let exit = false;
        // console.log(cellNextDx.children('span').length > 0);
        if (cell.data('pos') % 30 == 0) {
            break;
        }

        if (cellNextSx.children('span').length > 0) {
            contSX = false;
            cellNextSx.children('.cover').remove();
        }
        else if(cellNextSx.children('.cover').length < 1){
            break;
        } 
        else {
            if (cellNextSx.data('pos') % 30 == 0) {
                // cellNextSx.children('.cover').remove();
                console.log('PRIMA CASELLA');
                cellNextSx.children('.cover').remove();
                break;
            }
            
            
            let position = cellNextSx.data('pos');
            
            let cellNextUp = ($(cells[(position -30)]));
            removeUP(cellNextUp, cell, cells);

            let cellNextDown = ($(cells[(position + 30)]));
            removeDOWN(cellNextDown, cell, cells);

            cellNextSx.children('.cover').remove();
            cellNextSx = ($(cells[(cellNextSx.data('pos') - 1)]));
        }

        
        
    }
}

// Funzione rimozione covers UP
function removeUP(cellNextUp, cell, cells) {
    let contUP = true;
    while (contUP == true){
        if ((cellNextUp.data('pos')) == undefined) {
            break;
        }

        if (cellNextUp.children('span').length > 0) {
            contUP = false;
            cellNextUp.children('.cover').remove();
        }
        else if(cellNextUp.children('.cover').length < 1){
            break;
        } 
        else {
            cellNextUp.children('.cover').remove();

            let position = cellNextUp.data('pos');
        
            let cellNextDx = ($(cells[(position + 1)]));
            removeDX(cellNextDx, cell, cells);
        
            let cellNextSx = ($(cells[(position - 1)]));
            removeSX(cellNextSx, cell, cells);


            cellNextUp = ($(cells[(cellNextUp.data('pos') -30)]));
            // console.log(cellNextUp.data('pos'));
        }
    }
}

// Funzione rimozione covers DOWN
function removeDOWN(cellNextDown, cell, cells) {
    let contUP = true;
    while (contUP == true){
        if ((cellNextDown.data('pos')) == undefined) {
            break;
        }

        if (cellNextDown.children('span').length > 0) {
            contUP = false;
            cellNextDown.children('.cover').remove();
        }
        else if(cellNextDown.children('.cover').length < 1){
            break;
        } 
        else {
            cellNextDown.children('.cover').remove();
            
            let position = cellNextDown.data('pos');
        
            let cellNextDx = ($(cells[(position + 1)]));
            removeDX(cellNextDx, cell, cells);
    
            let cellNextSx = ($(cells[(position - 1)]));
            removeSX(cellNextSx, cell, cells);

            cellNextDown = ($(cells[(cellNextDown.data('pos') +30)]));
            // console.log(cellNextDown);
        }
    }
}

// Funzione winLose
function winLose(isWin){
    if (isWin == false) {
        return isWin;
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
    clikcedCell(bombs);
}
// Richiamo funz. principale
$(document).ready(minesweeper);