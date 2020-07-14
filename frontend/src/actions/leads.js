// //import axios from 'axios'
// import { GET_LEADS } from "./types";
// import { combineReducers, bindActionCreators } from "redux";

// //getLeads

// export const getLeads = () => (dispatch) => {
// 	fetch("/leads/api/")
// 		.then((res) => res.json())
// 		.then((data) => {
// 			dispatch({
// 				type: GET_LEADS,
//         payload: data,
// 			});
// 		})
// 		.catch((err) => console.log(err));
// };

// //we call it from leads components/leads/Leads.js
