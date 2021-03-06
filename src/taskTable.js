import {Task} from './tasks';
import {allFolders,currentFolderId} from './folderTable';
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
    
        const tInput=document.createElement(`input`);
        tInput.type=`time`;
        tInput.setAttribute(`id`,`timeInput`);
    
        const fInput=document.createElement(`select`);
        fInput.setAttribute(`id`,`folderInput`);

        for (let i = 0; i < allFolders.length; i++) {
            const folderOption=document.createElement(`option`);
            folderOption.value=i;
            folderOption.textContent=allFolders[i].folderName;
            fInput.appendChild(folderOption);
        }
    
        rightForm.appendChild(rInput);
        rightForm.appendChild(dInput);
        rightForm.appendChild(tInput);
        rightForm.appendChild(fInput);
    
        rightForm.setAttribute(`id`,`newTaskForm`);
    
        return rightForm;
    }

    function printTasks(){
        for (let i = 0; i < allTasks.length; i++) {

            const taskRow=allTasks[i].writeRow();
            taskRow.dataset.taskId=allTasks[i].id;
            taskRow.getElementsByTagName(`input`)[0].addEventListener("change", toggleCompleted);
            taskRow.getElementsByTagName(`button`)[0].addEventListener("click", removeTask);
            table.appendChild(taskRow);   
        }
    }
}



function addNewTask(){
    let newName=document.getElementById(`taskNameInput`).value;
    
    if (newName){
        const now = new Date();
        let setTime=``;
        let newDate=document.getElementById(`dateInput`).value;
        let newTime=document.getElementById(`timeInput`).value;

        if(newTime===`` && newDate!==``){
            setTime=new Date(newDate+` `+`00:00`);
        }
        if(newTime!==`` && newDate===``){
            setTime=new Date(now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()+` `+newTime);
        }
        if(newTime!==`` && newDate!==``){
            setTime=new Date(newDate+` `+newTime);
        }
        
        if (setTime>now || (newDate===``&&newTime===``)){
            let newFolder=allFolders[document.getElementById(`folderInput`).value];
    
            if (setTime==`Invalid Date`){addTask(newName,newFolder,``);}
            else{addTask(newName,newFolder,setTime);}
    
            currentFolderId=-1;
            reprintTasks();
    
            document.getElementById(`taskNameInput`).value=``;
            document.getElementById(`dateInput`).value=``;
            document.getElementById(`timeInput`).value=``;
            document.getElementById(`folderInput`).value=0;
        }
        else{
            document.getElementById(`dateInput`).setCustomValidity("L??tfen gelecekteki bir zaman se??in.");
            document.getElementById(`dateInput`).reportValidity();
        }
    }else{
        document.getElementById(`taskNameInput`).setCustomValidity("L??tfen bir g??rev ismi girin.");
        document.getElementById(`taskNameInput`).reportValidity();
    }  
}

function reprintTasks(){
    let taskArray=allTasks;
    if (currentFolderId!==-1){
        taskArray=allTasks.filter(task => (task.folder.id==currentFolderId));
    }

    const rightFormRow= document.getElementById(`rightFormRow`);
    while(rightFormRow.previousSibling){
        rightFormRow.previousSibling.remove();
    }

    for (let i = 0; i < taskArray.length; i++) {
        const taskRow=taskArray[i].writeRow();
        taskRow.dataset.taskId=taskArray[i].id;
        taskRow.getElementsByTagName(`input`)[0].addEventListener("change", toggleCompleted);
        taskRow.getElementsByTagName(`button`)[0].addEventListener("click", removeTask);
        rightFormRow.parentNode.insertBefore(taskRow,rightFormRow);
    }
}


function addTask(title,folder,date){

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

    let relatedId=e.target.parentNode.parentNode.parentNode.dataset.taskId;
    console.log(e.target.parentNode);

    for (let i = 0; i < allTasks.length; i++) {
       if (allTasks[i].id==relatedId){
           allTasks[i].completed=! allTasks[i].completed;
           break;
       }
    }

    reprintTasks();
    localStorage.setItem("tasks_JSON", JSON.stringify(allTasks));
}

function removeTask(e){
    let relatedId=e.target.parentNode.parentNode.dataset.taskId;

    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].id==relatedId){
            allTasks.splice(i,1);
            break;
        }
     }

    reprintTasks();
    localStorage.setItem("tasks_JSON", JSON.stringify(allTasks));

    e.target.parentNode.remove();
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



// addTask("D??nyan??n Fethi");
// addTask("D??nyan??n Temizlenmesi","??nemli","29.11.2023");

export{tableWrite,addNewTask,allTasks,reprintTasks};
