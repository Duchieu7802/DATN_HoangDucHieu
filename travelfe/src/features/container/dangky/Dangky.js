import React, { useState } from "react";
import "./dangky.css";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { message } from "antd";
import taikhoanApi from "../../../api/taikhoanApi";

function Dangky(props) {
	const [state, setState] = useState({
		password: "",
		repassword: "",
		name: "",
		status: 1,
		email: "",
	});
	const { password, repassword, status, name, email } = state;
	const validateEmail = (email) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};
	const onsubmit = async (e) => {
		e.preventDefault();
		if (!validateEmail(email)) {
			message.warning("Email không đúng định dạng!");
		} else {
			if (
				password.trim() === "" ||
				repassword.trim() === "" ||
				name.trim() === "" ||
				email.trim() === ""
			) {
				message.error("Bạn chưa nhập đầy đủ thông tin!");
			} else {
				if (password.length > 5) {
					if (password === repassword) {
						if (
							(await taikhoanApi.checkEmail(email).then((data) => {
								return data;
							})) !== null
						) {
							message.error("Email đã được sử dụng!");
						} else {
							var UserRoles = [{ roleId: 6 }];
							taikhoanApi.postuser({
								name,
								status,
								email,
								password,
								UserRoles,
							});
							history.push("/dangnhap");
						}
					} else {
						message.error("Mật khẩu không trùng khớp!");
					}
				} else {
					message.error("Mật khẩu phải ít nhất 6 ký tự!");
				}
			}
		}
	};
	const onchange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};
	const history = useHistory();
	const handgleLG = () => {
		history.push("/dangnhap");
	};
	return (
		<Router>
			<div id="dangky">
				<div className="mt-5 mx-5">
					<img
						src="data:image/png;base64,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"
						alt=""
					/>
				</div>
				<div className="box-login">
					<form className="form" onSubmit={onsubmit}>
						<h3 className="text-uppercase  text-center pb-3">Đăng ký </h3>

						<div className="input-group flex-nowrap mt-3 mb-5">
							<div className="input-group-prepend">
								<span className="input-group-text" id="addon-wrapping">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6 img-login float-left"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
										/>
									</svg>
								</span>
							</div>
							<input
								type="text"
								className="form-control"
								placeholder="Tên của bạn"
								name="name"
								value={name}
								onChange={onchange}
								aria-label="Username"
								aria-describedby="addon-wrapping"
							/>
						</div>
						<div className="input-group flex-nowrap mt-3 mb-5">
							<div className="input-group-prepend">
								<span className="input-group-text" id="addon-wrapping">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6 img-login float-left"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
										/>
									</svg>
								</span>
							</div>
							<input
								type="email"
								className="form-control"
								placeholder="Email"
								name="email"
								value={email}
								onChange={onchange}
								aria-label="Username"
								aria-describedby="addon-wrapping"
							/>
						</div>
						<div className="input-group flex-nowrap mt-3 mb-5">
							<div className="input-group-prepend">
								<span className="input-group-text" id="addon-wrapping">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6 img-login float-left"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
										/>
									</svg>
								</span>
							</div>
							<input
								type="password"
								className="form-control"
								placeholder="Mật khẩu"
								name="password"
								value={password}
								onChange={onchange}
								aria-label="Username"
								aria-describedby="addon-wrapping"
							/>
						</div>
						<div className="input-group flex-nowrap mt-3 mb-3">
							<div className="input-group-prepend">
								<span className="input-group-text" id="addon-wrapping">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6 img-login float-left"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
										/>
									</svg>
								</span>
							</div>
							<input
								type="password"
								className="form-control"
								placeholder="Nhập lại mật khẩu"
								name="repassword"
								value={repassword}
								onChange={onchange}
								aria-label="Username"
								aria-describedby="addon-wrapping"
							/>
						</div>

						<div className="form-group form-check mb-5">
							<Link to="/dangnhap" onClick={handgleLG} className="float-right ">
								Đã có tài khoản?
							</Link>
						</div>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className="button-login w-100 mb-4 mt-5 p-3 rounded-lg"
						>
							Đăng ký
						</Button>
					</form>
				</div>
			</div>
		</Router>
	);
}

Dangky.propTypes = {};

export default Dangky;
