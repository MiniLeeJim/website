const conBt = document.querySelectorAll(".snb li");
const subCon = document.querySelectorAll(".sub_con");
Array.from(conBt).forEach(function(btName, index){
    btName.addEventListener('click', function(){
        for(var i = 0; i < subCon.length; i++){
            subCon[i].classList.remove('on');
            conBt[i].classList.remove('on');
        }
        subCon[index].classList.add('on');
        conBt[index].classList.add('on');
    });
});

const secBt = document.querySelectorAll(".sec3 .select .bt");
const hisCon = document.querySelectorAll(".sec3 .history");
Array.from(secBt).forEach(function(btName, index){
    btName.addEventListener('click', function(){
        for(var i = 0; i < hisCon.length; i++){
            hisCon[i].classList.remove('on');
            secBt[i].style.backgroundColor = '#fff';
        }
        hisCon[index].classList.add('on');
        secBt[index].style.backgroundColor = '#ddd';
    });
});

