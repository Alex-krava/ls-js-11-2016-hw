(function () {
    let array = [1, 2, 3, 4, 5, 6];

    //ForEach
    forEach(array, item => console.log(item));

    //Filter
    let greaterThan4 = filter(array, item => item > 4);
    console.log(greaterThan4);

    //Map
    let sqare = map(array, item => item*item);
    console.log(sqare);

    //Slice
    let sliceArray = slice(array,0,3); //возвращает [1,2,3]
    console.log(sliceArray);
    sliceArray = slice(array,3); //возвращает [4,5,6]
    console.log(sliceArray);
    sliceArray = slice(array,1,-1); //возвращает [2,3,4,5]
    console.log(sliceArray);
    sliceArray = slice(array,-3,-2); //возвращает [4]
    console.log(sliceArray);

    //Reduce
    result = reduce(array, (previousValue, currentValue) => previousValue + currentValue, 0);
    console.log(result);

    //ForEach
    function forEach(arr, callback) {
        for (let i = 0; i < arr.length; i++) {
            callback(arr[i], i, arr);
        }
    }

    //Filter
    function filter(arr, callback) {
        let filterArray = [];
        for (let i = 0; i < arr.length; i++) {
            if (callback(arr[i], i, arr)) {
                filterArray[filterArray.length] = arr[i];
            }
        }
        return filterArray;
    }

    //Map
    function map(arr, callback) {
        let filterMap = [],
            result;
        for (let i = 0; i < arr.length; i++) {
            result = callback(arr[i], i, arr);
            filterMap[filterMap.length] = result;
        }
        return filterMap;
    }

    //Slice
    function slice(arr, begin, end) {
        let sliceArray = [],
            i,
            count;
        if (begin || begin === 0) {
            if (begin < 0) i = arr.length + begin;
            else i = begin;

            if (end || end === 0) {
                if (end < 0) count = arr.length + end
                else count = end;
            }
            else {
                count = arr.length;
            }
        }
        else {
            i = 0;
            count = arr.length;
        }
        for (i; i < count; i++) {
            sliceArray[sliceArray.length] = arr[i];
        }
        return sliceArray;
    }

    //Reduce
    function reduce(arr, callback, initalValue) {
        let previousValue,
            i;
        if (initalValue || initalValue === 0) {
            previousValue = initalValue;
            i = 0;
        }
        else {
            previousValue = arr[0];
            i = 1;
        }
        for (i; i < arr.length; i++) {
            previousValue = callback(previousValue, arr[i], i, arr);
        }
        return previousValue;
    }

})();
