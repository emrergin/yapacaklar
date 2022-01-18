import {tableWrite} from './taskTable';
import checkImg from './ok.png';
import './style.css';
import {generateFooter}  from './requisites';
import {leftBar} from './folderTable';


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



// HERE IS THE MAIN PART==================


document.body.appendChild(mainLoader());