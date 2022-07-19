$(function(){
    //풀페이지 슬라이드
    let thisPc = true;
    let slider = $('.vertical-slider');
    let slickOptions = {
        arrows: false,
        dots: false,
        infinite: false,
        vertical: true,
        verticalSwiping: true,
    };
    slider.slick(slickOptions);

    //화면이 로드, 리사이즈 되면 슬릭 반응
    if($(window).width() <= 1200){
        thisPc = false;
        slider.slick('unslick');
    } else{
        thisPc = true; 
        slider.not('.slick-initialized').slick(slickOptions);
    }

    $(window).on('resize', function(){
        if($(window).width() <= 1200){
            slider.slick('unslick');
            thisPc = false;
        } else{
            slider.not('.slick-initialized').slick(slickOptions);
            thisPc = true; 
        }
    });
   
    $('.vertical-slider').mousewheel(function(e){
        if(thisPc === true){
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
        }
    });
    
    

    //2번째 슬라이드 부터 나브 표출
    // $('.vertical-slider').on('afterChange', function(){
    //     if(!$(this).slick('slickCurrentSlide') == 0){
    //         $('nav').addClass('on');
    //     } else{
    //         $('nav').removeClass('on');
    //     }
    // });

    //목차, 나브 누르면 해당 슬라이드로 이동
    $('nav ul li, .sec01 ul li').on('click', function(){
        $('.vertical-slider').slick('slickGoTo', $(this).data("index"));
    });

    //project 탭 누를때
    $('.sec03 .tap-tit li').on('click', function(){
        $(this).addClass('on').siblings().removeClass('on');
        $('#'+$(this).data('id')).addClass('on').siblings().removeClass('on');
    })

    //메일폼
    var regmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    emailjs.init("Kx9iau1SsuCHlo9yG"); // API keys

    document.querySelector('#contactForm').addEventListener('submit', function(e) {
        e.preventDefault(); // submit이벤트 막기
        const fromName = document.querySelector('#from_name').value; //전송자 이름 추출
        const mailaddr = document.querySelector('#from_mail').value;

        if(regmail.test(mailaddr) === true){
            $('.caution').removeClass('on');
            emailjs.sendForm("service_3pve5m7", "template_jtrkewm", this)
            .then(function() {
                alert(`${fromName}님, 메일 전송 완료 되었습니다.`)
            }, function(error) {
                alert(`${fromName}님, 메일 전송이 실패했습니다.`)
                console.log('전송실패', error);
            });
        } else{
            $('.caution').addClass('on');
        }
    });

    $('input[type=reset]').on('click', function(){
        $('.caution').removeClass('on');
    });

 
});