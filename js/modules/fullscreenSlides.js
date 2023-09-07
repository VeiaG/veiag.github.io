/*


*/

export default function fullscreenSlider(sliderClass){
    const mq = window.matchMedia( "(max-width: 1000px)" );
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
    slideContainer.addEventListener('scroll',(e)=>{
        if(!mq.matches){
            const rect = slides[0].getBoundingClientRect();
            curSelected = Math.round(slideContainer.scrollTop / rect.height );
            updateSelectedSlide();
        }
    })
    function scrollSlider(){
        const rect = slides[curSelected].getBoundingClientRect();
        slideContainer.scrollTop = rect.height*curSelected;
        updateSelectedSlide();
    }
    function updateSelectedSlide(){
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
        slideBtn.classList.add(`${sliderClass}__menu-item`);
        slideBtn.addEventListener("click", (e)=>{
            curSelected = index;
            scrollSlider();
        });
        menuWrapper.append(slideBtn);
        scrollSlider()
    });
}