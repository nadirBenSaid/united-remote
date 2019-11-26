<template>
	<mdb-col lg="3">
		<mdb-card>
			<mdb-view hover>
				<mdb-card-image
					v-on:click="alert('shop details')"
					:src="shop.picture"
					alt="Card image cap"
				></mdb-card-image>
				<mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
			</mdb-view>
			<mdb-card-body>
				<mdb-card-title>{{ shop.name }}</mdb-card-title>
				<mdb-card-text>City: {{ shop.city }}</mdb-card-text>
				<mdb-btn-group vertical>
					<mdb-btn-group>
						<mdb-btn
							color="success"
							size="sm"
							icon="thumbs-up"
							v-on:click="alert('shop likes')"
						></mdb-btn>
						<mdb-btn
							color="danger"
							size="sm"
							icon="thumbs-down"
							v-on:click="alert('shop disliked')"
						></mdb-btn>
					</mdb-btn-group>
					<!-- <mdb-btn
						id="details"
						size="sm"
						color="primary"
						icon="info-circle"
						v-on:click="alert('shop details')"
						>Details</mdb-btn -->
					>
				</mdb-btn-group>
			</mdb-card-body>
		</mdb-card>
	</mdb-col>
</template>

<script>
import {
	mdbCol,
	mdbCard,
	mdbCardImage,
	mdbCardBody,
	mdbCardTitle,
	mdbCardText,
	mdbBtnGroup,
	mdbBtn,
	mdbView,
	mdbMask,
} from 'mdbvue';

export default {
	name: 'ShopCard',
	props: { shop: Object },
	components: {
		mdbCol,
		mdbCard,
		mdbCardImage,
		mdbCardBody,
		mdbCardTitle,
		mdbCardText,
		mdbBtnGroup,
		mdbBtn,
		mdbView,
		mdbMask,
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#details {
	margin: 0px;
}
</style>
