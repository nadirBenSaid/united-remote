import Vue from 'vue';
import Vuex from 'vuex';
import shopsModule from './modules/shopsModule';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		shops: shopsModule,
	},
});
