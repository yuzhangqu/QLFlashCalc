var index;
var quizArray;
var quiz;

function init() {
    index = 0;
    quizArray = [];
    quizArray.push(new Group(2, 20, 1, 0, 20 * 1.0));
    quizArray.push(new Group(2, 20, 1, 10, 20 * 1.0));
    quizArray.push(new Group(3, 10, 1, 0, 10 * 1.5));
    quizArray.push(new Group(3, 10, 1, 5, 10 * 1.5));

    quizArray[0].nums = [23, 60, 57, 67, 16, 59, 50, 40, 41, 86, 19, 34, 31, 66, 26, 90, 84, 68, 17, 58]
    quizArray[0].answer = 992

    quizArray[1].nums = [92, 24, 91, -23, -78, 20, 63, -48, 25, -15, -33, -45, 13, 61, -17, -12, 35, -95, 89, -94]
    quizArray[1].answer = 53

    quizArray[2].nums = [574, 286, 910, 703, 473, 486, 795, 690, 775, 381]
    quizArray[2].answer = 6073

    quizArray[3].nums = [909, -724, 639, 762, -235, -770, 293, -667, 927, -820]
    quizArray[3].answer = 314
    
    showTitle();
    $(window).resize(adjustInit);
    adjustInit();
}

function showQuiz(begin, end) {
    if (begin == end) {
        showtips();
        $("#go").removeClass("disabled");
        $(".fa-play-circle-o").removeClass("fa-spin");
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
        setTimeout(repeat(0, quiz.total, quiz.millisec / quiz.total, showQuiz),   );
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
    $(".card-header").text("武汉市庆龄幼儿园珠心算成果展示");
}

function go() {
    if ($("#go").hasClass("disabled")) {
        return false;
    }

    if (index < 4) {
        showTitle();
        removetips(25);
        quiz = quizArray[index];
        index++;
        $("#go").addClass("disabled");
        $(".fa-play-circle-o").addClass("fa-spin");
        setTimeout(repeat(0, 3, 1000, showCount), 0);
        setTimeout(repeat(0, 3, 1000, showMask), 0);
    } else {
        if (index == 4) {
            $(".card-text").css({ "font-size": "10vw" });
            $(".card-text").text("962 +7 +24 -2 -85 +36 +459 +41 -952 -1");
            quiz.answer = 489;
            index++;
        } else if (index == 5) {
            $(".card-text").css({ "font-size": "10vw" });
            $(".card-text").text("564 +995 +601 +529 +927 +230 +345 +258 +961 +196");
            quiz.answer = 5606;
            index++;
        } else {
            return false;
        }
    }
}
