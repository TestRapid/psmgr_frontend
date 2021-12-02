// custom imports
import AddNew from "./components/AddNew";
import Details from "./components/Details";
import Layout from "./Layout/Layout";

import "./App.css";

// main app function
function App() {
	return (
		<Layout>
			<AddNew />
			<Details />
		</Layout>
	);
}

export default App;
