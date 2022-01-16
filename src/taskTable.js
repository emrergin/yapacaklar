import {defaultFolderName} from './tasks';

function tableWrite(TaskArray){
    const tableContainer=document.createElement(`div`);
    tableContainer.classList.add(`container`);
    const table=document.createElement('table');
    // table.setAttribute(`id`,`taskTable`);
    printTasks(TaskArray,table);

    const formContainer=document.createElement(`div`);
    formContainer.style.display=`flex`;
    const addTask=document.createElement(`button`);

    addTask.textContent=`+`;
    addTask.style.cssText=`padding-left: 2vw; padding-right: 2vw`;
    addTask.setAttribute(`id`,`buttonAddTask`);
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
        // rInput.minLength=1;
        rInput.setAttribute(`id`,`taskNameInput`);
    
        const dInput=document.createElement(`input`);
        dInput.type=`date`;
        dInput.setAttribute(`id`,`dateInput`);
    
        const tInput=document.createElement(`input`);
        tInput.type=`time`;
        tInput.setAttribute(`id`,`timeInput`);
    
        const fInput=document.createElement(`select`);
        const defaultOption=document.createElement(`option`);
        defaultOption.value=defaultFolderName;
        defaultOption.textContent=defaultFolderName;
        fInput.appendChild(defaultOption);
        fInput.setAttribute(`id`,`folderInput`);
    
        rightForm.appendChild(rInput);
        rightForm.appendChild(dInput);
        rightForm.appendChild(tInput);
        rightForm.appendChild(fInput);
    
        rightForm.setAttribute(`id`,`newTaskForm`);
    
        return rightForm;
    }
}

// function addNewTask(TaskArray,currentTable){

function printTasks(TaskArray,currentTable){
    for (let i = 0; i < TaskArray.length; i++) {
        currentTable.appendChild(TaskArray[i].writeRow());
    }
}

// function addNewTask(TaskArray){
//     let newName=document.getElementById(`taskNameInput`).value;
    
//     if (newName){
//         let newDate=document.getElementById(`dateInput`).value;
//         let newTime=document.getElementById(`timeInput`).value;
//         let newFolder=document.getElementById(`folderInput`).value;

//         const rightFormRow= document.getElementById(`rightFormRow`);

//         addTask(TaskArray,newName,newFolder,newDate);

//         do{
//             rightFormRow.previousSibling.remove();
//         }while(rightFormRow.previousSibling);

//         reprintTasks();

//         document.getElementById(`taskNameInput`).value=``;
//         document.getElementById(`dateInput`).value=``;
//         document.getElementById(`timeInput`).value=``;
//         document.getElementById(`folderInput`).value=defaultFolderName;
//     }
    
//     function reprintTasks(){
//         for (let i = 0; i < TaskArray.length; i++) {
//             rightFormRow.parentNode.insertBefore(TaskArray[i].writeRow(),rightFormRow);
//         }
//     }
// }

// function addTask(TaskArray,title,folder,date){
//     TaskArray.push(new Task(title,folder,date));
// }




export{tableWrite,printTasks};
