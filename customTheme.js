
window.onload=function(){
    var $ =function(str){
        return document.getElementById(str)
    }
    var defaultBgColor ='rgb(255, 255, 255)';
    (function initTheme(){
        updateBg();
        removeIframe();
    })();
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
        {
            // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
            if(request === 'backgroundColor'){
                updateBg();
            }
            sendResponse('我收到了你的消息！');
        });
    function updateBg(){
        getStorage('backgroundColor',function(items){
            var bgColor =items.backgroundColor;
            document.querySelectorAll('div,body').forEach(function(item){
                var bg =getStyle(item,'background-color');
                if(bgColor !== false && defaultBgColor !== bgColor && bg.toLocaleLowerCase() === defaultBgColor ){
                    setStyle(item,'background-color:'+bgColor)
                }
            });
        });
    }
    function removeIframe(){
        Array.prototype.slice.call(document.getElementsByTagName('iframe')).forEach(function(tag){
            tag.parentNode.removeChild(tag);
        })
    }
    function updateTheme(){

    }
    function setStyle(ele,val){
        ele.setAttribute('style',val)
    }
    function getStyle(ele,attr){
        return ele.currentStyle ? ele.currentStyle[attr] :  window.getComputedStyle(ele,null)[attr]
    }
    function getStorage(params,callback){
        chrome.storage.sync.get(params, function(items) {
            if(typeof callback === 'function'){
                callback(items)
            }
        });
    }
}
