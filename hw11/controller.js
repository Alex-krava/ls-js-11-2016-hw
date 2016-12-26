var Controller = {
    musicRoute: function () {
        return Model.getMusic().then(function (music) {
            results.innerHTML = View.render('music', {list: music});
        });
    },
    friendsRoute: function () {
        return Model.getFriends().then(function (friends) {
            results.innerHTML = View.render('friends', {list: friends});
        });
    },
    newsRoute: function () {
        return Model.getNews().then(function (news) {
            results.innerHTML = View.render('news', {list: news.items});
        });
    },
    groupsRoute: function () {
        return Model.getGroups().then(function (groups) {
            groups.splice(0, 1);
            results.innerHTML = View.render('groups', {list: groups});
        });
    },
    photosRoute: function () {
        return Model.getPhotos(0).then(function (photos) {
            let photosArray = [];

            if (photos[0] > 200) {
                let count = Math.ceil(photos[0] / 200);
                let offset;

                for (let i = 0; i < count; i++) {
                    offset = 200 * i;

                    Model.getPhotos(offset).then(function (photos) {
                        photos.splice(0, 1);
                        photosArray.push(photos[0]);
                        results.innerHTML = View.render('photos', {list: photosArray});
                    });
                }
            }
            else {
                photos.splice(0, 1);
                results.innerHTML = View.render('photos', {list: photos});
            }
        });
    }
};
