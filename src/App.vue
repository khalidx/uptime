<template>
  <div>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import NavBar from './components/NavBar'
import StatusPage from './components/StatusPage'

export default Vue.extend({
  components: {
    NavBar
  },
  router: new VueRouter({
    routes: [
      { path: '/status', component: StatusPage }
    ]
  })
})
</script>

<style lang="scss">
@import url(https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.css);
@import url(https://fonts.googleapis.com/icon?family=Material+Icons);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css);

body {
 background: #fff;
}

.list-group-item {
 border-color: #ddd;
}

.navbar-brand {
  color: var(--px-app-nav-item-text-color, #4f6674) !important;
}
</style>
