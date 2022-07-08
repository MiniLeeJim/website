// let dateAll = {
//     "tourism":{
//         "tit":[],
//         "img":[],
//         "addr":[],
//         "page":[],
//         "overview":[],
//         "mapx":[],
//         "mapy":[],
//         "tel":[],
//         "dayoff":[],
//         "parking":[],
//         "hours":[],
//         "pet":[],
//         "experience":[]
//     },
//     "culture":{},
//     "food":{},
//     "lodgment":{},
//     "festival":{},
//     "tag":{}
// };

// let dataAll = [];
// let a = 'apple'

// dataAll.push({'key1':[a]},{'key2':['2']});
// dataAll[0].key1.push('2');

// console.log(dataAll);

// let data1 = dataAll[0].key1;
// console.log(data1);
    
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


let conId = [];
let conTit = [];
let conImg = [];
let conOverV = [];
let aaaa = [];
let a;

let serviceKey = '?serviceKey=3urh8C0NVH6wzrXIQEu4isiHyIW2yqSa0cXLO3JrUsxkQPVhI%2BO%2BlSi64N%2BpYYXTFfCmpkx0y6Okb96gS8wnRQ%3D%3D';


var conlist = new XMLHttpRequest();

let url= 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?serviceKey=3urh8C0NVH6wzrXIQEu4isiHyIW2yqSa0cXLO3JrUsxkQPVhI%2BO%2BlSi64N%2BpYYXTFfCmpkx0y6Okb96gS8wnRQ%3D%3D&numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=P&contentTypeId=12&areaCode=4&_type=json'

conlist.open('GET', url);

conlist.onreadystatechange = function(){
    if(conlist.readyState == 4 && conlist.status == 200){

        var conJson = JSON.parse(conlist.response);   
        var list = conJson['response'].body.items.item;
        console.log(list);


        for(var i=0; i<list.length; i++){
            conId.push(list[i].contentid);
            conTit.push(list[i].title);
        }
        aaaa.push(conId, conTit);
        a = new File([aaaa], 'aaaa.txt');
    };
};
conlist.send(""); 

