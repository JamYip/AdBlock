function condition() {
    return (document.URL.indexOf("https://www.baidu.com/s?") == 0) ||
        (document.URL.indexOf("https://www.baidu.com/baidu?wd=") == 0);
}
function exec() {
    var search_result = document.querySelectorAll("#content_left>div");
    for (var i = 0, length = search_result.length; i < length; i++) {
        var elem_span = search_result[i].querySelectorAll("span");
        for (var j = 0, l = elem_span.length; j < l; j++) {
            if (elem_span[j].innerText == "å¹¿å‘Š") {
                search_result[i].remove();
                console.log('Remove: ' + search_result[i]);
                break;
            }
        }
    }
}

chrome.runtime.sendMessage({ name: 'baidu search' }, function (response) {
    if (response.enable) {
        document.body.addEventListener('DOMSubtreeModified', function () {
            if (condition()) {
                exec();
            }
        }, false);
    }
});