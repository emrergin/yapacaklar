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
        let name= document.createElement('td');
        let date= document.createElement('td');
        let remaining=document.createElement(`td`);
        let checkMarkBox=document.createElement(`td`);

        let checkMark=document.createElement(`input`);
        checkMark.setAttribute(`type`,`checkbox`);
        checkMark.checked=this.completed;
        checkMarkBox.appendChild(checkMark);
        checkMarkBox.style.border=`0px`;
        checkMarkBox.style.padding=`0px`;
        row.appendChild(checkMarkBox);

        name.textContent=this.taskName;
        name.style.cssText=`border-left: 2vw solid ${this.folder.color};`;
        row.appendChild(name);

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


