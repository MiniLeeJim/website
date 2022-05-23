$(".sec5 .tap > h2").click(function(){
    $(this).addClass('on').siblings().removeClass('on');
    $("#"+$(this).data('id')).addClass('on').siblings().removeClass('on');
});