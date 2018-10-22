document.body.addEventListener('DOMSubtreeModified', function () {
    var aside = document.querySelector("aside>.csdn-tracking-statistics");
    if (aside) {
        aside.remove();
    }

    var aside_footer = document.querySelector("aside>#asideFooter");
    if (aside_footer) {
        aside_footer.remove();
    }

    var pulllog_box = document.querySelector("body>.pulllog-box");
    if (pulllog_box) {
        pulllog_box.remove();
    }
}, false);