const nodemailer = require("nodemailer");
require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.sendEmail = async (req, res) => {
	const log = console.log;
	const data = req.body;

	// Step 1
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL || "duchieu7802@gmail.com", // TODO: your gmail account
			pass: process.env.PASSWORDEMAIL || "xkkw frci cwuz cfkj", // TODO: your gmail password
		},
	});
	var token = jwt.sign(
		{
			data: {
				email: data.email,
				tentour: data.tentour,
				thanhtien: data.thanhtien,
				ten: data.tenkhachhang,
				nguoiDaiDien: data.tenkhachhang,
				dienThoai: data.sdt,
				diaChi: data.diachi,
			},
		},
		process.env.TOKEN_SECRET,
		{ algorithm: "HS256", expiresIn: "3h" }
	);
	// Step 2
	var content = "";
	content += `
    <div style="background-color: #acacac;
    font-family: "Jost";">
<div class="card" style="font-family: 'Jost', sans-serif !important;
    padding: 50px 60px;
    background-color: #f8f8f8;
    display: block;">
<div class="card_top" style="border-bottom: 1px solid #dddddd;
    width: 100%;
    margin-bottom: 49px;
    padding-bottom: 13px;">
    <img  src="https://i.ibb.co/Qdd2fbP/download.png" alt="Logo.png" />
</div>
<div class="highlight" style="font-weight: 600;
    font-size: 24px;
    line-height: 110%;
    color: #1e2029;
    margin-bottom: 11px;
    width: 100%;">Chúc mừng bạn đặt tour thành công!</div>
<div class="text" style="width: 100%;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;
    color: #1e2029;
    margin-top: 22px;
    margin-bottom: 22px;">Tên khách hàng: ${data.tenkhachhang}</div>
    <div class="text" style="width: 100%;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;
    color: #1e2029;
    margin-top: 22px;
    margin-bottom: 22px;">Email: ${data.email}</div>
    <div class="text" style="width: 100%;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;
    color: #1e2029;
    margin-top: 22px;
    margin-bottom: 22px;">Địa chỉ: ${data.diachi}</div>
    <div class="text" style="width: 100%;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;
    color: #1e2029;
    margin-top: 22px;
    margin-bottom: 22px;">SĐT: ${data.sdt}</div>
<div class="text" style="width: 100%;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;
    color: #1e2029;
    margin-bottom: 22px;">Giá tiền: ${data.thanhtien}</div>
<div class="text" style="width: 100%;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;
    color: #1e2029;
    margin-bottom: 22px;">Điểm đến: ${data.tentour}</div>
<div class="text" style="width: 100%;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;
    color: #1e2029;
    margin-bottom: 22px;">Nơi khởi hành: Hà Nội</div>
<div class="text" style="width: 100%;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;
    color: #1e2029;
    margin-bottom: 22px;">Thời gian: 8 giờ sáng ${data.ngaydi}</div>
    <div class="text" style="width: 100%;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;
    color: #1e2029;
    margin-bottom: 22px;">Hợp đồng của bạn: http://localhost:666/hopdongs?token=${token}</div>
<div class="code" style="font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    text-align: center;
    color: blue;">Lưu ý: Nếu có bất kỳ thắc mắc nào xin vui lòng liên hệ: VietTravel (0942889002)</div>
</div>
</div>
    `;
	let mailOptions = {
		from: "duchieu7802@gmail.com", // TODO: email receiver
		to: data.email, // TODO: email sender
		subject: "Đăng ký tour thành công!",
		// text: 'Chúc đã đặt tour thành công tour ' + data.tentour + ' với giá ' + data.thanhtien + 'vnđ Xin chúc mừng bạn !',
		html: content,
	};
	// Step 3
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			return log("Error occurs", err);
		}
		return log("Email sent!!!");
	});
};

exports.sendEmailHotel = async (req, res) => {
	const log = console.log;
	const data = req.body;
	// Step 1
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL || "duchieu7802@gmail.com", // TODO: your gmail account
			pass: process.env.PASSWORDEMAIL || "xkkw frci cwuz cfkj", // TODO: your gmail password
		},
	});
	var token = jwt.sign(
		{
			data: {
				email: data.email,
				tentour: data.tentour,
				thanhtien: data.thanhtien,
				ngaydi: data.ngaydi,
				tenkhachhang: data.tenkhachhang,
				sdt: data.sdt,
				diachi: data.diachi,
			},
		},
		process.env.TOKEN_SECRET,
		{ algorithm: "HS256", expiresIn: "3h" }
	);
	// Step 2
	var content = "";
	content += `
    <div style="background-color: #acacac;
    font-family: "Jost";">
<div class="card" style="font-family: 'Jost', sans-serif !important;
    padding: 50px 60px;
    background-color: #f8f8f8;
    display: block;">
<div class="card_top" style="border-bottom: 1px solid #dddddd;
    width: 100%;
    margin-bottom: 49px;
    padding-bottom: 13px;">
    <img style="width: 65px;
    height: 29px;" src="https://thietkeweb.5chau.net/wp-content/uploads/2017/07/NEW-LOGO-ngang-Copy.png.webp" alt="Logo.png" />
</div>
<div class="highlight" style="font-weight: 600;
    font-size: 24px;
    line-height: 110%;
    color: #1e2029;
    margin-bottom: 11px;
    width: 100%;">Liên hệ đặt phòng</div>
    <div class="text" style="width: 100%;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;
    color: #1e2029;
    margin-bottom: 22px;">Họ tên: ${data.hoten}</div>
    <div class="text" style="width: 100%;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;
    color: #1e2029;
    margin-bottom: 22px;">Email: ${data.email}</div>
    <div class="text" style="width: 100%;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;
    color: #1e2029;
    margin-bottom: 22px;">Địa chỉ: ${data.diachi}</div>
    <div class="text" style="width: 100%;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;
    color: #1e2029;
    margin-bottom: 22px;">Yều cầu: ${data.yeucau}</div>
</div>
    `;
	let mailOptions = {
		from: "duchieu7802@gmail.com", // TODO: email receiver
		to: data.email, // TODO: email sender
		subject: "Liên hệ khách sạn",
		// text: 'Chúc đã đặt tour thành công tour ' + data.tentour + ' với giá ' + data.thanhtien + 'vnđ Xin chúc mừng bạn !',
		html: content,
	};
	// Step 3
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			return log("Error occurs", err);
		}
		return log("Email sent!!!");
	});
};
