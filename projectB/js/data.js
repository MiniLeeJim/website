let data = document.querySelector('.wrap01');
let conId = [];
let conTit = [];
let conImg = [];
let conOverV = [];

let serviceKey = '?serviceKey=3urh8C0NVH6wzrXIQEu4isiHyIW2yqSa0cXLO3JrUsxkQPVhI%2BO%2BlSi64N%2BpYYXTFfCmpkx0y6Okb96gS8wnRQ%3D%3D';

function tourism(type){
    return new Promise(function(resolve, reject){
        var conlist = new XMLHttpRequest();
        conlist.open('GET', 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?serviceKey=3urh8C0NVH6wzrXIQEu4isiHyIW2yqSa0cXLO3JrUsxkQPVhI%2BO%2BlSi64N%2BpYYXTFfCmpkx0y6Okb96gS8wnRQ%3D%3D&numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=P&contentTypeId=12&areaCode=4&_type=json');
        
        conlist.onreadystatechange = function(){
            if(conlist.readyState == 4 && conlist.status == 200){
        
                var conJson = JSON.parse(conlist.response);   
                var list = conJson['response'].body.items.item;

                // conId = [];
    
                for(var i=0; i<list.length; i++){
                    conId.push(list[i].contentid);
                }
                resolve(conId);
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

                // conTit = [];
                // conImg = [];
                // conOverV = [];

                conTit.push(detList.title);
                conImg.push(detList.firstimage);
                conOverV.push(detList.overview);
                resolve(conTit, conImg, conOverV);
            }
        }
        detailCommonList.send();
    });
}


async function tourismSet(){
    
}
async function cultureSet(){
    await tourism();
    for(var i=0; i<conId.length; i++){
        await detailCommon(conId[i]);
        infoAdd(conTit[i], conImg[i], conOverV[i]);
    }
}
async function foodSet(){
    await tourism();
    for(var i=0; i<conId.length; i++){
        await detailCommon(conId[i]);
        infoAdd(conTit[i], conImg[i], conOverV[i]);
    }
}



window.addEventListener('load', async function(){
    await tourism();
    for(var i=0; i<conId.length; i++){
        await detailCommon(conId[i]);
        infoAdd(conTit[i], conImg[i], conOverV[i]);
    }
    // cultureSet();
    // foodSet();
})



function infoAdd(conTit, conImg, conOverV){
    var inner = document.createElement("div");
    var tit = document.createElement("h3");
    var img = document.createElement("div");
    var overview = document.createElement("p");

    img.style = `background : url(${conImg}) no-repeat center / contain; width : 100px; height: 100px;`;

    tit.innerHTML = conTit;
    // img.innerHTML = conImg;
    overview.innerHTML = conOverV;

    inner.appendChild(tit);
    inner.appendChild(img);
    inner.appendChild(overview);

    data.appendChild(inner);
}

