$(function() {
    //다른 페이지에서 해시 찾아 해당 책 정보 출력
    let bookJson = JSON.parse(JSON.stringify(bookList));

    function bookInfoSet(book, index){
        $('.sub_title, .mini_title').text(bookJson[book][index]['subTitle'])
        $('.book_title').text(bookJson[book][index]['title']);
        $('.info_name').text(bookJson[book][index]['writer']);
        $('.info_page').text(bookJson[book][index]['page']);
        $('.info_price').text(bookJson[book][index]['price']);
        $('.info_date').text(bookJson[book][index]['publicationDate']);
        $('.info_isbn').text(bookJson[book][index]['isbn']);
        $('.intro_book .box_word').html(bookJson[book][index]['bookIntroduce']);
        $('.intro_writer .box_word').html(bookJson[book][index]['writerIntroduce']);
        $('.intro_index .box_word').html(bookJson[book][index]['index'] + bookJson[book][index]['index2'] + bookJson[book][index]['index3'] );
        imgAdd(bookJson, book, index);

        //snb
        let code = bookJson[book][index]['code'];
        $('.' + code).addClass('on');

        //path>middle
        let codeNum = code.substr(0,1);
        $('.' + codeNum).addClass('on');
    }

    function imgAdd(bookJson, book, index){
        let bookImg = $('<img>');
        bookImg.attr('src', bookJson[book][index]['image']);
        bookImg.attr('alt', "bookImg");

        let bookImgStyle = {
            'width' : '100%',
            'height' : '100%',
            'display' : 'block'
        }
        bookImg.css(bookImgStyle);
        
        $('.img_book').html(bookImg);
    }


    if (location.hash == '#book1') {
        bookInfoSet('newbook', 0)
    } else if(location.hash == '#book2') {
        bookInfoSet('newbook', 1)
    } else if(location.hash == '#book3'){
        bookInfoSet('newbook', 2)
    } else if(location.hash == '#book4'){
        bookInfoSet('bestbook', 0)
    } else if(location.hash == '#book5'){
        bookInfoSet('bestbook', 1)
    } else{
        bookInfoSet('bestbook', 2)
    }

    if(location.hash == '#book1' || location.hash == '#book2'){
        $(".snb.practical").removeClass('out');
    } else{
        $(".snb.it").removeClass('out');
    }

    //subTitle 출력, snb 감추기
    function subTitle() {
        $(".snb").addClass('out');
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
            $(".sec1 .sub_title").removeClass('on');
            if(location.hash == '#book1' || location.hash == '#book2'){
                $(".snb.practical").removeClass('out');
            } else{
                $(".snb.it").removeClass('out');
            }
            
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
