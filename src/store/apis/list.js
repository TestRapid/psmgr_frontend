import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:5000/psmgr"
});

export const fetchAll = () => api.get("/");
export const addNew = (obj) => api.post("/", obj);
export const editItem = (obj) => api.patch(`/${obj.id}`, obj);
