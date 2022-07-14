$(function(){
    //슬릭슬라이드 (풀페이지)
    $('.vertical-slider').slick({
        dots: true,
        infinite: false,
        vertical: true,
        verticalSwiping: true,
    });
    $('.slick-dots').append('<li class="custom"><button></button></li>')

    $('.vertical-slider').on('mousewheel',function(e) {
        if(e.deltaY < 0){
            if ($(this).slick('slickCurrentSlide') == $(this).find('.slide').length - 1) {
                //마지막 슬라이드 일 때
                $('footer').addClass('on');
                return
            }
            e.preventDefault();
            $(this).slick('slickNext');
        } else{
            if ($(this).slick('slickCurrentSlide') == 0) return; //첫번째 슬라이드 일 때
            $('footer').removeClass('on');
            e.preventDefault();
            $(this).slick('slickPrev');
        }
    });

    $('.custom').on('click', function(){
        $('.vertical-slider').slick('goTo', 0);
    });

    //날씨
    let weatherAPIurl = 'https://api.openweathermap.org/data/2.5/weather?lat=35.8714354&lon=128.601445&appid=11fab8ba6004ca5f26c0564154f2b59d&units=metric&lang=kr';
    $.getJSON(weatherAPIurl, function(result){
        let icon = `<img src="/www/projectB/images/weather/${result.weather[0].icon}.png" alt="${result.weather[0].description}">`
        let temp = result.main.temp.toFixed(1);
        $('.weather-icon').append(icon);
        $('.description').append(`${result.weather[0].description}`);
        $('.temp').append(`${temp}˚C`);
    })

    //sec1,sec3 box
    $('.sec1 .top .type-bt > button').on('click', function(){
        if($('.sec1 .box').hasClass('on') === true){
            $('.sec1 .box, .box h2, .box .thumbnail, .box .overview, .box .details-bt').removeClass('on');
        }
        $('.contents > .con1, .contents > .con1 > h2, .contents > .con1 > .thumbnail, .contents > .con1 > .overview, .contents > .con1 > .details-bt').addClass('on');
    });
    $('.sec1 .box').on('click', function(){
        $(this).addClass('on').siblings().removeClass('on');
        if($(this).hasClass('on') === true){
            $(this).find($('.thumbnail, .overview, .details-bt, h2')).addClass('on');
            $(this).siblings().find($('.thumbnail, .overview, .details-bt, h2')).removeClass('on');
        }
    });
  
    //태그 슬라이드
    $('.tag-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow : $('.prev-arrow-tag'), 
        nextArrow : $('.next-arrow-tag'), 
    });

    //축제 슬라이드
    $('.poster-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow : $('.prev-arrow-poster'), 
        nextArrow : $('.next-arrow-poster'), 
    });
    $('.poster-info .in02, .in03, .in04, .in05').hide();
    $('.poster-slider').on('afterChange', function(e, slick, currentSlide){
        if(currentSlide == 0){
            $('.poster-info .in01').show().siblings().hide(); //첫번째 슬라이드
        } else if(currentSlide == 1){
            $('.poster-info .in02').show().siblings().hide(); //두번째 슬라이드
        } else if(currentSlide == 2){
            $('.poster-info .in03').show().siblings().hide(); //세번째 슬라이드
        } else if(currentSlide == 3){
            $('.poster-info .in04').show().siblings().hide(); //네번째 슬라이드
        }else{
            $('.poster-info .in05').show().siblings().hide(); //다섯번째 슬라이드
        }  
    });

    //배너 슬라이드
    $('.banner-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1, 
        prevArrow : $('.prev-arrow-banner'), 
        nextArrow : $('.next-arrow-banner'), 
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 800,
    });

    $('.menu').on('click', function(){
        if($('nav').hasClass('on') === true){
            $('nav').removeClass('on');
        } else{ $('nav').addClass('on'); }
    });

    //숙박업소 슬라이드
    $('.lodgment-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1, 
        infinite: false,
        vertical: true,
        verticalSwiping: true,
        prevArrow : $('.prev-arrow-lodgment'), 
        nextArrow : $('.next-arrow-lodgment'), 
        focusOnSelect: true
    });
    
})

//축제 섹션 타이틀
let festivalMonth = document.querySelector('.festival .top .month');
let today = new Date();
let month = today.getMonth()+1; //월
festivalMonth.textContent = month + '월의';






//롤링배너
window.addEventListener('DOMContentLoaded', function(){
    let roller = this.document.querySelector('.roller');
    let rollerClone = roller.cloneNode(true);
    rollerClone.id = 'roller2';

    document.querySelector('.sec4 .wrap').appendChild(rollerClone);

    document.querySelector('#roller1').style.left = '0px';
    document.querySelector('#roller2').style.left = document.querySelector('.roller ul').offsetWidth + 'px';

    roller.classList.add('origin');
    rollerClone.classList.add('clone');
});
