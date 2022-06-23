$(function() {
    //다른 페이지에서 해시 찾아 이동
    if (location.hash == '#spot1') {
        $('#spot1, .spot1').addClass('on').siblings().removeClass('on');
        $('.snb li').eq(0).addClass('on').siblings().removeClass('on');
        $(".sec1 .mini_title").text($(".snb li.on").text());
        window.scrollTo({top: 0});
    } else if (location.hash == '#spot2') {
        $('#spot2, .spot2').addClass('on').siblings().removeClass('on');
        $('.snb li').eq(1).addClass('on').siblings().removeClass('on');
        $(".sec1 .mini_title").text($(".snb li.on").text());
        window.scrollTo({top: 0});
    } else if (location.hash == '#spot3') {
        $('#spot3, .spot3').addClass('on').siblings().removeClass('on');
        $('.snb li').eq(2).addClass('on').siblings().removeClass('on');
        $(".sec1 .mini_title").text($(".snb li.on").text());
        window.scrollTo({top: 0});
    } else if (location.hash == '#spot4') {
        $('#spot4, .spot4').addClass('on').siblings().removeClass('on');
        $('.snb li').eq(3).addClass('on').siblings().removeClass('on');
        $(".sec1 .mini_title").text($(".snb li.on").text());
        window.scrollTo({top: 0});
    } else if (location.hash == '#spot5') {
        $('#spot5, .spot5').addClass('on').siblings().removeClass('on');
        $('.snb li').eq(4).addClass('on').siblings().removeClass('on');
        $(".sec1 .mini_title").text($(".snb li.on").text());
        window.scrollTo({top: 0});
    }
    //헤더 나브로 이동
    $('ul.lnb1 li > a').each(function() {
        $(this).on("click", function() {
            const thisHash = $(this).attr('href');
            const thisHashTrim = thisHash.substr(thisHash.length-5,5);
            const thisHashNum = Number(thisHash.substr(thisHash.length-1,1)) - 1;
            // const thisHashClass = '.' + thisHashTrim;
            $(thisHash).addClass('on').siblings().removeClass('on');
            $('.' + thisHashTrim).addClass('on').siblings().removeClass('on');
            $('.snb li').eq(thisHashNum).addClass('on').siblings().removeClass('on');
            window.scrollTo({top: 0});
            //윈도우 크기에 맞춰 snb/subTitle 변경
            $(".sec1 .sub_title").text($(this).text());
            $(".sec1 .mini_title").text($(this).text());
        });
    });

    //snb/subTitle 변경 함수
    function subTitle() {
        $(".snb").addClass('out');
        $(".sec1 .sub_title").text($(".snb li.on").text());
        $(".sec1 .sub_title").addClass('on');
    };
    //500에 path 감추기 함수
    function closePath() {
        if($(window).width() <= 500){
            $(".sec1 .path").css("display", "none");
        } else { $(".sec1 .path").removeAttr("style"); }
    };

    //윈도우 크기에 맞춰 snb/subTitle 변경
    if($(window).width() <= 1600){
        subTitle();
        closePath();
    };
    $(window).on("resize", function() {
        if($(window).width() <= 1600){
            subTitle();
            closePath();
        }
        else {
            $(".snb").removeClass('out');
            $(".sec1 .sub_title").removeClass('on');
        }
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
    });
});

//탭전환
let conBt = document.querySelectorAll('.snb li');
let subCon = document.querySelectorAll('.sub_con');
Array.from(conBt).forEach(function(btName, index){
    btName.addEventListener('click', function(){
        for(var i = 0; i < subCon.length; i++){
            subCon[i].classList.remove('on');
            conBt[i].classList.remove('on');
        }
        subCon[index].classList.add('on');
        conBt[index].classList.add('on');
        $(".sec1 .mini_title").text($(this).text());
        window.scrollTo({top: 0});
    });
});

//연혁 전환
let secBt = document.querySelectorAll('.sec3 .select .bt');
let hisCon = document.querySelectorAll('.sec3 .history');
Array.from(secBt).forEach(function(btName, index){
    btName.addEventListener('click', function(){
        for(var i = 0; i < hisCon.length; i++){
            hisCon[i].classList.remove('on');
            secBt[i].style.backgroundColor = '#fff';
        }
        hisCon[index].classList.add('on');
        secBt[index].style.backgroundColor = '#ddd';
    });
});
