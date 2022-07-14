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

let tagCode = [
    {"code": ["12", "A02", "A0201", "A02010700"]}, //유적지,사적지
    {"code": ["12", "A02", "A0202", "A02020700"]}, //공원
    {"code": ["12", "A02", "A0203", "A02030400"]}, //이색체험
    {"code": ["12", "A02", "A0203", "A02030600"]}, //이색거리
    {"code": ["14", "A02", "A0206", "A02060100"]}, //박물관
    {"code": ["14", "A02", "A0206", "A02060300"]}, //전시관
    {"code": ["14", "A02", "A0206", "A02060500"]}, //미술관,화랑
    {"code": ["38", "A04", "A0401", "A04010200"]} //상설시장
]

let dataAll = [
    {"tourism":[]},
    {"culture":[]},
    {"festival":[]},
    {"food":[]},
    {"lodgment":[
        {"namgu":[]}, //남구
        {"dalseogu":[]}, //달서구
        {"dalseonggun":[]}, //달성군
        {"donggu":[]}, //동구
        {"bukgu":[]}, //북구
        {"seogu":[]}, //서구
        {"suseonggu":[]}, //수성구
        {"junggu":[]} //중구
    ]},
    {"tag":[
        {"historic": []}, //유적지,사적지
        {"park": []}, //공원
        {"experience": []}, //이색체험
        {"street": []}, //이색거리
        {"museum": []}, //박물관
        {"exhibition": []}, //전시관
        {"gallery": []}, //미술관,화랑
        {"market": []} //상설시장
    ]}
]


let fdate = new Date();
let fMonth = fdate.getMonth() + 1;
if( fMonth < 10 ){
    fMonth = `0${fMonth}`;
}
let ftoday = `${fdate.getFullYear()}${fMonth}${fdate.getDate()}`;




//숙박정보, 축제, 태그는 따로

let conId = [];
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
    let url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchFestival?serviceKey=3urh8C0NVH6wzrXIQEu4isiHyIW2yqSa0cXLO3JrUsxkQPVhI%2BO%2BlSi64N%2BpYYXTFfCmpkx0y6Okb96gS8wnRQ%3D%3D&numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=P&listYN=Y&areaCode=4&_type=json';
    let queryParams = '&eventStartDate=' + ftoday;
    queryParams += '&_type=json';
    festivallist.open('GET', url + queryParams);

    festivallist.onreadystatechange = function(){
        if(festivallist.readyState == 4 && festivallist.status == 200){
    
            var festivaJson = JSON.parse(festivallist.response);   
            var list = festivaJson['response'].body.items.item;

            // console.log(list)

            conId = [];
    
            for(var i=0; i<list.length; i++){
                conId.push(list[i].contentid);
            }
            // console.log(conId);

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


            conId = [];

            for(var i=0; i<list.length; i++){
                conId.push(list[i].contentid);
            }

            if(list.length == undefined){
                detailCommon(list.contentid, 0, 32, sigunguCode);
            } else{
                for(var i=0; i<conId.length; i++){
                    detailCommon(conId[i], i, 32, sigunguCode);
                } 
            }
        };
    };
    lodgmentlist.send("");   
}


function tagorder(name, list, cat3){ //태그검색용 데이터 세팅
    name.push({"tit": list.title});
    name.push({"firstimage": list.firstimage});

    if(cat3 == "A02010700"){
        dataAll[5].tag[0].historic.push(name)
    } else if(cat3 == "A02020700"){
        dataAll[5].tag[1].park.push(name)
    } else if(cat3 == "A02030400"){
        dataAll[5].tag[2].experience.push(name)
    } else if(cat3 == "A02030600"){
        dataAll[5].tag[3].street.push(name)
    } else if(cat3 == "A02060100"){
        dataAll[5].tag[4].museum.push(name)
    } else if(cat3 == "A02060300"){
        dataAll[5].tag[5].exhibition.push(name)
    } else if(cat3 == "A02060500"){
        dataAll[5].tag[6].gallery.push(name)
    } else{
        dataAll[5].tag[7].market.push(name)
    }
}

