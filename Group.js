function Group(digits, positive, negative) {
    this.digits = digits;
    this.positive = positive;
    this.negative = negative;
    this.nums = new Array(positive + negative);
}

Group.prototype.generate = function() {
    do {
        var index = 0;
        for (var i = 0; i < this.positive; i++) {
            this.nums[index++] = this.nextPositiveInt();
        }
        for (var i = 0; i < this.negative; i++) {
            this.nums[index++] = this.nextNegativeInt();
        }
    } while (this.negativeSum());

    do {
        for (var i = this.nums.length - 1; i > 0; i--) {
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
    for (x in this.nums) {
        sum += x;
    }
    return sum < 0;
}

Group.prototype.swap = function(i, j) {
    var temp = this.nums[i];
    this.nums[i] = this.nums[j];
    this.nums[j] = temp;
}

Group.prototype.invalid = function() {
    var sum = 0;
    for (x in this.nums) {
        sum += x;
        if (sum < 0) {
            return true;
        }
    }
    return false;
}

function Group1(mix) {
    if (mix) {
        Group.call(this, 2, 7, 3);
    } else {
        Group.call(this, 2, 10, 0);
    }
}

Group1.prototype = Object.create(Group.prototype);
Group1.prototype.constructor = Group1;
