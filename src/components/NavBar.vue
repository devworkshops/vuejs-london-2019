<template>
  <b-navbar toggleable="md" type="dark" placement="fixed" fill="false" variant="dark">
    <div class="container">
      <b-navbar-brand to="/">{{title}}</b-navbar-brand>
      <b-navbar-toggle target="navbarCollapse"></b-navbar-toggle>
      <b-collapse is-nav id="navbarCollapse">
        <b-navbar-nav class="mr-auto" v-if="isLoggedIn">
          <b-nav-item to="/" :exact="true">
            <vue-feather type="home"></vue-feather>Home
          </b-nav-item>
          <b-nav-item to="/suppliers">
            <vue-feather type="shopping-cart"></vue-feather>Suppliers
          </b-nav-item>
          <b-nav-item to="/categories">
            <vue-feather type="list"></vue-feather>Categories
          </b-nav-item>
          <b-nav-item to="/products">
            <vue-feather type="package"></vue-feather>Products
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/login" v-if="!isLoggedIn">
            <vue-feather type="log-in"></vue-feather>Login
          </b-nav-item>
          <b-nav-item @click="logout()" v-if="isLoggedIn">
            <vue-feather type="log-out"></vue-feather>Logout
          </b-nav-item>
          <b-nav-item v-if="isLoggedIn" v-b-toggle.collapseNotifications>
            <vue-feather type="bell"></vue-feather>Notifications
            <b-badge>{{ $store.getters.notificationCount }}</b-badge>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import VueFeather from 'vue-feather'
import { AuthService } from '@/services/NorthwindService.js'

export default {
    props: {
        user: Object
    },
    components: {
        VueFeather
    },
    computed: {
        isLoggedIn() {
            return !!this.user
        },
        title(){
          return process.env.VUE_APP_TITLE
        }
    },
    methods: {
        logout() {
            AuthService.logout()
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.nav > .container {
    min-height: 56px;
}
.navbar .nav-link .feather {
    margin-right: 4px;
    color: #999;
}
</style>
