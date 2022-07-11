// let dataAll = new Map();

// let x = [];
// let y = [];

// for(var i=0; i<5; i++){
//     x.push(i);
//     y.push(i*2);
// }

// dataAll.set('key1', x);
// dataAll.set('key2', y);
// console.log(dataAll);

// let xy = dataAll.get('key1');
// let zg = dataAll.get('key2');
// console.log(xy, zg);






///////////////////////////////////////////

let dataAll = [
    {"tourism":[]},
    {"culture":[]},
    {"festival":[]},
    {"food":[]},
    {"lodgment":[]},
    {"tag":[]}
]


let date = new Date();
let month = date.getMonth() + 1;
if( month < 10 ){
    month = `0${month}`;
}
let today = `${date.getFullYear()}${month}${date.getDate()}`;


let conId = [];

//숙박정보, 축제, 태그는 따로

let serviceKey = '?serviceKey=3urh8C0NVH6wzrXIQEu4isiHyIW2yqSa0cXLO3JrUsxkQPVhI%2BO%2BlSi64N%2BpYYXTFfCmpkx0y6Okb96gS8wnRQ%3D%3D';






function conListSet(type, detailCommon){ //관광지, 문화시설, 음식
        var conlist = new XMLHttpRequest();
        let url;
        if(type == 12){
            url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?serviceKey=3urh8C0NVH6wzrXIQEu4isiHyIW2yqSa0cXLO3JrUsxkQPVhI%2BO%2BlSi64N%2BpYYXTFfCmpkx0y6Okb96gS8wnRQ%3D%3D&numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=P&contentTypeId=12&areaCode=4&_type=json'
        } else if(type == 14){
            url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?serviceKey=3urh8C0NVH6wzrXIQEu4isiHyIW2yqSa0cXLO3JrUsxkQPVhI%2BO%2BlSi64N%2BpYYXTFfCmpkx0y6Okb96gS8wnRQ%3D%3D&numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=P&contentTypeId=14&areaCode=4&_type=json'
        } else{
            url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?serviceKey=3urh8C0NVH6wzrXIQEu4isiHyIW2yqSa0cXLO3JrUsxkQPVhI%2BO%2BlSi64N%2BpYYXTFfCmpkx0y6Okb96gS8wnRQ%3D%3D&numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=P&contentTypeId=39&areaCode=4&_type=json'
        }
        conlist.open('GET', url);
        
        conlist.onreadystatechange = function(){
            if(conlist.readyState == 4 && conlist.status == 200){
        
                var conJson = JSON.parse(conlist.response);   
                var list = conJson['response'].body.items.item;

                conId = [];
        
                for(var i=0; i<list.length; i++){
                    conId.push(list[i].contentid);
                }
    
                for(var i=0; i<conId.length; i++){
                    detailCommon(conId[i], i, type);
                }
            };
        };
        conlist.send(""); 

}

function festivalListSet(type, detailCommon){ //축제
    var festivallist = new XMLHttpRequest();
    let url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchFestival?serviceKey=3urh8C0NVH6wzrXIQEu4isiHyIW2yqSa0cXLO3JrUsxkQPVhI%2BO%2BlSi64N%2BpYYXTFfCmpkx0y6Okb96gS8wnRQ%3D%3D&numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=P&listYN=Y&areaCode=4';
    let queryParams = '&eventStartDate=' + today;
    queryParams += '&_type=json';
    festivallist.open('GET', url + queryParams);

    festivallist.onreadystatechange = function(){
        if(festivallist.readyState == 4 && festivallist.status == 200){
    
            var festivaJson = JSON.parse(festivallist.response);   
            var list = festivaJson['response'].body.items.item;

            console.log(list)

            conId = [];
    
            for(var i=0; i<list.length; i++){
                conId.push(list[i].contentid);
            }
            console.log(conId);

            for(var i=0; i<conId.length; i++){
                detailCommon(conId[i], i, type);
            }
        };
    };
    festivallist.send(""); 

}


