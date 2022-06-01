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
