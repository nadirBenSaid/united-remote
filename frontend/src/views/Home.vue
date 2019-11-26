<template>
	<div class="home">
		<ShopsLayout />
	</div>
</template>

<script>
// @ is an alias to /src
import ShopsLayout from '@/components/ShopsLayout.vue';

export default {
	name: 'home',
	components: {
		ShopsLayout,
	},
};
</script>
