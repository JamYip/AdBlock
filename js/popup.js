// 获取名称、版本号、描述
var details = chrome.app.getDetails();
document.querySelector("header>#extension_name").innerText = details.name;
document.querySelector("header>#extension_version").innerText = details.version;
document.querySelector("header>#extension_description").innerText = details.description;

// 更新block列表
var bg = chrome.extension.getBackgroundPage();
var scripts = bg.GetMainifestScripts();

var table_body = document.querySelector("#block_list>tbody");
for (var i = 0, length = scripts.length; i < length; i++) {
    var tr = document.createElement('tr');

    var td_name = document.createElement('td');
    td_name.innerText = scripts[i].name;

    // 添加复选框
    var td_enable = document.createElement('td');
    var checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', scripts[i].name);
    if (scripts[i].enable) {
        checkbox.setAttribute('checked', 'checked');
    }
    checkbox.addEventListener("click", function (event) {
        var name = event.target.getAttribute('name');
        var enable = !(event.target.getAttribute('checked') == 'checked');
        scripts.find(function (script) {
            return script.name == name;
        }).enable = enable;
        bg.SetMainifestScripts(scripts);
    });
    td_enable.appendChild(checkbox);

    tr.appendChild(td_name);
    tr.appendChild(td_enable);
    table_body.appendChild(tr);
}