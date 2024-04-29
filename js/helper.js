function clearDiv(id){
    return document.getElementById(id).innerHTML = "";
}


function createEvtListener(container) {
    document.getElementById(container).addEventListener('click', function (event) {
     event.stopPropagation();
    })
   }
