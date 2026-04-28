import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';

const btn = document.getElementById("btnInfo");
const msg = document.getElementById("missatge");

if (btn) {
  btn.addEventListener("click", () => {
    msg.textContent = "Has activat la interacció amb JavaScript!";
  });
}

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination],
  loop: true,

  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-menu");

if (burger && nav) {
  burger.addEventListener("click", () => {
    nav.classList.toggle("open");
    const expanded = nav.classList.contains("open");
    burger.setAttribute("aria-expanded", expanded);
    burger.setAttribute("aria-label", expanded ? "Tancar menú" : "Obrir menú");
  });

  document.addEventListener("click", (event) => {
    if (
      nav.classList.contains("open") &&
      !nav.contains(event.target) &&
      !burger.contains(event.target)
    ) {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Obrir menú");
    }
  });
}