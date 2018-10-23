var details = chrome.app.getDetails();
var mainifest_scripts = details.content_scripts;

// 读取数据，第一个参数是指定要读取的key以及设置默认值
chrome.storage.sync.get({ scripts_status: [] }, function (item) {
    // 根据storage里的数组，更新script状态
    for (var i = 0, length = item.scripts_status.length; i < length; i++) {
        var index = mainifest_scripts.findIndex(function (script) { return script.name == item.scripts_status[i].name; });
        if (index != -1) {
            mainifest_scripts[index].enable = item.scripts_status[i].enable;
        }
    }
});

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var enable = mainifest_scripts.find(function (script) { return script.name == request.name }).enable;
    var resp = new Object();
    resp.enable = enable;
    sendResponse(resp);
});


function GetMainifestScripts() {
    return mainifest_scripts;
}

function SetMainifestScripts(scripts) {
    mainifest_scripts = scripts;
    // 保存数据
    chrome.storage.sync.set({ scripts_status: scripts }, function () {
    });
}