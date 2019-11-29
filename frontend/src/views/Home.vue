<template>
	<div>
		<Navbar />
		<div class="home">
			<ShopsLayout />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import ShopsLayout from '@/components/ShopsLayout.vue';
import Navbar from '@/components/Navbar.vue';

export default {
	name: 'home',
	components: {
		ShopsLayout,
		Navbar,
	},
};
</script>

<style scoped>
.home {
	margin-top: 7%;
}
</style>
