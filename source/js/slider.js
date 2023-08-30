const slider = document.querySelector(".slider-container");
const before = slider.querySelector(".slide-before");
const beforeImg = before.querySelector(".slider-before__img");
const change = slider.querySelector(".slider__control");
const body = document.body;

let isActive = false;

document.addEventListener("DOMContentLoaded", () => {
  let width = slider.offsetWidth;
  beforeImg.style.width = "${width}px";
})
