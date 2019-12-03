<template>
	<mdb-col lg="3">
		<mdb-card class="animated">
			<mdb-view hover>
				<mdb-card-image :src="shop.picture"></mdb-card-image>
				<mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
			</mdb-view>
			<mdb-card-body style="background-color: rgb(247, 247, 247);">
				<mdb-card-title>{{ shop.name }}</mdb-card-title>
				<mdb-card-text>City: {{ shop.city }}</mdb-card-text>
				<div v-if="$route.path == '/'">
					<mdb-btn
						gradient="cloudy-knoxville"
						size="md"
						darkWaves
						v-on:click="dislikeShop(shop._id)"
						><mdb-icon
							style="font-size: 15px;"
							icon="thumbs-down"
							class="deep-orange-text"
					/></mdb-btn>
					<mdb-btn
						gradient="cloudy-knoxville"
						size="md"
						darkWaves
						v-on:click="likeShop(shop._id)"
						><mdb-icon
							style="font-size: 15px;"
							icon="thumbs-up"
							class="light-green-text"
					/></mdb-btn>
				</div>
				<mdb-btn-group v-if="$route.path == '/liked'">
					<mdb-btn
						gradient="cloudy-knoxville"
						size="md"
						darkWaves
						v-on:click="initRemove(shop._id, removeShop)"
						><mdb-icon
							style="font-size: 15px;"
							icon="trash"
							class="blue-grey-text"
					/></mdb-btn>
				</mdb-btn-group>
			</mdb-card-body>
		</mdb-card>
		<br />
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
	mdbIcon,
	mdbMask,
} from 'mdbvue';
import { mapActions } from 'vuex';
import Swal from 'sweetalert2';

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
		mdbIcon,
		mdbMask,
	},
	methods: {
		...mapActions(['likeShop', 'dislikeShop', 'removeShop']),
		initRemove: (id, callback) => {
			Swal.fire({
				title:
					'Are you sure you want to remove this shop from your likes?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#607d8b',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, remove it!',
			}).then(result => {
				if (result.value) {
					callback(id);
				}
			});
		},
	},
};
</script>
