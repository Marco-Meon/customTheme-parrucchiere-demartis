/*  -----------------------------------------------------------------------------------------------
  ! menu toggle
--------------------------------------------------------------------------------------------------- */
let hamburger = document.querySelector('.header__hamburger');
hamburger.addEventListener("click", function() {
  document.body.classList.toggle('menu-open');
});


/*  -----------------------------------------------------------------------------------------------
  ! cover animation
--------------------------------------------------------------------------------------------------- */
gsap.to(".text-reveal", { clipPath: "polygon(0 0, 100% 0, 98% 100%, 0 100%)", y:0, duration: 1, stagger: 0.7, ease: Power2.easeOut });


/*  -----------------------------------------------------------------------------------------------
  ! fade up
--------------------------------------------------------------------------------------------------- */
ScrollTrigger.batch(".fade-up", {
  start: "top 80%",
  onEnter: (elements, triggers) => {
      gsap.to(elements, { opacity: 1, stagger: 0.3,y:0,duration: 1.5,  ease: Power2.easeOut});
  }
});


/*  -----------------------------------------------------------------------------------------------
  ! gallery
--------------------------------------------------------------------------------------------------- */
let progress = 50
let startX = 0
let active = 0
let isDown = false
const speedWheel = 0.02
const speedDrag = -0.1

const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animate()
  })
})

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)





/*  -----------------------------------------------------------------------------------------------
  ! Cursore
--------------------------------------------------------------------------------------------------- */
if (document.body.classList.contains('home')) {

var gallerySection = document.querySelector('.gallery');
var cursorElement = document.querySelector('.cursor-outline');
var outlineElement = document.querySelector('.outline-cursor');

gallerySection.addEventListener('mouseenter', function() {
  cursorElement.classList.add('cursor');
  outlineElement.classList.add('outline');
});

gallerySection.addEventListener('mouseleave', function() {
  cursorElement.classList.remove('cursor');
  outlineElement.classList.remove('outline');
});

let cursor = document.querySelector('.cursor-outline');
let outline = document.querySelector('.outline-cursor');
let a = document.querySelectorAll('a');

document.addEventListener('mousemove', function(e){
  let x = e.clientX;
  let y = e.clientY;

  outline.style.transform = `translate( calc(${x}px - 25%), calc(${y}px - 50%) )` ;
  cursor.style.transform = `translate( calc(${x}px - 25%), calc(${y}px - 50%) )` ;
});

a.forEach((link) => {
  link.addEventListener("mouseover", function() {
    outline.classList.add('hover');
    cursor.classList.add('hover');
  });

  link.addEventListener("mouseleave", function() {
    outline.classList.remove('hover');
    cursor.classList.remove('hover');
  });
});
};


