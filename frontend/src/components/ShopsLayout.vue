<template>
	<mdb-container>
		<div v-for="(shops, index) in this.chunk(allShops, 4)" :key="index">
			<mdb-row>
				<shop-card v-for="shop in shops" :key="shop._id" :shop="shop" />
			</mdb-row>
			<br />
		</div>
	</mdb-container>
</template>

<script>
import { mdbContainer, mdbRow } from 'mdbvue';
import ShopCard from '@/components/ShopCard.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'ShopsLayout',
	components: {
		mdbContainer,
		mdbRow,
		ShopCard,
	},
	methods: {
		...mapActions(['fetchShops']),
		chunk: (arr, size) => {
			return Array.from(
				{ length: Math.ceil(arr.length / size) },
				(v, i) => arr.slice(i * size, i * size + size)
			);
		},
	},
	computed: mapGetters(['allShops']),
	created() {
		this.fetchShops({ skip: 0, limit: 16 });
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4 {
	margin: 0;
}
</style>