function lodgmentListSet(sigunguCode, detailCommon){ //숙박
    var lodgmentlist = new XMLHttpRequest();
    var lodgmentListUrl = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList'; /*URL*/

    var queryParams = serviceKey; /*Service Key*/
    queryParams += '&' + 'numOfRows' + '=' + '5'; /**/
    queryParams += '&' + 'pageNo' + '=' + '1'; /**/
    queryParams += '&' + 'MobileOS' + '=' + 'ETC'; /**/
    queryParams += '&' + 'MobileApp' + '=' + 'AppTest'; /**/
    queryParams += '&' + 'arrange' + '=' + 'P'; /**/
    queryParams += '&' + 'contentTypeId' + '=' + '32'; /*숙박*/
    queryParams += '&' + 'areaCode' + '=' + '4'; /**/
    queryParams += '&' + 'sigunguCode' + '=' + sigunguCode; /**/
    queryParams += '&_type=json';
    lodgmentlist.open('GET', lodgmentListUrl + queryParams);
    
    lodgmentlist.onreadystatechange = function(){
        if(lodgmentlist.readyState == 4 && lodgmentlist.status == 200){
    
            var lodgmentJson = JSON.parse(lodgmentlist.response);   
            var list = lodgmentJson['response'].body.items.item;

            console.log(list);

            conId = [];

            for(var i=0; i<list.length; i++){
                conId.push(list[i].contentid);
            }

            // for(var i=0; i<conId.length; i++){
            //     detailCommon(conId[i], i, 32);
            // }
        };
    };
    lodgmentlist.send("");   
}





function order(name, detList, contentId, type){ //공통정보 데이터 세팅
    name.push({'contentid': contentId});
    name.push({'tit': detList.title}); //제목
    name.push({'img': detList.firstimage}); //대표이미지
    name.push({'overview': detList.overview}); //개요
    name.push({'addr': detList.addr1}); //주소
    name.push({'homepage': detList.homepage}); //홈페이지
    name.push({'lat': detList.mapy}); //위도
    name.push({'long': detList.mapx}); //경도
}

function order2(name, detList2, type){ //소개정보 데이터 세팅
    if(type == 12){
        name.push({'infocenter': detList2.infocenter}); //문의안내
        name.push({'restdate': detList2.restdate}); //휴일
        name.push({'parking': detList2.parking}); //주차
        name.push({'usetime': detList2.usetime}); //이용시간

        name.push({'expguide': detList2.expguide});//체험프로그램
        name.push({'chkpet': detList2.chkpet});//반려동물
    } else if(type == 14){
        name.push({'infocenter': detList2.infocenterculture}); //문의안내
        name.push({'restdate': detList2.restdateculture}); //휴일
        name.push({'parking': detList2.parkingculture}); //주차
        name.push({'parkingfee': detList2.parkingfee}); //주차요금
        name.push({'usetime': detList2.usetimeculture}); //이용시간

        name.push({'accomcountculture': detList2.accomcountculture});//수용인원
        name.push({'usefee': detList2.usefee});//이용요금
    } else if(type == 15){
        name.push({'infocenter': detList2.sponsor1tel}); //문의안내
        // name.push({'restdate': detList2.restdate}); //휴일
        // name.push({'parking': detList2.parking}); //주차
        name.push({'eventstartdate': detList2.eventstartdate}); //행사시작일
        name.push({'eventenddate': detList2.eventenddate}); //행사종료일

        name.push({'eventplace': detList2.eventplace});//행사장소
        name.push({'usetimefestival': detList2.usetimefestival});//이용요금
    } else {
        name.push({'infocenter': detList2.infocenterfood}); //문의안내
        name.push({'restdate': detList2.restdatefood}); //휴일
        name.push({'parking': detList2.parkingfood}); //주차
        name.push({'usetime': detList2.opentimefood}); //이용시간

        name.push({'firstmenu': detList2.firstmenu});//메인메뉴
        name.push({'reservationfood': detList2.reservationfood});//예약안내
    }

    if(type == 12){
        dataAll[0].tourism.push(name);
    } else if(type == 14){
        dataAll[1].culture.push(name);
    } else if(type == 15){
        dataAll[2].festival.push(name);
    } else {
        dataAll[3].food.push(name);
    }
    
    
}