function tagListSet(type, cat1, cat2, cat3){ //태그
    var taglist = new XMLHttpRequest();
    let tagListUrl = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList';

    var queryParams = serviceKey; /*Service Key*/
    queryParams += '&' + 'numOfRows' + '=' + '5'; /**/
    queryParams += '&' + 'pageNo' + '=' + '1'; /**/
    queryParams += '&' + 'MobileOS' + '=' + 'ETC'; /**/
    queryParams += '&' + 'MobileApp' + '=' + 'AppTest'; /**/
    queryParams += '&' + 'arrange' + '=' + 'P'; /**/
    queryParams += '&' + 'contentTypeId' + '=' + type; /**/
    queryParams += '&' + 'areaCode' + '=' + '4'; /**/
    queryParams += '&' + 'cat1' + '=' + cat1; /**/
    queryParams += '&' + 'cat2' + '=' + cat2; /**/
    queryParams += '&' + 'cat3' + '=' + cat3; /**/
    queryParams += '&_type=json';
    taglist.open('GET', tagListUrl + queryParams);
    
    taglist.onreadystatechange = function(){
        if(taglist.readyState == 4 && taglist.status == 200){
    
            var tagJson = JSON.parse(taglist.response);   
            var list = tagJson['response'].body.items.item;
            // console.log(list);
    
            for(var i=0; i<list.length; i++){

                if(i == 0){
                    var fir = [];
                    tagorder(fir, list[0], cat3);
                } else if(i == 1){
                    var sec = [];
                    tagorder(sec, list[1], cat3);
                } else if(i == 2){
                    var thi = [];
                    tagorder(thi, list[2], cat3);
                } else if(i == 3){
                    var fou = [];
                    tagorder(fou, list[3], cat3);
                } else{
                    var fif = [];
                    tagorder(fif, list[4], cat3);
                }

            }
        };
    };
    taglist.send(""); 
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

function order2(name, detList2, type, sigunguCode){ //소개정보 데이터 세팅
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
        name.push({'eventstartdate': detList2.eventstartdate}); //행사시작일
        name.push({'eventenddate': detList2.eventenddate}); //행사종료일

        name.push({'eventplace': detList2.eventplace});//행사장소
        name.push({'usetimefestival': detList2.usetimefestival});//이용요금
    } else if(type == 39){
        name.push({'infocenter': detList2.infocenterfood}); //문의안내
        name.push({'restdate': detList2.restdatefood}); //휴일
        name.push({'parking': detList2.parkingfood}); //주차
        name.push({'usetime': detList2.opentimefood}); //이용시간

        name.push({'firstmenu': detList2.firstmenu});//메인메뉴
        name.push({'reservationfood': detList2.reservationfood});//예약안내
    } else{
        name.push({'infocenter': detList2.infocenterlodg}); //문의안내 
        name.push({'parking': detList2.parkinglodging}); //주차
        name.push({'checkintime': detList2.checkintime}); //입실시간
        name.push({'checkouttime': detList2.checkouttime}); //퇴실시간

        name.push({'roomtype': detList2.roomtype});//객실유형
        name.push({'subfacility': detList2.subfacility});//부대시설
    }

    if(type == 12){
        dataAll[0].tourism.push(name);
    } else if(type == 14){
        dataAll[1].culture.push(name);
    } else if(type == 15){
        dataAll[2].festival.push(name);
    } else if(type == 39){
        dataAll[3].food.push(name);
    } else{
        if(sigunguCode == 1){
            dataAll[4].lodgment[0].namgu.push(name);
        } else if(sigunguCode == 2){
            dataAll[4].lodgment[1].dalseogu.push(name);
        } else if(sigunguCode == 3){
            dataAll[4].lodgment[2].dalseonggun.push(name);
        } else if(sigunguCode == 4){
            dataAll[4].lodgment[3].donggu.push(name);
        } else if(sigunguCode == 5){
            dataAll[4].lodgment[4].bukgu.push(name);
        } else if(sigunguCode == 6){
            dataAll[4].lodgment[5].seogu.push(name);
        } else if(sigunguCode == 7){
            dataAll[4].lodgment[6].suseonggu.push(name);
        } else{
            dataAll[4].lodgment[7].junggu.push(name);
        }
    }
    
}


