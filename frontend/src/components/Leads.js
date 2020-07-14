// import { GET_LEADS } from "../actions/types";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
//actionTypes
const GET_LEADS = "GET_LEADS";
const DELETE_LEAD = "DELETE_LEAD";
const ADD_LEAD = "ADD_LEAD";

//ACTIONS
//for 403 forbidden error due to csrf token validaion fail
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const getLeads = () => (dispatch) => {
	fetch("leads/api/")
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			dispatch({
				type: GET_LEADS,
				payload: data,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

const deleteLead = (id) => (dispatch) => {
	axios.delete(`leads/api/${id}/`).then((res) => {
		dispatch({
			type: DELETE_LEAD,
			payload: id,
		});
	});
};

export const addLead = (lead) => (dispatch) => {
	axios
		.post("http://127.0.0.1:8000/leads/api/", lead)
		.then((res) => {
			dispatch({
				type: ADD_LEAD,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

//REDUCERS // 51-32
const initialState = {
	leads: [],
};

export const leads = function (state = initialState, action) {
	switch (action.type) {
		case GET_LEADS:
			return {
				...state,
				leads: action.payload,
			};
		case DELETE_LEAD:
			return {
				...state,
				leads: state.leads.filter((lead) => lead.id !== action.payload),
			};
		case ADD_LEAD:
			return {
				...state,
				leads: [...state.leads, action.payload],
			};
		default:
			return state;
	}
};
//appLeads
class Leads extends Component {
	static propTypes = {
		leads: PropTypes.array.isRequired,
	};
	componentDidMount() {
		this.props.getLeads();
	}
	render() {
		return (
			<div className="container">
				<div className="col-md-6">
					<div className="table-responsive">
						<h4>Leads</h4> <hr />
						<table className="table table-dark">
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">Name</th>
									<th scope="col">Email</th>
									<th scope="col">Message</th>
									<th />
								</tr>
							</thead>
							<tbody>
								{this.props.leads.map((lead) => {
									return (
										<tr key={lead.id}>
											<td>{lead.id}</td>
											<td>{lead.name}</td>
											<td>{lead.email}</td>
											<td>{lead.message}</td>
											<td>
												<button
													className="btn btn-sm btn-light"
													type="button"
													onClick={this.props.deleteLead.bind(this, lead.id)}>
													Delete
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	leads: state.leads.leads,
});

export default connect(mapStateToProps, { getLeads, deleteLead })(Leads);
