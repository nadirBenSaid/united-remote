<template>
	<div class="likes">
		<LikedShopsLayout />
	</div>
</template>

<script>
import LikedShopsLayout from '@/components/LikedShopsLayout.vue';

export default {
	name: 'LikedShops',
	components: { LikedShopsLayout },
};
</script>

<style scoped>
.likes {
	margin-top: 7%;
}
</style>