function detailCommon(contentId, index, type, sigunguCode){ //공통정보
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


            if(type == 32){
                if(index == 0){
                    var fir = [];
                    order(fir, detList, contentId);
                    detailIntro(contentId, index, type, fir, sigunguCode);
                } else if(index == 1){
                    var sec = [];
                    order(sec, detList, contentId);
                    detailIntro(contentId, index, type, sec, sigunguCode);
                } else if(index == 2){
                    var thi = [];
                    order(thi, detList, contentId);
                    detailIntro(contentId, index, type, thi, sigunguCode);
                } else if(index == 3){
                    var fou = [];
                    order(fou, detList, contentId);
                    detailIntro(contentId, index, type, fou, sigunguCode);
                } else if(index == 4){
                    var fif = [];
                    order(fif, detList, contentId);
                    detailIntro(contentId, index, type, fif, sigunguCode);
                }   
            } else{
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
    }
    detailCommonList.send();  
}

function detailIntro(contentId, index, type, num, sigunguCode){ //소개정보
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


            if(type == 32){
                if(index == 0){
                    order2(num, detList2, type, sigunguCode);
                } else if(index == 1){
                    order2(num, detList2, type, sigunguCode);
                } else if(index == 2){
                    order2(num, detList2, type, sigunguCode);
                } else if(index == 3){
                    order2(num, detList2, type, sigunguCode);
                } else{
                    order2(num, detList2, type, sigunguCode);
                }
            } else{
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
    }
    detailIntroList.send();
}


function loadData(){
    conListSet(12, detailCommon); //관광지
    conListSet(14, detailCommon); //문화시설
    conListSet(39, detailCommon); //음식
    festivalListSet(15, detailCommon); //축제
    for(var i=0; i<8; i++){ //숙박
        lodgmentListSet(i+1, detailCommon);
    }
    for(var i=0; i<tagCode.length; i++){ //태그
        tagListSet(
            tagCode[i].code[0], //type
            tagCode[i].code[1], //cat1
            tagCode[i].code[2], //cat2
            tagCode[i].code[3], //cat3
        );
    }

    return(dataAll);
}

// let newData = loadData();


