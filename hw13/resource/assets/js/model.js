module.exports = {
    uploadData: function () {

        // var req = new XMLHttpRequest();
        // req.open('POST', 'http://localhost:3000/server/data.js', true);
        // req.onload = function() {
        //     console.log(req.response);
        // };
        // req.send();


        //todo test
        let data = [];
        data['id'] = '31,21';
        data['name'] = 'Alex';
        data['loc'] = 'dsdgsdgsdg';
        data['text'] = 'sdgsdgsdgsdg';
        data['date'] = '12.12.2016';
        return data;
    },
    setData: function (value) {
        // this.data = value;
    },
    getData: function () {
        console.log(this.uploadData());
        return this.uploadData();
    }
}
