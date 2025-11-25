const toggleBtn = document.querySelector("#toggle-btn");
const cross = document.querySelector("#full i");
const fullMenu = document.querySelector("#full");
const logoImg = document.querySelector("#logo img")
const spans = document.querySelectorAll(".text-overlay span");
// Timeline
const sideBarAnimate = ()=>{
    let tl = gsap.timeline()
tl.to(fullMenu, { 
right: 0,
 duration: 0.7 });


tl.from(fullMenu.querySelectorAll("a"), {
x: 250,
 opacity: 0,
  duration:0.7,
  stagger:0.38 
});
tl.from(cross,{
         opacity: 0,
     duration: 0.5
     });
tl.pause()
// timeline play 
toggleBtn.addEventListener("click", ()=>{
    tl.play()
   
});


cross.addEventListener("click", () => tl.reverse());


window.addEventListener("resize", () => {
  if(window.innerWidth > 768){
    gsap.set(fullMenu, {
         right: "-100%"
         }); 
    tl.pause(0); 
  }
});
}
sideBarAnimate()




// cosmtom mouse curse 

const curseMouse =()=>{
    window.addEventListener("mousemove" ,(eve)=>{

 gsap.to(curser,{
 x : eve.x,
 y:eve.y,
 ease: "back.out(1.7)",

 })
})
}
curseMouse()


const animateText=()=>{
const links = document.querySelectorAll(".sidebar a");

// First: wrap every letter in span
links.forEach(link => {
  const text = link.textContent.trim();
  link.innerHTML = text // text split 
    .split("")
    .map(letter => `<span class="letter">${letter}</span>`)
    .join("");
});

// foreach for nodelist 
links.forEach(link => {
  link.addEventListener("mouseenter", () => {
    gsap.fromTo(
      link.querySelectorAll(".letter"),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.05
      }
    );
  });
});




}

// spans animted
gsap.fromTo(
  ".text-overlay span",
  {
    y: 110,
    opacity: 0
  },
  {
    y: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power4.out",
    stagger: 0.2   
  }
);

animateText()
