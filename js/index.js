"use strict"
import '../css/style.scss';
import langArr from './languages';
import lightModeModule from './lightMode'
//language
const allLang = ['ua','us'];
const langButton = document.querySelector('#lang');
let lang = window.location.hash.substring(1);
langButton.addEventListener('click', toggleLang);
function toggleLang(){
    if(lang=="ua"){
        lang="us";
        changeURLlang("us");
    }
    else{
        lang="ua";
        changeURLlang("ua");
    }
    changeLang()
}
function changeURLlang(langName){
    location.href = window.location.pathname + `#${langName}`;
    //location.reload();
}
function changeLang(){
    if(!allLang.includes(lang)){
        location.href = window.location.pathname + `#us`;
        location.reload();
    }
    langButton.innerHTML= lang.toUpperCase();
    document.querySelector('title').innerHTML = langArr["unit"][lang];
    for(let key in langArr){
        let element = document.querySelector('.l-'+key);
        if(element){
            element.innerHTML = langArr[key][lang];
        }

    }
}
changeLang();
//light mode
lightModeModule({
    buttonSelector: '#themeButton',
    startMode: false
});

//block click handler
const click = document.querySelectorAll('.grid-item');
const content = document.querySelector('.content');
const clone = document.querySelector('.clone');
click.forEach(element => {
    element.addEventListener('click',(e)=>{
            if(e.currentTarget .classList.contains('interactable')){
                const bounds = e.currentTarget.getBoundingClientRect();
                clone.style.setProperty('--top',bounds.top +'px');
                clone.style.setProperty('--left',bounds.left +'px');
                clone.style.setProperty('--mw',bounds.width +'px');
                clone.style.setProperty('--mh',bounds.height +'px');
                clone.classList.add('reveal');
                
                clone.addEventListener('click', (e) => {
                    e.target.classList.remove('reveal');
                    e.target.classList.add('unreveal');
                    e.target.addEventListener("animationend", (e)=>{
                        e.target.classList.remove('unreveal');
                    });
                });
            }
    });
});
//cursor
let isClicked = false;
const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');
function animateCursor(e, interacting, time , cursorElement) {
    const x = e.clientX ,
          y = e.clientY
    const keyframes = {
      top: `${y}px`,
      left: `${x}px`,
      opacity: (cursorElement == cursorCircle) ? isClicked ? 0 : interacting ? 0 : 1 : 1,
      transform: (cursorElement != cursorCircle) ? `${interacting? 'translate(220%,220%)' : 'translate(-50%,-50%)'} scale(${ isClicked ? interacting ? 5.5 : 2.5 : interacting ? 5 : 1})` : `${interacting? 'translate(0%,0%)' : 'translate(-50%,-50%)'}`
    }
    
    cursorElement.animate(keyframes, { 
      duration: time, 
      fill: "forwards" 
    });
  }
const blob = document.getElementById("blob");

window.addEventListener("mousemove", (e)=>{
    const interactable = e.target.closest(".interactable"),
        interacting = interactable !== null;
    animateCursor(e, interacting,800, cursorDot);
    animateCursor(e, interacting,1000, cursorCircle);
    const { clientX, clientY } = e;

    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
        }, { duration: 5000, fill: "forwards" });
    if(interacting){
        cursorDot.classList.add('active');
    }
    else{
        cursorDot.classList.remove('active');
    }


    click.forEach(item =>{
        const rect = item.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
        item.style.setProperty("--mouse-x", `${x}px`);
        item.style.setProperty("--mouse-y", `${y}px`);
    });
});
window.addEventListener('mousedown', (e)=>{
    isClicked = true;
    const interactable = e.target.closest(".interactable"),
        interacting = interactable !== null;
    animateCursor(e, interactable,100, cursorDot);
    animateCursor(e, interactable,200, cursorCircle);
});
window.addEventListener('mouseup', (e)=>{
    isClicked = false;
    const interactable = e.target.closest(".interactable"),
        interacting = interactable !== null;
    animateCursor(e, interactable,100, cursorDot);
    animateCursor(e, interactable,200, cursorCircle);
});
//skills icon fill
const skillsIcons = document.querySelectorAll('.skills__icon');
skillsIcons.forEach(icon =>{
    const percentage = icon.getAttribute("data-percent");
    console.log(percentage);
    icon.style.background = `linear-gradient(to top ,var(--accent-color),var(--accent-color) ${percentage},var(--sklz-bg-color)  ${percentage}, var(--sklz-bg-color))`;
});