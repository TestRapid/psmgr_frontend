import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import { editItem } from "../store/slices/listReducer";

import { htmlDate } from "../utils/date";
import { clipBoard } from "../utils/clipboard";

const pass_mgr = (val) => {
	return val.map((v) => ({ ...v })).sort((a, b) => b.datetime - a.datetime);
};

const lt = (val) => {
	return pass_mgr(val)[0];
};

const EditPs = ({ pop }) => {
	const dispatch = useDispatch();
	const [editable, setEditable] = useState(false);
	const [ps, setPs] = useState(pass_mgr(pop.passwords));
	const [psedit, setPsedit] = useState({ password: "" });

	const inputTitle = useRef("");
	const inputUsername = useRef("");
	const inputMail = useRef("");
	const inputPassword = useRef("");
	const inputDate = useRef(null);
	const inputContact = useRef("");
	const inputDescription = useRef("");

	useEffect(() => {
		assignBack();
	}, [pop, ps]);

	const clipCopy = () => {
		clipBoard(inputPassword.current.value);
	};

	const toggle = () => {
		setEditable((e) => !e);
	};

	const ps_clear = () => {
		setPsedit({ password: "" });
	};

	const onSave = () => {
		const psobj = {
			password: psedit.password,
			datetime: Date.now()
		};
		const obj = { ...pop };
		delete obj.passwords;
		obj.passwords = [psobj, ...ps];
		dispatch(editItem(obj));
		setPs(obj.passwords.slice(0, 20));
		inputPassword.current.value = psedit.password;
		inputDate.current.value = htmlDate(psobj.datetime);
		ps_clear();
	};

	const assignBack = () => {
		inputTitle.current.value = pop.title;
		inputUsername.current.value = pop.username;
		inputMail.current.value = pop.mail;
		inputContact.current.value = pop.contact;
		inputPassword.current.value = lt(ps).password;
		inputDate.current.value = htmlDate(lt(ps).datetime);
		inputDescription.current.value = pop.description;
	};

	const save = () => {
		const obj = {
			id: pop.id,
			title: inputTitle.current.value,
			username: inputUsername.current.value,
			mail: inputMail.current.value,
			contact: inputContact.current.value,
			description: inputDescription.current.value
		};
		obj.passwords = ps;
		obj.passwords.forEach((o) => {
			if (o.datetime === lt(ps).datetime) {
				o.password = inputPassword.current.value;
			}
		});
		dispatch(editItem(obj));
		setPs(pass_mgr(obj.passwords));
		toggle();
	};

	return (
		<>
			<Modal
				id={pop.id}
				title={inputTitle.current.value}
				editable={editable}
				toggle={toggle}
				save={save}
				assignBack={assignBack}
			>
				<div className="row">
					<div className="col-4">
						<div className="my-3">
							<label
								htmlFor={`det_title_${pop.id}`}
								className="form-label"
							>
								Title
							</label>
							<input
								type="text"
								name="det_title"
								id={`det_title_${pop.id}`}
								className="form-control"
								readOnly={!editable}
								ref={inputTitle}
							/>
						</div>
					</div>
					<div className="col-4">
						<div className="my-3">
							<label
								htmlFor={`det_username_${pop.id}`}
								className="form-label"
							>
								Username
							</label>
							<input
								type="text"
								id={`det_username_${pop.id}`}
								name="det_username"
								className="form-control"
								readOnly={!editable}
								ref={inputUsername}
							/>
						</div>
					</div>
					<div className="col-4">
						<div className="my-3">
							<label
								htmlFor={`det_mail_${pop.id}`}
								className="form-label"
							>
								Mail
							</label>
							<input
								type="text"
								id={`det_mail_${pop.id}`}
								name="det_mail"
								className="form-control"
								readOnly={!editable}
								ref={inputMail}
							/>
						</div>
					</div>
					<div className="col-4">
						<div className="my-3">
							<label
								htmlFor={`contact_${pop.id}`}
								className="form-label"
							>
								Contact
							</label>
							<input
								type="text"
								name="contact"
								id={`contact_${pop.id}`}
								className="form-control"
								readOnly={!editable}
								ref={inputContact}
							/>
						</div>
					</div>
					<div className="col-4">
						<div className="my-1">
							<label
								htmlFor={`det_password_${pop.id}`}
								className="form-label"
							>
								Password
							</label>
							<div className="input-group">
								<input
									type="text"
									id={`det_password_${pop.id}`}
									name="det_password"
									className="form-control rounded"
									readOnly={!editable}
									ref={inputPassword}
								/>
								<button
									className="btn btn-outline-secondary rounded"
									type="button"
									id="button-addon2"
									title="copy"
									onClick={clipCopy}
								>
									<i className="bi bi-clipboard"></i>
								</button>
							</div>
							{!editable && (
								<div className="row justify-content-between mt-1">
									<div className="col-auto">
										<button
											className="btn btn-primary"
											data-bs-toggle="modal"
											data-bs-target={`#psedit_${pop.id}`}
										>
											AddNew
										</button>
									</div>
									<div className="col-auto">
										<button
											className="btn btn-info"
											data-bs-toggle="modal"
											data-bs-target={`#ps_${pop.id}`}
										>
											History
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
					<div className="col-4">
						<div className="my-3">
							<label
								htmlFor={`det_created_${pop.id}`}
								className="form-label"
							>
								Lastmodified
							</label>
							<input
								type="date"
								name="det_created"
								id={`det_created_${pop.id}`}
								className="form-control"
								readOnly
								ref={inputDate}
							/>
						</div>
					</div>
					<div className="col-12">
						<div className="my-3">
							<label
								htmlFor={`det_description_${pop.id}`}
								className="form-label"
							>
								Description
							</label>
							<textarea
								name="det_description"
								id={`det_description_${pop.id}`}
								rows="3"
								className="form-control"
								readOnly={!editable}
								ref={inputDescription}
							></textarea>
						</div>
					</div>
				</div>
			</Modal>
			<PsModal ps={ps} id={pop.id} />
			<PsEdit
				psedit={psedit}
				setPsedit={setPsedit}
				onSave={onSave}
				id={pop.id}
				clear={ps_clear}
			/>
		</>
	);
};

const Modal = ({ id, title, children, editable, toggle, save, assignBack }) => {
	const mclose = () => {
		if (editable === true) {
			toggle();
		}
		assignBack();
	};

	return (
		<div>
			<div
				className="modal fade"
				id={`det${id}`}
				tabIndex="-1"
				aria-labelledby="modalLabel"
				aria-hidden="true"
				data-bs-keyboard="false"
				data-bs-backdrop="static"
			>
				<div className="modal-dialog modal-dialog-centered modal-xl">
					<div className="modal-content">
						<div className="modal-header px-4">
							<h5 className="modal-title" id="modalLabel">
								{title}
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={mclose}
							></button>
						</div>
						<div className="modal-body py-2 px-4">{children}</div>
						<div className="modal-footer">
							{!!editable ? (
								<>
									<button
										type="button"
										className="btn btn-success"
										onClick={save}
									>
										save
									</button>
									<button
										type="button"
										className="btn btn-warning"
										onClick={mclose}
									>
										cancel
									</button>
								</>
							) : (
								<button
									type="button"
									className="btn btn-warning"
									onClick={toggle}
								>
									Edit
								</button>
							)}
							<button
								type="button"
								className="btn btn-danger"
								data-bs-dismiss="modal"
								onClick={mclose}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const PsModal = ({ ps, id }) => {
	return (
		<div
			className="modal fade"
			id={`ps_${id}`}
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			tabIndex="-1"
			aria-labelledby="staticBackdropLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="staticBackdropLabel">
							Password History
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<table className="table table-striped">
							<thead>
								<tr>
									<th>#</th>
									<th>Password</th>
									<th>Date</th>
								</tr>
							</thead>
							<tbody>
								{ps.map((p, i) => (
									<tr key={`${p.password}_${p.datetime}`}>
										<td>{1 + i}</td>
										<td>{p.password}</td>
										<td>
											{new Date(p.datetime).toUTCString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-danger"
							data-bs-dismiss="modal"
						>
							close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const PsEdit = ({ id, psedit, setPsedit, onSave, clear }) => {
	const [visible, setVisible] = useState(false);
	const handleChange = ({ target: { value } }) => {
		setPsedit((e) => ({ password: value }));
	};

	const save = (e) => {
		e.preventDefault();
		onSave();
	};

	const toggle = () => {
		setVisible((e) => !e);
	};

	return (
		<div
			className="modal fade"
			id={`psedit_${id}`}
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			tabIndex="-1"
			aria-labelledby="staticBackdropLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="staticBackdropLabel">
							AddNew Password
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={clear}
						></button>
					</div>
					<form onSubmit={save}>
						<div className="modal-body">
							<div className="my-2">
								<label htmlFor={`ps_edit${id}`}>Password</label>
								<div className="input-group">
									<input
										type={visible ? "text" : "password"}
										className="form-control rounded"
										id={`ps_edit${id}`}
										name="password"
										value={psedit.password}
										onChange={handleChange}
									/>
									{visible ? (
										<button
											type="button"
											onClick={toggle}
											className="btn rounded btn-grey"
										>
											<i className="bi bi-eye-slash-fill"></i>
										</button>
									) : (
										<button
											type="button"
											onClick={toggle}
											className="btn rounded btn-grey"
										>
											<i className="bi bi-eye"></i>
										</button>
									)}
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-danger"
								data-bs-dismiss="modal"
								onClick={clear}
							>
								close
							</button>
							<button
								type="submit"
								className="btn btn-success"
								data-bs-dismiss="modal"
							>
								save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditPs;
