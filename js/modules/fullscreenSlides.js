/*


*/

export default function fullscreenSlider(sliderClass){

    const sliderWrapper = document.querySelector(`.${sliderClass}`);
    const slideContainer = document.querySelector(`.${sliderClass}__container`);
    const slideCarousel = document.querySelector(`.${sliderClass}__carousel`);
    const slides = document.querySelectorAll(`.${sliderClass}__slide`);
    
    const menuWrapper = document.createElement("div");
    menuWrapper.classList.add(`${sliderClass}__menu`);
    sliderWrapper.insertBefore(menuWrapper,slideContainer);

    const clone = document.querySelector(".clone");
    function closeAnim(){
        sliderWrapper.animate([{opacity:1},{opacity:0}], {duration:200}).onfinish=()=>{
            sliderWrapper.style.display="none";
            sliderWrapper.style.opacity=0;
            sliderWrapper.classList.remove('fullscreen-anim');
            clone.classList.remove('reveal');
            clone.classList.add('unreveal');
            clone.addEventListener("animationend", (e)=>{
                clone.classList.remove('unreveal');
            });
        };
    }

    let slidesCount = slides.length;
    let curSelected = 0;
    document.addEventListener("keydown",(e)=>{
        if(e.key == "Escape" && sliderWrapper.style.display =="flex"){
            closeAnim();
        }
    });
    sliderWrapper.addEventListener("click",e=>{
        if(e.target == sliderWrapper){
            closeAnim();
        }
    });
    
    function scrollSlider(){
        const slideHeight = document.querySelector(`.${sliderClass}__slide`).getBoundingClientRect().height;
        slideCarousel.style.transform = `translateY(${-curSelected*slideHeight}px)`;
        document.querySelectorAll(`.${sliderClass}__menu-item`).forEach((e, index) =>{
            if(index == curSelected){
                e.classList.add(`${sliderClass}__menu-item-active`);
            }
            else{
                e.classList.remove(`${sliderClass}__menu-item-active`);
            }
        });
    }

    slides.forEach((slide , index) => {
        // menu creating
        const slideBtn = document.createElement("div");
        slideBtn.classList.add("l-"+slide.getAttribute("data-label"));
        slideBtn.classList.add(`${sliderClass}__menu-item`);
        slideBtn.addEventListener("click", (e)=>{
            curSelected = index;
            scrollSlider();
        });
        menuWrapper.append(slideBtn);
        scrollSlider()
    });

    window.addEventListener("resize",scrollSlider);

    //scroll
    let scrolledMinus=0;
    let scrolledPlus=0;
    sliderWrapper.addEventListener("wheel", (e)=>{
        console.log(e.deltaY);
        if(e.deltaY<0){
            scrolledMinus+=e.deltaY;
            scrolledPlus=0;
        }
        else{
            scrolledPlus+=e.deltaY;
            scrolledMinus=0;
        }
        if(scrolledPlus>500){
            scrolledPlus=0;
            if(curSelected == slidesCount-1){
                curSelected=0;
                scrollSlider();
            }
            else{
                curSelected++;
                scrollSlider();
            }
        }
        if(scrolledMinus<-500){
            scrolledMinus=0;
            if(curSelected == 0){
                curSelected=slidesCount-1;
                scrollSlider();
            }
            else{
                curSelected--;
                scrollSlider();
            }
        }
    });


}