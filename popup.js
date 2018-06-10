window.onload=function(){
    var $ =function(str){
        return document.getElementById(str)
    }
    var bgWindow =chrome.extension.getBackgroundPage();
    var changeWhite =$('changeWhite');
    bgWindow.getStorage({backgroundColor: false},function (items) {
        if(items.backgroundColor){
            changeWhite.setAttribute('checked','checked')
        }else{
            changeWhite.removeAttribute('checked')
        }
    })
    changeWhite.onchange=function(e){
        bgWindow.setBgColor(e.target.checked);
    }
}