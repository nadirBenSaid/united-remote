<template>
	<div>
		<!--Navbar-->
		<mdb-navbar
			v-if="isLoggedIn"
			v-show="navbarType == 'regular-fixed'"
			position="top"
			light
			color="cloudy-knoxville-gradient"
			scrolling
		>
			<mdb-navbar-brand>Shoppy</mdb-navbar-brand>
			<mdb-navbar-toggler>
				<mdb-navbar-nav>
					<mdb-nav-item id="root" to="/" active darkWaves
						>Nearby Shops</mdb-nav-item
					>
					<mdb-nav-item id="liked" to="/liked" darkWaves
						>Liked Shops</mdb-nav-item
					>
				</mdb-navbar-nav>
				<mdb-navbar-nav right>
					<a v-on:click="logout()">
						<mdb-nav-item darkWaves>Logout</mdb-nav-item>
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
