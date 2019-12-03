<template>
	<mdb-container>
		<div v-for="(shops, index) in this.chunk(allShops, 4)" :key="index">
			<mdb-row>
				<shop-card v-for="shop in shops" :key="shop._id" :shop="shop" />
			</mdb-row>
			<br />
		</div>
		<section
			v-if="totalCount != allShops.length"
			v-observe-visibility="
				(isVisible, entry) =>
					visibilityChanged(isVisible, entry, fetchShops, getSkip)
			"
		>
			<div class="justify-content-center">
				<div class="spinner-border" role="status">
					<span class="sr-only">Loading...</span>
				</div>
			</div>
		</section>
	</mdb-container>
</template>

<script>
import ShopCard from '@/components/ShopCard.vue';
import { mdbContainer, mdbRow } from 'mdbvue';

//Importing Getters and Actions mappers to manipulate vuex state
import { mapGetters, mapActions } from 'vuex';

//detect bottom of page
import { ObserveVisibility } from 'vue-observe-visibility';

export default {
	name: 'ShopsLayout',
	directives: {
		ObserveVisibility,
	},
	components: {
		mdbContainer,
		mdbRow,
		ShopCard,
	},
	methods: {
		//mapping shop module actions
		...mapActions(['fetchShops', 'getLocation']),

		//fetch more shops if bottom of page reached
		visibilityChanged: (isVisible, entry, fetchShops, getSkip) => {
			if (isVisible) {
				fetchShops({
					skip: 16 * getSkip,
					limit: 16,
				});
			}
		},

		//function to slice array
		//example: [1,2,3,4,5,6] --> [[1,2,3,4],[5,6]]
		chunk: (arr, size) => {
			return Array.from(
				{ length: Math.ceil(arr.length / size) },
				(v, i) => arr.slice(i * size, i * size + size)
			);
		},
	},
	mounted() {
		//get user location, and display first 16 shops if there are shops
		// that match the user's location.
		this.getLocation();
	},
	computed: mapGetters(['allShops', 'totalCount', 'getSkip']),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4 {
	margin: 0;
}
</style>
