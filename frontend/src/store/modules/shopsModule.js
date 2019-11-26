import axios from 'axios';

const state = {
	shops: [],
	count: 0,
};

const getters = {
	allShops: state => state.shops,
	count: state => state.count,
};

const actions = {
	async fetchShops({ commit }, params) {
		let str = Object.entries(params)
			.map(([key, val]) => `${key}=${val}`)
			.join('&');
		const response = await axios.get(
			`http://localhost:3000/api/v1/shops?${str}`
		);

		commit('setShopsAndCount', response.data);
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

const mutations = {
	setShopsAndCount: (state, data) => {
		state.shops = [...state.shops, ...data.docs];
		state.count = data.count;
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

export default {
	state,
	getters,
	actions,
	mutations,
};
