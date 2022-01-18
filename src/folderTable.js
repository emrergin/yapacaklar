import {randomBetween,ConvertRGBtoHex}  from './requisites';
import {Folder,defaultFolderName} from './folder';
import {allTasks} from './taskTable';

function addNewFolder(){
    let newName=document.getElementById(`folderNameInput`).value;
    const leftForm1= document.getElementById(`newFolderForm`);
    
    if (newName){
        let newColor=document.getElementById(`colorInput`).value;       

        addFolder(newName,newColor);

        do{
            leftForm1.previousSibling.remove();
        }while(leftForm1.previousSibling);

        reprintFolders();

        document.getElementById(`folderNameInput`).value=``;
        document.getElementById(`colorInput`).value=ConvertRGBtoHex(randomBetween(0,255),randomBetween(0,255),randomBetween(0,255));
        remakeDropdown();
    }
    
    function reprintFolders(){
        for (let i = 0; i < allFolders.length; i++) {
            const folderRow=allFolders[i].writeRow();
            folderRow.addEventListener('click', filterFolders);
            folderRow.dataset.folderId=allFolders[i].id;
            leftForm1.parentNode.insertBefore(folderRow,leftForm1);
        }
    }

    function remakeDropdown(){
        const newOption=document.createElement(`option`);
        let numberOfOptions = document.getElementById(`folderInput`).options.length;
        newOption.value=numberOfOptions;
        newOption.textContent=newName;
        document.getElementById(`folderInput`).appendChild(newOption);
    }
}

function leftBar(){
    const leftLinks=document.createElement('div');

    for (let i = 0; i < allFolders.length; i++) {             
        const folderRow=allFolders[i].writeRow();
        folderRow.addEventListener('click', filterFolders);
        folderRow.dataset.folderId=allFolders[i].id;
        leftLinks.appendChild(folderRow);        
    }

    const addFolder=document.createElement(`button`);
    addFolder.textContent=`+`;
    addFolder.setAttribute(`id`,`buttonAddFolder`);
    addFolder.addEventListener("click", addNewFolder);
    

    leftLinks.appendChild(leftForm());
    leftLinks.appendChild(addFolder);

    
    return leftLinks;
}


function leftForm(){
    const leftForm=document.createElement(`form`);
    leftForm.classList.add(`formContainer`);

    const lInput=document.createElement(`input`);
    lInput.type=`text`;
    lInput.setAttribute(`id`,`folderNameInput`);

    const cInput=document.createElement(`input`);
    cInput.type=`color`;
    cInput.value=ConvertRGBtoHex(randomBetween(0,255),randomBetween(0,255),randomBetween(0,255));
    cInput.setAttribute(`id`,`colorInput`);

    leftForm.appendChild(lInput);
    leftForm.appendChild(cInput);

    leftForm.setAttribute(`id`,`newFolderForm`);
    return leftForm;
}


function addFolder(name,color){
    if (allFolders.length===0){
        allFolders.push(new Folder(name,color,0));
    }else{
        let newId=allFolders[allFolders.length-1].id+1;
        allFolders.push(new Folder(name,color,newId));
    }
    
    localStorage.setItem("folders_JSON", JSON.stringify(allFolders));
}


function filterFolders(e){
    const rightFormRow= document.getElementById(`rightFormRow`);
    while(rightFormRow.previousSibling){
        rightFormRow.previousSibling.remove();
    }
    console.log(allTasks);

    let relatedId=e.target.dataset.folderId
    let subTasks=allTasks.filter(task => (task.folder.id==relatedId));

    reprintTasks();

    function reprintTasks(){
        for (let i = 0; i < subTasks.length; i++) {
            rightFormRow.parentNode.insertBefore(subTasks[i].writeRow(),rightFormRow);
        }
    }
}


let allFolders=[];


if(JSON.parse(localStorage.getItem("folders_JSON"))) {
    const RecordedFolders=JSON.parse(localStorage.getItem("folders_JSON"));
    for (const pastFolder of RecordedFolders){
        addFolder(pastFolder.folderName,pastFolder.color);
    }
}
else{    
    addFolder(defaultFolderName);
}



export{addNewFolder,allFolders,leftBar};