<template>
	<div>
		<!--Navbar-->
		<mdb-navbar
			v-show="navbarType == 'regular-fixed'"
			position="top"
			dark
			color="primary"
			scrolling
		>
			<mdb-navbar-toggler>
				<mdb-navbar-nav>
					<mdb-nav-item waves-fixed>
						<router-link :to="{ name: 'home' }">Home</router-link>
					</mdb-nav-item>
					<mdb-nav-item waves-fixed>
						<router-link :to="{ name: 'liked' }"
							>Liked Shops</router-link
						>
					</mdb-nav-item>
				</mdb-navbar-nav>
				<!-- Search form -->
				<!-- <form>
          <mdb-input
            type="text"
            class="text-white"
            placeholder="Search"
            aria-label="Search"
            label
            navInput
            waves
            waves-fixed
          />
        </form> -->
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
	mdbNavbarToggler,
	mdbInput,
	mdbBtn,
} from 'mdbvue';

export default {
	name: 'NavigationPage',
	components: {
		mdbNavbar,
		mdbNavItem,
		mdbNavbarNav,
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
};
</script>
<style scoped>
a {
	color: white;
}
</style>
