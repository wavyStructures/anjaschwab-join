function addTask(category){
    console.log("Task added to:", category);
    console.log("Add function to addTask-Buttons");
}

function setPriority(chosenPriority){

    let prioBtns = document.getElementsByClassName("addTaskPriorityButton");
    console.log(prioBtns);
    console.log( 'addTaskPriorityButton' + chosenPriority);

    Array.from(prioBtns).forEach(btn => {
        if (btn.id == 'addTaskPriorityButton' + chosenPriority){
            switch (chosenPriority) {
                case "Urgent": btn.style = "background-color: var(--clr-prio-urgent)"; break;
                case "Medium": btn.style = "background-color: var(--clr-prio-medium)"; break;
                case "Low": btn.style = "background-color: var(--clr-prio-low)"; break;
            }
        }
        else{
            btn.style = "background-color: none";
        }
        
    });
}