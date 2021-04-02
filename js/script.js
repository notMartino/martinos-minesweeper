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
    let min = 1;
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

    cells.click(function (event) {
        let cell = $(this);
        let isWin = isClick(bombs, cell);
        if (isWin == false) {
            console.log('BOOOM! Hai perso!');
            cells.off('click');
            $('#smile').hide();
            $('#dead').show();
            clearTimeout(timerVar);
        }

        pointsCounter();
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
function removeSX(cellNextSx, cell, cells) {
    let contSX = true;
    while (contSX == true){

        if (cell.data('pos') % 30 == 0) {
            break;
        }
        if ((cellNextSx.data('pos') + 1) % 30 == 0) {
            console.log('PRIMA CASELLA');
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
            
            cellNextSx.children('.cover').remove();
            
            let cellNextUp = ($(cells[(position -30)]));
            removeUP(cellNextUp, cell, cells);
            
            let cellNextDown = ($(cells[(position + 30)]));
            removeDOWN(cellNextDown, cell, cells);
            
            
            if (cellNextSx.data('pos') % 30 == 0) {
                console.log('PRIMA CASELLA');
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

// Funzione calcolo punteggio
function pointsCounter(){
    let cellList = $('#matrix').children();
    let points = 0;

    // Controllo ogni cella senza cover e conto
    for (let i = 0; i < cellList.length; i++) {
        const element = $(cellList[i]);
        if (element.children('.cover').length == 0) {
            points++;
            if (element.children('.bomb').length > 0) {
                points --;
            }
        }
    }

    let pointUnita = $('#point').children('.unita');
    let pointDecina = $('#point').children('.decina');
    let pointCentinaia = $('#point').children('.centinaia');

    // Trasformo i punti in stringa
    points = points.toString();
    // Inserisco la cifra delle unità nelle unità
    if (points.charAt(points.lenght - 1 )) {
        pointUnita.text(points.charAt(points.length - 1));
        pointUnita.addClass('active');
        $('#point').children('.overlay').show();
    }

    // Inserisco la cifra delle decine nelle decine
    if (points.charAt(points.length - 2)) {
        pointDecina.text(points.charAt(points.length - 2));
        pointDecina.addClass('active');
    }

    // Inserisco la cifra delle centinaia nelle centinaia
    if (points.charAt(points.length - 3)) {
        pointCentinaia.text(points.charAt(points.length - 3));
        pointCentinaia.addClass('active');
    }

    console.log('Totale: ' + points);
}

// Funzione winLose
function winLose(isWin){
    if (isWin == false) {
        return isWin;
    }
}

// Funzione flag a click destro
function flag() {
    const cells = $('.cell');

    // Ascolto se è stato premuto il tasto destro su cover
    cells.mousedown(function (event) {
        // Rimuovo il menu ispeziona
        cells.bind("contextmenu",function(e){
            return false;
        }); 
        console.log(event.which);
        const cell = $(this)

        // Se corrisponde e non ha una bandiera, la metto
        if (event.which == 3 && cell.find('.bandiera').length < 1) {
            console.log(cell);
            cell.children('.cover').append('<img class="bandiera" src="img/flag.png" alt="Bandiera">');
        }
        // Altrimenti la tolgo
        else if (event.which == 3){
            cell.children('.cover').empty();
        }
    });
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

    // Concateno la stessa funzione fino a 998
    if (cont < 999) {
        timerVar = setTimeout(timer, 1000);
    }
    // A 999 l'utente ha perso
    else{
        cont = 0;
        $('.cell').off('click');
        $('.cell').off('mousedown');
    }
}

// -----------------------------------------------
// Funzione principale
function minesweeper(){

    // Click su bottone start (smile)
    $('#btnStart').click(function () {

        // Azzero il punteggio
        $('#point > .unita').text(0).removeClass('active');
        $('#point > .decina').text(0).removeClass('active');
        $('#point > .centinaia').text(0).removeClass('active');

        // Rimetto la faccina smile
        $('#dead').hide();
        $('#smile').show();
        $('#btnStart').removeClass('redStartBtn');

        // Parte il timer
        clearTimeout(timerVar);
        cont--;
        timer();
        cont = 0;

        // Creo le bombe
        let bombs = bombCreator();
        // Creo le celle
        cellCreator(bombs);

        // Bomba vicine
        nearBomb(bombs);

        // Ascolto click destro per flags
        flag();

        // Rimuovo cover al click
        clikcedCell(bombs);
    });

}
let timerVar;
let cont = 0;
// Richiamo funz. principale
$(document).ready(minesweeper);