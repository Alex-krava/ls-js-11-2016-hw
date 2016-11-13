(function () {
    'use strict'

    var myCalculator = calculator(100);

    console.log(myCalculator.sum(1, 2, 3)); //вернет 106
    console.log(myCalculator.dif(10, 20)); //вернет 70
    console.log(myCalculator.div(2, 2)); //вернет 25
    console.log(myCalculator.div(2, 0)); //вернет ошибку
    console.log(myCalculator.mul(2, 2)); //вернет 400

    function calculator(firstNumber) {
        var result,
            firstNumber = firstNumber;

        var obj = {
            sum: function () {
                result = firstNumber;
                for(var i = 0; i < arguments.length; i++){
                    result = result + arguments[i];
                }
                return result;
            },
            dif: function () {
                result = firstNumber;
                for(var i = 0; i < arguments.length; i++){
                    result = result - arguments[i];
                }
                return result;
            },
            div: function () {
                result = firstNumber;
                for(var i = 0; i < arguments.length; i++){
                    if(arguments[i] != 0){
                        result = result / arguments[i];
                    }
                    else{
                        return "Не хорошо делить на ноль"
                    }
                }
                return result;
            },
            mul: function () {
                result = firstNumber;
                for(var i = 0; i < arguments.length; i++){
                    result = result * arguments[i];
                }
                return result;
            }
        }
        return obj;
    }

})();