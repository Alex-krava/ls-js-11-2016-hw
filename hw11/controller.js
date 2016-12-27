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
            let countPhoto = 200;

            if (photos[0] > countPhoto) {
                let count = Math.ceil(photos[0] / countPhoto);
                let offset = 0;

                getPhoto(offset, count);

                function getPhoto(offset, count){
                    new Promise(function (resolve) {
                        Model.getPhotos(offset).then(function (photos) {
                            photos.splice(0, 1);
                            for(photo of photos){
                                photosArray.push(photo);
                            }

                            if(photosArray){
                                resolve(photosArray);
                            }

                        });
                    })
                        .then(function (photosArray) {
                            if(count){
                                getPhoto((countPhoto + offset), --count);
                                return;
                            }

                            return new Promise(function (resolve) {
                                resolve(photosArray);
                            });
                        })
                        .then(function (photosArray) {
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
