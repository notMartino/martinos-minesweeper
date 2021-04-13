function martinos(){
    let gameWindow = $('#matrix');
    $('#btnStart').addClass('redStartBtn');
    let gameWindowList = '';
    

    for (let i = 0; i < (25 * 30); i++) {
        gameWindowList = gameWindowList + '<li class="cell" data-pos="' + (i) +'"><div class="cover"></div></li>';
    }
    gameWindow.html(gameWindowList);

    let liList = gameWindow.children();

    // Lettera N
    removeAdd($(liList[69]));
    removeAdd($(liList[99]));
    removeAdd($(liList[129]));
    removeAdd($(liList[159]));
    // removeAdd($(liList[189]));

    removeAdd($(liList[100]));
    // removeAdd($(liList[130]));
    removeAdd($(liList[131]));
    // removeAdd($(liList[161]));

    removeAdd($(liList[72]));
    removeAdd($(liList[102]));
    removeAdd($(liList[132]));
    removeAdd($(liList[162]));
    // // removeAdd($(liList[192]));

    // Lettera O
    removeAdd($(liList[74]));
    removeAdd($(liList[104]));
    removeAdd($(liList[134]));
    removeAdd($(liList[164]));

    removeAdd($(liList[75]));
    
    removeAdd($(liList[76]));
    removeAdd($(liList[106]));
    removeAdd($(liList[136]));
    removeAdd($(liList[165]));
    removeAdd($(liList[166]));
    

    // Lettera T
    removeAdd($(liList[78]));
    removeAdd($(liList[79]));
    removeAdd($(liList[80]));
    removeAdd($(liList[109]));
    removeAdd($(liList[139]));
    removeAdd($(liList[169]));

    // A CAPO ---------------
    // Lettera M
    removeAdd($(liList[241]));
    removeAdd($(liList[271]));
    removeAdd($(liList[301]));
    removeAdd($(liList[331]));
    // removeAdd($(liList[361]));

    removeAdd($(liList[272]));
    removeAdd($(liList[303]));
    removeAdd($(liList[274]));

    removeAdd($(liList[245]));
    removeAdd($(liList[275]));
    removeAdd($(liList[305]));
    removeAdd($(liList[335]));
    // removeAdd($(liList[365]));

    // Lettera A
    removeAdd($(liList[247]));
    removeAdd($(liList[277]));
    removeAdd($(liList[307]));
    removeAdd($(liList[337]));
    removeAdd($(liList[248]));
    removeAdd($(liList[249]));
    removeAdd($(liList[279]));
    removeAdd($(liList[308]));
    removeAdd($(liList[309]));
    removeAdd($(liList[339]));

    // Lettera R
    removeAdd($(liList[251]));
    removeAdd($(liList[281]));
    removeAdd($(liList[311]));
    removeAdd($(liList[341]));
    removeAdd($(liList[252]));
    removeAdd($(liList[253]));
    removeAdd($(liList[283]));
    removeAdd($(liList[312]));
    removeAdd($(liList[343]));

    // Lettera T
    removeAdd($(liList[255]));
    removeAdd($(liList[256]));
    removeAdd($(liList[257]));
    removeAdd($(liList[286]));
    removeAdd($(liList[316]));
    removeAdd($(liList[346]));

    // Lettera I
    removeAdd($(liList[259]));
    removeAdd($(liList[289]));
    removeAdd($(liList[319]));
    removeAdd($(liList[349]));

    // Lettera N
    removeAdd($(liList[261]));
    removeAdd($(liList[291]));
    removeAdd($(liList[321]));
    removeAdd($(liList[351]));

    removeAdd($(liList[292]));
    removeAdd($(liList[323]));

    removeAdd($(liList[264]));
    removeAdd($(liList[294]));
    removeAdd($(liList[324]));
    removeAdd($(liList[354]));

    // Lettera O
    removeAdd($(liList[266]));
    removeAdd($(liList[296]));
    removeAdd($(liList[326]));
    removeAdd($(liList[356]));
    removeAdd($(liList[267]));
    removeAdd($(liList[268]));
    removeAdd($(liList[298]));
    removeAdd($(liList[328]));
    removeAdd($(liList[357]));
    removeAdd($(liList[358]));
}

// Funzione di richiamo rimozione/aggiunta cover
function removeAdd(element) {
    // Lista di LI celle
    let newGameWindow = $('#matrix');
    let newLiList = newGameWindow.children();

    // Pos è la posizione originale di destinazione
    let pos = element.data('pos');

    // Pos0 è la posizione di partenza sulla riga corretta
    let pos0 = parseInt(pos / 30);
    pos0 = pos0 * 30;
    let elem2 = $(newLiList[pos0]);

    // Richiamo le funzioni di scopertura/copertura celle
    redCell(elem2, pos, pos0, newLiList);
    whiteCell(elem2, pos, pos0, newLiList);
}

// Funzione rimozione cover con effetto
function redCell(elem2, pos, pos0, newLiList){
    setTimeout(()=>{
        elem2.empty();
        elem2.attr('id', 'active2');
        elem2.append('<img class="bomb" src="img/mine.png" alt="">');
        if (pos0 < pos) {
            pos0++;
            elem2 = $(newLiList[pos0]);
            redCell(elem2, pos, pos0, newLiList);
        }
    },40);
}    

// Funzione di aggiunta cover
function whiteCell(elem2, pos, pos0, newLiList){
    setTimeout(()=>{
        if (pos0 < pos) {
            pos0++;
            if (elem2.data('show') != '1') {
                elem2.html('');
                elem2.html('<div class="cover"></div>');
                elem2.attr('id', '');
            }
            elem2 = $(newLiList[pos0]);
            whiteCell(elem2, pos, pos0, newLiList);
        }else{
            elem2.attr('data-show', '1');
            console.log(elem2, elem2.data('show'));
        } 
    },50);
}

$(martinos);