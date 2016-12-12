(function () {
    'use strict'

    var myCalculator = new SqrCalc(100);

    console.log(myCalculator.sum(1, 2, 3)); //вернет 11236 (100 + 1 + 2 + 3 = 106 * 106)
    console.log(myCalculator.dif(10, 20)); //вернет 4900
    console.log(myCalculator.div(2, 2)); //вернет 625
    console.log(myCalculator.mul(2, 2)); //вернет 160000


    function Calculator(firstNumber) {
        this.firstNumber = firstNumber;
    }

    Calculator.prototype.sum = function () {
        var result = this.firstNumber;
        for (var i = 0; i < arguments.length; i++) {
            result = result + arguments[i];
        }
        return result;
    }
    Calculator.prototype.dif = function () {
        var result = this.firstNumber;
        for (var i = 0; i < arguments.length; i++) {
            result = result - arguments[i];
        }
        return result;
    }
    Calculator.prototype.div = function () {
        var result = this.firstNumber;
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] != 0) {
                result = result / arguments[i];
            }
            else {
                return "Не хорошо делить на ноль"
            }
        }
        return result;
    }
    Calculator.prototype.mul = function () {
        var result = this.firstNumber;
        for (var i = 0; i < arguments.length; i++) {
            result = result * arguments[i];
        }
        return result;
    }


    function SqrCalc(firstNumber) {
        this.firstNumber = firstNumber;
    }

    inherit(SqrCalc, Calculator);

    SqrCalc.prototype.sum = function () {
        var result = Calculator.prototype.sum.apply(this, arguments);
        result = result * result;
        return result;
    }
    SqrCalc.prototype.dif = function () {
        var result = Calculator.prototype.dif.apply(this, arguments);
        result = result * result;
        return result;
    }
    SqrCalc.prototype.div = function () {
        var result = Calculator.prototype.div.apply(this, arguments);
        result = result * result;
        return result;
    }
    SqrCalc.prototype.mul = function () {
        var result = Calculator.prototype.mul.apply(this, arguments);
        result = result * result;
        return result;
    }

    function inherit(child, parent) {
        var Temp = function () {
        };
        Temp.prototype = parent.prototype;
        child.prototype = new Temp();
    }
})();