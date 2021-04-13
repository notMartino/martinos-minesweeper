// Funzione selettore difficoltà
function setDifficulty(selectedMode) {
    // const selectedMode = $(this);
    const modeWindow = $('.modeWindow');
    let difficulty;
    let maxCells;
    let maxBombs;

    switch (selectedMode.text()) {
        case 'Easy':
            difficulty = 1;
            maxCells = 450;
            maxBombs = 45;
            break;
        case 'Normal':
            difficulty = 2;
            maxCells = 600;
            maxBombs = 90;
            break;
        default:
            difficulty = 3;
            maxCells = 750;
            maxBombs = 150;
            break;
    }

    modeWindow.addClass('hide');
    setTimeout(function () {
        modeWindow.removeClass('hide');
    }, 100);

    return [difficulty, maxCells, maxBombs];
}

// Funzione creatore bombe
function bombCreator(maxCells, maxBombs){
    let min = 0;
    maxCells = maxCells - 1;
    let max = maxCells - min + 1;
    let rndBombs = [];

    let i = 0;
    while(i < maxBombs) {
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

// Funzione creatore celle e layer
function cellCreator(bombs, maxCells){
    let gameWindow = $('#matrix');
    let gameWindowList = '';

    for (let i = 0; i < maxCells; i++) {
        if (bombs.includes(i)) {
            gameWindowList = gameWindowList + '<li class="cell" data-pos="' + (i) +'" data-bomb="1"><img class="bomb" src="img/mine.png" alt=""><div class="cover"></div></li>';
        }else{
            gameWindowList = gameWindowList + '<li class="cell" data-pos="' + (i) +'"><div class="cover"></div></li>';
        }
    }
    gameWindow.html(gameWindowList);
}

// Funzione calcolo bombe vicine
function nearBomb(bombs, maxCells, maxBombs) {
    // Ciclo le X bombe che conosco già
    // E richiamo il contatore bombe vicine passando la posizione
    // della bomba come parametro
    let posNum = -1;
    for (let j = 0; j < maxBombs; j++) {
        posNum = bombs[j];
        bombCount(posNum, maxCells);
    }
}

// Funzione inserimento num bombe vicine
function bombCount(posNum, maxCells) {
    let cellList = $('.cell');
    posNum -= 31;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let cellLi = $(cellList[posNum]);
            let liSpan = cellLi.children('span');
            
            // Verifico se posNum è nel range consentito
            if(posNum >= 0 && posNum <= (maxCells -1)) {
                let pos2 = posNum + 1;
                //Se mi trovo in ultima cell DX
                if ((pos2 % 30 == 0) && j == 1) {
                    j = 3;
                    posNum++;
                } 
                // Se invece mi trovo in prima cell SX
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
                        case 4:
                            liSpan.removeClass('red');
                            liSpan.addClass('dark');
                            liSpan.text(num);
                            break;
                        case 5:
                            liSpan.removeClass('dark');
                            liSpan.addClass('darkred');
                            liSpan.text(num);
                            break;
                        case 6:
                            liSpan.removeClass('darkred');
                            liSpan.addClass('lightgreen');
                            liSpan.text(num);
                            break;
                        case 7:
                            liSpan.removeClass('lightgreen');
                            liSpan.addClass('black');
                            liSpan.text(num);
                            break;
                        case 8:
                            liSpan.removeClass('black');
                            liSpan.addClass('grey');
                            liSpan.text(num);
                            break;    
                    }
                }
            }
            // Incremento e passo alla cella successiva
            posNum++;
        }  
        // Vado alla riga successiva in posizione 0 
        posNum = (posNum - 3) + 30;
    }
}

// Funzione rimozione cover al click
function clikcedCell(bombs){
    let cells = $('.cell');
    let isLose;
    let isWin;
    let clickCount = 0;

    cells.click(function () {
        // Parte il timer
        if (cont == 0) {
            timer();
        }
        
        let cell = $(this);
        // let isWin = isClick(bombs, cell);
        cell.children('.cover').remove();
        isLose = wildfireDiscover(cell, bombs);
        
        // Conto i punti ad ogni click
        isWin = pointsCounter(bombs);
        
        if (isLose == true) {
            console.log('BOOOM! You Lose!');
            cells.off('click');
            cells.off('mousedown');
            
            $('#smile').addClass('hide');
            $('#dead').addClass('show');
            clearTimeout(timerVar);
        }
        else if (isWin == true) {
            console.log('Perfect! You Win!');
            cells.off('click');
            cells.off('mousedown');
            
            $('#smile').addClass('hide');
            $('#dead').removeClass('show');
            $('#dead').addClass('hide');
            $('#win').addClass('show');
            clearTimeout(timerVar);
        } else{
            $('#smile').addClass('hide');
            $('#scared').addClass('show');
            setTimeout(function () {
                $('#smile').removeClass('hide');
                $('#scared').removeClass('show');
            }, 400);
        }
    });
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

        let isFalse = true;
        return isFalse;
    }
    
    // Se viene cliccata una cella vuota
    else if(cellContent[0] == undefined){
        let position = cell.data('pos')

        // Richiamo le funz. di tutte e 4 le direzioni
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
        // Se la cella cliccata è in ultima posizione a DX, Break
        if ((cellNextDx.data('pos')) % 30 == 0) {
            break; 
        }

        // Se la prossima cella ha un numero rimuovo la cover ed esco
        if (cellNextDx.children('span').length > 0) {
            contDX = false;
            cellNextDx.children('.cover').remove();
        }
        // Se la cover è già stata rimossa, Break
        else if(cellNextDx.children('.cover').length < 1){
            break;
        } 
        // Altrimenti concateno le funzioni di rimozione cover
        else {
            cellNextDx.children('.cover').remove();
            
            // Richiamo DX
            let position = cellNextDx.data('pos');
            cellNextDx = ($(cells[(cellNextDx.data('pos') + 1)]));
            removeDX(cellNextDx, cell, cells)

            //Richiamo UP
            let cellNextUp = ($(cells[(position -30)]));
            removeUP(cellNextUp, cell, cells);
            
            // Richiamo DOWN
            let cellNextDown = ($(cells[(position + 30)]));
            removeDOWN(cellNextDown, cell, cells);
        }
    }
}
// Funzione rimozione covers SX
// function removeSX(cellNextSx, cell, cells) {
//     let contSX = true;
//     while (contSX == true){

