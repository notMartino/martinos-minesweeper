// Funzione apertura finestre
function openWindow() {
    selectedIcon = $(this);
    
    if (selectedIcon.find('#bin').length > 0) {
        console.log(selectedIcon.find('#bin'));
    }else if(selectedIcon.find('#ie').length > 0){
        console.log(selectedIcon.find('#ie'));
    }else{
        let window = $('#game');
        if (window.hasClass('close')) {
            console.log(window.hasClass('close'));
            console.log(selectedIcon);
            window.removeClass('hide');
            window.removeClass('close');
        }
    }
}

// Funzione minimize finestra minesweepr
function minimizeWindow(elem) {
    let window;
    window = elem.parents('#game');
    
    if (elem.parents('#game').length > 0) {
        setTimeout(function () {
            window.addClass('hide');
        }, 120);
        window.addClass('close');
    }
}


function init() {
    $('.icon-container').click(openWindow);
    $('.minimized').click(openWindow);
    
    // $(window).resize(function () {
    //     if (document.documentElement.clientWidth < 720) {
    //         minimizeWindow($('.minimizeBtn'));
    //     } 
    // })
    $('#game .minimizeBtn').click(function () {
        minimizeWindow($(this));
        console.log($(this));
    })
}

$(init);