<template>
	<div>
		<!--Navbar-->
		<mdb-navbar
			v-if="isLoggedIn"
			v-show="navbarType == 'regular-fixed'"
			position="top"
			dark
			color="indigo"
			scrolling
		>
			<mdb-navbar-brand>Shoppy</mdb-navbar-brand>
			<mdb-navbar-toggler>
				<mdb-navbar-nav>
					<mdb-nav-item to="/" active>Nearby Shops</mdb-nav-item>
					<mdb-nav-item to="/liked">Liked Shops</mdb-nav-item>
				</mdb-navbar-nav>
				<mdb-navbar-nav right>
					<a v-on:click="logout()">
						<mdb-nav-item waves-fixed>Logout</mdb-nav-item>
					</a>
				</mdb-navbar-nav>
			</mdb-navbar-toggler>
		</mdb-navbar>
		<!--/.Navbar-->
	</div>
</template>

<script>
import {
	mdbNavbar,
	mdbNavItem,
	mdbNavbarNav,
	mdbNavbarBrand,
	mdbNavbarToggler,
	mdbInput,
	mdbBtn,
} from 'mdbvue';
import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'Navigation',
	components: {
		mdbNavbar,
		mdbNavItem,
		mdbNavbarNav,
		mdbNavbarBrand,
		mdbNavbarToggler,
		mdbInput,
		mdbBtn,
	},
	data() {
		return {
			navbarType: 'regular-fixed',
			content: false,
		};
	},
	computed: {
		...mapGetters(['isLoggedIn']),
	},
	methods: {
		//mapping logout action from store's authModule
		...mapActions(['logout']),
	},
};
</script>
