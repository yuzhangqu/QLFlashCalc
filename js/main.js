var countStrs = ["③", "②", "①"];
var gStrs = ["第{0}组", "第一组", "第二组", "第三组", "第四组", "第五组", "第六组", "第七组", "第八组", "第九组"];
var qStrs = ["第{1}题", "第1题", "第2题", "第3题"];
var headText = "学前组视频心算题 -";
var gIndex = 1;
var qIndex = 1;
var gObjs = new Array(10);

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

function init() {
    $(".card-header").text(headText + " " + gStrs[gIndex] + " " + qStrs[qIndex]);
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

function flushButton() {
    if (gIndex <= 1) {
        $("#prev").addClass("disabled");
    }
    if (gIndex < (gStrs.length - 1)) {
        $("#next").removeClass("disabled");
    }
    if (gIndex > 1) {
        $("#prev").removeClass("disabled");
    }
    if (gIndex >= (gStrs.length - 1)) {
        $("#next").addClass("disabled");
    }
}

function prevGroup() {
    if (gIndex > 0 && !$("#prev").hasClass("disabled")) {
        gIndex--;
        qIndex = 1;
        flushButton();
        $(".card-header").text(headText + " " + gStrs[gIndex] + " " + qStrs[qIndex]);
    }
}

function nextGroup() {
    if (gIndex < (gStrs.length - 1) && !$("#next").hasClass("disabled")) {
        gIndex++;
        qIndex = 1;
        flushButton();
        $(".card-header").text(headText + " " + gStrs[gIndex] + " " + qStrs[qIndex]);
    }
}

function go() {
    if ($("#go").hasClass("disabled")) {
        return false;
    }
    if (qIndex > gObjs[gIndex].mix && gIndex < (gStrs.length - 1)) {
        nextGroup();
    }
    if (qIndex > gObjs[gIndex].mix && gIndex >= (gStrs.length - 1)) {
        $(".card-text").text("比赛结束");
    } else {
        $(".card-header").text(headText + " " + gStrs[gIndex] + " " + qStrs[qIndex]);
        gObjs[gIndex].generate(qIndex++);
        $("#prev").addClass("disabled");
        $("#go").addClass("disabled");
        $("#next").addClass("disabled");
        setTimeout(repeat(0, 3, 1000, showCount), 0);
    }
}
