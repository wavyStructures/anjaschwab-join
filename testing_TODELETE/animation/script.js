let isMoved = false;

function moveDiv() {
    let div = document.getElementById("innerContainer");
            if (isMoved) {
                console.log('isMoved');
                div.classList.remove("move-to-right");
                div.classList.add("move");
                
                isMoved = false;
            } else {
                console.log('isNotMoved');
                div.classList.add("move-to-right");
                div.classList.remove("move");
                isMoved = true;
            }
        }