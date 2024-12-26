require("dotenv").config();
const puppeteer = require("puppeteer");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const jwt = require("jsonwebtoken");
exports.hopDong = async (req, res) => {
	var { token } = req.query;
	try {
		var data = await jwt.verify(token, process.env.TOKEN_SECRET);
		console.log("🚀 ~ exports.hopDong= ~ data:", data);
	} catch (error) {
		return res.status(403).send({
			message: "loi",
		});
	}

	const benA = {
		ten: data.data.ten,
		nguoiDaiDien: data.data.ten,
		email: data.data.email,
		dienThoai: data.data.dienThoai,
		diaChi: data.data.diaChi,
	};
	const benB = {
		ten: "CÔNG TY TNHH VIETTRAVEL",
		diaChi: "Số 256 Phú Diễn, Bắc Từ Liêm, Hà Nội",
		nguoiDaiDien: "Hoàng Đức Hiếu",
		chucVu: "Giám đốc",
		dienThoai: "0964608075",
		fax: "0942889002",
		giayPhep: "2901625434",
		noiCap: "Thành phố Hà Nội",
	};
	try {
		// Render template Pug thành HTML với dữ liệu
		const html = await new Promise((resolve, reject) => {
			res.render("contract", { benA, benB, data }, (err, html) => {
				if (err) reject(err);
				else resolve(html);
			});
		});

		// Sử dụng Puppeteer để chuyển đổi HTML thành PDF
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setContent(html);
		const pdfBuffer = await page.pdf({
			path: "contract.pdf",
			format: "A4",
			printBackground: true,
		});
		await browser.close();

		// Thiết lập tiêu đề và gửi PDF về client
		res.setHeader(
			"Content-disposition",
			"attachment; filename=hopdongdulich.pdf"
		);
		res.setHeader("Content-type", "application/pdf");
		res.send(pdfBuffer);
	} catch (err) {
		console.error(err);
		res.status(500).send("Error generating PDF");
	}
};
