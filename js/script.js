"use strict";
const range = document.querySelector(".slide");
const carrousalCont = document.querySelector("#carouselContainer");
const toggleAnimationBtn = document.querySelector(".toggle-animation");
const carouselContainer = document.getElementById("carouselContainer");
const carouselItem = document.querySelector(".carouselItem");
const carouselItems = document.querySelectorAll(".carouselItem");
const modal = document.querySelectorAll(".modal");
const closeBtn = document.querySelectorAll(".btn-close");
const arrows = document.querySelector(".slider-btn");
const btnText = document.querySelector(".btn-text");
const playIcon = document.querySelector(".icon-play");
const pauseIcon = document.querySelector(".icon-pause");

const mediaLg = window.matchMedia("(min-width: 1025px)").matches;
const mediaSm = window.matchMedia("(min-width: 481px)").matches;

// carrousalCont.addEventListener("mouseover", function (e) {
//   const hovered = e.target.closest(".carouselItem").dataset.id;
//   range.value = hovered;
// });

// data source

const cards = [
  {
    id: 1,
    img: "./images/card-images/gray/card-1.png",
    cimg: "./images/card-images/modal-1.png",
    heading: "Change Agent",
    // text: "<sup>“</sup>I believe there is no health quality without access to healthcare <sub>”</sub>",
    text: "“I believe there is no health quality without access to healthcare.”",
    cap: "- L.D. Britt, MD, MPH",
  },

  {
    id: 2,
    img: "./images/card-images/gray/card-2.png",
    cimg: "./images/card-images/modal-2.png",
    heading: "Trailblazer",
    text: "“Use any perceived weaknesses to your advantage.”",
    cap: "- L.D. Britt, MD, MPH",
  },

  {
    id: 3,
    img: "./images/card-images/gray/card-3.png",
    cimg: "./images/card-images/modal-3.png",
    heading: "Surgeon. Educator.",
    text: "“My greatest honor is taking care of patients. A close second to that, for me, is teaching.”",
    cap: "- L.D. Britt, MD, MPH",
  },

  {
    id: 4,
    img: "./images/card-images/gray/card-4.png",
    cimg: "./images/card-images/modal-12.png",
    heading: "Thought leader",
    text: "“The truth is that the entire landscape of surgery and surgical education looks different today — better — because of L.D.”",
    cap: "-K. Craig Kent, MD, CEO, UVA Health",
  },
  {
    id: 5,
    img: "./images/card-images/gray/card-5.png",
    cimg: "./images/card-images/modal-5.png",
    heading: "Advocate and Ally",
    text: "“Legislatively, I can’t think of a more significant person in Virginia than Dr. Britt when it comes to surgical assistant licensure.” ",
    cap: "-David Jennette, CSA",
  },
  {
    id: 6,
    img: "./images/card-images/gray/card-6.png",
    cimg: "./images/card-images/modal-9.png",
    heading: "Celebrated professional",
    text: "“Dr. Britt has devoted his entire professional life to addressing healthcare disparities”",
    cap: "-Alfred Abuhamad, MD, EVMS’ Interim President, Provost and Dean of the School of Medicine",
  },
  {
    id: 7,
    img: "./images/card-images/gray/card-7.png",
    cimg: "./images/card-images/modal-7.png",
    heading: "Visionary",
    text: "“His major contribution, beyond even patient care, is that Dr. Britt changes people.”",
    cap: "- Keith Newby, MD (MD ’90), EVMS Board of Visitors, Sentara Healthcare’s Medical Director of Health Equity",
  },
  {
    id: 8,
    img: "./images/card-images/gray/card-8.png",
    cimg: "./images/card-images/modal-10-2.png",
    heading: "Icon",
    text: "“Each person who passes Dr. Britt’s statue will understand the magnitude of his lifelong dedication to healthcare, research and education.”",
    cap: "-Alfred Abuhamad, MD, EVMS’ Interim President, Provost and Dean of the School of Medicine.  ",
  },
  // {
  //   id: 9,
  //   img: "./images/card-images/gray/card-9.png",
  //   cimg: "./images/card-images/modal-9.png",
  //   text: " Enduring Legacy ",
  //   cap: "- L.D. Britt, MD, MPH",
  // },
  // {
  //   id: 10,
  //   img: "./images/card-images/gray/card-10.png",
  //   cimg: "./images/card-images/modal-10.png",
  //   text: "Caring For His Community",
  //   cap: "- L.D. Britt, MD, MPH",
  // },
  // {
  //   id: 11,
  //   img: "./images/card-images/gray/card-11.png",
  //   cimg: "./images/card-images/modal-11.png",
  //   text: "L.D. Britt's Best Advice",
  //   cap: "- L.D. Britt, MD, MPH",
  // },
  // {
  //   id: 12,
  //   img: "./images/card-images/gray/card-12.png",
  //   cimg: "./images/card-images/modal-12.png",
  //   text: "Dr. Britt's Accomplishments",
  //   cap: "- L.D. Britt, MD, MPH",
  // },
];
let modalId = 1;

