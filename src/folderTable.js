import {randomBetween,ConvertRGBtoHex}  from './requisites';
import {Folder,defaultFolderName} from './folder';

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
        leftLinks.appendChild(folderRow);
    }

    const addFolder=document.createElement(`button`);
    addFolder.textContent=`+`;
    addFolder.setAttribute(`id`,`buttonAddFolder`);

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
    allFolders.push(new Folder(name,color));
    localStorage.setItem("folders_JSON", JSON.stringify(allFolders));
}

// function reprintTasks(TaskArray){
//     const rightFormRow= document.getElementById(`rightFormRow`);
//     for (let i = 0; i < TaskArray.length; i++) {
//         rightFormRow.parentNode.insertBefore(TaskArray[i].writeRow(),rightFormRow);
//     }
// }

function filterFolders(e){
    console.log(e.target.textContent);
}

let allFolders=[];
// document.getElementById(`leftLink`).addEventListener("click", addNewFolder);


if(JSON.parse(localStorage.getItem("folders_JSON"))) {
    const RecordedFolders=JSON.parse(localStorage.getItem("folders_JSON"));
    for (const pastFolder of RecordedFolders){
        addFolder(pastFolder.folderName,pastFolder.color);
    }
}
else{    
    addFolder(defaultFolderName);
}

// const leftLinks = document.querySelectorAll('.leftLink');

// leftLinks.forEach((leftLnk) => {
    // leftLnk.addEventListener('click', filterFolders);
// });


export{addNewFolder,allFolders,leftBar};