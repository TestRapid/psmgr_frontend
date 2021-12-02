import { configureStore } from "@reduxjs/toolkit";

import listReducer from "./slices/listReducer";

export default configureStore({
	reducer: {
		list: listReducer
	}
});