// let dataAll = [
//     {"tourism":[
//         [
//             {contentid: 125406},
//             {tit: '비슬산자연휴양림'},
//             {img: 'http://tong.visitkorea.or.kr/cms/resource/62/219162_image2_1.jpg'},
//             {overview: '비슬산 자연휴양림은 대견봉(1083.59m)을 중심으로 좌우에 조화봉(1,058m), 관기…포샤워장, 물놀이터, 삼림욕장 등과 자연석들이 널려 있는 산책로인 탐석로가 있다.<br>'},
//             {addr: '대구광역시 달성군 유가읍 일연선사길 61'},
//             {homepage: '<a href="https://www.foresttrip.go.kr/indvz/main.d…산자연휴양림 사이트로 이동">https://www.foresttrip.go.kr/</a>'},
//             {lat: 35.6913803935},
//             {long: 128.5159773891},
//             {infocenter: '053-659-4400~1'},
//             {restdate: undefined},
//             {parking: '있음(공영주차장, 사설주차장)<br />\n※ 야영객 차량은 출입이 불가능, 휴양림 입구에 비치된 손수레(무료)이용'},
//             {usetime: '[숙박시설] 당일 15:00~익일 12:00'},
//             {expguide: '<strong>비슬산 반딧불이 전기차</strong><br />\n- 운행구간 : 공영주차장…>\n※ 사전에 운행 여부 확인 및 운행 시간표 확인 후 방문 바람<br />\n<br />'},
//             {chkpet: '불가'}
//         ],
//         [
//             {contentid: 125406},
//             {tit: '비슬산자연휴양림2'},
//             {img: 'http://tong.visitkorea.or.kr/cms/resource/62/219162_image2_1.jpg'},
//             {overview: '비슬산 자연휴양림은 대견봉(1083.59m)을 중심으로 좌우에 조화봉(1,058m), 관기…포샤워장, 물놀이터, 삼림욕장 등과 자연석들이 널려 있는 산책로인 탐석로가 있다.<br>'},
//             {addr: '대구광역시 달성군 유가읍 일연선사길 61'},
//             {homepage: '<a href="https://www.foresttrip.go.kr/indvz/main.d…산자연휴양림 사이트로 이동">https://www.foresttrip.go.kr/</a>'},
//             {lat: 35.6913803935},
//             {long: 128.5159773891},
//             {infocenter: '053-659-4400~1'},
//             {restdate: undefined},
//             {parking: '있음(공영주차장, 사설주차장)<br />\n※ 야영객 차량은 출입이 불가능, 휴양림 입구에 비치된 손수레(무료)이용'},
//             {usetime: '[숙박시설] 당일 15:00~익일 12:00'},
//             {expguide: '<strong>비슬산 반딧불이 전기차</strong><br />\n- 운행구간 : 공영주차장…>\n※ 사전에 운행 여부 확인 및 운행 시간표 확인 후 방문 바람<br />\n<br />'},
//             {chkpet: '불가'}
//         ],
//         [
//             {contentid: 125406},
//             {tit: '비슬산자연휴양림3'},
//             {img: 'http://tong.visitkorea.or.kr/cms/resource/62/219162_image2_1.jpg'},
//             {overview: '비슬산 자연휴양림은 대견봉(1083.59m)을 중심으로 좌우에 조화봉(1,058m), 관기…포샤워장, 물놀이터, 삼림욕장 등과 자연석들이 널려 있는 산책로인 탐석로가 있다.<br>'},
//             {addr: '대구광역시 달성군 유가읍 일연선사길 61'},
//             {homepage: '<a href="https://www.foresttrip.go.kr/indvz/main.d…산자연휴양림 사이트로 이동">https://www.foresttrip.go.kr/</a>'},
//             {lat: 35.6913803935},
//             {long: 128.5159773891},
//             {infocenter: '053-659-4400~1'},
//             {restdate: undefined},
//             {parking: '있음(공영주차장, 사설주차장)<br />\n※ 야영객 차량은 출입이 불가능, 휴양림 입구에 비치된 손수레(무료)이용'},
//             {usetime: '[숙박시설] 당일 15:00~익일 12:00'},
//             {expguide: '<strong>비슬산 반딧불이 전기차</strong><br />\n- 운행구간 : 공영주차장…>\n※ 사전에 운행 여부 확인 및 운행 시간표 확인 후 방문 바람<br />\n<br />'},
//             {chkpet: '불가'}
//         ],
//         [
//             {contentid: 125406},
//             {tit: '비슬산자연휴양림4'},
//             {img: 'http://tong.visitkorea.or.kr/cms/resource/62/219162_image2_1.jpg'},
//             {overview: '비슬산 자연휴양림은 대견봉(1083.59m)을 중심으로 좌우에 조화봉(1,058m), 관기…포샤워장, 물놀이터, 삼림욕장 등과 자연석들이 널려 있는 산책로인 탐석로가 있다.<br>'},
//             {addr: '대구광역시 달성군 유가읍 일연선사길 61'},
//             {homepage: '<a href="https://www.foresttrip.go.kr/indvz/main.d…산자연휴양림 사이트로 이동">https://www.foresttrip.go.kr/</a>'},
//             {lat: 35.6913803935},
//             {long: 128.5159773891},
//             {infocenter: '053-659-4400~1'},
//             {restdate: undefined},
//             {parking: '있음(공영주차장, 사설주차장)<br />\n※ 야영객 차량은 출입이 불가능, 휴양림 입구에 비치된 손수레(무료)이용'},
//             {usetime: '[숙박시설] 당일 15:00~익일 12:00'},
//             {expguide: '<strong>비슬산 반딧불이 전기차</strong><br />\n- 운행구간 : 공영주차장…>\n※ 사전에 운행 여부 확인 및 운행 시간표 확인 후 방문 바람<br />\n<br />'},
//             {chkpet: '불가'}
//         ],
//         [
//             {contentid: 125406},
//             {tit: '비슬산자연휴양림5'},
//             {img: 'http://tong.visitkorea.or.kr/cms/resource/62/219162_image2_1.jpg'},
//             {overview: '비슬산 자연휴양림은 대견봉(1083.59m)을 중심으로 좌우에 조화봉(1,058m), 관기…포샤워장, 물놀이터, 삼림욕장 등과 자연석들이 널려 있는 산책로인 탐석로가 있다.<br>'},
//             {addr: '대구광역시 달성군 유가읍 일연선사길 61'},
//             {homepage: '<a href="https://www.foresttrip.go.kr/indvz/main.d…산자연휴양림 사이트로 이동">https://www.foresttrip.go.kr/</a>'},
//             {lat: 35.6913803935},
//             {long: 128.5159773891},
//             {infocenter: '053-659-4400~1'},
//             {restdate: undefined},
//             {parking: '있음(공영주차장, 사설주차장)<br />\n※ 야영객 차량은 출입이 불가능, 휴양림 입구에 비치된 손수레(무료)이용'},
//             {usetime: '[숙박시설] 당일 15:00~익일 12:00'},
//             {expguide: '<strong>비슬산 반딧불이 전기차</strong><br />\n- 운행구간 : 공영주차장…>\n※ 사전에 운행 여부 확인 및 운행 시간표 확인 후 방문 바람<br />\n<br />'},
//             {chkpet: '불가'}
//         ]      
//     ]},
//     {"culture":[
//         [
//             {contentid: 1318568},
//             {tit: '작은 중앙가족박물관(한방개인박물관)'},
//             {img: 'http://tong.visitkorea.or.kr/cms/resource/96/1888996_image2_1.jpg'},
//             {overview: '350년 대구 약령시에서 3대, 90여년에 걸쳐 한약 외길을 걸어오고 있는 한약집안으로 조…본인의 건강상담을 받아볼 수 있다.<br />\n* 개관일 2011년 4월 25일\n<br>'},
//             {addr: '대구광역시 중구 중앙대로77길 50-5'},
//             {homepage: '작은중앙가족박물관 <a href="http://jdailyhealth.modoo.at/ "…족박물관 홈페이지로 이동">http://jdailyhealth.modoo.at/ </a>'},
//             {lat: 35.8686617201},
//             {long: 128.5909297757},
//             {infocenter: '053-252-6606'},
//             {restdate: '일요일, 공휴일'},
//             {parking: '인근 공영주차장 이용'},
//             {parkingfee: '유료'},
//             {usetime: '13:30~17:30'},
//             {accomcountculture: '60명/일'},
//             {usefee: '무료'}
//         ],
//         [
//             {contentid: 1318568},
//             {tit: '작은 중앙가족박물관(한방개인박물관)22'},
//             {img: 'http://tong.visitkorea.or.kr/cms/resource/96/1888996_image2_1.jpg'},
//             {overview: '350년 대구 약령시에서 3대, 90여년에 걸쳐 한약 외길을 걸어오고 있는 한약집안으로 조…본인의 건강상담을 받아볼 수 있다.<br />\n* 개관일 2011년 4월 25일\n<br>'},
//             {addr: '대구광역시 중구 중앙대로77길 50-5'},
//             {homepage: '작은중앙가족박물관 <a href="http://jdailyhealth.modoo.at/ "…족박물관 홈페이지로 이동">http://jdailyhealth.modoo.at/ </a>'},
//             {lat: 35.8686617201},
//             {long: 128.5909297757},
//             {infocenter: '053-252-6606'},
//             {restdate: '일요일, 공휴일'},
//             {parking: '인근 공영주차장 이용'},
//             {parkingfee: '유료'},
//             {usetime: '13:30~17:30'},
//             {accomcountculture: '60명/일'},
//             {usefee: '무료'}
//         ],
//         [
//             {contentid: 1318568},
//             {tit: '작은 중앙가족박물관(한방개인박물관)33'},
//             {img: 'http://tong.visitkorea.or.kr/cms/resource/96/1888996_image2_1.jpg'},
//             {overview: '350년 대구 약령시에서 3대, 90여년에 걸쳐 한약 외길을 걸어오고 있는 한약집안으로 조…본인의 건강상담을 받아볼 수 있다.<br />\n* 개관일 2011년 4월 25일\n<br>'},
//             {addr: '대구광역시 중구 중앙대로77길 50-5'},
//             {homepage: '작은중앙가족박물관 <a href="http://jdailyhealth.modoo.at/ "…족박물관 홈페이지로 이동">http://jdailyhealth.modoo.at/ </a>'},
//             {lat: 35.8686617201},
//             {long: 128.5909297757},
//             {infocenter: '053-252-6606'},
//             {restdate: '일요일, 공휴일'},
//             {parking: '인근 공영주차장 이용'},
//             {parkingfee: '유료'},
//             {usetime: '13:30~17:30'},
//             {accomcountculture: '60명/일'},
//             {usefee: '무료'}
//         ],
//         [
//             {contentid: 1318568},
//             {tit: '작은 중앙가족박물관(한방개인박물관)44'},
//             {img: 'http://tong.visitkorea.or.kr/cms/resource/96/1888996_image2_1.jpg'},
//             {overview: '350년 대구 약령시에서 3대, 90여년에 걸쳐 한약 외길을 걸어오고 있는 한약집안으로 조…본인의 건강상담을 받아볼 수 있다.<br />\n* 개관일 2011년 4월 25일\n<br>'},
//             {addr: '대구광역시 중구 중앙대로77길 50-5'},
//             {homepage: '작은중앙가족박물관 <a href="http://jdailyhealth.modoo.at/ "…족박물관 홈페이지로 이동">http://jdailyhealth.modoo.at/ </a>'},
//             {lat: 35.8686617201},
//             {long: 128.5909297757},
//             {infocenter: '053-252-6606'},
//             {restdate: '일요일, 공휴일'},
//             {parking: '인근 공영주차장 이용'},
//             {parkingfee: '유료'},
//             {usetime: '13:30~17:30'},
//             {accomcountculture: '60명/일'},
//             {usefee: '무료'}
//         ],
//         [
//             {contentid: 1318568},
//             {tit: '작은 중앙가족박물관(한방개인박물관)55'},
//             {img: 'http://tong.visitkorea.or.kr/cms/resource/96/1888996_image2_1.jpg'},
//             {overview: '350년 대구 약령시에서 3대, 90여년에 걸쳐 한약 외길을 걸어오고 있는 한약집안으로 조…본인의 건강상담을 받아볼 수 있다.<br />\n* 개관일 2011년 4월 25일\n<br>'},
//             {addr: '대구광역시 중구 중앙대로77길 50-5'},
//             {homepage: '작은중앙가족박물관 <a href="http://jdailyhealth.modoo.at/ "…족박물관 홈페이지로 이동">http://jdailyhealth.modoo.at/ </a>'},
//             {lat: 35.8686617201},
//             {long: 128.5909297757},
//             {infocenter: '053-252-6606'},
//             {restdate: '일요일, 공휴일'},
//             {parking: '인근 공영주차장 이용'},
//             {parkingfee: '유료'},
//             {usetime: '13:30~17:30'},
//             {accomcountculture: '60명/일'},
//             {usefee: '무료'}
//         ]
//     ]},
//     {"festival":[]},
//     {"food":[
//         [
//             {contentid: 1015152},
//             {tit: '실비찜갈비'},
//             {img: 'http://tong.visitkorea.or.kr/cms/resource/89/1023889_image2_1.jpg'},
//             {overview: '※ 영업시간 09:00 ~ 22:00\n\n대구 동인동 찜갈비 골목에 위치한 곳으로 대구 특유…넣은 매운 찜갈비는 한약재를 넣고 찐 갈비를 마늘이 많이 들어간 매운 양념으로 볶아낸다.'},
//             {addr: '대구광역시 중구 동덕로36길 9-3'},
//             {homepage: undefined},
//             {lat: 35.8706756365},
//             {long: '128.6047840550'},
//             {infocenter: '053-424-3443'},
//             {restdate: '연중무휴'},
//             {parking: '주차 가능(30대)'},
//             {usetime: '09:00 ~ 22:00'},
//             {firstmenu: '찜갈비'},
//             {reservationfood: '전화 예약 가능 (053-424-3443)'}
//         ],
//         [
//             {contentid: 1015152},
//             {tit: '실비찜갈비22'},
//             {img: 'http://tong.visitkorea.or.kr/cms/resource/89/1023889_image2_1.jpg'},
//             {overview: '※ 영업시간 09:00 ~ 22:00\n\n대구 동인동 찜갈비 골목에 위치한 곳으로 대구 특유…넣은 매운 찜갈비는 한약재를 넣고 찐 갈비를 마늘이 많이 들어간 매운 양념으로 볶아낸다.'},
//             {addr: '대구광역시 중구 동덕로36길 9-3'},
//             {homepage: undefined},
//             {lat: 35.8706756365},
//             {long: '128.6047840550'},
//             {infocenter: '053-424-3443'},
//             {restdate: '연중무휴'},
//             {parking: '주차 가능(30대)'},
//             {usetime: '09:00 ~ 22:00'},
//             {firstmenu: '찜갈비'},
//             {reservationfood: '전화 예약 가능 (053-424-3443)'}
//         ],
//         [
//             {contentid: 1015152},
//             {tit: '실비찜갈비33'},
//             {img: 'http://tong.visitkorea.or.kr/cms/resource/89/1023889_image2_1.jpg'},
//             {overview: '※ 영업시간 09:00 ~ 22:00\n\n대구 동인동 찜갈비 골목에 위치한 곳으로 대구 특유…넣은 매운 찜갈비는 한약재를 넣고 찐 갈비를 마늘이 많이 들어간 매운 양념으로 볶아낸다.'},
//             {addr: '대구광역시 중구 동덕로36길 9-3'},
//             {homepage: undefined},
//             {lat: 35.8706756365},
//             {long: '128.6047840550'},
//             {infocenter: '053-424-3443'},
//             {restdate: '연중무휴'},
//             {parking: '주차 가능(30대)'},
//             {usetime: '09:00 ~ 22:00'},
//             {firstmenu: '찜갈비'},
//             {reservationfood: '전화 예약 가능 (053-424-3443)'}
//         ],
//         [
//             {contentid: 1015152},
//             {tit: '실비찜갈비44'},
//             {img: 'http://tong.visitkorea.or.kr/cms/resource/89/1023889_image2_1.jpg'},
//             {overview: '※ 영업시간 09:00 ~ 22:00\n\n대구 동인동 찜갈비 골목에 위치한 곳으로 대구 특유…넣은 매운 찜갈비는 한약재를 넣고 찐 갈비를 마늘이 많이 들어간 매운 양념으로 볶아낸다.'},
//             {addr: '대구광역시 중구 동덕로36길 9-3'},
//             {homepage: undefined},
//             {lat: 35.8706756365},
//             {long: '128.6047840550'},
//             {infocenter: '053-424-3443'},
//             {restdate: '연중무휴'},
//             {parking: '주차 가능(30대)'},
//             {usetime: '09:00 ~ 22:00'},
//             {firstmenu: '찜갈비'},
//             {reservationfood: '전화 예약 가능 (053-424-3443)'}
//         ],
//         [
//             {contentid: 1015152},
//             {tit: '실비찜갈비55'},
//             {img: 'http://tong.visitkorea.or.kr/cms/resource/89/1023889_image2_1.jpg'},
//             {overview: '※ 영업시간 09:00 ~ 22:00\n\n대구 동인동 찜갈비 골목에 위치한 곳으로 대구 특유…넣은 매운 찜갈비는 한약재를 넣고 찐 갈비를 마늘이 많이 들어간 매운 양념으로 볶아낸다.'},
//             {addr: '대구광역시 중구 동덕로36길 9-3'},
//             {homepage: undefined},
//             {lat: 35.8706756365},
//             {long: '128.6047840550'},
//             {infocenter: '053-424-3443'},
//             {restdate: '연중무휴'},
//             {parking: '주차 가능(30대)'},
//             {usetime: '09:00 ~ 22:00'},
//             {firstmenu: '찜갈비'},
//             {reservationfood: '전화 예약 가능 (053-424-3443)'}
//         ]
//     ]},
//     {"lodgment":[
//         {"namgu":[]}, //남구
//         {"dalseogu":[]}, //달서구
//         {"dalseonggun":[]}, //달성군
//         {"donggu":[]}, //동구
//         {"bukgu":[]}, //북구
//         {"seogu":[]}, //서구
//         {"suseonggu":[]}, //수성구
//         {"junggu":[]} //중구
//     ]},
//     {"tag":[
//         {"historic": []}, //유적지,사적지
//         {"park": []}, //공원
//         {"experience": []}, //이색체험
//         {"street": []}, //이색거리
//         {"museum": []}, //박물관
//         {"exhibition": []}, //전시관
//         {"gallery": []}, //미술관,화랑
//         {"market": []} //상설시장
//     ]}
// ]

