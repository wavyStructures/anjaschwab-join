function renderArrow(){
    let customArrow = document.getElementById('custom-arrow')
    let arrowImg = customArrow.childNodes[1];
    
    arrowImg.dataset.direction == "down"
    ? arrowImg.dataset.direction = "up"
    : arrowImg.dataset.direction = "down"

    arrowImg.src = `../../assets/img/arrow_${arrowImg.dataset.direction}.png`
    document.getElementById('dropdown-content').classList.toggle('d-none')
}
