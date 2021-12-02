import { useState } from "react";
import { useDispatch } from "react-redux";

import { addNew } from "../store/slices/listReducer";

const init = {
	title: "",
	description: "",
	mail: "",
	username: "",
	contact: "",
	password: ""
};

const AddNew = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState(init);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(addNew(value));
		clear();
	};

	const handleChange = ({ target: { name, value } }) => {
		setValue((e) => ({ ...e, [name]: value }));
	};

	const clear = () => {
		setValue(init);
	};

	return (
		<section className="container">
			<button
				type="button"
				className="btn btn-primary btn-lg my-4"
				data-bs-toggle="modal"
				data-bs-target="#modalAdd"
			>
				Add New
			</button>
			<Modal title="Add New Details" clear={clear}>
				<form onSubmit={onSubmit}>
					<div className="row">
						<div className="col-6">
							<div className="my-3">
								<label htmlFor="title" className="form-label">
									Title
								</label>
								<input
									type="text"
									name="title"
									id="title"
									className="form-control"
									placeholder="Title"
									onChange={handleChange}
									value={value.title}
								/>
							</div>
						</div>
						<div className="col-6">
							<div className="my-3">
								<label
									htmlFor="username"
									className="form-label"
								>
									Username
								</label>
								<input
									type="text"
									name="username"
									id="username"
									className="form-control"
									placeholder="Username"
									onChange={handleChange}
									value={value.username}
								/>
							</div>
						</div>
						<div className="col-6">
							<div className="my-3">
								<label
									htmlFor="password"
									className="form-label"
								>
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									className="form-control"
									placeholder="Password"
									onChange={handleChange}
									value={value.password}
								/>
							</div>
						</div>
						<div className="col-6">
							<div className="my-3">
								<label htmlFor="mail" className="form-label">
									Mail
								</label>
								<input
									type="text"
									name="mail"
									id="mail"
									className="form-control"
									placeholder="Mail"
									onChange={handleChange}
									value={value.mail}
								/>
							</div>
						</div>
						<div className="col-6">
							<div className="my-3">
								<label
									htmlFor="description"
									className="form-label"
								>
									Description
								</label>
								<textarea
									name="description"
									id="description"
									rows="3"
									className="form-control"
									placeholder="Description"
									onChange={handleChange}
									value={value.description}
								></textarea>
							</div>
						</div>
						<div className="col-6">
							<div className="my-3">
								<label htmlFor="contact" className="form-label">
									Contact
								</label>
								<input
									type="text"
									name="contact"
									id="contact"
									className="form-control"
									placeholder="Contact"
									onChange={handleChange}
									value={value.contact}
								/>
							</div>
						</div>
						<div className="col-12 my-4">
							<button
								className="btn btn-primary btn-lg w-100"
								type="submit"
								data-bs-dismiss="modal"
							>
								Add
							</button>
						</div>
					</div>
				</form>
			</Modal>
		</section>
	);
};

const Modal = ({ title, clear, children }) => {
	return (
		<div>
			<div
				className="modal fade"
				id="modalAdd"
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
								onClick={() => clear()}
							></button>
						</div>
						<div className="modal-body py-2 px-4">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddNew;