/* -----------------------------------------------------------------------------------------------
 ! Timeline
--------------------------------------------------------------------------------------------------- */
const DOM = {
  timeline: "timeline",
  timelineStepper: "timeline__stepper",
  timelineStep: "timeline__step",
  timelineStepTitle: "timeline__step-title",
  timelineStepActive: "is-active",
  timelineStepActiveMarker: "timeline__step-active-marker",
  timelineSlidesContainer: "timeline__slides",
  timelineSlide: "timeline__slide",
  timelineSlideActive: "is-active",
 };
 
 const STEP_ACTIVE_MARKEP_CUSTOM_PROPS = {
  width: "--slide-width",
  posX: "--slide-pos-x",
  posY: "--slide-pos-y",
 };
 
 const SLIDES_CONTAINER_CUSTOM_PROPS = {
  height: "--slides-container-height",
 };
 
 const timeline = document.querySelector(`.${DOM.timeline}`);
 const timelineStepper = timeline?.querySelector(`.${DOM.timelineStepper}`);
 const timelineStepTitle = timeline?.querySelector(`.${DOM.timelineStepTitle}`);
 const timelineSlidesContainer = timeline?.querySelector(`.${DOM.timelineSlidesContainer}`);
 const timelineSlides = timeline && Array.from(timeline.querySelectorAll(`.${DOM.timelineSlide}`));
 
 function deactivateSteps() {
  const steps = document.querySelectorAll(`.${DOM.timelineStep}`);
  steps?.forEach(elem => elem.classList.remove(DOM.timelineStepActive));
 }
 
 function activateCurrentStep(currentStep) {
  currentStep?.classList.add(DOM.timelineStepActive);
 }
 
 function deactivateSlides() {
  timelineSlides?.forEach(elem => elem.classList.remove(DOM.timelineSlideActive));
 }
 
 function activateCurrentSlide() {
  const currentSlide = getCurrentSlide();
 
  if (!currentSlide) {
  return;
  }
 
  const currentSlideHeight = getCurrentSlideHeight(currentSlide);
  setSlideContainerHeight(currentSlideHeight);
  currentSlide.classList.add(DOM.timelineSlideActive);
 }
 
 function createStepActiveMarker() {
  const stepActiveMarker = document.createElement("div");
  stepActiveMarker.classList.add(DOM.timelineStepActiveMarker);
  timelineStepper?.appendChild(stepActiveMarker);
 
  const positionProps = getStepActiveMarkerProps();
 
  if (!positionProps) {
  return;
  }
 
  setStepActiveMarkerProps({
  stepActiveMarker,
  ...positionProps,
  });
 }
 
 function recalcStepActiveMarkerProps() {
  const stepActiveMarker = timeline?.querySelector(`.${DOM.timelineStepActiveMarker}`);
 
  const stepActiveMarkerProps = getStepActiveMarkerProps();
  if (!stepActiveMarkerProps) {
  return;
  }
 
  setStepActiveMarkerProps({ stepActiveMarker, ...stepActiveMarkerProps });
 }
 
 function setStepActiveMarkerProps({ stepActiveMarker, posX, posY, width }) {
  stepActiveMarker.style.setProperty(`${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.width}`, `${width}px`);
 
  stepActiveMarker.style.setProperty(`${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.posX}`, `${posX}px`);
 
  if (typeof posY === "number") {
  stepActiveMarker.style.setProperty(`${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.posY}`, `${posY}px`);
  }
 }
 
 function getStepActiveMarkerProps() {
  const { currentStep } = getCurrentStep();
 
  if (!currentStep) {
  return null;
  }
 
  const width = getElementWidth(currentStep);
  const posX = getStepActiveMarkerPosX(currentStep);
  const posY = getStepActiveMarkerPosY();
 
  if (typeof posX !== "number" || typeof posY !== "number") {
  return null;
  }
 
  return { posX, posY, width };
 }
 
 function getCurrentStep() {
  const timelineSteps = Array.from(document.querySelectorAll(`.${DOM.timelineStep}`));
 
  const currentStep = timelineSteps.find(element =>
  element.classList.contains(DOM.timelineStepActive)
  );
 
  const currentStepIndex =
  currentStep &&
  timelineSteps.findIndex(element =>
  element.classList.contains(DOM.timelineStepActive)
  );
 
  return { currentStep, currentStepIndex };
 }
 
 function getCurrentSlide() {
  const { currentStepIndex } = getCurrentStep();
 
  if (typeof currentStepIndex !== "number" || !timelineSlides) {
  return null;
  }
 
  return timelineSlides[currentStepIndex];
 }
 
 function setSlideContainerHeight(height) {
  timelineSlidesContainer?.style.setProperty(`${SLIDES_CONTAINER_CUSTOM_PROPS.height}`, `${height}px`);
 }
 
 function getCurrentSlideHeight(currentSlide) {
  return currentSlide.clientHeight;
 }
 
 function getStepActiveMarkerPosY() {
  const timelineTitlePosY = timelineStepTitle?.getBoundingClientRect().top;
  const timelineStepperPosY = timelineStepper?.getBoundingClientRect().top;
 
  if (!timelineTitlePosY || !timelineStepperPosY) {
  return null;
  }
 
  return timelineTitlePosY - timelineStepperPosY;
 }
 
 function getStepActiveMarkerPosX(currentStep) {
  const timelineStepperPosX = timelineStepper?.getBoundingClientRect().left;
  const currentStepPosX = currentStep.getBoundingClientRect().left;
 
  if (!timelineStepperPosX) {
  return null;
  }
 
  return currentStepPosX - timelineStepperPosX;
 }
 
 function getElementWidth(elem) {
  return elem.clientWidth;
 }
 
 window.addEventListener("load", () => {
  createStepActiveMarker();
  activateCurrentSlide();
 });
 
 window.addEventListener("resize", () => {
  recalcStepActiveMarkerProps();
 });
 
 timeline?.addEventListener("click", event => {
  const { target } = event;
 
  if (!target || !(target instanceof Element) || !target.closest(`.${DOM.timelineStep}`)) {
  return;
  }
 
  const currentStep = target.closest(`.${DOM.timelineStep}`);
 
  if (!currentStep) {
  return;
  }
 
  deactivateSteps();
  activateCurrentStep(currentStep);
 
  recalcStepActiveMarkerProps();
 
  deactivateSlides();
  activateCurrentSlide();
 });

 


