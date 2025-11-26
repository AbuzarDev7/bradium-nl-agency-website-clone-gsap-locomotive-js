const toggleBtn = document.querySelector("#toggle-btn");
const cross = document.querySelector("#full i");
const fullMenu = document.querySelector("#full");
const logoImg = document.querySelector("#logo img")
const spans = document.querySelectorAll(".text-overlay span");


const rope = document.querySelector("#rope");

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



const svgWidth = 1200;
const segments = 40; // More segments = smoother rope
const baseY = 100;

// Initialize points
let points = [];
for(let i=0; i<=segments; i++){
    points.push({x: i*(svgWidth/segments), y: baseY, targetY: baseY, velocity: 0});
}

// Generate smooth SVG path
function generatePath(){
    let d = `M${points[0].x},${points[0].y}`;
    for(let i=1; i<points.length; i++){
        const prev = points[i-1];
        const curr = points[i];
        const cx = (prev.x + curr.x)/2;
        const cy = (prev.y + curr.y)/2;
        d += ` Q${prev.x},${prev.y} ${cx},${cy}`;
    }
    d += ` T${points[points.length-1].x},${points[points.length-1].y}`;
    return d;
}

// Mouse ripple effect (propagate from mouseX)
document.querySelector(".svg-line").addEventListener("mousemove", (e)=>{
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    points.forEach(p=>{
        const dx = p.x - mouseX;
        const distance = Math.abs(dx);
        const influence = Math.max(0, 350 - distance); // ripple width
        // Wave propagate with smooth falloff
        p.targetY = baseY + (mouseY - baseY) * (influence/350) * 0.8;
    });
});

// Mouse leave – reset rope
document.querySelector(".svg-line").addEventListener("mouseleave", ()=>{
    points.forEach(p=> p.targetY = baseY);
});

// GSAP ticker – elastic motion with damping
gsap.ticker.add(()=>{
    points.forEach(p=>{
        const dy = p.targetY - p.y;
        p.velocity += dy * 0.18;  // acceleration
        p.velocity *= 0.9;       // damping
        p.y += p.velocity;
    });
    rope.setAttribute("d", generatePath());
});


const button = document.querySelector(".grow-btn");
const arrow = button.querySelector(".dot i");
let arrowAnim;


button.addEventListener("mouseenter", () => {
    arrow.style.display = "block";

 
    arrowAnim = gsap.to(arrow, {
        y: -20,            
        repeat: -1,        
        yoyo: false,       
        duration: 0.6,
        ease: "power1.inOut"
    });
});


button.addEventListener("mouseleave", () => {
    if(arrowAnim) arrowAnim.kill(); 
    arrow.style.display = "none";    
    gsap.set(arrow, {y:0});         
});



gsap.registerPlugin(ScrollTrigger);




// SVG sirf X axis se aaye — left se right
gsap.fromTo(
  ".svg-line",
  { x: -800, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".brandium-hero",
      start: "top 90%",
      scrub: 1,
      once: true
    }
  }
);
const h1 = document.querySelector(".animated-h1");
const words = h1.textContent.split(" ");
h1.innerHTML = words.map(word => `<span>${word}&nbsp;</span>`).join("");

// Simple wave-style animation
gsap.to(".animated-h1 span", {
  y: 0,
  opacity: 1,
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.18, // ek-ek karke animate hoga (wave feel)
  scrollTrigger: {
    trigger: ".brandium-hero",
    start: "top 80%",
    once: true
  }
});