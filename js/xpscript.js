function openWindow() {
    selectedIcon = $(this);
    
    console.log();
    if (selectedIcon.find('#bin').length > 0) {
        console.log(selectedIcon.find('#bin'));

    }
}

function closeWindow(elem) {
    let window;
    window = elem.parents('#game');
    
    if (elem.parents('#game').length > 0) {
        setTimeout(function () {
            window.addClass('hide');
            console.log(window);
        }, 100);
        window.addClass('close');
    }
}


function init() {
    $('.icon-container').click(openWindow);

    $('#game .minimizeBtn').click(function () {
        closeWindow($(this));
    })
}

$(init);