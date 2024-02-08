import '../css/src/index.scss';

// WIP Logic
const wipButton = document.querySelector("#skipwip");
const wipContainer = document.querySelector(".wip");
wipButton.addEventListener("click",()=>{
  wipContainer.style.display ="none";
})

// import { gsap } from "gsap";
    
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger) ;

// let tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".work__slide",
//       start: "-25% 50%", 
//       end: "center 50%", 
//       scrub: 1,
//       markers: true,
//     },
//   });

//   tl.from(".work__slide img", {xPercent:100,rotate:120})
//   .from(".work__slide h1", {xPercent:-50 , opacity:0},"<")