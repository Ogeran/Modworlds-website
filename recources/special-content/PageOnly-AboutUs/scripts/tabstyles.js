function setgraphics(tabnum) {
    if(document.body.offsetWidth > 900) {
        resetgraphicsPc();
        if(tabnum == 1) {
            document.getElementById('TabOne').style.borderBottomRightRadius = '20px';
            document.getElementById('TabThree').style.borderBottomLeftRadius = '20px';
        }
        else if(tabnum == 3) {
            document.getElementById('TabFour').style.borderBottomLeftRadius = '20px';
        }
        else if(tabnum == 4) {
            document.getElementById('TabThree').style.borderBottomRightRadius = '20px';
        }
    }
    else {
        resetgraphicsMobile();
    }
}

function resetgraphicsPc() {
    document.getElementById('TabOne').style.borderBottomLeftRadius = '0px';
    document.getElementById('TabTwo').style.borderBottomLeftRadius = '0px';
    document.getElementById('TabThree').style.borderBottomLeftRadius = '20px';
    document.getElementById('TabFour').style.borderBottomLeftRadius = '0px';

    document.getElementById('TabOne').style.borderBottomRightRadius = '20px';
    document.getElementById('TabTwo').style.borderBottomRightRadius = '0px';
    document.getElementById('TabThree').style.borderBottomRightRadius = '0px';
    document.getElementById('TabFour').style.borderBottomRightRadius = '0px';

    document.getElementById('TabOne').style.borderTopRightRadius = '20px';
}

function resetgraphicsMobile() {
    document.getElementById('TabOne').style.borderTopRightRadius = '0px';

    document.getElementById('TabOne').style.borderBottomLeftRadius = '0px';
    document.getElementById('TabTwo').style.borderBottomLeftRadius = '0px';
    document.getElementById('TabThree').style.borderBottomLeftRadius = '0px';
    document.getElementById('TabFour').style.borderBottomLeftRadius = '0px';

    document.getElementById('TabOne').style.borderBottomRightRadius = '0px';
    document.getElementById('TabTwo').style.borderBottomRightRadius = '0px';
    document.getElementById('TabThree').style.borderBottomRightRadius = '0px';
    document.getElementById('TabFour').style.borderBottomRightRadius = '0px';
}

function resetgraphics() {
    if(document.body.offsetWidth > 900) {
        resetgraphicsPc();
    }
    else {
        resetgraphicsMobile();
    }
}