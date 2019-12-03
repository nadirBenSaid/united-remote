<template>
	<mdb-container>
		<transition-group name="list">
			<shop-card
				v-for="shop in getLikedShops"
				:key="shop._id"
				:shop="shop"
			/>
		</transition-group>
	</mdb-container>
</template>

<script>
import ShopCard from '@/components/ShopCard.vue';
import { mdbContainer } from 'mdbvue';

//Importing Getters and Actions mappers to manipulate vuex state
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'ShopsLayout',
	components: {
		mdbContainer,
		ShopCard,
	},
	methods: {
		//mapping store actions
		...mapActions(['fetchLikedShops']),
	},
	//mapping store getters
	computed: mapGetters(['getLikedShops']),
	created() {
		// fetch an array of user's liked shops
		this.fetchLikedShops();
	},
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
