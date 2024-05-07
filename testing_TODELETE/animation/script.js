let isMoved = false;

function moveDiv(side) {
    console.log('move-to-' + side);
    let div = document.getElementById("innerContainer");
    if (side == 'left')
    side == 'left' ? div.classList.remove('move-to-right') : div.classList.remove('move-to-left');
    side == 'right' ? div.classList.remove('move-to-left') : div.classList.remove('move-to-right');
    div.classList.add('move-to-' + side)

}