// let newData = dataAll;


let sec1Btn = document.querySelectorAll('.sec1 .top .type-bt > button');
let sec1Box = document.querySelectorAll('.sec1 .contents .box');
let sec1Tit = document.querySelectorAll('.sec1 .contents .box > h2');
let sec1Thumbnail = document.querySelectorAll('.sec1 .contents .box > .thumbnail');
let sec1Overview = document.querySelectorAll('.sec1 .contents .box > .overview > .overtxt');
let sec1addr = document.querySelectorAll('.sec1 .contents .box > .overview .addr');
let sec1page = document.querySelectorAll('.sec1 .contents .box > .overview .page');
//sec2-tag
let sec2conBox = document.querySelectorAll('.sec2 .tag .conbox');
let sec2conTit = document.querySelectorAll('.sec2 .tag .conbox h3');
//sec2-festival
let sec2posterImg = document.querySelectorAll('.sec2 .festival .poster');
let sec2posterInfoTit = document.querySelectorAll('.sec2 .festival .poster-info h2');
let sec2posterInfoAddr = document.querySelectorAll('.sec2 .festival .poster-info .addr');
let sec2posterInfoPage = document.querySelectorAll('.sec2 .festival .poster-info .page');
let sec2posterInfoOverview = document.querySelectorAll('.sec2 .festival .poster-info .overtxt');



