<template>
  <mdb-col lg="3">
    <mdb-card>
      <mdb-view hover>
        <mdb-card-image :src="shop.picture"></mdb-card-image>
        <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
      </mdb-view>
      <mdb-card-body>
        <mdb-card-title>{{ shop.name }}</mdb-card-title>
        <mdb-card-text>City: {{ shop.city }}</mdb-card-text>
        <mdb-btn-group v-if="$route.path == '/'">
          <mdb-btn color="success" size="sm" icon="thumbs-up" v-on:click="likeShop(shop._id)"></mdb-btn>
          <mdb-btn color="danger" size="sm" icon="thumbs-down" v-on:click="dislikeShop(shop._id)"></mdb-btn>
        </mdb-btn-group>
        <mdb-btn-group v-if="$route.path == '/liked'">
          <mdb-btn color="primary" size="sm" icon="trash" v-on:click="removeShop(shop._id)">Remove</mdb-btn>
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
  mdbMask
} from "mdbvue";
import { mapActions } from "vuex";

export default {
  name: "ShopCard",
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
    mdbMask
  },
  methods: {
    ...mapActions(["likeShop", "dislikeShop", "removeShop"])
  }
};
</script>
