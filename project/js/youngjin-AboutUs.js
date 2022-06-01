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
        $(this).click(function() {
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
    //윈도우 크기에 맞춰 snb/subTitle 변경
    if($(window).width() < 1600){
        $(".snb").addClass('out');
        $(".sec1 .sub_title").text($(".snb li.on").text());
        $(".sec1 .sub_title").addClass('on');
    }
    $( window ).resize(function() {
        if($(window).width() < 1600){
            $(".snb").addClass('out');
            $(".sec1 .sub_title").text($(".snb li.on").text());
            $(".sec1 .sub_title").addClass('on');
        }
        else {
            $(".snb").removeClass('out');
            $(".sec1 .sub_title").removeClass('on');
        }
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
