import {tableWrite,addNewTask} from './taskTable';
import checkImg from './ok.png';
import './style.css';
import {defaultFolderName} from './tasks';
import {Folder} from './folder';
import {randomBetween,ConvertRGBtoHex,generateFooter}  from './requisites';


function mainLoader() {
    const Everything=document.createElement('div');
    Everything.classList.add(`allThings`);

    Everything.appendChild(header());

    const MidAll = document.createElement('div');
    MidAll.classList.add(`middle_all`);
    const Mid1=leftBar();
    Mid1.classList.add(`middle_one`);
    const Mid2=tableWrite();
    Mid2.classList.add(`middle_two`);
    Mid2.setAttribute(`id`,`taskTableDiv`);
    MidAll.appendChild(Mid1);
    MidAll.appendChild(Mid2);
    Everything.appendChild(MidAll);

    Everything.appendChild(generateFooter());

    return Everything;
}

function header(){
    const leftLogo= new Image();
    leftLogo.src=checkImg;

    const Head = document.createElement('div');
    const Heading = document.createElement('div');
    Head.appendChild(leftLogo);
    Heading.textContent=`Yapılacaklar`;
    Head.appendChild(Heading);
    Head.classList.add(`Heading`);

    return Head;
}

function leftBar(){
    const leftLinks=document.createElement('div');

    for (let i = 0; i < allFolders.length; i++) {
       
        leftLinks.appendChild(allFolders[i].writeRow());
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
            leftForm1.parentNode.insertBefore(allFolders[i].writeRow(),leftForm1);
        }
    }

    function remakeDropdown(){
        const newOption=document.createElement(`option`);
        newOption.value=newName;
        newOption.textContent=newName;
        document.getElementById(`folderInput`).appendChild(newOption);
        // fInput.setAttribute(`id`,`folderInput`);
    }
}

function addFolder(name,color){
    allFolders.push(new Folder(name,color));
}



// HERE IS THE MAIN PART==================


let allFolders=[];

addFolder(defaultFolderName);

document.body.appendChild(mainLoader());
document.getElementById(`buttonAddTask`).addEventListener("click", addNewTask);
document.getElementById(`buttonAddFolder`).addEventListener("click", addNewFolder);



