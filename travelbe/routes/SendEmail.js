module.exports = app => {
    var sendemail = require('../controller/SendEmail');
    var router = require('express').Router();

    router.post("/", sendemail.sendEmail);
    router.post("/email/hotel", sendemail.sendEmailHotel);
    app.use("/sendemail", router);
}