cards.forEach((card) => {
  const html = `
          <figure id="item1" class="carouselItem trans3d " data-id="${card.id}" aria-label="slider item ${card.id}" tabIndex="-1" aria-expanded ="false"  aria-description="you have selected a carousal" >
            <div class="carouselItemInner trans3d">
              <div class="card-image-wrapper">
              <img src="${card.cimg}" alt="" />
              <div class="img-overlay"></div>
              
               </div>
              <div class="overlay">
              <div class="overlay-inner" >
                <h3>
                 ${card.heading}
                </h3>
                <p>${card.text}</p>

                <span>${card.cap}</span>
                
                </div>
              </div>
            </div>
          </figure>
  `;
  carrousalCont.insertAdjacentHTML("beforeend", html);
});

// set and cache variables
var w, container, carousel, item, radius, itemLength, rY, ticker, fps;
var mouseX = 0;
var mouseY = 0;
var mouseZ = -862;
var addX = 0;

let animationState = true;

toggleAnimationBtn.addEventListener("click", function () {
  animationState = !animationState;
  addX = 0;

  if (animationState == false) {
    arrows.style.display = "block";
    btnText.textContent = "Start Animation";
    playIcon.style.opacity = 1;
    pauseIcon.style.opacity = 0;
  } else {
    arrows.style.display = "none";
    btnText.textContent = "Stop Animation";
    playIcon.style.opacity = 0;
    pauseIcon.style.opacity = 1;
  }
});
$(document).ready(init);

// mediaLg && animationState;
// carrousalCont.addEventListener("mouseover", function (e) {
//   const hovered = e.target.closest(".carouselItem").dataset?.id;
//   // range.value = hovered;
// });

const rad = mediaSm ? 280 /*250*/ /*385*/ : 130; /*110*/

function init() {
  w = $(window);
  container = $("#contentContainer");
  carousel = $("#carouselContainer");
  item = $(".carouselItem");
  itemLength = $(".carouselItem").length;
  fps = $("#fps");
  rY = 360 / itemLength;
  radius = Math.round(rad / Math.tan(Math.PI / itemLength));

  // set container 3d props
  TweenMax.set(container, { perspective: 600 });
  TweenMax.set(carousel, { z: -radius });

  // create carousel item props

  for (var i = 0; i < itemLength; i++) {
    var $item = item.eq(i);
    var $block = $item.find(".carouselItemInner");

    TweenMax.set($item, {
      rotationY: rY * i,
      z: radius,
      transformOrigin: "50% 50% " + -radius + "px",
    });

    animateIn($item, $block);
  }

  // set mouse x and y props and looper ticker

  mediaLg && window.addEventListener("mousemove", onMouseMove, false);
  ticker = setInterval(looper, 1000 / 100 /*60*/);
}

function animateIn($item, $block) {
  var $nrX = 0; //360 * getRandomInt(2);
  var $nrY = 0; // 360 * getRandomInt(2);

  var $nx = 0; // -2000 + getRandomInt(4000);
  var $ny = 0; // -2000 + getRandomInt(4000);
  var $nz = 0; // -4000 + getRandomInt(4000);

  var $s = 0; // 1.5 + getRandomInt(10) * 0.1;
  var $d = 0; // 1 - getRandomInt(8) * 0.1;

  TweenMax.set($item, { autoAlpha: 1, delay: $d });
  TweenMax.set($block, {
    z: $nz,
    rotationY: $nrY,
    rotationX: $nrX,
    x: $nx,
    y: $ny,
    autoAlpha: 0,
  });
  TweenMax.to($block, $s, {
    delay: $d,
    rotationY: 0,
    rotationX: 0,
    z: 0,
    ease: Expo.easeInOut,
  });
  TweenMax.to($block, $s - 0.5, {
    delay: $d,
    x: 0,
    y: 0,
    autoAlpha: 1,
    ease: Expo.easeInOut,
  });
}

