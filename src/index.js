import {tableWrite} from './taskTable';
import checkImg from './ok.png';
import './style.css';
import {Task,defaultFolderName} from './tasks';
import {Folder} from './folder';

// Necessary stuff===============
const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

function ColorToHex(color) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}

function ConvertRGBtoHex(red, green, blue) {
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
}
// ===============


function mainLoader() {
    const Everything=document.createElement('div');
    Everything.classList.add(`allThings`);

    Everything.appendChild(header());

    const MidAll = document.createElement('div');
    MidAll.classList.add(`middle_all`);
    const Mid1=leftBar();
    Mid1.classList.add(`middle_one`);
    const Mid2=tableWrite(allTasks,defaultFolderName);
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
    // let folderList=[];

    // if (allTasks.length===0){
    //     let Link=document.createElement('div');
    //     Link.textContent=defaultFolderName;
    //     Link.classList.add(`leftLink`);
    //     leftLinks.appendChild(Link);
    // }
    // for (let i = 0; i < allTasks.length; i++) {
    //     folderList.push(allTasks[i].folder);
    // }

    // let ufolderList=[...new Set(folderList)];

    for (let i = 0; i < allFolders.length; i++) {
        let Link=document.createElement('div');
        Link.textContent=allFolders[i].folderName;
        Link.classList.add(`leftLink`);
        leftLinks.appendChild(Link);
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

function addNewTask(){
    let newName=document.getElementById(`taskNameInput`).value;
    
    if (newName){
        let newDate=document.getElementById(`dateInput`).value;
        if (newDate!==``){newDate=newDate.match(/\d+/g).reverse().join(`.`)}
        let newTime=document.getElementById(`timeInput`).value;
        let newFolder=document.getElementById(`folderInput`).value;

        const rightFormRow= document.getElementById(`rightFormRow`);

        addTask(newName,newFolder,newDate);

        do{
            rightFormRow.previousSibling.remove();
        }while(rightFormRow.previousSibling);

        reprintTasks();

        document.getElementById(`taskNameInput`).value=``;
        document.getElementById(`dateInput`).value=``;
        document.getElementById(`timeInput`).value=``;
        document.getElementById(`folderInput`).value=defaultFolderName;
    }
    
    function reprintTasks(){
        for (let i = 0; i < allTasks.length; i++) {
            rightFormRow.parentNode.insertBefore(allTasks[i].writeRow(),rightFormRow);
        }
    }
}

function addTask(title,folder,date){
    allTasks.push(new Task(title,folder,date));
}

function addNewFolder(){
    let newName=document.getElementById(`folderNameInput`).value;
    const leftForm1= document.getElementById(`newFolderForm`);

    
    if (newName){
        let newColor=document.getElementById(`colorInput`).value;       

        addFolder(newName,newColor);

        do{
            leftForm1.previousSibling.remove();S
        }while(leftForm1.previousSibling);

        reprintFolders();

        document.getElementById(`folderNameInput`).value=``;
        document.getElementById(`colorInput`).value=ConvertRGBtoHex(randomBetween(0,255),randomBetween(0,255),randomBetween(0,255));
    }
    
    function reprintFolders(){
        for (let i = 0; i < allFolders.length; i++) {
            let Link=document.createElement('div');
            Link.textContent=allFolders[i].folderName;
            Link.classList.add(`leftLink`);
            leftForm1.parentNode.insertBefore(Link,leftForm1);
        }
    }
}

function addFolder(name,color){
    allFolders.push(new Folder(name,color));
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
let allFolders=[];

addFolder(defaultFolderName);

addTask("Dünyanın Fethi");
// addTask("Dünyanın Temizlenmesi","önemli","29.11.2023");

document.body.appendChild(mainLoader());
document.getElementById(`buttonAddTask`).addEventListener("click", addNewTask);
document.getElementById(`buttonAddFolder`).addEventListener("click", addNewFolder);



