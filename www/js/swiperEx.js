var swiper = new Swiper(".basic2",{
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  slidesPerView: 1, /* 모바일 화면일땐 슬라이드 1개만 보겠다 */
  spaceBetween: 10,
  breakpoints: {
    640: { /* 가로 640일때 슬라이드 2개를 보겠다 */
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: { /* 가로 768일때 슬라이드 4개를 보겠다 */
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: { /* 가로 1024일때 슬라이드 5개를 보겠다 */
      slidesPerView: 5,
      spaceBetween: 50,
    },
  },
  loop: true,
});