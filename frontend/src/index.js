import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios'
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			email: "",
			first_name: "",
			last_name: "",
			password: "",
			password2: "",
			isLoggedIn: false
		};
	}
	handlechange = e => {
		this.setState({ [e.target.name]: e.target.value})
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const { email, first_name, last_name, password, password2 } = this.state;
		const data = { email, first_name, last_name, password, password2}
		axios.post("http://127.0.0.1:8000/accounts/api/register/", data).then(res => {
			console.log(res.data)
			}).catch(error => {
			console.log(error)
			})
		this.setState({
			email: "",
			first_name: "",
			last_name: "",
			password: "",
			password2: "",
			isLoggedIn: false,
		});
	}
	render() {
		return (
			<div className="container col-md-4 mt-3">
				<form
					className="text-center border border-light p-5"
					action="#!"
					onSubmit={this.handleSubmit}>
					<input
						type="email"
						id="defaultLoginFormEmail"
						className="form-control mb-4"
						placeholder="E-mail"
						name="email"
						value={this.state.email}
						onChange={this.handlechange}
					/>
					<input
						type="text"
						id="first_name"
						className="form-control mb-4"
						placeholder="First Name"
						name="first_name"
						value={this.state.first_name}
						onChange={this.handlechange}
					/>
					<input
						type="text"
						id="last_name"
						className="form-control mb-4"
						placeholder="Last Name"
						name="last_name"
						value={this.state.last_name}
						onChange={this.handlechange}
					/>
					<input
						type="password"
						id="defaultLoginFormPassword"
						className="form-control mb-4"
						placeholder="Password"
						name="password"
						value={this.state.password}
						onChange={this.handlechange}
					/>
					<input
						type="password"
						id="defaultLoginFormPassword2"
						className="form-control mb-4"
						placeholder="Repeat Password"
						name="password2"
						value={this.state.password2}
						onChange={this.handlechange}
					/>
					<button className="btn btn-info btn-block my-4" type="submit">
						Sign Up
					</button>
					<p>
						Already have a account?
						<a href="">Log In</a>
					</p>
				</form>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));
