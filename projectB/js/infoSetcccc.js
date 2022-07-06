let thisSection;

let sec1Btn = document.querySelectorAll('.sec1 .top .type-bt > button');
let sec1Box = document.querySelectorAll('.sec1 .contents .box');
let sec1Tit = document.querySelectorAll('.sec1 .contents .box > h2');
let sec1Thumbnail = document.querySelectorAll('.sec1 .contents .box > .thumbnail');
let sec1Overview = document.querySelectorAll('.sec1 .contents .box > .overview > .overtxt');
let sec1addr = document.querySelectorAll('.sec1 .contents .box > .overview .addr');
let sec1page = document.querySelectorAll('.sec1 .contents .box > .overview .page');

let sec1contit = [];
let sec1contentId = [];
let sec1conTypeId;
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
function titSet(conlist, sec){
    return new Promise(function(resolve, reject){
        conlist.onreadystatechange = function(){
            if(conlist.readyState == 4 && conlist.status == 200){

                var conJson = JSON.parse(conlist.response);
                
                list = conJson['response'].body.items.item;
                
                sec1contit = []; //초기화
                sec3contit = []; //초기화
                var sec1conId = []; //초기화
                var sec3conId = []; //초기화

                if(sec == 1){
                    for(var i = 0; i < list.length; i++){
                        sec1contit.push(list[i].title);
                        sec1Tit[i].textContent = sec1contit[i];
                        sec1conId.push(list[i].contentid);
                    }
                    resolve(sec1conId);
                } else{
                    for(var i = 0; i < list.length; i++){
                        sec3contit.push(list[i].title);
                        sec3Tit[i].textContent = sec3contit[i];
                        sec3conId.push(list[i].contentid);
                    }
                    resolve(sec3conId);
                }

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

function datapush(detList, index, sec){
    if(sec == 1){
        sec1Overview[index].innerHTML = detList.overview;
        console.log(sec);
        // imgAdd(detList, index);
        // addrAdd(detList, index);
        // homeAdd(detList, index);
    } else{
        sec3Overview[index].innerHTML = detList.overview;
        console.log(sec);
        // imgAdd(detList, index);
        // addrAdd(detList, index);
        // homeAdd(detList, index);
    }
    
};

function dataChoice(dataNum, detList, sec){
    console.log(detList);
    if(startIndex == 0 || dataNum == 0){
        datapush(detList, 0, sec);
    } else if(dataNum == 1){
        datapush(detList, 1, sec);
    } else if(dataNum == 2){
        datapush(detList, 2, sec);
    } else if(dataNum == 3){
        datapush(detList, 3, sec);
    } else{
        datapush(detList, 4, sec);
    } 
}

//공통정보
function detailCommonCall(sec){
    return new Promise(function(resolve, reject){
        detailCommonList.onreadystatechange = function(){
            if(detailCommonList.readyState == 4 && detailCommonList.status == 200){
                var deatilCommonJsonObj = JSON.parse(detailCommonList.response);
                var detList = deatilCommonJsonObj['response'].body.items.item;

                console.log(sec);
                if(sec == 1){
                    console.log(sec);
                    if(startIndex == 0 || dataNum == 0){
                        datapush(detList, 0, sec);
                    } else if(dataNum == 1){
                        datapush(detList, 1, sec);
                    } else if(dataNum == 2){
                        datapush(detList, 2, sec);
                    } else if(dataNum == 3){
                        datapush(detList, 3, sec);
                    } else{
                        datapush(detList, 4, sec);
                    } 
                } else{
                    if(startIndex == 0 || dataNum == 0){
                        datapush(detList, 0, sec);
                    } else if(dataNum == 1){
                        datapush(detList, 1, sec);
                    } else if(dataNum == 2){
                        datapush(detList, 2, sec);
                    } else if(dataNum == 3){
                        datapush(detList, 3, sec);
                    } else{
                        datapush(detList, 4, sec);
                    } 
                }          
            }
        }
        detailCommonList.send();
    });
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
async function dataSet(sec){
    if(sec == -1){
        var type = conListSet(sec1conTypeId);
        sec1contentId = await titSet(type, 1);
        var type2 = lodgmentListSet(sec3areaCode);
        sec3contentId = await titSet(type2, 3);
    } else if(sec == 1){
        var type = conListSet(sec1conTypeId);
        sec1contentId = await titSet(type, 1);
    } else{
        var type2 = lodgmentListSet(sec3areaCode);
        sec3contentId = await titSet(type2, 3);
    }
    
}

async function dataSet2(num, sec){
    if(sec == 1){
        detailCommon(sec1contentId[num]);
        await detailCommonCall(1);
        console.log('1');
    } else{
        detailCommon(sec3contentId[num]);
        await detailCommonCall(3);
        console.log('3');
    }
}

function dataSet3(num){
    detailIntro(contentId[num], conTypeId);
    detailIntroCall();
}

async function typeDataSet(typedata, sec){
    if(sec == 1){
        sec1conTypeId = typedata.dataset.code;
        dataNum = typedata.dataset.num;
        await dataSet(sec);
        dataSet2(dataNum, sec);
    } else{
        sec3areaCode = typedata.dataset.code;
        dataNum = typedata.dataset.num;
        await dataSet(sec);
        dataSet2(dataNum, sec);
    }
    
};

//box클릭 시
function boxClick(thisbox){
    startIndex = null;
    dataNum = thisbox.dataset.num;
    dataSet2(dataNum);
};

//처음 화면이 로드 되었을 때
var startIndex;
window.addEventListener("load", async function(){
    startIndex = 0;
    sec1conTypeId = '12';
    sec3areaCode = '1';
    await dataSet(-1);
    await dataSet2(0, 1);
    dataSet2(0, 3);
})

sec1Btn[0].addEventListener('click', function(){
    typeDataSet(this, 1);
});
sec1Btn[1].addEventListener('click', function(){
    typeDataSet(this, 1);
});
sec1Btn[2].addEventListener('click', function(){
    typeDataSet(this, 1);
});

//sec1 박스클릭
var dataNum;

sec1Box[0].addEventListener('click', function(){
    boxClick(this);
});
sec1Box[1].addEventListener('click', function(){
    boxClick(this);
});
sec1Box[2].addEventListener('click', function(){
    boxClick(this);
});
sec1Box[3].addEventListener('click', function(){
    boxClick(this);
});
sec1Box[4].addEventListener('click', function(){
    boxClick(this);
});



//sec3 숙박정보 관련
let sec3contit = [];
let sec3contentId = [];
let sec3areaCode;

let sec3Btn = document.querySelectorAll('.sec3 .top .type-bt > button');
let sec3Box = document.querySelectorAll('.sec3 .contents .box');
let sec3Tit = document.querySelectorAll('.sec3 .contents .box > h2');
let sec3Thumbnail = document.querySelectorAll('.sec3 .contents .box > .thumbnail');
let sec3Overview = document.querySelectorAll('.sec3 .contents .box > .overview > .overtxt');
let sec3addr = document.querySelectorAll('.sec3 .contents .box > .overview .addr');
let sec3page = document.querySelectorAll('.sec3 .contents .box > .overview .page');


//시군구 코드를 받아와서 숙박을 조회수 순으로 조회--------------------------여기서부터 이름 바꿔주는 작업좀 하고------------------------------
var lodgmentlist = new XMLHttpRequest();

function lodgmentListSet(areaCode){
    var lodgmentListUrl = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList'; /*URL*/

    var queryParams = serviceKey; /*Service Key*/
    queryParams += '&' + 'numOfRows' + '=' + '5'; /**/
    queryParams += '&' + 'pageNo' + '=' + '1'; /**/
    queryParams += '&' + 'MobileOS' + '=' + 'ETC'; /**/
    queryParams += '&' + 'MobileApp' + '=' + 'AppTest'; /**/
    queryParams += '&' + 'arrange' + '=' + 'P'; /**/
    queryParams += '&' + 'contentTypeId' + '=' + '32'; /*숙박*/
    queryParams += '&' + 'areaCode' + '=' + '4'; /**/
    queryParams += '&' + 'sigunguCode' + '=' + areaCode; /**/
    queryParams += '&_type=json';
    lodgmentlist.open('GET', lodgmentListUrl + queryParams);

    return lodgmentlist;

    // lodgmentlist.onreadystatechange = function(){
    //     if(lodgmentlist.readyState == 4 && lodgmentlist.status == 200){

    //         var lodgmentJson = JSON.parse(lodgmentlist.response);
    //         var lodList = lodgmentJson['response'].body.items.item;
    //     };
    // };
    // lodgmentlist.send("");
};
// lodgmentListSet();

sec3Btn[0].addEventListener('click', function(){
    typeDataSet(this, 3);
});
// sec3Btn[1].addEventListener('click', function(){
//     typeDataSet(this);
// });
// sec3Btn[2].addEventListener('click', function(){
//     typeDataSet(this);
// });
// sec3Btn[3].addEventListener('click', function(){
//     typeDataSet(this);
// });
// sec3Btn[4].addEventListener('click', function(){
//     typeDataSet(this);
// });
// sec3Btn[5].addEventListener('click', function(){
//     typeDataSet(this);
// });
// sec3Btn[6].addEventListener('click', function(){
//     typeDataSet(this);
// });
// sec3Btn[7].addEventListener('click', function(){
//     typeDataSet(this);
// });

