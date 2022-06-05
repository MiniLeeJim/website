$(function() {
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
    $(".mbt_close").click(function(){
        $("nav, .mbt_close, .iw_overlay").removeClass("on");
        $(".gnb > li > ul").slideUp();
    });  
});
