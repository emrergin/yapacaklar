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
        let Link=document.createElement('div');
        Link.textContent=this.folderName;
        Link.classList.add(`leftLink`);
        if (this.color===``){
            Link.style.backgroundColor=leftButtonColor;
        }
        else{
            Link.style.cssText=`background: linear-gradient(to right,${leftButtonColor} 85%,${this.color}  80%);`;
        }       
        
        return Link;
    }
}