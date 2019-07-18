<template>
  <div>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(VueRouter)
Vue.use(Vuex)

import NavBar from './components/NavBar'
import Actions from './components/Actions'
import AddMessage from './components/AddMessage'
import RemoveMessage from './components/RemoveMessage'
import AddService from './components/AddService'
import AddServiceCheck from './components/AddServiceCheck'
import RemoveService from './components/RemoveService'
import Export from './components/Export'

import Status from './pages/Status'
import Detail from './pages/Detail'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

export default Vue.extend({
  components: {
    NavBar
  },
  router: new VueRouter({
    routes: [
      { path: '/', redirect: '/status' },
      { path: '/status', component: Status },
      { path: '/status/:name', component: Detail, props: true },
      { path: '/dashboard', component: Dashboard, children: [
        { path: '', component: Actions },
        { path: 'messages/add', component: AddMessage },
        { path: 'messages/remove', component: RemoveMessage },
        { path: 'services/add', component: AddService },
        { path: 'services/checks/add', component: AddServiceCheck },
        { path: 'services/remove', component: RemoveService },
        { path: 'export', component: Export }
      ] },
      { path: '/404', component: NotFound },
      { path: '*', redirect: '/404' }
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
