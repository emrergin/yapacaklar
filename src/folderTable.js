import {randomBetween,ConvertRGBtoHex,removeOptions}  from './requisites';
import {Folder,defaultFolderName} from './folder';
import {allTasks,reprintTasks} from './taskTable';

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
            folderRow.firstChild.addEventListener('click', removeFolder);
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
        folderRow.firstChild.addEventListener('click', removeFolder);
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
    let newId=0;
    if (allFolders.length===0){
        allFolders.push(new Folder(name,color,0));
    }else{
        while (allFolders.filter(folder => folder.id===newId).length){
            newId+=1;
        }
        allFolders.push(new Folder(name,color,newId));
    }    
    
    localStorage.setItem("folders_JSON", JSON.stringify(allFolders));
}

function filterFolders(e){
    if (!e.target.classList.contains(`leftDelete`)){
    
        let relatedId=e.target.dataset.folderId;
        currentFolderId=relatedId;
    
        reprintTasks();
    }
}

function removeFolder(e){
    let relatedId=e.target.parentNode.dataset.folderId;
    let subTasks=allTasks.filter(task => (task.folder.id==relatedId));
    for (let task of subTasks){
        task.folder=allFolders[0];
    }
    for (let i = 0; i < allFolders.length; i++) {
       if (allFolders[i].id==relatedId){
           allFolders.splice(i,1);
           break;
       }
    }

    currentFolderId=0;
    reprintTasks(); 
    remakeDropdown();
    
    localStorage.setItem("folders_JSON", JSON.stringify(allFolders));
    localStorage.setItem("tasks_JSON", JSON.stringify(allTasks));

    e.target.parentNode.remove();

    function remakeDropdown(){
        const selectList=document.getElementById(`folderInput`);
        removeOptions(selectList);


        for (let i = 0; i < allFolders.length; i++) {

            const folderOption=document.createElement(`option`);
            folderOption.value=i;
            folderOption.textContent=allFolders[i].folderName;
            selectList.appendChild(folderOption);
        }
    }
}


//======================================

let allFolders=[];
let currentFolderId=-1;


if(JSON.parse(localStorage.getItem("folders_JSON"))) {
    const RecordedFolders=JSON.parse(localStorage.getItem("folders_JSON"));
    for (const pastFolder of RecordedFolders){
        addFolder(pastFolder.folderName,pastFolder.color);
    }
}
else{    
    addFolder(defaultFolderName);
}



export{addNewFolder,allFolders,leftBar,currentFolderId};