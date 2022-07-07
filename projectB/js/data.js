let mapJson = {
    "tourism":{
        "x":[],
        "y":[]
    },
    "culture":{
        "x":[],
        "y":[]
    },
    "food":{
        "x":[],
        "y":[]
    }
};








/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let data1 = document.querySelector('.wrap01');
let data2 = document.querySelector('.wrap02');
let data3 = document.querySelector('.wrap03');
let data4 = document.querySelector('.wrap04');

let sigungu1 = document.querySelector('.sigungu01');
let sigungu2 = document.querySelector('.sigungu02');
let sigungu3 = document.querySelector('.sigungu02');
let sigungu4 = document.querySelector('.sigungu04');
let sigungu5 = document.querySelector('.sigungu05');
let sigungu6 = document.querySelector('.sigungu06');
let sigungu7 = document.querySelector('.sigungu07');
let sigungu8 = document.querySelector('.sigungu08');

let conId = [];
let conTit = [];
let conImg = [];
let conOverV = [];
let sigunguCode = [1,2,3,4,5,6,7,8];

let serviceKey = '?serviceKey=3urh8C0NVH6wzrXIQEu4isiHyIW2yqSa0cXLO3JrUsxkQPVhI%2BO%2BlSi64N%2BpYYXTFfCmpkx0y6Okb96gS8wnRQ%3D%3D';

//시군구로 필터
function sigunguTourism(type){
    return new Promise(function(resolve, reject){
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
        queryParams += '&' + 'sigunguCode' + '=' + type; /**/
        queryParams += '&_type=json';
        lodgmentlist.open('GET', lodgmentListUrl + queryParams);
        
        lodgmentlist.onreadystatechange = function(){
            if(lodgmentlist.readyState == 4 && lodgmentlist.status == 200){
        
                var lodgmentJson = JSON.parse(lodgmentlist.response);   
                var list = lodgmentJson['response'].body.items.item;

                // console.log(list);

                for(var i=0; i<list.length; i++){
                    conId.push(list[i].contentid);
                }
                resolve(conId);
            };
        };
        lodgmentlist.send("");  
    }); 
}


//관광 타입으로 필터
function tourism(type){
    return new Promise(function(resolve, reject){
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
                console.log(list);

    
                for(var i=0; i<list.length; i++){
                    conId.push(list[i].contentid);
                    if(type == 12){
                        mapJson.tourism.x.push(list[i].mapx);
                        mapJson.tourism.y.push(list[i].mapy);
                    }else if(type == 14){
                        mapJson.culture.x.push(list[i].mapx);
                        mapJson.culture.y.push(list[i].mapy);
                    }else{
                        mapJson.food.x.push(list[i].mapx);
                        mapJson.food.y.push(list[i].mapy);
                    }
                }
                resolve(conId, mapJson);
            };
        };
        conlist.send("");  
    }); 
}

function detailCommon(contentId){
    return new Promise(function(resolve, reject){
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
        console.log(detailCommonUrl + queryParams);

        detailCommonList.onreadystatechange = function(){
            if(detailCommonList.readyState == 4 && detailCommonList.status == 200){

                var deatilCommonJsonObj = JSON.parse(detailCommonList.response);
                var detList = deatilCommonJsonObj['response'].body.items.item;

                

                conTit.push(detList.title);
                conImg.push(detList.firstimage);
                conOverV.push(detList.overview);
                resolve(conTit, conImg, conOverV);
            }
        }
        detailCommonList.send();
    });
}


async function tourismSet(type){
    conId = [];
    conTit = [];
    conImg = [];
    conOverV = [];
    await tourism(type);
    // for(var i=0; i<conId.length; i++){
    //     await detailCommon(conId[i]);
    //     infoAdd1(conTit[i], conImg[i], conOverV[i]);
    // }
}
async function cultureSet(type){
    conId = [];
    conTit = [];
    conImg = [];
    conOverV = [];
    await tourism(type);
    // for(var i=0; i<conId.length; i++){
    //     await detailCommon(conId[i]);
    //     infoAdd2(conTit[i], conImg[i], conOverV[i]);
    // }
}
async function foodSet(type){
    conId = [];
    conTit = [];
    conImg = [];
    conOverV = [];
    await tourism(type);
    // for(var i=0; i<conId.length; i++){
    //     await detailCommon(conId[i]);
    //     infoAdd3(conTit[i], conImg[i], conOverV[i]);
    // }
}
async function lodgmentSet(){
    conId = [];
    conTit = [];
    conImg = [];
    conOverV = [];
    for(var i=0; i<sigunguCode.length; i++){
        await sigunguTourism(sigunguCode[i]);
        console.log(conId);
        for(var j=0; j<conId.length; j++){
            await detailCommon(conId[j]);
            infoAdd4(conTit[j], conImg[j], conOverV[j], sigunguCode[i]);
        }
    }
}