function imgAdd(el, index, imgAddr){
    var boxImg = document.createElement('img');
    boxImg.setAttribute('src', imgAddr);
    boxImg.setAttribute('alt', "Thumbnail");
    boxImg.style = 'width:100%; height:100%; display:block;';

    if (el[index].getElementsByTagName('img').length > 0){
        el[index].replaceChild(boxImg, el[index].lastChild);
    } else {
        el[index].appendChild(boxImg);
    }
}

// window.addEventListener('load', function(){
//     console.log(newData);

//     // console.log(newData[0].tourism[0][1].tit);
//     setTimeout(function(){
//         for(var i=0; i<5; i++){
//             sec1Tit[i].innerHTML = (newData[0].tourism[i][1].tit);
//             imgAdd(sec1Thumbnail, i, newData[0].tourism[i][2].img);
//             sec1Overview[i].innerHTML = (newData[0].tourism[i][3].overview);
//             sec1addr[i].innerHTML = (newData[0].tourism[i][4].addr);
//             sec1page[i].innerHTML = (newData[0].tourism[i][5].homepage);
//         }
//         for(var i=0; i<5; i++){
//             sec2conTit[i].innerHTML = (newData[5].tag[0].historic[i][0].tit);
//             imgAdd(sec2conBox, i, newData[5].tag[0].historic[i][1].firstimage);
//         }
//         for(var i=0; i<5; i++){
//             imgAdd(sec2posterImg, i, newData[2].festival[i][2].img);
//             sec2posterInfoTit[i].innerHTML = (newData[2].festival[i][1].tit);
//             sec2posterInfoOverview[i].innerHTML = (newData[2].festival[i][3].overview);
//             sec2posterInfoAddr[i].innerHTML = (newData[2].festival[i][4].addr);
//             sec2posterInfoPage[i].innerHTML = (newData[2].festival[i][5].homepage);
//         }

