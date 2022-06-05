//배너 슬라이드
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

//신규도서 슬라이드
const NEWBOOK = document.querySelectorAll(".slide_book_info");

var newbookSwiper = new Swiper(".sec3 .book-slide", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
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
    breakpoints: {
        931: {
          slidesPerView: 3,
        },
    },
    on: {
        activeIndexChange: function () {
            if(this.realIndex == 0){
                NEWBOOK[0].classList.add("on");
                NEWBOOK[1].classList.remove("on");
                NEWBOOK[2].classList.remove("on");
            } else if(this.realIndex == 1){
                NEWBOOK[0].classList.remove("on");
                NEWBOOK[1].classList.add("on");
                NEWBOOK[2].classList.remove("on");
            } else{
                NEWBOOK[0].classList.remove("on");
                NEWBOOK[1].classList.remove("on");
                NEWBOOK[2].classList.add("on");
            }
        }
    }
});

//이기적 베스트 슬라이드
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

$(document).ready(function(){
    //공지, 정오 탭
    $(".sec5 .tap > h2").click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        $("#"+$(this).data("id")).addClass("on").siblings().removeClass('on');
    });

    //반응형
    // mnav동작 함수
    function mnav() {
        $("nav").addClass("on");
        $(".gnb > li > a").unbind("click").click(function(e) {
            // 슬라이드토글이 두번 콜링되어 고장나는 경우 처리
            $(this).next("ul").stop().slideToggle();
            $(".gnb > li > a").not(this).next("ul").slideUp();
            e.preventDefault();
        });
        $(".iw_overlay, .mbt_close").addClass("on");
    };

    //처음 로딩 화면이 1200 미만일때
    if($(window).width() < 1200){
        $(".ico_hambure").addClass("on");
        $(".gnb > li > ul").slideUp();
        //햄버거를 눌렀을때
        $(".ico_hambure").click(mnav);
    };
    //후에 1200 미만으로 줄이거나 이상으로 늘릴때
    $(window).resize(function(){
        if($(window).width() < 1200){
            $(".ico_hambure").addClass("on");
            $(".gnb > li > ul").slideUp();
            $(".ico_hambure").click(mnav);
        } else{
            $("nav, .ico_hambure, .iw_overlay").removeClass("on");
            $(".gnb > li > a").unbind();
            $(".gnb > li > ul").slideDown();
        }
    });
    //mnav 클로즈버튼을 누를때
    $(".mbt_close").click(function(){
        $("nav, .mbt_close, .iw_overlay").removeClass("on");
        $(".gnb > li > ul").slideUp();
    });  
});




