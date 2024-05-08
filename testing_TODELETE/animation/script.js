let isMoved = false;

function moveDiv() {

    let div = document.getElementById("innerContainer");

    // side == 'right' ? div.classList.remove('move-to-left') : div.classList.remove('move-to-right');
    // side == 'left' ? div.classList.remove('move-to-right') : div.classList.remove('move-to-left');
    
    setTimeout(() => {
        console.table('begin outerTimeout');
        div.classList.add('move-to-right')
        
        setTimeout(() => {
            console.log('begin innerTimeout');
            div.classList.remove('move-to-right');
            div.classList.add('move-to-left');
            
        },2000),1000}
    );
    div.classList.remove('move-to-left');
    console.log('end timeOuts');
}