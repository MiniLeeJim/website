$(function(){
    //풀페이지 슬라이드
    $('.vertical-slider').slick({
        arrows: false,
        dots: false,
        infinite: false,
        vertical: true,
        verticalSwiping: true,
    });

    $('.vertical-slider').mousewheel(function(e){
        if(e.deltaY < 0){
            if($(this).slick('slickCurrentSlide') == $(this).find('.slide').length - 1){
                return;
            }

            e.preventDefault();
            $(this).slick('slickNext');
        } else{
            if ($(this).slick('slickCurrentSlide') == 0) {
                return;
            }

            e.preventDefault();
            $(this).slick('slickPrev');
        }
    });

    //2번째 슬라이드 부터 나브 표출
    $('.vertical-slider').on('afterChange', function(){
        if(!$(this).slick('slickCurrentSlide') == 0){
            $('nav').addClass('on');
        } else{
            $('nav').removeClass('on');
        }
    });

    //목차, 나브 누르면 해당 슬라이드로 이동
    $('nav ul li, .sec01 ul li').on('click', function(){
        $('.vertical-slider').slick('slickGoTo', $(this).data("index"));
    });

    //project 탭 누를때
    $('.sec03 .tap-tit li').on('click', function(){
        $(this).addClass('on').siblings().removeClass('on');
        $('#'+$(this).data('id')).addClass('on').siblings().removeClass('on');
    })


});