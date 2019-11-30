<template>
  <mdb-container>
    <div v-for="(shops, index) in this.chunk(allShops, 4)" :key="index">
      <mdb-row>
        <shop-card v-for="shop in shops" :key="shop._id" :shop="shop" />
      </mdb-row>
      <br />
    </div>
    <section v-if="totalCount != allShops.length">
      <div class="justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </section>
  </mdb-container>
</template>

<script>
import ShopCard from "@/components/ShopCard.vue";
import { mdbContainer, mdbRow } from "mdbvue";
import debounce from "lodash.debounce";

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
    //mapping shop module actions
    ...mapActions(["fetchShops", "getLocation"]),

    //function to slice array
    //example: [1,2,3,4,5,6] --> [[1,2,3,4],[5,6]]
    chunk: (arr, size) => {
      return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
      );
    },

    //function for "infinite scrolling"
    scroll() {
      // listen on scrolling
      window.onscroll = debounce(() => {
        //detect user scroll position
        let d = document.documentElement;
        let offset = Math.ceil(d.scrollTop + window.innerHeight);
        let height = d.offsetHeight - 7;

        //if user at bottom of the page and there are more
        //shops to load, send a get request to fetch the next 16
        //shop
        if (
          offset >= height &&
          this.allShops.length < this.totalCount &&
          this.$route.path == "/"
        ) {
          this.fetchShops({
            skip: 16 * this.getSkip,
            limit: 16
          });
        }
      }, 500);
    }
  },
  mounted() {
    //get user location, and display first 16 shops if there are shops
    // that match the user's location.
    this.getLocation();
    //mount scroll function to window (for infinite scroll)
    this.scroll();
  },
  computed: mapGetters(["allShops", "totalCount", "getSkip"])
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4 {
  margin: 0;
}
</style>
