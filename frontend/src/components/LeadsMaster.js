const GET_LEADS = "GET_LEADS";
const DELETE_LEAD = "DELETE_LEAD";
const ADD_LEAD = "ADD_LEAD";
const GET_ERRORS = "GET_ERRORS";
import axios from "axios";
//for Alerts
import { withAlert } from "react-alert";
// import { GET_ERRORS } from "./Alerts"; // for seperate Alert Component
//it is better to have seperate alert component for reusability)

//ACTIONS
export const getLeads = () => (dispatch) => {
	axios.get("http://127.0.0.1:8000/leads/api/").then((res) => {
		dispatch({
			type: GET_LEADS,
			payload: res.data,
		});
	});
};

export const deleteLead = (id) => (dispatch) => {
	axios.delete(`leads/api/${id}`).then((res) => {
		dispatch({
			type: DELETE_LEAD,
			payload: id,
		});
		dispatch({
			type: GET_ERRORS,
			payload: {
				msg: "Lead deleted!",
				status: 203,
			},
		});
	});
};

export const addLead = (lead) => (dispatch) => {
	axios
		.post("leads/api/", lead)
		.then((res) => {
			dispatch({
				type: ADD_LEAD,
				payload: res.data,
			});
			dispatch({
				type: GET_ERRORS,
				payload: {
					msg: "Lead added!",
					status: 201,
				},
			});
		})
		.catch((err) => {
			console.log(err.response.status);
			dispatch({
				type: GET_ERRORS,
				payload: {
					msg: err.response.data,
					status: err.response.status,
				},
			});
		});
};

//reducers
const initialState = {
	leads: [],
	msg: {},
	status: null,
};
export const lead = (state = initialState, action) => {
	switch (action.type) {
		case GET_LEADS:
			return {
				...state,
				leads: action.payload,
			};
		case DELETE_LEAD:
			return {
				leads: state.leads.filter((leads) => {
					lead.id !== action.payload;
				}),
			};
		case ADD_LEAD:
			return {
				...state,
				leads: [...state.leads, action.payload],
			};
		case GET_ERRORS:
			return {
				msg: action.payload.msg,
				status: action.payload.status,
			};
		default:
			return state;
	}
};

//JSX
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Leads extends Component {
	state = {
		name: "",
		email: "",
		message: "",
	};
	static propTypes = {
		leads: PropTypes.array.isRequired,
		error: PropTypes.object.isRequired
	};
	componentDidMount() {
		this.props.getLeads();
	}
	componentDidUpdate(previousProps) {
		const error = this.props.error;
		if (error !== previousProps) {
			if (error.msg.name) {
				alert.error(`Name: ${error.msg.name.join()}`);
			}
			if (error.msg.email) {
				alert.error(`Email: ${error.msg.email.join()}`);
			}
			if (error.msg.message) {
				alert.error(`Message: ${error.msg.message.join()}`);
			}
			if (error.msg) {
				alert.success(error.msg);
			}
		}
	}
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	handleSubmit = (event) => {
		event.preventDefault();
		const lead = {
			name: this.state.name,
			email: this.state.email,
			message: this.state.message,
		};
		// or use shorthand syntax
		// const { name, email, message } = this.state
		// const leads = {name, email, message }
		this.props.addLead(lead);
	};
	render() {
		return (
			<div className="container mt-5">
				<div className=" col-md-6">
					<h5 className="text-dark font-weight-light">Add Leads!</h5>
					<hr />
					<form className="form" onSubmit={this.handleSubmit}>
						<input
							className="form-control mt-1"
							type="text"
							name="name"
							placeholder="Name"
							value={this.state.name}
							onChange={this.handleChange}
						/>
						<input
							className="form-control mt-1"
							type="text"
							name="email"
							placeholder="Email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
						<input
							className="form-control mt-1"
							type="text"
							name="message"
							placeholder="Message"
							value={this.state.message}
							onChange={this.handleChange}
						/>
						<button
							type="submit"
							className="btn btn-sm btn-outline-success mt-1">
							Add Lead
						</button>
					</form>
					<h5 className="text-dark font-weight-light">Your Leads!</h5>
					<hr />
					{this.props.leads.map((lead) => {
						return (
							<div key={lead.id}>
								<p className="d-inline">
									{lead.name} {lead.email} {lead.message}
								</p>
								<button
									className="d-inline btn btn-sm btn-outline-danger ml-3"
									onClick={this.props.deleteLead.bind(this, lead.id)}>
									Delete
								</button>
								<hr />
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	leads: state.leads.leads,
	error: state.errors,
});
export default connect(mapStateToProps, { getLeads, deleteLead, addLead })(
	// Leads,
	withAlert()(Leads),
);
