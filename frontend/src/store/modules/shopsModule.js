import axios from 'axios';

//module state
const state = {
	shops: [],
	count: 0,
	loca: '',
};

//module getters
const getters = {
	loca: state => state.loca,
	allShops: state => state.shops,
	totalCount: state => state.count,
};

// module actions
const actions = {
	// async function to fetch shops from API
	async fetchShops({ commit }, params) {
		//turn object params to query params
		let str = Object.entries(params)
			.map(([key, val]) => `${key}=${val}`)
			.join('&');
		//add user location if permission granted
		str += state.loca ? `&location=${state.loca}` : '';
		//send get HTTP request and fetch data from response
		const response = await axios.get(
			`http://localhost:3000/api/v1/shops?${str}`
		);
		// commit mutation
		commit('setShopsAndCount', response.data);
	},
	getLocation({ commit }) {
		this.gettingLocation = true;
		// get position
		navigator.geolocation.getCurrentPosition(
			pos => {
				this.gettingLocation = false;
				// commit mutation to location
				commit(
					'setLocation',
					pos.coords.longitude + ',' + pos.coords.latitude
				);
				//initiate first fetch
				actions.fetchShops({ commit }, { skip: 0, limit: 16 });
			},
			err => {
				this.gettingLocation = false;
				this.errorStr = err.message;
				//initiate first fetch without location (defaults in backend
				// to center of Rabat)
				actions.fetchShops({ commit }, { skip: 0, limit: 16 });
			}
		);
	},
	// async addShop({ commit }, shop) {
	// 	const response = await axios.post(
	// 		'http://localhost:3000/api/v1/shops',
	// 		shop
	// 	);

	// 	commit('newShop', response.data);
	// },
	// async deleteShop({ commit }, id) {
	// 	await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

	// 	commit('removeShop', id);
	// },
	// async filterTodos({ commit }, e) {
	// 	// Get selected number
	// 	const limit = parseInt(
	// 		e.target.options[e.target.options.selectedIndex].innerText
	// 	);

	// 	const response = await axios.get(
	// 		`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
	// 	);

	// 	commit('setTodos', response.data);
	// },
	// async updateShop({ commit }, updTodo) {
	// 	const response = await axios.put(
	// 		`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
	// 		updTodo
	// 	);

	// 	console.log(response.data);

	// 	commit('updateTodo', response.data);
	// },
};

//module mutations
const mutations = {
	setShopsAndCount: (state, data) => {
		state.shops = [...state.shops, ...data.docs];
		state.count = data.count;
	},
	setLocation: (state, data) => {
		state.loca = data;
	},
	// newTodo: (state, todo) => state.todos.unshift(todo),
	// removeTodo: (state, id) =>
	// 	(state.todos = state.todos.filter(todo => todo.id !== id)),
	// updateTodo: (state, updTodo) => {
	// 	const index = state.todos.findIndex(todo => todo.id === updTodo.id);
	// 	if (index !== -1) {
	// 		state.todos.splice(index, 1, updTodo);
	// 	}
	// },
};

//export vuex shop module
export default {
	state,
	getters,
	actions,
	mutations,
};
