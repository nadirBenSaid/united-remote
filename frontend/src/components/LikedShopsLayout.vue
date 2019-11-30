<template>
  <mdb-container>
    <div v-for="(shops, index) in this.chunk(getLikedShops, 4)" :key="index">
      <mdb-row>
        <shop-card v-for="shop in shops" :key="shop._id" :shop="shop" />
      </mdb-row>
      <br />
    </div>
  </mdb-container>
</template>

<script>
import ShopCard from "@/components/ShopCard.vue";
import { mdbContainer, mdbRow } from "mdbvue";

//Importing Getters and Actions mappers to manipulate vuex state
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ShopsLayout",
  components: {
    mdbContainer,
    mdbRow,
    ShopCard
  },
  methods: {
    //mapping store actions
    ...mapActions(["fetchLikedShops"]),

    //function to slice array
    //example: [1,2,3,4,5,6] --> [[1,2,3,4],[5,6]]
    chunk: (arr, size) => {
      return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
      );
    }
  },
  //mapping store getters
  computed: mapGetters(["getLikedShops"]),
  created() {
    // fetch an array of user's liked shops
    this.fetchLikedShops();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4 {
  margin: 0;
}
</style>
