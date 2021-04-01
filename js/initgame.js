function martinos(){
    let gameWindow = $('#matrix');
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
    removeAdd($(liList[100]));
    removeAdd($(liList[71]));
    removeAdd($(liList[101]));
    removeAdd($(liList[131]));

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
    removeAdd($(liList[242]));
    removeAdd($(liList[272]));
    removeAdd($(liList[302]));
    removeAdd($(liList[332]));
    removeAdd($(liList[273]));
    removeAdd($(liList[244]));
    removeAdd($(liList[274]));
    removeAdd($(liList[304]));
    removeAdd($(liList[334]));

    // Lettera A
    removeAdd($(liList[246]));
    removeAdd($(liList[276]));
    removeAdd($(liList[306]));
    removeAdd($(liList[336]));
    removeAdd($(liList[247]));
    removeAdd($(liList[248]));
    removeAdd($(liList[278]));
    removeAdd($(liList[307]));
    removeAdd($(liList[308]));
    removeAdd($(liList[338]));

    // Lettera R
    removeAdd($(liList[250]));
    removeAdd($(liList[280]));
    removeAdd($(liList[310]));
    removeAdd($(liList[340]));
    removeAdd($(liList[251]));
    removeAdd($(liList[252]));
    removeAdd($(liList[282]));
    removeAdd($(liList[311]));
    removeAdd($(liList[342]));

    // Lettera T
    removeAdd($(liList[254]));
    removeAdd($(liList[255]));
    removeAdd($(liList[256]));
    removeAdd($(liList[285]));
    removeAdd($(liList[315]));
    removeAdd($(liList[345]));

    // Lettera I
    removeAdd($(liList[258]));
    removeAdd($(liList[288]));
    removeAdd($(liList[318]));
    removeAdd($(liList[348]));

    // Lettera N
    removeAdd($(liList[260]));
    removeAdd($(liList[290]));
    removeAdd($(liList[320]));
    removeAdd($(liList[350]));
    removeAdd($(liList[291]));
    removeAdd($(liList[262]));
    removeAdd($(liList[292]));
    removeAdd($(liList[322]));


    // Lettera O
    removeAdd($(liList[264]));
    removeAdd($(liList[294]));
    removeAdd($(liList[324]));
    removeAdd($(liList[354]));
    removeAdd($(liList[265]));
    removeAdd($(liList[266]));
    removeAdd($(liList[296]));
    removeAdd($(liList[326]));
    removeAdd($(liList[356]));
    removeAdd($(liList[355]));
}

function removeAdd(element) {
    console.log(element);
    element.empty();
    element.attr('id', 'active');
    element.append('<img class="bomb" src="img/mine.png" alt="">');
}

$(martinos);