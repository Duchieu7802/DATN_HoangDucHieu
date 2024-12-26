const { where } = require('sequelize');

var Tour = require('../models').Tour;
var DichvuTour = require('../models').DichvuTour;
var TourNgaydi = require("../models").TourNgaydi;
var DichvuTour = require("../models").DichvuTour;
var Anh = require("../models").Anh;
var Diadiem = require("../models").Diadiem;
var Tourdiadiem = require("../models").TourDiadiem;
var Loaitour = require("../models").Loaitour;
var TourLoaitour = require("../models").TourLoaitour;
var Dichvu = require("../models").Dichvu;
var TourDichvu = require("../models").DichvuTour;
var Ngaydi = require("../models").Ngaydi;
var TourNgaydi = require("../models").TourNgaydi;
var Khuyenmai = require("../models").Khuyenmai;
exports.create = (req, res) => {
    Tour.create(req.body, { include: [Anh, Tourdiadiem, TourLoaitour, TourDichvu, TourNgaydi] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findallPaginage = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        const limit = size;
        const offset = (page - 1) * size;
        const vitri = parseInt(req.query.vitri) || 1
        // First query to get paginated data
        const data = await Tour.findAll({
            where: {vitri},
            limit: limit,
            offset: offset,
            include: [Anh, Diadiem, Loaitour, Dichvu, Ngaydi, Khuyenmai]
        });

        // Second query to get the total count of items
        const totalItems = await Tour.count({where: {
            vitri
        }});

        const totalPages = Math.ceil(totalItems / limit);

        res.json({
            data: data,
            currentPage: page,
            totalPages: totalPages,
            totalItems: totalItems
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.findall = (req, res) => {
    Tour.findAll({ include: [Anh, Diadiem, Loaitour, Dichvu, Ngaydi, Khuyenmai] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findone = (req, res) => {
    Tour.findOne({ where: { id: req.params.id }, include: [Anh, Diadiem, Loaitour, Dichvu, Ngaydi, Khuyenmai] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    Tour.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    Tour.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.adddichvu = (req, res) => {
    DichvuTour.create(req.body).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.addloaitour = (req, res) => {
    TourLoaitour.create(req.body).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.addNgaydi = (req, res) => {
    TourNgaydi.create(req.body).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