function onMouseMove(event) {
  // console.log(event.pageX);
  if (animationState) {
    mouseX =
      -(-((window.innerWidth * 0.5) /*0.4 ,0.5*? */) + event.pageX) *
      0.0009; /* 0.002, 0.0025*/
    mouseY = -(-(window.innerHeight * 0.5) + event.pageY) * 0.01;
    mouseZ =
      -radius - (Math.abs(-(window.innerHeight * 0.5) + event.pageY) - 200);
  } else {
    TweenMax.set(carousel, { z: mediaLg && animationState ? mouseZ : zIndex });
  }
}

// loops and sets the carousel 3d properties

let rotate = 0;

const zIndex = mediaSm ? -550 /*-550*/ /*-890 */ : -300;

function looper() {
  addX += mouseX;
  TweenMax.to(carousel, 1, {
    rotationY: mediaLg && animationState ? addX : rotate,
    rotationX: animationState ? mouseY : 0,
    ease: Quint.easeOut,
  });
  TweenMax.set(carousel, { z: mediaLg && animationState ? mouseZ : zIndex });
  // fps.text("Framerate: " + counter.tick() + "/60 FPS");
  // console.log(addX);
}

// slider arrow click rotation functionality
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
let rangeThumb = 1;

function moveRangeThumb() {
  if (rangeThumb >= 12) {
    rangeThumb = 1;
  } else rangeThumb++;
  console.log(rangeThumb);
  range.value = rangeThumb;
}

function decValue() {
  modalId--;
  if (modalId < 1) {
    modalId = 8;
  }
}
function incValue() {
  modalId++;
  if (modalId > 8) {
    modalId = 1;
  }
}
document.querySelectorAll(".carouselItem")[0].setAttribute("tabIndex", "3");

btnLeft.addEventListener("click", function () {
  rotate += rY;
  decValue();
  document
    .querySelectorAll(".carouselItem")
    .forEach((el) => el.setAttribute("tabIndex", "-1"));
  document
    .querySelectorAll(".carouselItem")
    [modalId - 1].setAttribute("tabIndex", "3");
});

btnRight.addEventListener("click", function () {
  rotate -= rY;
  incValue();
  document
    .querySelectorAll(".carouselItem")
    .forEach((el) => el.setAttribute("tabIndex", "-1"));
  document
    .querySelectorAll(".carouselItem")
    [modalId - 1].setAttribute("tabIndex", "3");
});

function getRandomInt($n) {
  return Math.floor(Math.random() * $n + 1);
}

document.addEventListener("keydown", function (e) {
  const pressed = e.key;
  // console.log(e);

  if ((pressed == "ArrowRight" || pressed == "ArrowUp") && !animationState) {
    rotate -= rY;
    incValue();
    document
      .querySelectorAll(".carouselItem")
      .forEach((el) => el.setAttribute("tabIndex", "-1"));
    document
      .querySelectorAll(".carouselItem")
      [modalId - 1].setAttribute("tabIndex", "3");
  }
  if ((pressed == "ArrowLeft" || pressed == "ArrowDown") && !animationState) {
    rotate += rY;
    decValue();
    document
      .querySelectorAll(".carouselItem")
      .forEach((el) => el.setAttribute("tabIndex", "-1"));
    document
      .querySelectorAll(".carouselItem")
      [modalId - 1].setAttribute("tabIndex", "3");
  }
  if (pressed == " ") {
    e.preventDefault();
    mediaLg && toggleAnimationBtn.click();
  }
  if (pressed == "Enter") {
    // e.preventDefaul t();
    !animationState &&
      mediaLg &&
      document
        .querySelector(`.modal--${modalId}`)
        .classList.add("toggle-modal");
  }

  if (pressed == "Escape") {
    modal.forEach((el) => {
      el.classList.remove("toggle-modal");
    });
  }
});

/// Modal functionality

let mId;

carouselContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".carouselItem");

  const mId = clicked.dataset.id;
  if (clicked) {
    document.querySelector(`.modal--${mId}`).classList.add("toggle-modal");
    // document
    //   .querySelectorAll("main [tabIndex]")
    //   .forEach((el) => el.setAttribute("aria-hidden", "true"));
  }
  // else {
  //   document
  //     .querySelectorAll("main [tabIndex]")
  //     .forEach((el) => el.setAttribute("aria-hidden", "false    "));
  // }
});

closeBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    modal.forEach((el) => {
      el.classList.remove("toggle-modal");
    });
  });
});
