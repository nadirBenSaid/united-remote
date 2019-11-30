<template>
  <div>
    <!--Navbar-->
    <mdb-navbar
      v-show="navbarType == 'regular-fixed'"
      position="top"
      dark
      color="primary"
      scrolling
    >
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <router-link :to="{ name: 'home' }">
            <mdb-nav-item waves-fixed>Nearby Shops</mdb-nav-item>
          </router-link>
          <router-link :to="{ name: 'liked' }">
            <mdb-nav-item waves-fixed>Liked Shops</mdb-nav-item>
          </router-link>
        </mdb-navbar-nav>
        <mdb-navbar-nav right>
          <a v-on:click="logout()">
            <mdb-nav-item waves-fixed>Logout</mdb-nav-item>
          </a>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <!--/.Navbar-->
  </div>
</template>

<script>
import {
  mdbNavbar,
  mdbNavItem,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbInput,
  mdbBtn
} from "mdbvue";
import { mapActions } from "vuex";

export default {
  name: "NavigationPage",
  components: {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbInput,
    mdbBtn
  },
  data() {
    return {
      navbarType: "regular-fixed",
      content: false
    };
  },
  methods: {
    //mapping logout action from store's authModule
    ...mapActions(["logout"])
  }
};
</script>
<style scoped>
a {
  color: white;
}
</style>
