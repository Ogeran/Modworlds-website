function manageNavBar(element) {
    var e = element.id;
    var pre = document.getElementById(e).previousElementSibling;

    e = pre.id;

    pre.id = "edit";

    document.getElementById("edit").style.borderBottomRightRadius = '0.5cm';

    document.getElementById("edit").id = e;
}

function resettGraphics(ignore) {
    var c = document.getElementById("nav").children;

    c[0].style.borderBottomRightRadius = '0';
    c[1].style.borderBottomRightRadius = '0';
    c[2].style.borderBottomRightRadius = '0';
    c[3].style.borderBottomRightRadius = '0';

    c[ignore].style.borderBottomRightRadius = '0.5cm';
}