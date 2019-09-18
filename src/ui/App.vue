<template>
  <div>
    <nav-bar></nav-bar>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(VueRouter)
Vue.use(Vuex)

import { store } from './services/data'

import NavBar from './components/NavBar.vue'
import Actions from './components/Actions.vue'
import AddMessage from './components/AddMessage.vue'
import ArchiveMessage from './components/ArchiveMessage.vue'
import RemoveMessage from './components/RemoveMessage.vue'
import AddService from './components/AddService.vue'
import AddServiceCheck from './components/AddServiceCheck.vue'
import UpdateService from './components/UpdateService.vue'
import RemoveService from './components/RemoveService.vue'
import Settings from './components/Settings.vue'
import Logs from './components/Logs.vue'
import Export from './components/Export.vue'

import Status from './pages/Status.vue'
import Detail from './pages/Detail.vue'
import Dashboard from './pages/Dashboard.vue'
import NotFound from './pages/NotFound.vue'

export default Vue.extend({
  components: {
    NavBar
  },
  store,
  router: new VueRouter({
    routes: [
      { path: '/', redirect: '/status' },
      { path: '/status', component: Status },
      { path: '/status/:id', component: Detail, props: true },
      { path: '/dashboard', component: Dashboard, children: [
        { path: '', component: Actions },
        { path: 'messages/add', component: AddMessage },
        { path: 'messages/archive', component: ArchiveMessage },
        { path: 'messages/remove', component: RemoveMessage },
        { path: 'services/add', component: AddService },
        { path: 'services/checks/add', component: AddServiceCheck },
        { path: 'services/:id/update', component: UpdateService, props: true },
        { path: 'services/remove', component: RemoveService },
        { path: 'settings', component: Settings },
        { path: 'logs', component: Logs },
        { path: 'export', component: Export },
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
