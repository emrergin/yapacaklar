const leftButtonColor= `#898396`;

const defaultFolderName= `genel`;
export {defaultFolderName};


export class Folder{
    constructor(folderName, color,id){
        this.folderName = folderName;
        this.color = color || ``;
        this.id = id;
    }


    writeRow(){
        let Link= document.createElement(`div`);
        Link.classList.add(`leftLink`);

        if (this.id!==0)
        {
            let deleteButton=document.createElement(`button`);

            deleteButton.textContent=`×`;
            deleteButton.classList.add(`leftDelete`);
            // deleteButton.classList.add(`leftDeleteAcik`);
            
            Link.appendChild(deleteButton);
        }

        let buttonText=document.createElement('div');
        buttonText.textContent=this.folderName;
        buttonText.classList.add(`leftFolder`);
        Link.appendChild(buttonText);

        if (this.color===``){
            Link.style.backgroundColor=leftButtonColor;
        }
        else{
            Link.style.cssText=`background: linear-gradient(to right,${leftButtonColor} 85%,${this.color}  80%);`;
        }       
        
        return Link;
    }
}