/*  -----------------------------------------------------------------------------------------------
  ! Process
--------------------------------------------------------------------------------------------------- */
window.addEventListener('scroll', function() {
  var sections = document.querySelectorAll('.process__section');
  var sectionsImg = document.querySelectorAll('.process__section-img');

  var viewportHeight = window.innerHeight;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  sections.forEach(function(section, index) {
    var rect = section.getBoundingClientRect();
    var sectionTop = rect.top + scrollTop;

    if (sectionTop < (scrollTop + viewportHeight / 2) && sectionTop + rect.height > (scrollTop + viewportHeight / 2)) {
      section.classList.add('bright');
    } else {
      section.classList.remove('bright');
    }
  });

  sectionsImg.forEach(function(sectionImg, index) {
    var rect = sectionImg.getBoundingClientRect();
    var sectionTop = rect.top + scrollTop;

    if (sectionTop < (scrollTop + viewportHeight / 2) && sectionTop + rect.height > (scrollTop + viewportHeight / 2)) {
      sectionImg.classList.add('reveal');
    } else {
      sectionImg.classList.remove('reveal');
    }
  });
});




/*  -----------------------------------------------------------------------------------------------
  instruments in viewport
--------------------------------------------------------------------------------------------------- */
// Funzione per controllare se un elemento è visibile nel viewport
if (document.body.classList.contains('page-id-79')) {
  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function isViewportWideEnough() {
    return window.innerWidth > 768;
  }

  // Funzione per gestire l'evento di scroll
  function handleScroll() {
    if (!isViewportWideEnough()) {
      return; // Esci dalla funzione se la viewport non è abbastanza larga
    }

    var instrument__section1 = document.querySelector('.instrument__section1');
    var instrument__section2 = document.querySelector('.instrument__section2');
    var instrument__page = document.querySelector('.page-id-79');
    var instrument__section3 = document.querySelector('.instrument__section3');
    var instrument__section4 = document.querySelector('.instrument__section4');
    var instrument__section5 = document.querySelector('.instrument__section5');


    if (isInViewport(instrument__section1)) {
      instrument__page.style.backgroundImage = 'url(http://demartis-srl-v2.local/wp-content/uploads/2023/06/parrucchiere-demartis-castiglione-olona-phon-per-capelli.png)';
    } 

    if (isInViewport(instrument__section2)) {
      instrument__page.style.backgroundImage = 'url(http://demartis-srl-v2.local/wp-content/uploads/2023/06/parrucchiere-demartis-castiglione-olona-piastra-per-capelli.png)';
    } 

    if (isInViewport(instrument__section3)) {
      instrument__page.style.backgroundImage = 'url(http://demartis-srl-v2.local/wp-content/uploads/2023/06/parrucchiere-demartis-castiglione-olona-spazzola-per-capelli.png)';
    } 

    if (isInViewport(instrument__section4)) {
      instrument__page.style.backgroundImage = 'url(http://demartis-srl-v2.local/wp-content/uploads/2023/06/parrucchiere-Demartis-Castiglione-Olona-sterilizzatore-strumenti-per-capelli.png)';
    } 
    if (isInViewport(instrument__section5)) {
      instrument__page.style.backgroundImage = 'url(http://demartis-srl-v2.local/wp-content/uploads/2023/06/parrucchiere-Demartis-Castiglione-Olona-microcamera-per-capelli.png)';
    }
  }

  // Aggiungi un event listener per l'evento di scroll
  window.addEventListener('scroll', handleScroll);
};




