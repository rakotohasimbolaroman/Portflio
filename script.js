const menuToggle=document.getElementById("menu-toggle");
const navbar=document.getElementById("navbar");

menuToggle.addEventListener("click",()=>{
  navbar.classList.toggle("open");
  const icon=menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

document.querySelectorAll(".nav-link").forEach(link=>{
  link.addEventListener("click",()=>{
    navbar.classList.remove("open");
    const icon=menuToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  });
});

const header=document.querySelector(".header");
window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",window.scrollY>50);
});

const themeToggle=document.getElementById("theme-toggle");
const themeIcon=themeToggle.querySelector("i");

themeToggle.addEventListener("click",()=>{
  document.body.classList.toggle("light-mode");
  const light=document.body.classList.contains("light-mode");
  themeIcon.classList.toggle("fa-moon",!light);
  themeIcon.classList.toggle("fa-sun",light);
  localStorage.setItem("theme",light?"light":"dark");
});

if(localStorage.getItem("theme")==="light"){
  document.body.classList.add("light-mode");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll(".nav-link");

window.addEventListener("scroll",()=>{
  let current="";
  sections.forEach(section=>{
    if(window.scrollY>=section.offsetTop-150) current=section.id;
  });
  navLinks.forEach(link=>{
    link.classList.toggle("active",link.getAttribute("href")===`#${current}`);
  });
});

const backToTop=document.getElementById("back-to-top");
window.addEventListener("scroll",()=>{
  backToTop.classList.toggle("show",window.scrollY>500);
});
backToTop.addEventListener("click",()=>{
  window.scrollTo({top:0,behavior:"smooth"});
});

const animated=document.querySelectorAll(".skill-card,.project-card,.timeline-item,.about-grid");
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity="1";
      entry.target.style.transform="translateY(0)";
      observer.unobserve(entry.target);
    }
  });
},{threshold:.15});

animated.forEach(el=>{
  el.style.opacity="0";
  el.style.transform="translateY(30px)";
  el.style.transition="opacity .7s ease,transform .7s ease";
  observer.observe(el);
});

const footerText=document.querySelector(".footer p");
if(footerText) footerText.innerHTML=`© ${new Date().getFullYear()} Tous droits réservés.`;


const projectsTrack = document.getElementById("projects-track");
const projectsPrev = document.getElementById("projects-prev");
const projectsNext = document.getElementById("projects-next");
const projectsProgress = document.getElementById("projects-progress-bar");

if (projectsTrack) {
  let wheelLock = false;

  projectsTrack.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    const canScroll = projectsTrack.scrollWidth > projectsTrack.clientWidth;
    if (!canScroll) return;
    event.preventDefault();
    if (wheelLock) return;
    wheelLock = true;
    projectsTrack.scrollBy({left: event.deltaY * 1.15, behavior: "smooth"});
    setTimeout(() => wheelLock = false, 90);
  }, {passive:false});

  let dragging = false;
  let startX = 0;
  let startScroll = 0;

  projectsTrack.addEventListener("pointerdown", (event) => {
    dragging = true;
    startX = event.clientX;
    startScroll = projectsTrack.scrollLeft;
    projectsTrack.setPointerCapture(event.pointerId);
  });

  projectsTrack.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    projectsTrack.scrollLeft = startScroll - (event.clientX - startX);
  });

  projectsTrack.addEventListener("pointerup", () => dragging = false);
  projectsTrack.addEventListener("pointercancel", () => dragging = false);

  const scrollAmount = () => Math.min(projectsTrack.clientWidth * 0.82, 420);

  projectsPrev?.addEventListener("click", () => {
    projectsTrack.scrollBy({left:-scrollAmount(), behavior:"smooth"});
  });

  projectsNext?.addEventListener("click", () => {
    projectsTrack.scrollBy({left:scrollAmount(), behavior:"smooth"});
  });

  const updateProjectsProgress = () => {
    const max = projectsTrack.scrollWidth - projectsTrack.clientWidth;
    const percent = max > 0 ? (projectsTrack.scrollLeft / max) * 80 + 20 : 100;
    if (projectsProgress) projectsProgress.style.width = `${Math.min(100, percent)}%`;
  };

  projectsTrack.addEventListener("scroll", updateProjectsProgress, {passive:true});
  window.addEventListener("resize", updateProjectsProgress);
  updateProjectsProgress();
}
