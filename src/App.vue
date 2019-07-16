<template>
  <div>
    <nav-brand></nav-brand>
    <nav-bar></nav-bar>
    <status-page></status-page>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/js/bootstrap.min.js

import NavBrand from './components/NavBrand'
import NavBar from './components/NavBar'
import StatusPage from './components/StatusPage'

export default Vue.extend({
  components: {
    NavBrand,
    NavBar,
    StatusPage
  }
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

.navbar-dark {
 color: var(--px-app-nav-item-text-color, #4f6674) !important;
 background-color: var(--px-app-nav-background-color, #1a272d) !important;
}
</style>
