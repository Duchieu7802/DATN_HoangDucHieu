module.exports = app => {
    var Hopdong = require('../controller/Hopdong');
    var router = require('express').Router();

    router.get('/', Hopdong.hopDong);
    app.use("/hopdongs", router);
}