window.addEventListener('load', async function(){
    await tourismSet(12);
    await cultureSet(14);
    await foodSet(39);
    console.log(mapJson);
    // lodgmentSet();
    
})


function infoAdd1(conTit, conImg, conOverV){
    var inner = document.createElement("div");
    var tit = document.createElement("h4");
    var img = document.createElement("div");
    var overview = document.createElement("p");

    img.style = `background : url(${conImg}) no-repeat center / contain; width : 100px; height: 100px;`;

    tit.innerHTML = conTit;
    overview.innerHTML = conOverV;

    inner.appendChild(tit);
    inner.appendChild(img);
    inner.appendChild(overview);

    data1.appendChild(inner);
}
function infoAdd2(conTit, conImg, conOverV){
    var inner = document.createElement("div");
    var tit = document.createElement("h4");
    var img = document.createElement("div");
    var overview = document.createElement("p");

    img.style = `background : url(${conImg}) no-repeat center / contain; width : 100px; height: 100px;`;

    tit.innerHTML = conTit;
    overview.innerHTML = conOverV;

    inner.appendChild(tit);
    inner.appendChild(img);
    inner.appendChild(overview);

    data2.appendChild(inner);
}
function infoAdd3(conTit, conImg, conOverV){
    var inner = document.createElement("div");
    var tit = document.createElement("h4");
    var img = document.createElement("div");
    var overview = document.createElement("p");

    img.style = `background : url(${conImg}) no-repeat center / contain; width : 100px; height: 100px;`;

    tit.innerHTML = conTit;
    overview.innerHTML = conOverV;

    inner.appendChild(tit);
    inner.appendChild(img);
    inner.appendChild(overview);

    data3.appendChild(inner);
}
function infoAdd4(conTit, conImg, conOverV, sigunguCode){
    var inner = document.createElement("div");
    var tit = document.createElement("h4");
    var img = document.createElement("div");
    var overview = document.createElement("p");

    img.style = `background : url(${conImg}) no-repeat center / contain; width : 100px; height: 100px;`;

    tit.innerHTML = conTit;
    overview.innerHTML = conOverV;

    inner.appendChild(tit);
    inner.appendChild(img);
    inner.appendChild(overview);

    if(sigunguCode == 1){
        sigungu1.appendChild(inner);
    } else if(sigunguCode == 2){
        sigungu2.appendChild(inner);
    } else if(sigunguCode == 3){
        sigungu3.appendChild(inner);
    } else if(sigunguCode == 4){
        sigungu4.appendChild(inner);
    } else if(sigunguCode == 5){
        sigungu5.appendChild(inner);
    } else if(sigunguCode == 6){
        sigungu6.appendChild(inner);
    } else if(sigunguCode == 7){
        sigungu7.appendChild(inner);
    } else{
        sigungu8.appendChild(inner);
    }
    
}


//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////


//지도 api

let kakaomap = document.querySelector('#map');
let pop = document.querySelector('.pop');
let bt01 = document.querySelector('.bt01');
let bt02 = document.querySelector('.bt02');
let bt03 = document.querySelector('.bt03');
let bt04 = document.querySelector('.bt04');
let bt05 = document.querySelector('.bt05');
let closebt = document.querySelector('.close');
let markerPosition;
let marker;
let map;

let bounds = new kakao.maps.LatLngBounds();

function mapGet(lat, long){
    markerPosition = new kakao.maps.LatLng(lat, long);
    console.log(markerPosition);

    let options = {
        center: markerPosition
    };

    marker = new kakao.maps.Marker({
        position: markerPosition
    });

    map = new kakao.maps.Map(kakaomap, options);
    marker.setMap(map);
    
    // bounds.extend(markerPosition);
}

function mapSet(){
    pop.classList.add('on');
    map.relayout();
    map.setCenter(markerPosition);
    // map.setBounds(bounds);
    map.setLevel(4, markerPosition);
}

bt01.addEventListener('click', function(){
    mapGet(mapJson.tourism.y[0], mapJson.tourism.x[0]);
    mapSet();
})
bt02.addEventListener('click', function(){
    mapGet(mapJson.tourism.y[1], mapJson.tourism.x[1]);
    mapSet();
})
bt03.addEventListener('click', function(){
    mapGet(mapJson.tourism.y[2], mapJson.tourism.x[2]);
    mapSet();
})
bt04.addEventListener('click', function(){
    mapGet(mapJson.tourism.y[3], mapJson.tourism.x[3]);
    mapSet();
})
bt05.addEventListener('click', function(){
    mapGet(mapJson.tourism.y[4], mapJson.tourism.x[4]);
    mapSet();
})
closebt.addEventListener('click',function(){
    pop.classList.remove('on');

})


//버튼
$(function(){
    $('.close').on('click', function(){
        $('#map').empty();
    });
})
