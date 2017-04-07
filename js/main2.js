var countStrs = ["③", "②", "①"];
var digitStrs = ["0位数", "1位数", "2位数", "3位数"];
var numStrs = ["0笔", "1笔", "2笔", "3笔", "4笔", "5笔", "6笔", "7笔", "8笔", "9笔", "10笔"];
var mixStrs = ["纯加", "混合"];
var headText = "闪电心算 -";
var digitVal = 1;
var numVal = 3;
var mixIndex = 0;
var mixVal = 0;

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
        $(".fa").removeClass("fa-spin");
    } else {
        $(".card-text").number(quiz.nums[begin]);
    }
}

function showCount(begin, end) {
    if (begin == end) {
        $(".card-text").text("");
        setTimeout(repeat(0, quiz.total, quiz.millisec / quiz.total, showQuiz), 0);
    } else {
        $(".card-text").text(countStrs[begin]);
    }
}

function showAnswer() {
    if ($(".card-text").text().length > 0) {
        $(".card-text").text("");
    } else {
        $(".card-text").number(quiz.answer);
    }
}

function showTitle() {
    $(".card-header").text(headText + " " + digitStrs[digitVal] + " " + numStrs[numVal] + " " + mixStrs[mixIndex]);
}

function go() {
    if ($("#go").hasClass("disabled")) {
        return false;
    }
    quiz = new Group(digitVal, numVal, 1, mixVal, numVal);
    showTitle();
    quiz.generate(mixIndex);
    $("#go").addClass("disabled");
    $(".fa").addClass("fa-spin");
    setTimeout(repeat(0, 3, 1000, showCount), 0);
}
