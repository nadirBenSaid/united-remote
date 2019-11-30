<template>
  <div>
    <Navbar />
    <div class="likes">
      <LikedShopsLayout />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import LikedShopsLayout from "@/components/LikedShopsLayout.vue";

export default {
  name: "LikedShops",
  components: { Navbar, LikedShopsLayout }
};
</script>

<style scoped>
.likes {
  margin-top: 7%;
}
</style>