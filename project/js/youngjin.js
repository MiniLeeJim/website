
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
var ww = window.innerWidth;

var newbookSwiper = new Swiper(".sec3 .book-slide", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    coverflowEffect: {
        rotate: 0,
        stretch: -70,
        depth: 200,
        modifier: 1,
        slideShadows: false
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints:{
        931:{slidesPerView : 3}
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

//베스트도서 슬라이드

var changeYoutube = document.querySelectorAll(".youtube iframe");
// console.log(changeYoutube[1]);

var bestbookSwiper = new Swiper(".sec4 .book-slide", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    coverflowEffect: {
        rotate: 0,
        stretch: -70,
        depth: 200,
        modifier: 1,
        slideShadows: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints:{
        625:{slidesPerView : 3}
    },
    on: {
        activeIndexChange: function () {
            if(this.realIndex == 0){
                changeYoutube[0].classList.add("on");
                changeYoutube[1].classList.remove("on");
                changeYoutube[2].classList.remove("on");
            } else if(this.realIndex == 1){
                changeYoutube[0].classList.remove("on");
                changeYoutube[1].classList.add("on");
                changeYoutube[2].classList.remove("on");
            } else{
                changeYoutube[0].classList.remove("on");
                changeYoutube[1].classList.remove("on");
                changeYoutube[2].classList.add("on");
            }
        }
    }
});

$(document).ready(function(){
    //공지, 정오 탭
    $(".sec5 .tap > h2").on("click", function(){
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

    //sec3신규도서 정렬 함수
    function newBookCol() {
        $(".sec3 .left").css("order", "2");
        $(".sec3 .left .tit_book, .sec3 .left .info").css("text-align", "center");
        $(".sec3 .left .summary").css("display", "none");
        $(".sec3 .right").css("order", "1");
        $(".sec3 .bottom").css("flex-direction", "column");
    };
    function newBookrow() {
        $(".sec3 .left").removeAttr("style");
        $(".sec3 .left .tit_book, .sec3 .left .info").removeAttr("style");
        $(".sec3 .left .summary").removeAttr("style");
        $(".sec3 .right").removeAttr("style");
        $(".sec3 .bottom").removeAttr("style");
    };

    //mnav 클로즈버튼을 누를때
    $(".mbt_close").on("click", function(){
        $("nav, .mbt_close, .iw_overlay").removeClass("on");
        $(".gnb > li > ul").slideUp();
    });  

    //처음 로딩 화면 사이즈 관련
    if($(window).width() <= 1200){
        //1200 이하
        //mnav
        $(".ico_hambure").addClass("on");
        $(".gnb > li > ul").slideUp();
        $(".ico_hambure").click(mnav);

        //930 이하
        if($(window).width() <= 930){
            $(".sec3 .swiper-button-next, .sec3 .swiper-button-prev").addClass("on");
        }

        //624 이하
        if($(window).width() <= 624){
            $(".sec4 .swiper-button-next, .sec4 .swiper-button-prev").addClass("on");
        }

        //610 이하
        if($(window).width() <= 610){
            newBookCol();
        }

        //480 이하
        if($(window).width() <= 480){
            //페이스북 감추기
            $(".sec5 .right").css("display", "none"); 
        } else{
            $(".sec5 .right").css("display", "flex"); 
        }
    };

    //첫 로딩 후 화면 사이즈를 바꿀때
    $(window).on("resize", function(){
        //1200이하
        if($(window).width() <= 1200){
            //mnav
            $(".ico_hambure").addClass("on");
            $(".gnb > li > ul").slideUp();
            $(".ico_hambure").click(mnav);
        } else{
            $("nav, .ico_hambure, .iw_overlay").removeClass("on");
            $(".gnb > li > a").unbind();
            $(".gnb > li > ul").slideDown();
        }

        //930 이하
        if($(window).width() <= 930){
            $(".sec3 .swiper-button-next, .sec3 .swiper-button-prev").addClass("on");
        } else { $(".sec3 .swiper-button-next, .sec3 .swiper-button-prev").removeClass("on"); }

        //624 이하
        if($(window).width() <= 624){
            $(".sec4 .swiper-button-next, .sec4 .swiper-button-prev").addClass("on");
        } else { $(".sec4 .swiper-button-next, .sec4 .swiper-button-prev").removeClass("on"); }

        //610 이하
        if($(window).width() <= 610){
            newBookCol();
        } else{
            newBookrow();
        }
        
        //480 이하
        if($(window).width() <= 480){
            //페이스북 감추기
            $(".sec5 .right").css("display", "none"); 
        } else{
            $(".sec5 .right").css("display", "flex"); 
        }
    });
});





