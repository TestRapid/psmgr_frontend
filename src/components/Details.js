import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// actions
import { fetchAll } from "../store/slices/listReducer";

// custom component
import EditPs from "./EditPs";

const Details = () => {
	const dispatch = useDispatch();
	const list = useSelector((state) => state.list.list);

	useEffect(() => {
		dispatch(fetchAll());
	}, [dispatch]);

	return (
		<section className="container">
			<table className="table table-striped border">
				<thead>
					<tr>
						<th>#</th>
						<th>title</th>
						<th>username</th>
						<th>description</th>
						<th>last modified</th>
					</tr>
				</thead>
				<tbody>
					{list.map((l, i) => (
						<tr
							data-bs-toggle="modal"
							data-bs-target={`#det${l.id}`}
							className="cursor"
							key={l.id}
						>
							<td>{1 + i}</td>
							<td>{l.title}</td>
							<td>{l.username}</td>
							<td>{l.description}</td>
							<td>
								{new Date(
									l.passwords[l.passwords.length - 1].datetime
								).toLocaleDateString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{list.map((l) => (
				<EditPs key={l.id} pop={l} />
			))}
		</section>
	);
};

export default Details;
