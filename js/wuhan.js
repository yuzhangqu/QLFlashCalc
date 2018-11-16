var timegap = [0, 0.6, 0.7, 0.9, 1, 1.2];
var mixStrs = ["纯加", "混合"];
var headText = "闪电心算 -";
var digitVal = 1; // 位数
var numVal = 10; // 总笔数
var mixIndex = 0; // 混合 OR 纯加
var mixVal = 0; // 负数的笔数 

function init() {
    showTitle();
    $("#digit_selector button").click(function() {
        $(this).addClass("active").siblings().removeClass("active");
        digitVal = parseInt($(this).attr("value"));
        showTitle();
    });

    $("#num_selector button").click(function() {
        $(this).addClass("active").siblings().removeClass("active");
        numVal = parseInt($(this).attr("value"));
        showTitle();
    });

    $("#mix_selector button").click(function() {
        $(this).addClass("active").siblings().removeClass("active");
        mixIndex = parseInt($(this).attr("value"));
        showTitle();

        if (mixIndex == 1) {
            mixVal = Math.floor(numVal / 2);
        } else {
            mixVal = 0;
        }
    });

    $(window).resize(adjustInit);
    adjustInit();
}

function showQuiz(begin, end) {
    if (begin == end) {
        showtips();
        $("#go").removeClass("disabled");
        $(".fa").removeClass("fa-spin");
        $(".card-text").removeClass("negative");
    } else {
        if (quiz.nums[begin] < 0) {
            $(".card-text").addClass("negative");
        } else {
            $(".card-text").removeClass("negative");
        }
        $(".card-text").number(quiz.nums[begin]);
    }
}

function showCount(begin, end) {
    if (begin == end) {
        $(".card-text").text("");
        setTimeout(repeat(0, quiz.total, quiz.millisec / quiz.total, showQuiz), 0);
    } else {
        $(".card-text").text(countStrs[begin]);
        if (begin < end - 1) {
            beep1();
        } else {
            beep2();
        }
    }
}

function showAnswer() {
    if ($(".card-text").text().length > 0) {
        $(".card-text").text("");
        $(".card-text").removeClass("negative");
    } else {
        if (quiz.answer < 0) {
            $(".card-text").addClass("negative");
        } else {
            $(".card-text").removeClass("negative");
        }
        $(".card-text").number(quiz.answer);
    }
}

function showTitle() {
    $(".card-header").text(headText + " " + digitVal + "位数 " + numVal + "笔 " + mixStrs[mixIndex]);
}

function go() {
    if ($("#go").hasClass("disabled")) {
        return false;
    }
    quiz = new Group(digitVal, numVal, 1, mixVal, numVal * timegap[digitVal]);
    showTitle();
    removetips(25);
    quiz.generate(mixIndex);
    $("#go").addClass("disabled");
    $(".fa").addClass("fa-spin");
    setTimeout(repeat(0, 3, 1000, showCount), 0);
    setTimeout(repeat(0, 3, 1000, showMask), 0);
}