//     }, 10000);
    
// })




// console.log(dataAll);
// console.log(dataAll[5].tag[0].historic[0][0].tit);


function copyBox()  {
    const testDiv = document.querySelector('.sec3_box');
    
    // 노드 복사하기
    const newNode = testDiv.cloneNode(true);
    
    // 복사된 Node id 변경하기
    // newNode.id = 'copyNode';
  
    // 복사한 노드 붙여넣기
    testDiv.after(newNode);
}

// copyBox();


// CORS이슈, 외부API를 사용하고 있는 입장에서는 서버를 제어할 수 없으므로 구글링에 나오는 해결법 중 HTTP 응답 헤더인 Access-Control-Allow-Origin 를 설정할 수 없음
// 프록시 서버를 사용하여 우회하는 방식으로 해결 https://cors-anywhere.herokuapp.com/
// 이 주소를 받아오는 api url 앞에 붙이는 형식으로 쓰면 된다.
//ex: `https://cors-anywhere.herokuapp.com/https://api.odcloud.kr/api/GetStockSecuritiesInfoService/v1/getStockPriceInfo?numOfRows=3&resultType=json&likeSrtnCd=${codeStock}&serviceKey=${serviceKey}`;
// 프록시서버는 클라이언트가 프록시 서버 자신을 통해서 다른 네트워크 서비스에 간접적으로 접속할 수 있게 해 준다. 브라우저와 서버 간의 통신을 도와주는 중계서버라고 생각하면 된다.