function detailCommon(contentId, index, type){ //공통정보
    var detailCommonList = new XMLHttpRequest();

    var detailCommonUrl = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon';
    var queryParams = serviceKey; /*Service Key*/
    
    queryParams += '&' + 'numOfRows' + '=' + '1'; /**/
    queryParams += '&' + 'pageNo' + '=' + '1'; /**/
    queryParams += '&' + 'MobileOS' + '=' + 'ETC'; /**/
    queryParams += '&' + 'MobileApp' + '=' + 'AppTest'; /**/
    queryParams += '&' + 'contentId' + '=' + contentId; /**/
    queryParams += '&' + 'defaultYN' + '=' + 'Y'; /**/
    queryParams += '&' + 'firstImageYN' + '=' + 'Y'; /**/
    queryParams += '&' + 'addrinfoYN' + '=' + 'Y'; /**/
    queryParams += '&' + 'mapinfoYN' + '=' + 'Y'; /**/
    queryParams += '&' + 'overviewYN' + '=' + 'Y'; /**/
    queryParams += '&_type=json';
    detailCommonList.open('GET', detailCommonUrl + queryParams);
    // console.log(detailCommonUrl + queryParams);

    detailCommonList.onreadystatechange = function(){
        if(detailCommonList.readyState == 4 && detailCommonList.status == 200){

            var deatilCommonJsonObj = JSON.parse(detailCommonList.response);
            var detList = deatilCommonJsonObj['response'].body.items.item;

            if(index == 0){
                var fir = [];
                order(fir, detList, contentId);
                detailIntro(contentId, index, type, fir);
            } else if(index == 1){
                var sec = [];
                order(sec, detList, contentId);
                detailIntro(contentId, index, type, sec);
            } else if(index == 2){
                var thi = [];
                order(thi, detList, contentId);
                detailIntro(contentId, index, type, thi);
            } else if(index == 3){
                var fou = [];
                order(fou, detList, contentId);
                detailIntro(contentId, index, type, fou);
            } else if(index == 4){
                var fif = [];
                order(fif, detList, contentId);
                detailIntro(contentId, index, type, fif);
            }   
        }
    }
    detailCommonList.send();  
}


function detailIntro(contentId, index, type, num){ //소개정보
    var detailIntroList = new XMLHttpRequest();

    var detailIntroUrl = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro';
    var queryParams = serviceKey; /*Service Key*/

    queryParams += '&' + 'numOfRows' + '=' + '1'; /**/
    queryParams += '&' + 'pageNo' + '=' + '1'; /**/
    queryParams += '&' + 'MobileOS' + '=' + 'ETC'; /**/
    queryParams += '&' + 'MobileApp' + '=' + 'AppTest'; /**/
    queryParams += '&' + 'contentId' + '=' + contentId; /**/
    queryParams += '&' + 'contentTypeId' + '=' + type; /*contentTypeId*/
    queryParams += '&_type=json';
    detailIntroList.open('GET', detailIntroUrl + queryParams);

    detailIntroList.onreadystatechange = function(){
        if(detailIntroList.readyState == 4 && detailIntroList.status == 200){

            var deatilIntroJsonObj = JSON.parse(detailIntroList.response);
            var detList2 = deatilIntroJsonObj['response'].body.items.item;

            if(index == 0){
                order2(num, detList2, type);
            } else if(index == 1){
                order2(num, detList2, type);
            } else if(index == 2){
                order2(num, detList2, type);
            } else if(index == 3){
                order2(num, detList2, type);
            } else{
                order2(num, detList2, type);
            }
        }
    }
    detailIntroList.send();
}


    


window.addEventListener('load', function(){   
    // conListSet(12, detailCommon);
    // conListSet(14, detailCommon);
    // conListSet(39, detailCommon);
    // festivalListSet(15, detailCommon);
    for(var i=0; i<8; i++){
        lodgmentListSet(i+1, detailCommon);
    }
    
})



// conListSet(32, detailCommon);

console.log(dataAll);