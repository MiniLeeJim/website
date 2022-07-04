let sec1Btn = document.querySelectorAll('.sec1 .top .type-bt > button');
let sec1Box = document.querySelectorAll('.sec1 .contents .box');
let sec1Tit = document.querySelectorAll('.sec1 .contents .box > h2');
let sec1Thumbnail = document.querySelectorAll('.sec1 .contents .box > .thumbnail');
let sec1Overview = document.querySelectorAll('.sec1 .contents .box > .overview');


let area;
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
    // console.log(areaBasedListUrl + queryParams);
    return conlist;
};

//conId 받아서 저장하기, contit 넣기
function conIdTitSet(conlist){
    return new Promise(function(resolve, reject){
        conlist.onreadystatechange = function(){
            if(conlist.readyState == 4 && conlist.status == 200){

                var conJson = JSON.parse(conlist.response);
                // console.log(conJson);
                
                list = conJson['response'].body.items.item;
                console.log(list);
        
                var conId = []; //초기화
                for(var i = 0; i < list.length; i++){
                    contit.push(list[i].title);
                    sec1Tit[i].textContent = contit[i];
                    conId.push(list[i].contentid);
                }
                // console.log(conId);
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
    
    var detailCommonParams = serviceKey; /*Service Key*/
    detailCommonParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1'); /**/
    detailCommonParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    detailCommonParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
    detailCommonParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /**/
    detailCommonParams += '&' + encodeURIComponent('contentId') + '=' + contentId; /**/
    detailCommonParams += '&' + encodeURIComponent('defaultYN') + '=' + encodeURIComponent('Y'); /**/
    detailCommonParams += '&' + encodeURIComponent('firstImageYN') + '=' + encodeURIComponent('Y'); /**/
    detailCommonParams += '&' + encodeURIComponent('addrinfoYN') + '=' + encodeURIComponent('Y'); /**/
    detailCommonParams += '&' + encodeURIComponent('mapinfoYN') + '=' + encodeURIComponent('Y'); /**/
    detailCommonParams += '&' + encodeURIComponent('overviewYN') + '=' + encodeURIComponent('Y'); /**/
    detailCommonParams += '&_type=json';
    detailCommonList.open('GET', detailCommonUrl + detailCommonParams);
}

//공통정보
function detailCommonCall(){
    detailCommonList.onreadystatechange = function(){
        if(detailCommonList.readyState == 4 && detailCommonList.status == 200){
            var deatilCommonJsonObj = JSON.parse(detailCommonList.response);
            var detList = deatilCommonJsonObj['response'].body.items.item;

            // if(area == 'sec1'){
            //     // sec1Tit.textContent = detList.title; //제목
            //     imgAdd(detList); //이미지
            //     sec1Overview.innerHTML = detList.overview; //개요
            // }
            // tit.textContent = detList.title; //제목
            // imgAdd(detList); //이미지
            sec1Overview[0].innerHTML = detList.overview; //개요  //여기서부터수정-----------------------------------이미지 넣는것도 수정----
            // homeAdd(detList); //홈페이지    
            // addrAdd(detList); //주소
        }
    }
    detailCommonList.send();
}

//해당 데이터가 없을때(undefined) '-'를 출력해주는 함수
function nulldata(variable, data){
    if( data == undefined || data == 0) variable.textContent = '-';
}

//(관광지 공통정보)이미지추가 함수
function imgAdd(detList){
    var detImg = document.createElement("div");
    detImg.style = `background : url(${detList.firstimage}) no-repeat center / contain; width : 100%; height: 100%;`;
    
    if (sec1Thumbnail.getElementsByTagName('div').length > 0){
        sec1Thumbnail.replaceChild(detImg, sec1Thumbnail.lastChild);
    } else {
        sec1Thumbnail.appendChild(detImg);
    }
}

//데이터 set
async function dataSet(){
    var type = conListSet(conTypeId);
    contentId = await conIdTitSet(type);
    // console.log(contentId);
}

function dataSet2(num){
    detailCommon(contentId[num]);
    // detailIntro(contentId[num], conTypeId);
    detailCommonCall();
    // detailIntroCall();
}

//처음 화면이 로드 되었을 때
window.addEventListener("load", async function(){
    conTypeId = '12';
    await dataSet();
    dataSet2(0);
})

// sec1Btn[0].addEventListener('click', async function(){
//     conTypeId = this.dataset.typecode;
//     area = this.dataset.area;
//     await dataSet(conTypeId);
//     console.log(contentId);
// });
// sec1Box[0].addEventListener('click', async function(){

// });