function setgraphics(tabnum) {
    resetgraphics();
    if(tabnum == 2) {
        document.getElementById('TabThree').style.borderBottomLeftRadius = '20px';
    }
    else if(tabnum == 3) {
        document.getElementById('TabTwo').style.borderBottomRightRadius = '20px';
        document.getElementById('TabFour').style.borderBottomLeftRadius = '20px';
    }
    else if(tabnum == 4) {
        document.getElementById('TabThree').style.borderBottomRightRadius = '20px';
    }
}

function resetgraphics() {
    document.getElementById('TabOne').style.borderTopRightRadius = '20px';

    document.getElementById('TabOne').style.borderBottomLeftRadius = '0px';
    document.getElementById('TabTwo').style.borderBottomLeftRadius = '20px';
    document.getElementById('TabThree').style.borderBottomLeftRadius = '0px';
    document.getElementById('TabFour').style.borderBottomLeftRadius = '0px';

    document.getElementById('TabOne').style.borderBottomRightRadius = '0px';
    document.getElementById('TabTwo').style.borderBottomRightRadius = '0px';
    document.getElementById('TabThree').style.borderBottomRightRadius = '0px';
    document.getElementById('TabFour').style.borderBottomRightRadius = '0px';
}