function martinos(){
    let gameWindow = $('#matrix');
    let gameWindowList = '';

    for (let i = 0; i < (25 * 30); i++) {
        gameWindowList = gameWindowList + '<li class="cell" data-pos="' + (i) +'"><div class="cover"></div></li>';
    }
    gameWindow.html(gameWindowList);

    let liList = gameWindow.children();

    // Lettera N
    removeAdd($(liList[68]));
    removeAdd($(liList[98]));
    removeAdd($(liList[128]));
    removeAdd($(liList[158]));
    removeAdd($(liList[188]));

    removeAdd($(liList[99]));
    removeAdd($(liList[129]));
    removeAdd($(liList[130]));
    removeAdd($(liList[160]));
    

    removeAdd($(liList[71]));
    removeAdd($(liList[101]));
    removeAdd($(liList[131]));
    removeAdd($(liList[161]));
    removeAdd($(liList[191]));

    // Lettera O
    removeAdd($(liList[73]));
    removeAdd($(liList[103]));
    removeAdd($(liList[133]));
    removeAdd($(liList[163]));

    removeAdd($(liList[74]));
    
    removeAdd($(liList[75]));
    removeAdd($(liList[105]));
    removeAdd($(liList[135]));
    removeAdd($(liList[165]));
    
    removeAdd($(liList[164]));

    // Lettera T
    removeAdd($(liList[77]));
    removeAdd($(liList[78]));
    removeAdd($(liList[79]));
    removeAdd($(liList[108]));
    removeAdd($(liList[138]));
    removeAdd($(liList[168]));

    // A CAPO ---------------
    // Lettera M
    removeAdd($(liList[241]));
    removeAdd($(liList[271]));
    removeAdd($(liList[301]));
    removeAdd($(liList[331]));
    removeAdd($(liList[361]));

    removeAdd($(liList[272]));
    removeAdd($(liList[303]));
    removeAdd($(liList[274]));

    removeAdd($(liList[245]));
    removeAdd($(liList[275]));
    removeAdd($(liList[305]));
    removeAdd($(liList[335]));
    removeAdd($(liList[365]));

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
    removeAdd($(liList[358]));
    removeAdd($(liList[357]));
}

function removeAdd(element) {
    element.empty();
    element.attr('id', 'active');
    element.append('<img class="bomb" src="img/mine.png" alt="">');
}

$(martinos);