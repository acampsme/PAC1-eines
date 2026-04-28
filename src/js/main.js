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
