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
    //처음 로딩 화면이 1200 미만일때
    if($(window).width() < 1200){
        $(".ico_hambure").addClass("on");
    };
    //후에 1200 미만으로 줄이거나 이상으로 늘릴때
    $(window).resize(function(){
        if($(window).width() < 1200){
            $(".ico_hambure").addClass("on");
        } else{
            $(".gnb > li > ul").show();
            $(".ico_hambure").removeClass("on");
            $("nav").removeClass("on");
            $(".gnb > li > a").unbind();
            $(".iw_overlay").removeClass("on");
        }
    });
    //햄버거를 눌렀을때
    $(".ico_hambure").click(function(){
        $("nav").addClass("on");
        $(".gnb > li > a").click(function(e){
            e.preventDefault();
        });
        if($("nav").hasClass("on")){
            $(".gnb > li > ul").hide();
            $(".gnb > li").click(function() {
                $(this).find("ul").stop().slideToggle();
            });
        };
        $(".iw_overlay").addClass("on");
        //나브 닫기 버튼
        $(".mbt_close").addClass("on");   
    });
    $(".mbt_close").click(function(){
            $("nav").removeClass("on");
            $(".mbt_close").removeClass("on");
            $(".iw_overlay").removeClass("on");
    });  
});