//         if (cell.data('pos') % 30 == 0) {
//             break;
//         }
//         if ((cellNextSx.data('pos') + 1) % 30 == 0) {
//             // console.log('PRIMA CASELLA');
//             break;
//         }

//         if (cellNextSx.children('span').length > 0) {
//             contSX = false;
//             cellNextSx.children('.cover').remove();
//         }
//         else if(cellNextSx.children('.cover').length < 1){
//             break;
//         } 
//         else {
//             let position = cellNextSx.data('pos');
            
//             cellNextSx.children('.cover').remove();
            
//             let cellNextUp = ($(cells[(position -30)]));
//             removeUP(cellNextUp, cell, cells);
            
//             let cellNextDown = ($(cells[(position + 30)]));
//             removeDOWN(cellNextDown, cell, cells);
            
            
//             if (cellNextSx.data('pos') % 30 == 0) {
//                 break;
//             }
//             cellNextSx = ($(cells[(cellNextSx.data('pos') - 1)]));
//         }
//     }
// }
function removeSX(cellNextSx, cell, cells) {
    let contSX = true;
    while (contSX == true){

        if (cell.data('pos') % 30 == 0) {
            break;
        }
        if ((cellNextSx.data('pos') + 1) % 30 == 0) {
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
            let position = cellNextSx.data('pos');
            
            // Richiamo SX
            cellNextSx.children('.cover').remove();
            removeSX(cellNextSx, cell, cells);
            
            let cellNextUp = ($(cells[(position -30)]));
            removeUP(cellNextUp, cell, cells);
            
            let cellNextDown = ($(cells[(position + 30)]));
            removeDOWN(cellNextDown, cell, cells);
            
            if (cellNextSx.data('pos') % 30 == 0) {
                break;
            }
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
            cellNextUp = ($(cells[(cellNextUp.data('pos') -30)]));
            removeUP(cellNextUp, cell, cells)
        
            let cellNextDx = ($(cells[(position + 1)]));
            removeDX(cellNextDx, cell, cells);
        
            let cellNextSx = ($(cells[(position - 1)]));
            removeSX(cellNextSx, cell, cells);
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
            cellNextDown = ($(cells[(cellNextDown.data('pos') +30)]));
            removeDOWN(cellNextDown, cell, cells)

            let cellNextDx = ($(cells[(position + 1)]));
            removeDX(cellNextDx, cell, cells);
    
            let cellNextSx = ($(cells[(position - 1)]));
            removeSX(cellNextSx, cell, cells);
        }
    }
}

// Funzione calcolo punteggio/calcolo bombe
function pointsCounter(bombs){
    let cellList = $('#matrix').children();
    let points = 0;
    let isWin;

    // Controllo ogni cella senza cover e conto
    for (let i = 0; i < cellList.length; i++) {
        const element = $(cellList[i]);
        if (element.children('.cover').length == 0) {
            points++;
            // Tolgo l'ultimo punto se tocco una bomba
            if (element.children('.bomb').length > 0) {
                points --;
            }
        }
    }

    if (points == (cellList.length - bombs.length)) {
        console.log('opppaa');
        isWin = true;
        return isWin;
    }
}

// Funzione flag a click destro
function flag(maxBombs) {
    const cells = $('.cell');
    
    // Ascolto se è stato premuto il tasto destro su cover
    cells.mousedown(function (event) {
        if (cont == 0) {
            timer();
        }
        
        // Rimuovo il menu ispeziona
        cells.bind("contextmenu",function(e){
            return false;
        }); 
        // console.log(event.which);
        const cell = $(this)
        
        // Se corrisponde e non ha una bandiera, la metto
        if (event.which == 3 && cell.find('.bandiera').length < 1 && cell.children('.cover').length > 0) {
            cell.children('.cover').append('<img class="bandiera" src="img/flag.png" alt="Bandiera">');
            // flagNum ++;
        }
        // Altrimenti la tolgo
        else if (event.which == 3 && cell.children('.cover').length > 0){
            // flagNum --;
            cell.children('.cover').empty();
        }
        
        // Contatore bandiere
        flagCounter(cells, maxBombs);
    });
}

