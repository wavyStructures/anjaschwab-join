document.getElementsByTagName("h1")[0].style.fontSize = "6vw";

function changeText(){
  let test = document.getElementById('test');
  let input = document.getElementById('input');
  
  if (input != "")  test.dataset.eingabe = input.value
}