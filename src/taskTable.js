import {Task} from './tasks';
import {allFolders} from './folderTable';
// import {defaultFolderName} from './folder';

function tableWrite(){
    const tableContainer=document.createElement(`div`);
    tableContainer.classList.add(`container`);
    const table=document.createElement('table');
    printTasks(allTasks);

    const formContainer=document.createElement(`div`);
    formContainer.style.display=`flex`;
    const addTask=document.createElement(`button`);

    addTask.textContent=`+`;
    addTask.style.cssText=`padding-left: 2vw; padding-right: 2vw`;
    addTask.setAttribute(`id`,`buttonAddTask`);
    addTask.addEventListener("click", addNewTask);
    formContainer.appendChild(addTask);
    formContainer.appendChild(createRightForm());

    const newTaskFormRow=document.createElement(`tr`);
    newTaskFormRow.setAttribute(`id`,`rightFormRow`);
    const newTaskFormCell=document.createElement(`td`);
    newTaskFormCell.setAttribute(`colspan`,`3`);
    newTaskFormCell.appendChild(formContainer);
    newTaskFormCell.style.cssText=`padding:0px;`
    newTaskFormRow.appendChild(newTaskFormCell);
    
    table.appendChild(newTaskFormRow);
    tableContainer.appendChild(table);

    return tableContainer;

    function createRightForm(){
        const rightForm=document.createElement(`form`);
        rightForm.classList.add(`formContainer`);
    
        const rInput=document.createElement(`input`);
        rInput.type=`text`;
        rInput.required = true;
        rInput.setAttribute(`id`,`taskNameInput`);
    
        const dInput=document.createElement(`input`);
        dInput.type=`date`;
        dInput.setAttribute(`id`,`dateInput`);
    
        // const tInput=document.createElement(`input`);
        // tInput.type=`time`;
        // tInput.setAttribute(`id`,`timeInput`);
    
        const fInput=document.createElement(`select`);
        fInput.setAttribute(`id`,`folderInput`);

        for (let i = 0; i < allFolders.length; i++) {
            // const newOption=document.createElement(`option`);
            // let numberOfOptions = document.getElementById(`folderInput`).options.length;
            // newOption.value=numberOfOptions;
            // newOption.textContent=newName;
            // document.getElementById(`folderInput`).appendChild(newOption);
            const folderOption=document.createElement(`option`);
            folderOption.value=i;
            folderOption.textContent=allFolders[i].folderName;
            fInput.appendChild(folderOption);
        }
    
        rightForm.appendChild(rInput);
        rightForm.appendChild(dInput);
        // rightForm.appendChild(tInput);
        rightForm.appendChild(fInput);
    
        rightForm.setAttribute(`id`,`newTaskForm`);
    
        return rightForm;
    }

    function printTasks(){
        for (let i = 0; i < allTasks.length; i++) {
            // table.appendChild(allTasks[i].writeRow());

            const taskRow=allTasks[i].writeRow();
            taskRow.dataset.taskId=allTasks[i].id;
            taskRow.getElementsByTagName(`input`)[0].addEventListener("change", toggleCompleted);
            table.appendChild(taskRow);   
        }
    }
}



function addNewTask(){
    let newName=document.getElementById(`taskNameInput`).value;
    
    if (newName){
        const now = new Date();
        let newDate=document.getElementById(`dateInput`).value;
        const setTime=new Date(newDate);
        if (setTime>now || newDate===``){
            if (newDate!==``){newDate=newDate.match(/\d+/g).reverse().join(`.`)}
            // let newTime=document.getElementById(`timeInput`).value;
            let newFolder=allFolders[document.getElementById(`folderInput`).value];
    
            addTask(newName,newFolder,newDate);
    
            reprintTasks();
    
            document.getElementById(`taskNameInput`).value=``;
            document.getElementById(`dateInput`).value=``;
            // document.getElementById(`timeInput`).value=``;
            document.getElementById(`folderInput`).value=0;
        }
    }    
}

function reprintTasks(){
    const rightFormRow= document.getElementById(`rightFormRow`);
    while(rightFormRow.previousSibling){
        rightFormRow.previousSibling.remove();
    }

    for (let i = 0; i < allTasks.length; i++) {
        const taskRow=allTasks[i].writeRow();
        taskRow.dataset.taskId=allTasks[i].id;
        taskRow.getElementsByTagName(`input`)[0].addEventListener("change", toggleCompleted);
        rightFormRow.parentNode.insertBefore(taskRow,rightFormRow);
    }
}

function addTask(title,folder,date){
    // allTasks.push(new Task(title,folder,date));

    let newId=0;
    if (allTasks.length===0){
        allTasks.push(new Task(title,folder,date,0));
    }else{
        while (allTasks.filter(task => task.id===newId).length){
            newId+=1;
        }
        allTasks.push(new Task(title,folder,date,newId));
    }

    localStorage.setItem("tasks_JSON", JSON.stringify(allTasks));
}

function toggleCompleted(e){

    let relatedId=e.target.parentNode.parentNode.dataset.taskId;

    for (let i = 0; i < allTasks.length; i++) {
       if (allTasks[i].id==relatedId){
           allTasks[i].completed=! allTasks[i].completed;
           break;
       }
    }
    reprintTasks();
    localStorage.setItem("tasks_JSON", JSON.stringify(allTasks));
}


let allTasks=[];


if(JSON.parse(localStorage.getItem("tasks_JSON"))) {
    const RecordedTasks=JSON.parse(localStorage.getItem("tasks_JSON"));
    for (const pastTask of RecordedTasks){
        addTask(pastTask.taskName,pastTask.folder,pastTask.lastDate);
    }
}
else{    
    
}



// addTask("Dünyanın Fethi");
// addTask("Dünyanın Temizlenmesi","önemli","29.11.2023");

export{tableWrite,addNewTask,allTasks};
