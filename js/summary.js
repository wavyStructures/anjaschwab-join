let today = new Date();
let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
let formattedDate = today.toLocaleDateString("en-US", options);

document.querySelector('.date').textContent = formattedDate;



