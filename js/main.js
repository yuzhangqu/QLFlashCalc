var countStrs = ["③", "②", "①"];

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

function adjustInit() {
    //设置.init的top和height
    $(".init").css({ "top": $(".card-header").outerHeight() });
    $(".init").css({ "height": $(".card-block").outerHeight() });
}

function showMask(begin, end) {
    if (begin == end) {
        $(".init span").removeClass("spin");
        $(".init").removeClass("part1").removeClass("part2");
    } else {
        $(".init span").removeClass("spin");
        $(".init").removeClass("part1").removeClass("part2");
        $(".init").offset();
        $(".init span").addClass("spin");
        $(".init").addClass("part1");
        setTimeout(function() { $(".init").addClass("part2"); }, 500);
    }
}

function showtips() {
    $(".card-text").css({ "font-size": "15vw" });
    $(".card-text").text("请写答案");
    setTimeout(function() { $(".card-text").text(""); }, 1000);
}

function removetips(sz) {
    $(".card-text").text("");
    $(".card-text").css({ "font-size": sz + "vw" });
}
