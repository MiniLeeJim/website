let thisSection;

let sec1Btn = document.querySelectorAll('.sec1 .top .type-bt > button');
let sec1Box = document.querySelectorAll('.sec1 .contents .box');
let sec1Tit = document.querySelectorAll('.sec1 .contents .box > h2');
let sec1Thumbnail = document.querySelectorAll('.sec1 .contents .box > .thumbnail');
let sec1Overview = document.querySelectorAll('.sec1 .contents .box > .overview > .overtxt');
let sec1addr = document.querySelectorAll('.sec1 .contents .box > .overview .addr');
let sec1page = document.querySelectorAll('.sec1 .contents .box > .overview .page');

let contit = [];
let contentId = [];
let conTypeId;
let list;
let serviceKey = '?serviceKey=3urh8C0NVH6wzrXIQEu4isiHyIW2yqSa0cXLO3JrUsxkQPVhI%2BO%2BlSi64N%2BpYYXTFfCmpkx0y6Okb96gS8wnRQ%3D%3D';


//관광지 리스트 뽑기
var conlist = new XMLHttpRequest();
function conListSet(type){
    var areaBasedListUrl = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList'; /*URL*/

    var queryParams = serviceKey; /*Service Key*/
    queryParams += '&' + 'numOfRows' + '=' + '5'; /**/
    queryParams += '&' + 'pageNo' + '=' + '1'; /**/
    queryParams += '&' + 'MobileOS' + '=' + 'ETC'; /**/
    queryParams += '&' + 'MobileApp' + '=' + 'AppTest'; /**/
    queryParams += '&' + 'arrange' + '=' + 'P'; /**/
    queryParams += '&' + 'contentTypeId' + '=' + type; /*contentTypeId*/
    queryParams += '&' + 'areaCode' + '=' + '4'; /**/
    queryParams += '&_type=json';
    conlist.open('GET', areaBasedListUrl + queryParams);
    return conlist;
};

//conId 받아서 저장하기, contit 넣기
function conIdTitSet(conlist){
    return new Promise(function(resolve, reject){
        conlist.onreadystatechange = function(){
            if(conlist.readyState == 4 && conlist.status == 200){

                var conJson = JSON.parse(conlist.response);
                
                list = conJson['response'].body.items.item;
                
                contit = []; //초기화
                var conId = []; //초기화
                for(var i = 0; i < list.length; i++){
                    contit.push(list[i].title);
                    sec1Tit[i].textContent = contit[i];
                    conId.push(list[i].contentid);
                }
                resolve(conId);
            };
        };
        conlist.send("");
    });
}






//공통정보 url
var detailCommonList = new XMLHttpRequest(); 

function detailCommon(contentId){
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
}

function datapush(detList, index){
    sec1Overview[index].innerHTML = detList.overview;
    imgAdd(detList, index);
    addrAdd(detList, index);
    homeAdd(detList, index);
};

//공통정보
function detailCommonCall(){
    detailCommonList.onreadystatechange = function(){
        if(detailCommonList.readyState == 4 && detailCommonList.status == 200){
            var deatilCommonJsonObj = JSON.parse(detailCommonList.response);
            var detList = deatilCommonJsonObj['response'].body.items.item;

            //중첩이프문 들어가야 할듯 sec1이냐 sec3이냐 물어보기 true면 sec1 실행 false면 sec3실행
            //아니면 if에 조건 추가하기. sec1이 트루냐는 조건을 and로 넣기
            if(startIndex == 0 || dataNum == 0){
                datapush(detList, 0);
            } else if(dataNum == 1){
                datapush(detList, 1);
            } else if(dataNum == 2){
                datapush(detList, 2);
            } else if(dataNum == 3){
                datapush(detList, 3);
            } else{
                datapush(detList, 4);
            } 
        }
    }
    detailCommonList.send();
}

//해당 데이터가 없을때(undefined) '-'를 출력해주는 함수
function nulldata(variable, data){
    if( data == undefined || data == 0) variable.textContent = '-';
}

//(관광지 공통정보)이미지추가 함수
function imgAdd(detList, index){
    var detImg = document.createElement("div");
    detImg.style = `background : url(${detList.firstimage}) no-repeat center / contain; width : 100%; height: 100%;`;
    
    if (sec1Thumbnail[index].getElementsByTagName('div').length > 0){
        sec1Thumbnail[index].replaceChild(detImg, sec1Thumbnail[index].lastChild);
    } else {
        sec1Thumbnail[index].appendChild(detImg);
    }
}

//(관광지 공통정보)주소추가 함수
function addrAdd(detList, index){
    sec1addr[index].textContent = detList.addr1;
    nulldata(sec1addr[index], detList.addr1);
}

//(관광지 공통정보)홈페이지추가 함수
function homeAdd(detList, index){
    sec1page[index].innerHTML = detList.homepage;
    nulldata(sec1page[index], detList.homepage);
}

//데이터 set
async function dataSet(){
    var type = conListSet(conTypeId);
    contentId = await conIdTitSet(type);
}

function dataSet2(num){
    detailCommon(contentId[num]);
    detailCommonCall();
}

function dataSet3(num){
    detailIntro(contentId[num], conTypeId);
    detailIntroCall();
}

async function typeDataSet(typedata){
    conTypeId = typedata.dataset.code;
    dataNum = typedata.dataset.num;
    await dataSet();
    dataSet2(dataNum);
};

//box클릭 시
function boxClick(thisbox){
    startIndex = null;
    dataNum = thisbox.dataset.num;
    dataSet2(dataNum);
};

//처음 화면이 로드 되었을 때
// var startIndex;
// window.addEventListener("load", async function(){
//     startIndex = 0;
//     conTypeId = '12';
//     await dataSet();
//     dataSet2(0);
// })

// sec1Btn[0].addEventListener('click', function(){
//     typeDataSet(this);
// });
// sec1Btn[1].addEventListener('click', function(){
//     typeDataSet(this);
// });
// sec1Btn[2].addEventListener('click', function(){
//     typeDataSet(this);
// });

// //sec1 박스클릭
// var dataNum;

// sec1Box[0].addEventListener('click', function(){
//     boxClick(this);
// });
// sec1Box[1].addEventListener('click', function(){
//     boxClick(this);
// });
// sec1Box[2].addEventListener('click', function(){
//     boxClick(this);
// });
// sec1Box[3].addEventListener('click', function(){
//     boxClick(this);
// });
// sec1Box[4].addEventListener('click', function(){
//     boxClick(this);
// });


