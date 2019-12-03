<template>
	<mdb-container>
		<transition-group name="list">
			<shop-card v-for="shop in allShops" :key="shop._id" :shop="shop" />
		</transition-group>
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
import { mdbContainer } from 'mdbvue';

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
span {
	display: flex;
	flex-wrap: wrap;
}
.list-enter-active,
.list-leave-active {
	transition: all 1s;
}
.list-enter,
.list-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
</style>
