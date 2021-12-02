import store from "./store";
import { Provider } from "react-redux";

const index = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};

export default index;
