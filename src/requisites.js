const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

function ColorToHex(color) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}

function ConvertRGBtoHex(red, green, blue) {
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
}

function generateFooter() {
    const bottomBar=document.createElement(`div`);
    bottomBar.setAttribute(`id`,`footer`);
    const footnote=document.createElement(`p`);
    footnote.innerHTML=`<a href=https://github.com/emrergin> Emre Ergin</a> tarafından tasarlanmıştır.`;
    bottomBar.appendChild(footnote);
  
    return bottomBar;
}

export{randomBetween,ConvertRGBtoHex,generateFooter};