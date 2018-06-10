var constants= {
    backgroundColor: '#f7f7f7'
}
setTheme(constants);
var permissions={}
function setTheme(data){
        setStorage(data)
}
function setBgColor(val){
        if(val === true ){
            val = constants.backgroundColor
        }
        setStorage({backgroundColor: val},function(){
            sendMessageToContentScript('backgroundColor')
        })
}
function checkPermission(str,callback){
    chrome.permissions.contains({
        permissions: [str],
        origins: ['http://www.google.com/']
    }, callback);
}
function requestPermission(str,callback){
    chrome.permissions.request({
        permissions: [str],
        origins: ['http://www.google.com/']
    }, callback);
}
function sendMessageToContentScript(message, callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            console.log('来自content的回复：'+response);
        });
    });
}
function setStorage(params,callback){
    chrome.storage.sync.set(params, function() {
        console.log('保存成功！');
        if(typeof callback === 'function'){
            callback()
        }
    });
}
function getStorage(params,callback){
    chrome.storage.sync.get(params, function(items) {
        console.log('get success',items)
        if(typeof callback === 'function'){
            callback(items)
        }
    });
}