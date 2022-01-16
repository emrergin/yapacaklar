import { intervalToDuration } from 'date-fns'

const defaultFolderName= `genel`;
export {defaultFolderName};

export class Task{
    constructor(taskName, folder, lastDate){
        this.taskName = taskName;
        this.folder = folder || defaultFolderName;
        this.lastDate = lastDate || ``;
        // this.dataRow=this.writeRow();
        // this.colour=[`this.folder`].color;

    }

    writeRow(){
        let row= document.createElement('tr');
        row.classList.add(`taskRow`);
        let name= document.createElement('td');
        let project= document.createElement('td');
        let date= document.createElement('td');
        let remaining=document.createElement(`td`);

        // name.style.cssText=`border-left: 2vw solid red;`;
        // name.textContent=this.taskName+this.colour;
        name.textContent=this.taskName;
        row.appendChild(name);

        date.textContent=this.lastDate;
        if (this.lastDate===``){date.style.cssText=`border:0px;`;}
        row.appendChild(date);

        this.lastDate===`` ? remaining.textContent=``: remaining.textContent=this.remainingTime();   
        if (this.lastDate===``){remaining.style.cssText=`border:0px;`;}
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


