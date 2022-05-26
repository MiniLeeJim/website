//sec1 배너
var bannerSwiper = new Swiper(".sec1 .inner", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed : 800,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    }
});

//sec3 신규도서
const newBook = document.querySelectorAll(".slide_book_info");

var newbookSwiper = new Swiper(".sec3 .book-slide", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: false
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    on: {
        activeIndexChange: function () {
            if(this.realIndex == 0){
                newBook[0].classList.add("on");
                newBook[1].classList.remove("on");
                newBook[2].classList.remove("on");
            } else if(this.realIndex == 1){
                newBook[0].classList.remove("on");
                newBook[1].classList.add("on");
                newBook[2].classList.remove("on");
            } else{
                newBook[0].classList.remove("on");
                newBook[1].classList.remove("on");
                newBook[2].classList.add("on");
            }
        }
    }
});

//이기적 베스트
var bestbookSwiper = new Swiper(".sec4 .book-slide", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});

//공지, 정오 탭
$(document).ready(function(){
    $(".sec5 .tap > h2").click(function(){
        $(this).addClass('on').siblings().removeClass('on');
        $("#"+$(this).data('id')).addClass('on').siblings().removeClass('on');
    });
});
