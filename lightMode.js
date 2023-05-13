/*
    Усі налаштування:
    buttonSelector - селектор для кнопки зміни режиму
    light - клас світлої теми
    dark - клас темної теми
    default - тема за замовчуванням
*/


export default function lightModeModule({buttonSelector , light='light' , dark='dark' , default=true}){
    function setLightMode(mode){
        if(mode){
            document.body.classList.remove(dark);
            document.body.classList.add(light);
            window.localStorage.setItem("LightMode",true);
        }
        else{
            document.body.classList.remove(light);
            document.body.classList.add(dark);
            window.localStorage.setItem("LightMode",false);
        }
    }
    if(window.localStorage.getItem("LightMode") == null){
        setLightMode(default);
    }else
    {
        setLightMode(window.localStorage.getItem("LightMode") == "true" );
    }
    document.querySelector(buttonSelector).addEventListener('click',(e)=>{
        setLightMode(!document.body.classList.contains(light));
    });
}

