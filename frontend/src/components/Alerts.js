// import React, { Component, Fragment } from "react";
// import { withAlert } from "react-alert";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";

// //actionTypes
// export const GET_ERRORS = "GET_ERRORS";

// //errorReducer
// const initialState = {
// 	msg: {},
// 	status: null,
// };

// export const errors = function (state = initialState, action) {
// 	switch (action.type) {
// 		case GET_ERRORS:
// 			return {
// 				msg: action.payload.msg,
// 				status: action.payload.status,
// 			};
// 		default:
// 			return state;
// 	}
// };

// class Alerts extends Component {
// 	static propTypes = {
// 		error: PropTypes.object.isRequired,
// 	};
// 	componentDidUpdate(previousProps) {
// 		const { error, alert } = this.props;
// 		if (error !== previousProps) {
// 			if (error.msg.name) {
// 				alert.error(`Name: ${error.msg.name.join()}`);
// 			}
// 			if (error.msg.email) {
// 				alert.error(`Email: ${error.msg.email.join()}`);
// 			}
// 			if (error.msg.message) {
// 				alert.error(`Message: ${error.msg.message.join()}`);
//       }
//       if (error.msg) {
//         alert.success(error.msg);
//       }
// 		}
// 	}
// 	render() {
// 		return <Fragment />;
// 	}
// }
// const mapStateToProps = (state) => ({
// 	error: state.errors,
// });
// export default connect(mapStateToProps)(withAlert()(Alerts));