// Funzione per controllare se un elemento è visibile nel viewport
if (document.body.classList.contains('page-id-267')) {
  function isInViewport_2(element) {
    var rect_2 = element.getBoundingClientRect();
    return (
      rect_2.top >= 0 &&
      rect_2.left >= 0 &&
      rect_2.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect_2.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function isViewportWideEnough() {
    return window.innerWidth > 768;
  }

  // Funzione per gestire l'evento di scroll
  function handleScroll_2() {

    if (!isViewportWideEnough()) {
      return; // Esci dalla funzione se la viewport non è abbastanza larga
    }
    var service__section1 = document.querySelector('.service__section1');
    var service__section2 = document.querySelector('.service__section2');
    var service__section3 = document.querySelector('.service__section3');
    var service__section4 = document.querySelector('.service__section4');
    var service__section5 = document.querySelector('.service__section5');
    var service__section6 = document.querySelector('.service__section6');
    var service__page = document.querySelector('.page-id-267');

    if (isInViewport_2(service__section1)) {
      service__page.style.backgroundImage = 'url(http://demartis-srl-v2.local/wp-content/uploads/2023/06/parrucchiere-demartis-castiglione-olona-pennello-per-capelli.png)';
    } 

    if (isInViewport_2(service__section2)) {
      service__page.style.backgroundImage = 'url(http://demartis-srl-v2.local/wp-content/uploads/2023/06/parrucchiere-demartis-castiglione-olona-forbici-per-capelli.png)';
    } 

    if (isInViewport_2(service__section3)) {
      service__page.style.backgroundImage = 'url(http://demartis-srl-v2.local/wp-content/uploads/2023/06/parrucchiere-demartis-castiglione-olona-piega-per-capelli.png)';
    } 
    if (isInViewport_2(service__section4)) {
      service__page.style.backgroundImage = 'url(http://demartis-srl-v2.local/wp-content/uploads/2023/07/parrucchiere-Demartis-Castiglione-Olona-trattamento-tricologico-per-capelli.png)';
    } 

    if (isInViewport_2(service__section5)) {
      service__page.style.backgroundImage = 'url(http://demartis-srl-v2.local/wp-content/uploads/2023/07/parrucchiere-Demartis-Castiglione-Olona-trattamento-cheratina-per-capelli.png)';
    } 

    if (isInViewport_2(service__section6)) {
      service__page.style.backgroundImage = 'url(http://demartis-srl-v2.local/wp-content/uploads/2023/07/parrucchiere-Demartis-Castiglione-Olona-extension-per-capelli.png)';
    } 
  }

  // Aggiungi un event listener per l'evento di scroll
  window.addEventListener('scroll', handleScroll_2);
};



/*  -----------------------------------------------------------------------------------------------
  ! Iubenda
--------------------------------------------------------------------------------------------------- */
(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);


