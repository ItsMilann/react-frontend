import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import { Provider } from "react-redux";
import store from "../store";
import Leads from "./LeadsMaster";
//for Alerts 
import Alerts from './Alerts'
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
//endImport
const alertOptions = {
	timeout: 3000,
	position: "top center"
}
class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<AlertProvider template={AlertTemplate}{...alertOptions}>
					<Fragment>
						<Header />
						<Leads />
					</Fragment>
				</AlertProvider>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
