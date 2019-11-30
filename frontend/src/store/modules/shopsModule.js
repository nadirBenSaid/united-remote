import axios from 'axios';
import router from '../../router';

//module state
const state = {
	// an array containing all shops to display in home
	shops: [],
	// total count of shops to display in home
	// (varies each time we fetch more shops)
	// it is the sum of the next two counts
	totalCount: 0,
	// totalCount fetched from API response
	fetchedCount: 0,
	// total of liked/disliked shops of user
	hiddenCount: 0,
	// total of fetches
	fetchRounds: 0,
	// user's location
	location: '',
	// user token
	token: localStorage.getItem('token') || '',
	// array of liked shops Ids
	likedShopsIds: [],
	// array of disliked shops Ids
	dislikedShopsIds: [],
};

//module getters
const getters = {
	// getter of login state
	isLoggedIn: state => !!state.token,
	// getter of token
	getToken: state => state.token,
	// getter of liked shops ids
	getLikedIds: state => state.likedShopsIds,
	// getter of disliked shops ids
	getDislikedIds: state => state.dislikedShopsIds,
	// getter of user location
	location: state => state.location,
	// getter of all shops to display in home
	allShops: state => state.shops,
	// getter of shops total count when scrolling to bottom of page
	totalCount: state => state.totalCount,
	// getter of number of excluded shops from home
	getHidden: state => state.hiddenCount,
	//getter for skipping
	getSkip: state => state.fetchRounds,
};

// module actions
const actions = {
	//function to signup new user, commits token in case of success to mutation
	signup({ commit }, user) {
		//check if all required data is present
		if (user.email && user.password && user.name) {
			axios
				//perform post to Backend
				.post(`${process.env.VUE_APP_URL}/api/v1/users`, {
					email: user.email,
					password: user.password,
					name: user.name,
				})
				// in case of success, commit
				.then(response => commit('setToken', response.data))
				//log error
				.catch(err => {
					console.error(err);
				});
		}
	},

	//function to login then commit token to mutations
	login({ commit }, user) {
		// check data
		if (user.email && user.password) {
			axios
				// post to login endpoint
				.post(`${process.env.VUE_APP_URL}/api/v1/users/login`, {
					email: user.email,
					password: user.password,
				})
				// promise success, commit to mutations
				.then(response => commit('setToken', response.data))
				// log error in case of error
				.catch(err => {
					console.error(err);
				});
		}
	},

	// function that sets location in state and sends first shops request
	getLocation({ commit }) {
		// get position from navigator
		navigator.geolocation.getCurrentPosition(
			// success callback
			pos => {
				// commit mutation to location
				commit(
					'setLocation',
					pos.coords.longitude + ',' + pos.coords.latitude
				);
				//initiate first shop fetch
				if (state.fetchedCount == 0)
					actions.fetchShops({ commit }, { skip: 0, limit: 16 });
			},
			// error callback
			err => {
				// log error
				console.error(err.message);
				//initiate first fetch without location (defaults in backend
				// to center of Rabat)
				if (state.fetchedCount == 0)
					actions.fetchShops({ commit }, { skip: 0, limit: 16 });
			}
		);
	},

	// function to fetch shops from API
	fetchShops({ commit }, params) {
		// call to function responsible of
		// retrievig liked/disliked shop IDs
		actions.fetchUserShops({ commit });

		//turn object params to query params
		let queryParams = Object.entries(params)
			.map(([key, val]) => `${key}=${val}`)
			.join('&');

		//add user location if permission granted
		queryParams += state.location ? `&location=${state.location}` : '';

		//send get HTTP request and fetch data from response
		axios
			.get(`${process.env.VUE_APP_URL}/api/v1/shops?${queryParams}`)
			// commit mutation
			.then(res => {
				// filter liked disliked shops from fetched
				// shops and update counter accordingly
				res.data.docs = res.data.docs.filter(shop => {
					if (
						[
							...state.likedShopsIds,
							...state.dislikedShopsIds,
						].includes(shop._id)
					) {
						commit('updateHidden');
						return false;
					} else {
						return true;
					}
				});
				// commit data to mutation
				commit('setShopsAndCount', res.data);
			})
			// error handling
			.catch(err => console.error(err));
	},

	// function to fetch liked/disliked shops from API
	fetchUserShops({ commit }) {
		//set Authorization header
		axios.defaults.headers.common['Authorization'] = state.token;
		//send get HTTP request and fetch data from response
		axios
			.get(`${process.env.VUE_APP_URL}/api/v1/users/shops`)
			// commit mutation
			.then(res => commit('setShops', res.data))
			//handle error
			.catch(err => console.error(err));
	},

	// logout function
	logout({ commit }) {
		//reset token from localStorage
		localStorage.removeItem('token');
		//reset authorization header
		delete axios.defaults.headers.common['Authorization'];
		//commit to mutation
		commit('logout');
	},

	// like a shop
	likeShop: ({ commit }, id) => {
		//set authorization header
		axios.defaults.headers.common['Authorization'] = state.token;
		//send put request to alter user likes
		axios
			.put(`${process.env.VUE_APP_URL}/api/v1/users/shops/${id}`, {
				up: true,
			})
			// promise success:
			.then(user => {
				// commit mutations
				commit('filterShops', id);
				commit('setShops', user.data);
				commit('updateHidden');
			})
			// log error if failed
			.catch(err => console.error(err));
	},

	// dislike a shop
	dislikeShop: ({ commit }, id) => {
		//set authorization header
		axios.defaults.headers.common['Authorization'] = state.token;
		//send put request to alter user dislikes
		axios
			.put(`${process.env.VUE_APP_URL}/api/v1/users/shops/${id}`, {
				up: false,
			})
			// success callback
			.then(user => {
				// commit mutations
				commit('updateHidden');
				commit('filterShops', id);
				commit('setShops', user.data);
			})
			// log error
			.catch(err => console.error(err));
	},
};

//module mutations
const mutations = {
	//set token then store it in local storage
	setToken: (state, data) => {
		state.token = 'Bearer ' + data;
		localStorage.setItem('token', state.token);
		router.push('/');
	},
	// set user location
	setLocation: (state, data) => {
		state.location = data;
	},
	// set user shop preferences
	setShops: (state, user) => {
		state.likedShopsIds = user.likes;
		state.dislikedShopsIds = user.dislikes.map(shop => shop._id);
	},
	// set shop array from fetched response data and update counts
	setShopsAndCount: (state, data) => {
		state.shops = [...state.shops, ...data.docs];
		state.fetchedCount = data.totalCount;
		state.totalCount = state.fetchedCount + state.hiddenCount;
		state.fetchRounds += 1;
	},
	// unset all token data and direct to auth page
	logout: state => {
		state.token = '';
		state.likedShopsIds = [];
		state.dislikedShopsIds = [];
		router.push('/auth');
	},
	// update number of shops hidden from home page
	updateHidden: state => (state.hiddenCount -= 1),
	// remove liked/disliked shop from home page
	filterShops: (state, id) =>
		(state.shops = state.shops.filter(shop => shop._id != id)),
};

//export vuex module
export default {
	state,
	getters,
	actions,
	mutations,
};
