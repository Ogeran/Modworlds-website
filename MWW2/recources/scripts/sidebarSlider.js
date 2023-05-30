var b = false;

window.onload = function() {
    const accIcon = document.getElementById('accIcon');
    const sidebar = document.getElementById('sidebar');

    accIcon.onclick = function() {
        if(b == false) {
            sidebar.style.transform = 'translateX(0)';

            accIcon.style.border = '0.1cm solid dodgerblue';
            accIcon.style.margin = '0.4cm'

            b = true;
        }
        else if(b == true) {
            sidebar.style.transform = 'translateX(-30vw)';

            accIcon.style.border = '0 solid dodgerblue';
            accIcon.style.margin = '0.5cm'

            b = false;
        }
    }
}