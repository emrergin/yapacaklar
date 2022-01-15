import {Task, defaultFolderName} from './rows';
import checkImg from './ok.png';
import './style.css';

const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

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
    let folderList=[];

    if (allTasks.length===0){
        let Link=document.createElement('div');
        Link.textContent=defaultFolderName;
        Link.classList.add(`leftLink`);
        leftLinks.appendChild(Link);
    }
    for (let i = 0; i < allTasks.length; i++) {
        folderList.push(allTasks[i].folder);
    }

    let ufolderList=[...new Set(folderList)];

    for (let i = 0; i < ufolderList.length; i++) {
        let Link=document.createElement('div');
        Link.textContent=ufolderList[i];
        Link.classList.add(`leftLink`);
        leftLinks.appendChild(Link);
    }

    const addFolder=document.createElement(`button`);
    addFolder.textContent=`+`;

    leftLinks.appendChild(leftForm());
    leftLinks.appendChild(addFolder);

    
    return leftLinks;
}



function generateFooter() {
    const bottomBar=document.createElement(`div`);
    bottomBar.setAttribute(`id`,`footer`);
    const footnote=document.createElement(`p`);
    footnote.innerHTML=`<a href=https://github.com/emrergin> Emre Ergin</a> tarafından tasarlanmıştır.`;
    bottomBar.appendChild(footnote);
  
    return bottomBar;
}



function leftForm(){
    const leftForm=document.createElement(`form`);
    leftForm.classList.add(`formContainer`);

    const lInput=document.createElement(`input`);
    lInput.type=`text`;

    const cInput=document.createElement(`input`);
    cInput.type=`color`;
    cInput.value=ConvertRGBtoHex(randomBetween(0,255),randomBetween(0,255),randomBetween(0,255));

    leftForm.appendChild(lInput);
    leftForm.appendChild(cInput);

    leftForm.setAttribute(`id`,`newFolderForm`);
    return leftForm;

    // Necessary stuff===============
    function ColorToHex(color) {
        var hexadecimal = color.toString(16);
        return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
    }
    
    function ConvertRGBtoHex(red, green, blue) {
        return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
    }
}

function tableWrite(){
    const tableContainer=document.createElement(`div`);
    tableContainer.classList.add(`container`);
    const table=document.createElement('table');
    for (let i = 0; i < allTasks.length; i++) {
        table.appendChild(allTasks[i].dataRow);
    }

    const formContainer=document.createElement(`div`);
    formContainer.style.display=`flex`;
    const addTask=document.createElement(`button`);
    addTask.textContent=`+`;
    addTask.style.cssText=`padding-left: 2vw; padding-right: 2vw`;
    formContainer.appendChild(addTask);
    formContainer.appendChild(rightForm());

    const newTaskFormRow=document.createElement(`tr`);
    const newTaskFormCell=document.createElement(`td`);
    newTaskFormCell.setAttribute(`colspan`,`3`);
    newTaskFormCell.appendChild(formContainer);
    newTaskFormCell.style.cssText=`padding:0px;`
    newTaskFormRow.appendChild(newTaskFormCell);
    
    table.appendChild(newTaskFormRow);
    tableContainer.appendChild(table);

    return tableContainer;
}

function rightForm(){
    const rightForm=document.createElement(`form`);
    rightForm.classList.add(`formContainer`);

    const rInput=document.createElement(`input`);
    rInput.type=`text`;

    const dInput=document.createElement(`input`);
    dInput.type=`date`;

    const tInput=document.createElement(`input`);
    tInput.type=`time`;

    const fInput=document.createElement(`select`);
    const defaultOption=document.createElement(`option`);
    defaultOption.value=defaultFolderName;
    defaultOption.textContent=defaultFolderName;
    fInput.appendChild(defaultOption);

    rightForm.appendChild(rInput);
    rightForm.appendChild(dInput);
    rightForm.appendChild(tInput);
    rightForm.appendChild(fInput);

    rightForm.setAttribute(`id`,`newTaskForm`);

    return rightForm;
}


// HERE IS THE MAIN PART==================

let allTasks=[];

function addTask(title,folder,date){
    allTasks.push(new Task(title,folder,date));
}

addTask("Dünyanın Fethi");
addTask("Dünyanın Temizlenmesi","önemli","29.11.2023");

document.body.appendChild(mainLoader());




