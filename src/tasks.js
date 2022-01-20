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
        // console.log(this.folder.id);
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
        checkMark.checked=this.completed;
        nameAndCheckboks.appendChild(checkMark);

        let name=document.createElement(`div`);
        name.textContent=this.taskName;
        // 
        nameAndCheckboks.appendChild(name);
        nameAndCheckboks.classList.add(`nameandcheck`);
        nameAndCheckboksContainer.appendChild(nameAndCheckboks);
        nameAndCheckboksContainer.style.cssText=`background: linear-gradient(to right,${this.folder.color} 2vw, white 2vw);`;
        row.appendChild(nameAndCheckboksContainer);

        date.textContent=this.lastDate;
        if (this.lastDate===``){date.style.border=`0px`;}
        row.appendChild(date);

        this.lastDate===`` ? remaining.textContent=``: remaining.textContent=this.remainingTime();   
        if (this.lastDate===``){remaining.style.border=`0px`;}
        if (this.completed){
            name.style.textDecoration=`line-through`;
            name.style.border=`0px`;
        }
        row.appendChild(remaining);

        let deleteButton=document.createElement(`button`);
        deleteButton.textContent=`×`;
        deleteButton.classList.add(`leftDelete`);
        deleteButtonBox.appendChild(deleteButton);
        deleteButtonBox.style.border=`0px`;
        deleteButtonBox.style.padding=`0px`;        
        row.appendChild(deleteButtonBox);
        
        return row;
    }

    remainingTime(){
        const dateArray=this.lastDate.split(`.`);
        const endDate=new Date(dateArray[2],dateArray[1]-1,dateArray[0]);
        const now = new Date();
        const remainingTimeObject=intervalToDuration({
            start: now,
            end: endDate
        });

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


