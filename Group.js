function Group(digits, total, mix, negative, time) {
    this.digits = digits;
    this.total = total;
    this.mix = mix;
    this.negative = negative;
    this.nums = new Array(total);
    this.millisec = time * 1000;
    this.answer = 0;
}

Group.prototype.generate = function(qIndex) {
    do {
        var index = 0;
        if (qIndex >= this.mix) {
            for (var i = 0; i < this.total - this.negative; i++) {
                this.nums[index++] = this.nextPositiveInt();
            }
            for (var i = 0; i < this.negative; i++) {
                this.nums[index++] = this.nextNegativeInt();
            }
        } else {
            for (var i = 0; i < this.total; i++) {
                this.nums[index++] = this.nextPositiveInt();
            }
        }
    } while (this.negativeSum());

    this.answer = this.nums.reduce((a, b) => a + b, 0);

    do {
        for (var i = this.total - 1; i > 0; i--) {
            this.swap(i, Math.floor(Math.random() * (i + 1)));
        }
    } while (this.invalid());
}

Group.prototype.nextPositiveInt = function() {
    var hi = Math.pow(10, this.digits);
    var lo = Math.pow(10, this.digits - 1);
    return Math.floor(Math.random() * (hi - lo)) + lo;
}

Group.prototype.nextNegativeInt = function() {
    return 0 - this.nextPositiveInt();
}

Group.prototype.negativeSum = function() {
    var sum = 0;
    for (var i = 0; i < this.total; i++) {
        sum += this.nums[i];
    }
    return sum < 0;
}

Group.prototype.swap = function(i, j) {
    var temp = this.nums[i];
    this.nums[i] = this.nums[j];
    this.nums[j] = temp;
}

Group.prototype.invalid = function() {
    var old = this.nums[0];
    var sum = old;

    if (sum < 0) {
        return true;
    }

    for (var i = 1; i < this.total; i++) {
        sum += this.nums[i];
        if (sum < 0 || old == this.nums[i]) {
            return true;
        }
    }
    return false;
}

function Group1() {
    Group.call(this, 2, 10, 3, 3, 7);
}
Group1.prototype = Object.create(Group.prototype);
Group1.prototype.constructor = Group1;

function Group2() {
    Group.call(this, 2, 15, 3, 5, 10);
}
Group2.prototype = Object.create(Group.prototype);
Group2.prototype.constructor = Group2;

function Group3() {
    Group.call(this, 3, 10, 2, 3, 9);
}
Group3.prototype = Object.create(Group.prototype);
Group3.prototype.constructor = Group3;

function Group4() {
    Group.call(this, 3, 20, 2, 7, 15);
}
Group4.prototype = Object.create(Group.prototype);
Group4.prototype.constructor = Group4;

function Group5() {
    Group.call(this, 4, 10, 2, 3, 10);
}
Group5.prototype = Object.create(Group.prototype);
Group5.prototype.constructor = Group5;

function Group6() {
    Group.call(this, 4, 20, 2, 7, 15);
}
Group6.prototype = Object.create(Group.prototype);
Group6.prototype.constructor = Group6;

function Group7() {
    Group.call(this, 5, 10, 2, 3, 9);
}
Group7.prototype = Object.create(Group.prototype);
Group7.prototype.constructor = Group7;

function Group8() {
    Group.call(this, 5, 20, 2, 7, 15);
}
Group8.prototype = Object.create(Group.prototype);
Group8.prototype.constructor = Group8;

function Group9() {
    Group.call(this, 6, 20, 2, 7, 15);
}
Group9.prototype = Object.create(Group.prototype);
Group9.prototype.constructor = Group9;