// Contatore bandiere
function flagCounter(cells, maxBombs) {
    let flagNum = 0;
    
    for (let i = 0; i < cells.length; i++) {
        const element = $(cells[i]).children('.cover');
        if (element.children('.bandiera').length > 0) {
            flagNum++;
        }
    }
    
    let bombs = maxBombs - flagNum;
    
    let pointUnita = $('#point').children('.unita');
    let pointDecina = $('#point').children('.decina');
    let pointCentinaia = $('#point').children('.centinaia');
    
    // Trasformo le bombe in stringa
    bombs = bombs.toString();

    // Se ci sono più bandiere che bombe allora Error
    if (bombs < 0) {
        pointUnita.text('R').addClass('active');
        pointDecina.text('R').addClass('active');
        pointCentinaia.text('E').addClass('active');
    }
    // Altrimenti
    else{
        pointUnita.text('0').removeClass('active');
        pointDecina.text('0').removeClass('active');
        pointCentinaia.text('0').removeClass('active');

        // Inserisco la cifra delle unità nelle unità
        if (bombs.charAt(bombs.lenght - 1 )) {
            pointUnita.text(bombs.charAt(bombs.length - 1));
            pointUnita.addClass('active');
            $('#point').children('.overlay').show();
        }
        
        // Inserisco la cifra delle decine nelle decine
        if (bombs.charAt(bombs.length - 2)) {
            pointDecina.text(bombs.charAt(bombs.length - 2));
            pointDecina.addClass('active');
        }
        
        // Inserisco la cifra delle centinaia nelle centinaia
        if (bombs.charAt(bombs.length - 3)) {
            pointCentinaia.text(bombs.charAt(bombs.length - 3));
            pointCentinaia.addClass('active');
        }
    }
}

// Timer partita
function timer() {
    cont++;
    let unita = $('#time > .unita');
    let decina = $('#time > .decina');
    let centinaia =  $('#time > .centinaia');

    // Trasformo i secondi in stringa
    let sec = cont.toString();
    
    // Da 0 a 9 unitò stampo nelle casella unità
    unita.text(sec[sec.length -1]).addClass('active');

    // Da 0 a 9 decine stampo nelle casella decine
    if(cont > 9){
        decina.text(sec[sec.length -2]);
        decina.addClass('active');
    }else{
        decina.text(0).removeClass('active');
    }

    // Da 0 a 9  stampo nella casella decine
    if(cont > 99){
        centinaia.text(sec[sec.length -3]);
        centinaia.addClass('active');
    }else{
        centinaia.text(0).removeClass('active');
    }

    // Concateno la stessa funzione fino a 600
    if (cont < 601) {
        timerVar = setTimeout(timer, 1000);
    }
    // A 600 l'utente ha perso
    else{
        cont = 0;
        $('#smile').addClass('hide');
        $('#dead').addClass('show');

        $('.cell').off('click');
        $('.cell').off('mousedown');
    }
}

// -----------------------------------------------
// Funzione principale
function minesweeper(){
    let gameMode;
    $('.modeWindow > li').click(function () {
        gameMode = setDifficulty($(this));
    });

    // Click su bottone start (smile)
    $('#btnStart').click(function () {
        // Difficoltà default è Hard, se non ne viene scelta un'altra
        if (!gameMode) {
            gameMode = [3, 750, 150];
        }
        let [difficulty, maxCells, maxBombs] = gameMode;

        // Azzero il punteggio
        $('#point > .unita').text(0).removeClass('active');
        $('#point > .decina').text(0).removeClass('active');
        $('#point > .centinaia').text(0).removeClass('active');

        // Azzero il timer
        $('#time > .unita').text(0).removeClass('active');
        $('#time > .decina').text(0).removeClass('active');
        $('#time > .centinaia').text(0).removeClass('active');

        // Rimetto la faccina smile
        $('#dead').removeClass('show');
        $('#dead').removeClass('hide');
        $('#smile').removeClass('hide');
        $('#win').removeClass('show');
        $('#btnStart').removeClass('redStartBtn');

        // // Parte il timer
        clearTimeout(timerVar);
        cont--;
        // timer();
        cont = 0;

        // Creo le bombe
        let bombs = bombCreator(maxCells, maxBombs);

        // Creo le celle
        cellCreator(bombs, maxCells);

        // Bomba vicine
        nearBomb(bombs, maxCells, maxBombs);

        // Ascolto click destro per flags
        flag(maxBombs);
        
        // Rimuovo cover al click
        clikcedCell(bombs);
    });

}
let timerVar;
let cont = 0;
// Richiamo funz. principale
$(document).ready(minesweeper);