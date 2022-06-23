$(function() {
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
