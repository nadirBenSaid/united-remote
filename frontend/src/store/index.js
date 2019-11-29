import Vue from 'vue';
import Vuex from 'vuex';
import shopsModule from './modules/shopsModule';
import authModule from './modules/authModule';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		shops: shopsModule,
		auth: authModule,
	},
});
