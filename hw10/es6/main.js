(function () {
    class Calculator {
        constructor(firstNumber) {
            this.firstNumber = firstNumber;
        }

        sum() {
            var result = this.firstNumber;
            for (var i = 0; i < arguments.length; i++) {
                result = result + arguments[i];
            }
            return result;
        }

        dif() {
            var result = this.firstNumber;
            for (var i = 0; i < arguments.length; i++) {
                result = result - arguments[i];
            }
            return result;
        }

        div() {
            var result = this.firstNumber;
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != 0) {
                    result = result / arguments[i];
                }
                else {
                    throw new Error("Не хорошо делить на ноль");
                }
            }
            return result;
        }

        mul() {
            var result = this.firstNumber;
            for (var i = 0; i < arguments.length; i++) {
                result = result * arguments[i];
            }
            return result;
        }
    }

    class SqrCalc extends Calculator {

        constructor(firstNumber) {
            super(firstNumber);
        }

        sum() {

            var result = super.sum(...arguments);
            result = result * result;
            return result;
        }

        dif() {
            var result = super.dif(...arguments);
            result = result * result;
            return result;
        }

        div() {
            var result = super.div(...arguments);
            result = result * result;
            return result;
        }

        mul() {
            var result = super.mul(...arguments);
            result = result * result;
            return result;
        }
    }


    var myCalculator = new SqrCalc(100);

    console.log(myCalculator.sum(1, 2, 3)); //вернет 11236 (100 + 1 + 2 + 3 = 106 * 106)
    console.log(myCalculator.dif(10, 20)); //вернет 4900
    console.log(myCalculator.div(2, 2)); //вернет 625
    console.log(myCalculator.mul(2, 2)); //вернет 160000

})();