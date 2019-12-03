<template>
	<div id="app">
		<Navigation />
		<router-view />
	</div>
</template>

<script>
import Swal from 'sweetalert2';

import Navigation from '@/views/Navbar.vue';

export default {
	name: 'App',
	components: {
		Navigation,
	},
	created() {
		if (!localStorage.getItem('token')) {
			Swal.fire({
				title: 'Welcome!',
				text:
					'We invite you to signup or login in order to experience the website',
				icon: 'info',
			});
		}
	},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background: #eceeef;
}
body {
	background: #eceeef;
}
</style>
