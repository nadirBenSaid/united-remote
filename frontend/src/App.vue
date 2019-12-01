<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
	name: 'App',
	created() {
		if (!localStorage.getItem('token'))
			Swal.fire(
				'Welcome!',
				'Please start by either signing up or signing in to experience the website',
				'info'
			);
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
	background: aliceblue;
}
body {
	background: aliceblue;
}
</style>
