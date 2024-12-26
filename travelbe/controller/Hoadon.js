const sequelize = require('sequelize');
const { Op } = require('sequelize');

var Hoadon = require('../models').Hoadon;
var Tour = require("../models").Tour;
var User = require("../models").User;
exports.create = (req, res) => {
    Hoadon.create(req.body).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findall = (req, res) => {
    Hoadon.findAll({ order: [["id", "DESC"]], include: [{ model: Tour, attributes: ["id", "gianguoilon", "giatreem", "giaembe", "name", "thoigian", "avatar"] }, { model: User, attributes: ["id", "name"] }] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findone = (req, res) => {
    Hoadon.findOne({ attributes: ["id", "tourId", "userId", "thanhtien", "nguoilon", "treem", "embe", "ngaydi"], where: { id: req.params.id }, include: [{ model: Tour, attributes: ["id", "gianguoilon", "giatreem", "giaembe", "name"] }, { model: User, attributes: ["id", "name"] }] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    Hoadon.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    Hoadon.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}

// exports.thongke = (req, res) => {
//     const { startDate, endDate } = req.query;

//     if (!startDate || !endDate) {
//         return res.status(400).json({ error: "startDate và endDate là bắt buộc." });
//     }

//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     if (isNaN(start.getTime()) || isNaN(end.getTime())) {
//         return res.status(400).json({ error: "startDate hoặc endDate không hợp lệ." });
//     }

//     Hoadon.findAll({
//         where: {
//             createdAt: {
//                 [Op.between]: [start, end]
//             }
//         },
//         attributes: ['tourId', [sequelize.fn('COUNT', 'tourId'), 'soLuongDat']],
//         group: ['tourId'],
//         include: [{ model: Tour, attributes: ['id', 'name'] }]
//     }).then(data => {
//         res.json({ data: data })
//     }).catch(er => {
//         res.status(500).json({ error: er.message });
//     });
// }

exports.thongke = (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: "startDate và endDate là bắt buộc." });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ error: "startDate hoặc endDate không hợp lệ." });
    }

    Hoadon.findAll({
        where: {
            createdAt: {
                [Op.between]: [start, end]
            }
        },
        attributes: ['tourId', [sequelize.fn('COUNT', 'tourId'), 'soLuongDat']],
        group: ['tourId'],
        include: [{ model: Tour, attributes: ['id', 'name'] }]
    }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        res.status(500).json({ error: er.message });
    });
}