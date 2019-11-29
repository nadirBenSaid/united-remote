import axios from 'axios';
import router from '../../router';

//module state
const state = {
	token: localStorage.getItem('token') || '',
	likedShopsIds: [],
	dislikedShopsIds: [],
};

//module getters
const getters = {
	isLoggedIn: state => !!state.token,
	getToken: state => state.token,
	getLikedIds: state => state.likedShopsIds,
	getDislikedIds: state => state.dislikedShopsIds,
};

// module actions
const actions = {
	// async function to fetch liked/disliked shops from API
	async fetchUserShops({ commit }) {
		//send get HTTP request and fetch data from response
		const response = await axios.get(
			'http://localhost:3000/api/v1/users/shops'
		);
		// commit mutation
		commit('setShops', response.data);
	},
	signup({ commit }, user) {
		if (user.email && user.password && user.name) {
			axios
				.post('http://localhost:3000/api/v1/users', {
					email: user.email,
					password: user.password,
					name: user.name,
				})
				.then(response => commit('setToken', response.data))
				.catch(err => {
					console.log(err);
				});
		}
	},
	login({ commit }, user) {
		if (user.email && user.password) {
			axios
				.post('http://localhost:3000/api/v1/users/login', {
					email: user.email,
					password: user.password,
				})
				.then(response => commit('setToken', response.data))
				.catch(err => {
					console.log(err);
				});
		}
	},
	logout({ commit }) {
		localStorage.removeItem('token');
		delete axios.defaults.headers.common['Authorization'];
		commit('logout');
	},
};

//module mutations
const mutations = {
	setShops: (state, data) => {
		state.likedShopsIds = data.likes;
		state.dislikedShopsIds = data.dislikes;
	},
	setToken: (state, data) => {
		state.token = 'Bearer ' + data;
		localStorage.setItem('token', state.token);
		axios.defaults.headers.common['Authorization'] = state.token;
		router.push('/');
	},
	logout: state => {
		state.token = '';
		state.likedShopsIds = [];
		state.dislikedShopsIds = [];
		router.push('/auth');
	},
};

//export vuex auth module
export default {
	state,
	getters,
	actions,
	mutations,
};
