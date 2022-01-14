import {Task, defaultFolderName} from './rows';
import checkImg from './ok.png';
import './style.css';

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
    Heading.textContent=`Yapacaklar`;
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
    leftLinks.appendChild(addFolder);
    return leftLinks;
}

function tableWrite(){
    const tableContainer=document.createElement(`div`);
    tableContainer.classList.add(`container`);
    const table=document.createElement('table');
    for (let i = 0; i < allTasks.length; i++) {
        table.appendChild(allTasks[i].dataRow);
    }

    const buttonContainerRow=document.createElement(`tr`);
    const addTask=document.createElement(`button`);
    addTask.textContent=`+`;
    addTask.style.cssText=`padding-left: 2vw; padding-right: 2vw`;
    buttonContainerRow.appendChild(addTask);
    table.appendChild(buttonContainerRow);

    tableContainer.appendChild(table);
    return tableContainer;
}

function generateFooter() {
    const bottomBar=document.createElement(`div`);
    bottomBar.setAttribute(`id`,`footer`);
    const footnote=document.createElement(`p`);
    footnote.innerHTML=`<a href=https://github.com/emrergin> Emre Ergin</a> tarafından tasarlanmıştır.`;
    bottomBar.appendChild(footnote);
  
    return bottomBar;
}

// HERE IS THE MAIN PART==================

let allTasks=[];

function addTask(title,folder,date){
    allTasks.push(new Task(title,folder,date));
}

// addTask("Dünyanın Fethi");
// addTask("Dünyanın Temizlenmesi","önemli","29.11.2023");

document.body.appendChild(mainLoader());




