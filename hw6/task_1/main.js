(function () {
    timer(3000).then(() => console.log('я вывелась через 3 секунды'));

    function timer(timemout) {
        let promise = new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, timemout);
        });
        return promise;
    }
})();