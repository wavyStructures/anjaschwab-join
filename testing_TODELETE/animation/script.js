let isMoved = false;

function moveDiv() {

    let div = document.getElementById("innerContainer");

    // side == 'right' ? div.classList.remove('move-to-left') : div.classList.remove('move-to-right');
    // side == 'left' ? div.classList.remove('move-to-right') : div.classList.remove('move-to-left');
    
    div.classList.remove('d-none');
    setTimeout(() => {
        console.table('begin outerTimeout');
        div.classList.add('move-to-right')
        
        setTimeout(() => {
            console.log('begin innerTimeout');
            div.classList.remove('move-to-right');
            div.classList.add('move-to-left');
            
        },2000),1000}
    );
    setTimeout(() => {
        console.log('timeout d-none');
        div.classList.add('d-none');
    },3000);
    div.classList.remove('move-to-left');
    console.log('end timeOuts');
}


// function randomize(){
//     let div = document.getElementById("innerContainer");
//     div.setAttribute('onmouseover', '')
//     let [newWidth, newHeight] = getRandomInt(window.innerWidth - div.offsetWidth/2, window.innerHeight - div.offsetHeight/2);
    
//     let offsetTopOld = div.getBoundingClientRect().top;
//     let offsetLeftOld = div.getBoundingClientRect().left;

//     div.style.transform = `translate(${newWidth}px, ${newHeight}px)`;
//     div.animate([{transform: `translate(${offsetLeftOld}px, ${offsetTopOld}px)`},{transform: `translate(${newWidth}px, ${newHeight}px)`}], {duration: 500, fill: "forwards"}, {animationTimingFunction: 'ease-in-out'});
//     div.setAttribute('onmouseover', 'randomize()')
// }

// function getRandomInt(maxWidth, maxHeight) {
//     let width = Math.floor(Math.random() * maxWidth);
//     let height = Math.floor(Math.random() * maxHeight);
    
//     return [width, height]
//   }