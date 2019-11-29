import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/liked',
		name: 'liked',
		component: () => import('../views/LikedShops.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/auth',
		name: 'auth',
		component: () => import('../views/Auth.vue'),
		meta: {
			requiresNotAuth: true,
		},
	},
];

const router = new VueRouter({
	// mode: 'history',
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (store.getters.isLoggedIn) {
			next();
			return;
		}
		next('/auth');
	} else if (to.matched.some(record => record.meta.requiresNotAuth)) {
		if (!store.getters.isLoggedIn) {
			next();
			return;
		}
		next('/');
	} else {
		next();
	}
});

export default router;
