import '../css/src/index.scss';

import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger) ;

document.querySelectorAll('.work__slide').forEach((slide) => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: slide,
      start: "-25% 50%", 
      end: "center 50%", 
      scrub: 1,
      // markers: true,
    },
  });
  
  const isRight = slide.classList.contains('work__slide--right');

  const anim = {
    img: {
      left: { xPercent: 200, rotate: 120 },
      right: { xPercent: -200, rotate: 120 }
    },
    h1: {
      left: { xPercent: -50, opacity: 0 },
      right: { xPercent: 50, opacity: 0 }
    }
  };
  
  const animProperties = anim.img[isRight ? "right" : "left"];
  tl.from(slide.querySelector('img'), animProperties);

  const animPropertiesH1 = anim.h1[isRight ? "right" : "left"];
  tl.from(slide.querySelector('.work__text'), animPropertiesH1, "<");
});
//fade in
document.querySelectorAll('[data-fade]').forEach((el) => {
  gsap.fromTo(el, 
    { opacity: 0, y: 50 }, 
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "center 80%",
        scrub: 1,
        // markers: true,
      },
    }
  );
});






const rnd = document.querySelector(".rnd");
const {width, height} = rnd.getBoundingClientRect();
const rndCircle = document.querySelectorAll(".rnd-blob");
let mq = window.matchMedia("(max-width: 1024px)");
window.addEventListener("resize",()=>{
  mq = window.matchMedia("(max-width: 1024px)");
})
const radius = 520;
//get random color should return most bright colors
const getRandomColor = ()=>{
  return `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
}
const setRandomPosition = (circle)=>{
  circle.style.transform = `translate(${Math.random()*(width)}px,${Math.random()*(height-radius)}px) scale(${Math.random()*0.5+1}) `;
  circle.style.background = getRandomColor();
}
const moveRandomCircle = (circle)=>{
  
  const keyframes = [
    {transform: `translate(${Math.random()*(width)}px,${Math.random()*(height-radius)}px) scale(${Math.random()*0.5+1}) `},
  ]
  circle.animate(keyframes,{
    duration: Math.random()*5000+3000,
    iterations: Infinity,
    direction: "alternate",
    easing: "ease-in-out",
    fill: "both"
  });
  if(!mq.matches){
    setTimeout(moveRandomCircle,Math.random()*4000+2000,circle)
  }
  

}
if(!mq.matches){
  rndCircle.forEach((circle)=>{
    setRandomPosition(circle);
    moveRandomCircle(circle);
  })
}



