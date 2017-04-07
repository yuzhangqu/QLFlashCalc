var countStrs = ["③", "②", "①"];
var gStrs = ["第{0}组", "第一组", "第二组", "第三组", "第四组", "第五组", "第六组", "第七组", "第八组", "第九组"];
var qStrs = ["第{1}题", "第1题", "第2题", "第3题"];
var headText = "学前组视频心算题 -";
var gIndex = 1;
var qIndex = 1;
var gObjs = new Array(10);

function init() {
    showTitle();
    gObjs[1] = new Group1();
    gObjs[2] = new Group2();
    gObjs[3] = new Group3();
    gObjs[4] = new Group4();
    gObjs[5] = new Group5();
    gObjs[6] = new Group6();
    gObjs[7] = new Group7();
    gObjs[8] = new Group8();
    gObjs[9] = new Group9();
}

function repeat(begin, end, time, func) {
    return function() {
        func.call(null, begin, end);
        if (begin < end) {
            if (begin++ < end) {
                setTimeout(repeat(begin, end, time, func), time);
            }
        } else if (begin > end) {
            if (begin-- > end) {
                setTimeout(repeat(begin, end, time, func), time);
            }
        } else {}
    };
}

function showQuiz(begin, end) {
    if (begin == end) {
        $(".card-text").text("");
        $("#go").removeClass("disabled");
        $("#go_icon").removeClass("fa-spin");
        flushButton();
    } else {
        $(".card-text").number(gObjs[gIndex].nums[begin]);
    }
}

function showCount(begin, end) {
    if (begin == end) {
        $(".card-text").text("");
        setTimeout(repeat(0, gObjs[gIndex].total, gObjs[gIndex].millisec / gObjs[gIndex].total, showQuiz), 0);
    } else {
        $(".card-text").text(countStrs[begin]);
    }
}

function showAnswer() {
    if ($(".card-text").text().length > 0) {
        $(".card-text").text("");
    } else {
        $(".card-text").number(gObjs[gIndex].answer);
    }
}

function prevGroup() {
    if ($("#prev").hasClass("disabled")) {
        return false;
    }
    gIndex--;
    qIndex = 1;
    flushButton();
    resumePlayButton();
    showTitle();
}

function prevQuiz() {
    if ($("#prev_mini").hasClass("disabled")) {
        return false;
    }
    qIndex--;
    if (qIndex < 1) {
        gIndex--;
        qIndex = gObjs[gIndex].mix;
    }
    flushButton();
    resumePlayButton();
    showTitle();
}

function nextQuiz() {
    if ($("#next_mini").hasClass("disabled")) {
        return false;
    }
    qIndex++;
    if (qIndex > gObjs[gIndex].mix) {
        gIndex++;
        qIndex = 1;
    }
    flushButton();
    resumePlayButton();
    showTitle();
}

function nextGroup() {
    if ($("#next").hasClass("disabled")) {
        return false;
    }
    gIndex++;
    qIndex = 1;
    flushButton();
    resumePlayButton();
    showTitle();
}

function flushButton() {
    enableAll();

    if (gIndex == 1) {
        $("#prev").addClass("disabled");
        if (qIndex == 1) {
            $("#prev_mini").addClass("disabled");
        }
    }

    if (gIndex == (gStrs.length - 1)) {
        $("#next").addClass("disabled");
        if (qIndex == gObjs[gIndex].mix) {
            $("#next_mini").addClass("disabled");
        }
    }
}

function disableAll() {
    $("#prev").addClass("disabled");
    $("#prev_mini").addClass("disabled");
    $("#go").addClass("disabled");
    $("#next_mini").addClass("disabled");
    $("#next").addClass("disabled");
}

function enableAll() {
    $("#prev").removeClass("disabled");
    $("#prev_mini").removeClass("disabled");
    $("#go").removeClass("disabled");
    $("#next").removeClass("disabled");
    $("#next_mini").removeClass("disabled");
}

function resumePlayButton() {
    $("#go_icon").removeClass("fa-refresh");
    $("#go_icon").addClass("fa-play-circle-o");
}

function showTitle() {
    $(".card-header").text(headText + " " + gStrs[gIndex] + " " + qStrs[qIndex]);
}

function go() {
    if ($("#go").hasClass("disabled")) {
        return false;
    }
    gObjs[gIndex].generate(qIndex);
    disableAll();
    $("#go_icon").removeClass("fa-play-circle-o");
    $("#go_icon").addClass("fa-refresh fa-spin");
    setTimeout(repeat(0, 3, 1000, showCount), 0);
}
