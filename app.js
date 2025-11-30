const toggleBtn = document.querySelector("#toggle-btn");
const cross = document.querySelector("#full i");
const fullMenu = document.querySelector("#full");
const logoImg = document.querySelector("#logo img")
const spans = document.querySelectorAll(".text-overlay span");
const mediaDivs = document.querySelectorAll("#video, #img");
const buttons = document.querySelectorAll(".grow-btn");
const rope = document.querySelector("#rope");
const curser = document.getElementById("curser");
const h1 = document.querySelector(".animated-h1");

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



const svgLines = () => {
  const svgWidth = 1200;
  const segments = 40; // More segments = smoother rope
  const baseY = 100;

  // Function to initialize a single SVG
  const initRope = (svgContainer) => {
    // Select <path> inside this container
    const rope = svgContainer.querySelector('path');

    // Initialize points
    let points = [];
    for (let i = 0; i <= segments; i++) {
      points.push({ x: i * (svgWidth / segments), y: baseY, targetY: baseY, velocity: 0 });
    }

    // Generate smooth SVG path
    function generatePath() {
      let d = `M${points[0].x},${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cx = (prev.x + curr.x) / 2;
        const cy = (prev.y + curr.y) / 2;
        d += ` Q${prev.x},${prev.y} ${cx},${cy}`;
      }
      d += ` T${points[points.length - 1].x},${points[points.length - 1].y}`;
      return d;
    }

    // Mouse ripple effect
    svgContainer.addEventListener('mousemove', (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      points.forEach(p => {
        const dx = p.x - mouseX;
        const distance = Math.abs(dx);
        const influence = Math.max(0, 350 - distance); // ripple width
        p.targetY = baseY + (mouseY - baseY) * (influence / 350) * 0.8;
      });
    });

    // Mouse leave – reset rope
    svgContainer.addEventListener('mouseleave', () => {
      points.forEach(p => p.targetY = baseY);
    });

    // GSAP ticker – elastic motion with damping
    gsap.ticker.add(() => {
      points.forEach(p => {
        const dy = p.targetY - p.y;
        p.velocity += dy * 0.18;  // acceleration
        p.velocity *= 0.9;        // damping
        p.y += p.velocity;
      });
      rope.setAttribute("d", generatePath());
    });
  };

  // Find all svg-line containers and initialize each
  document.querySelectorAll('.svg-line').forEach(svgContainer => {
    initRope(svgContainer);
  });
};

// Initialize all ropes
svgLines();


const animateBtn = ()=>{
  
 buttons.forEach(button => {
      const arrow = button.querySelector(".dot i ");
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
            if (arrowAnim) arrowAnim.kill();
            arrow.style.display = "none";
            gsap.set(arrow, { y: 0 });
        });
    });
}
 animateBtn()


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

// Select all h1 elements with .animated-h1
const allH1 = document.querySelectorAll(".animated-h1");
allH1.forEach(h1 => {
  const words = h1.textContent.trim().split(/\s+/); // clean spaces
  h1.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(" ");
  
  gsap.to(h1.querySelectorAll(".word"), {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    stagger: {
      each: 0.07,
      from: "start"
    },
    scrollTrigger: {
      trigger: h1,
      start: "top 80%",
      once: true
    }
  });
});
















const imgsAnimate = ()=>{
  mediaDivs.forEach(div => {
  const media = div.querySelector("img, video"); // select img or video inside

  div.addEventListener("mouseenter", () => {
    gsap.to(media, {
      scale: 1.05,       // slightly zoom in
      rotation: 1,       // slight tilt
      duration: 0.5,
      ease: "power2.out"
    });
  });

  div.addEventListener("mousemove", (e) => {
    const rect = div.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10; // tilt left/right
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10; // tilt up/down
    gsap.to(media, {
      rotationY: x,
      rotationX: -y,
      transformPerspective: 800,
      transformOrigin: "center",
      ease: "power2.out",
      duration: 0.3
    });
  });

  div.addEventListener("mouseleave", () => {
    gsap.to(media, {
      scale: 1,
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  });
});

}
imgsAnimate()







const cursorText = curser.querySelector(".cursor-marquee p");
const items = document.querySelectorAll(".item");
let marqueeTween;

// Cursor follow
window.addEventListener("mousemove", (e) => {
  gsap.to(curser, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.2,
    ease: "back.out(1.7)"
  });
});

// Hover per div marquee
items.forEach(item => {
  const marquee = item.querySelector(".marquee-text p");
  if (!marquee) return;

  item.addEventListener("mouseenter", () => {
    cursorText.textContent = marquee.textContent;
    gsap.to(curser, { width: 200, height: 50, duration: 0.3, ease: "power2.out" });

    marqueeTween = gsap.fromTo(cursorText,
      { x: 200 },
      { x: -200, duration: 5, repeat: -1, ease: "linear" }
    );
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(curser, { width: 20, height: 20, duration: 0.3, ease: "power2.out" });
    if (marqueeTween) gsap.killTweensOf(cursorText);
    cursorText.textContent = "";
    gsap.set(cursorText, { x: 0 });
  });
});



const boxes = document.querySelectorAll('.hover-box');


// single image element
let imgEl = document.createElement('img');
imgEl.className = 'hover-image';
imgEl.style.position = 'absolute';
imgEl.style.width = '260px';
imgEl.style.borderRadius = '22px 22px 0 0';
imgEl.style.pointerEvents = 'none';
imgEl.style.opacity = '0';
imgEl.style.zIndex = '9999';
document.body.appendChild(imgEl);


boxes.forEach(box => {
box.addEventListener('mouseenter', () => {
const rect = box.getBoundingClientRect();


imgEl.src = box.dataset.img;
imgEl.style.left = (rect.right + 25) + 'px';
imgEl.style.top = (rect.top - 20) + 'px';


gsap.to(imgEl, {
opacity: 1,
y: -10,
duration: 0.3,
ease: "power3.out"
});
});


box.addEventListener('mouseleave', () => {
gsap.to(imgEl, {
opacity: 0,
y: 0,
duration: 0.25,
ease: "power3.inOut"
});
});
});









  const hoverBoxes = document.querySelectorAll('.hover-box');
  const hoverImg = document.getElementById('hover-img');
  const imgTag = hoverImg.querySelector('img');

  hoverBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
      const imgSrc = box.getAttribute('data-img');
      imgTag.src = imgSrc;
      hoverImg.style.opacity = '1';
      hoverImg.style.transform = 'translate(-50%, -50%) scale(1)';
      box.querySelector('.line').style.width = '80%';
    });

    box.addEventListener('mousemove', (e) => {
      hoverImg.style.left = e.clientX + 'px';
      hoverImg.style.top = e.clientY + 'px';
    });

    box.addEventListener('mouseleave', () => {
      hoverImg.style.opacity = '0';
      hoverImg.style.transform = 'translate(-50%, -50%) scale(0)';
      box.querySelector('.line').style.width = '0';
    });
  });



const h1Animte=()=>{
  gsap.from("#FEATURED-h1 h1", {
  scrollTrigger: {
    trigger: "#FEATURED-h1",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  y: 120,              // zyada depth feeling
  opacity: 0,
  skewY: 8,            // smooth skew effect
  duration: 1.4,
  ease: "power4.out",  // premium easing
});

gsap.from(".wrapper-h1", {
  scrollTrigger: {
    trigger: ".wrapper-h1",
    start: "top 85%",
    toggleActions: "play none none none"
  },
  y: 120,             // Neeche se uthega
  opacity: 0,         // Fade in
  skewY: 8,           // Smooth skew
  duration: 1.4,
  ease: "power4.out"  // Premium easing
});

gsap.from(".branduim-h1", {
  scrollTrigger: {
    trigger: ".branduim-h1",
    start: "top 85%",
    toggleActions: "play none none none"
  },
  y: 120,             // Neeche se uthega
  opacity: 0,         // Fade in
  skewY: 8,           // Smooth skew
  duration: 1.4,
  ease: "power4.out"  // Premium easing
});
gsap.from(".ln-title", {
  scrollTrigger: {
    trigger: ".ln-title",
    start: "top 85%",
    toggleActions: "play none none none"
  },
  y: 120,          // Neeche se uthega
  opacity: 0,      // Fade effect
  skewY: 8,        // Premium skew entry
  duration: 1.4,
  ease: "power4.out"
});


}


h1Animte()
const marqueAnimation = ()=>{
    window.addEventListener("wheel" ,(eve)=>{
   if(eve.deltaY>0){
    gsap.to("#marque" ,{
    transform:"translateX(-200%)",
    duration:2,
    delay:2,
    repeat:-1,
    ease:"none"
})
gsap.to("#marque img",{
    rotation:180
})
    
   }else{
  gsap.to("#marque" ,{
    transform:"translateX(0%)",
    duration:2,
    delay:2,
    repeat:-1,
    ease:"none"
})
gsap.to("#marque img",{
    rotation:0
})
   }
})
}
marqueAnimation()


    document.querySelectorAll('.ln-item').forEach(item=>{
      item.addEventListener('focus', ()=> item.classList.add('focused'));
      item.addEventListener('blur',  ()=> item.classList.remove('focused'));
    });


    function duplicateContent(lineID) {
    const line = document.querySelector(lineID);
    const clone = line.cloneNode(true);
    line.parentElement.appendChild(clone);
}

duplicateContent("#line1");
duplicateContent("#line2");

function createMarquee(selector, speed, direction = 1) {
    const line = document.querySelector(selector);
    const totalWidth = line.scrollWidth / 2;

    gsap.to(selector, {
        x: direction * -totalWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
        modifiers: {
            x: (x) => {
                x = parseFloat(x);
                return ((x % -totalWidth) + "px");
            }
        }
    });
}

// line1 → left
createMarquee("#line1", 18, 1);

// line2 → right
createMarquee("#line2", 18, -1);


// scroll direction change
window.addEventListener("wheel", (e) => {
    const dir = e.deltaY > 0 ? 1 : -1;

    gsap.globalTimeline.timeScale(dir);
});




const email = document.querySelector(".email");
const sections = document.querySelectorAll("section");

// function to check if background is dark
function isDarkColor(rgb) {
  const rgbValues = rgb.match(/\d+/g);
  const r = parseInt(rgbValues[0]);
  const g = parseInt(rgbValues[1]);
  const b = parseInt(rgbValues[2]);
  const brightness = (r*299 + g*587 + b*114)/1000;
  return brightness < 128;
}

function updateEmailColor() {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const windowCenter = scrollY + viewportHeight / 2;

  let colorSet = false;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + scrollY;
    const sectionBottom = sectionTop + rect.height;

    // check if center of viewport is inside section
    if(windowCenter >= sectionTop && windowCenter < sectionBottom) {
      const bgColor = getComputedStyle(section).backgroundColor;
      email.style.color = isDarkColor(bgColor) ? "white" : "black";
      colorSet = true;
    }
  });

  // fallback: if no section matched, make email black (optional)
  if(!colorSet) {
    email.style.color = "black";
  }
}

window.addEventListener("scroll", updateEmailColor);
window.addEventListener("resize", updateEmailColor); // optional, in case viewport changes
updateEmailColor(); // initial check

