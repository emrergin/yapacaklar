import {defaultFolderName} from './folder';
import { intervalToDuration } from 'date-fns'

const tableBackgroundColor=`#FFFFFF`;


export class Task{
    constructor(taskName, folder, lastDate,id){
        this.taskName = taskName;
        this.folder = folder || defaultFolderName;
        this.lastDate = lastDate || ``;
        this.id=id;
        this.completed=false;
    }

    writeRow(){
        let row= document.createElement('tr');
        row.classList.add(`taskRow`);
        let nameAndCheckboksContainer= document.createElement('td');
        let nameAndCheckboks=document.createElement(`div`);
        let date= document.createElement('td');
        let remaining=document.createElement(`td`);
        let deleteButtonBox=document.createElement(`td`);

        let checkMark=document.createElement(`input`);
        checkMark.setAttribute(`type`,`checkbox`);
        console.log(this.completed);
        checkMark.checked=this.completed;           
        
        if (this.folder.color){
            nameAndCheckboksContainer.style.cssText=`background: linear-gradient(to right,${this.folder.color} 35px, white 36px);`;
            nameAndCheckboksContainer.style.backgroundRepeat = "no-repeat";
        }        

        nameAndCheckboks.appendChild(checkMark);

        let name=document.createElement(`div`);
        name.textContent=this.taskName;
        name.style.width="80%";
        // 
        nameAndCheckboks.appendChild(name);
        nameAndCheckboks.classList.add(`nameandcheck`);
        nameAndCheckboksContainer.appendChild(nameAndCheckboks); 

        if (this.lastDate===``){
            date.style.display=`none`;
            date.textContent=``;
        }
        else{
            date.textContent=new Date(this.lastDate).toLocaleString("tr-TR");
        }       

        this.lastDate===`` ? remaining.textContent=``: remaining.textContent=this.remainingTime();   
        if (this.lastDate===``){remaining.style.display=`none`;}

        let deleteButton=document.createElement(`button`);
        deleteButton.textContent=`×`;
        deleteButton.classList.add(`rightDelete`);
        deleteButtonBox.appendChild(deleteButton);
        deleteButtonBox.style.border=`0px`;
        deleteButtonBox.style.padding=`0px`;  
        
        if (this.completed===true){
            nameAndCheckboksContainer.style.borderStyle =`dashed`;
            nameAndCheckboksContainer.style.color=`#b5b4b8`;
            name.style.textDecoration=`line-through`;
            date.style.borderStyle =`dashed`;
            remaining.style.borderStyle =`dashed`;
            date.style.color=`#b5b4b8`;
            remaining.style.color=`#b5b4b8`;
            date.style.textDecoration=`line-through`;
            remaining.style.textDecoration=`line-through`;
            nameAndCheckboksContainer.style.filter = "grayscale(80%)";
        }
        
        if (this.lastDate===``){
            nameAndCheckboksContainer.setAttribute(`colspan`,`3`);
        }

        row.appendChild(nameAndCheckboksContainer);
        row.appendChild(date);
        row.appendChild(remaining);
        row.appendChild(deleteButtonBox);

        return row;
    }

    remainingTime(){
        // const dateArray=this.lastDate.split(`.`);
        const endDate=new Date(this.lastDate);
        const now = new Date();
        const remainingTimeObject=intervalToDuration({
            start: now,
            end: endDate
        });

        if (endDate<now){return `Zamanı geçti!`;}
        const result = [];
        const trTimeWords=["Yıl","Ay","Gün","Saat","Dakika","Saniye","Milisaniye"];
        let counter=0;
        let firstNonZero=undefined;

        for (const property in remainingTimeObject)
        {
            if (remainingTimeObject[property]>0){
                result.push(remainingTimeObject[property]+` `+trTimeWords[counter]);
                if (firstNonZero===undefined){
                    firstNonZero=counter+1;
                }
            }
            counter++;
            // This ensures seconds will not be shown for tasks with end dates years later.
            if (firstNonZero!==undefined){
                if (counter-firstNonZero>1)
                {
                    break;
                }
            }
        }

        return result.join(' ');
    }
}


