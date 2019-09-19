<template>
  <main id="main-container">
    <div class="hero-static bg-white">
      <loading></loading>
      <div v-if="settings && endpoints" class="content content-full">
        <div class="px-3 py-5">
          <div class="mb-5 text-center">
            <router-link
              to="/"
              class="link-fx font-w700 font-size-h1 display-4"
              tag="a">
              <span class="text-dark">{{ settings.title }}</span><span class="text-primary"></span>
            </router-link>
            <p class="text-uppercase font-w700 font-size-sm text-muted">Status Page</p>
          </div>
          <div class="row no-gutters d-flex justify-content-center">
            <div class="col-md-6 col-xl-4">
              <div class="d-flex justify-content-between">

                <router-link
                  to="/dashboard"
                  class="btn btn-outline-secondary btn-hero-sm btn-hero-secondary"
                  tag="a">
                  <i class="fa fa-arrow-left mr-1"></i> 
                  Dashboard
                </router-link>

                <subscribe></subscribe>
              </div>
              <hr>

              <error></error>
              
              <div
                v-for="(message, index) in messages" :key="index"
                :class="{
                  'alert-success': message.status === 'Operational',
                  'alert-warning': message.status === 'Maintenance',
                  'alert-danger': message.status === 'Down'
                }"
                class="alert d-flex align-items-center justify-content-between" role="alert">
                <div class="flex-fill mr-3">
                  <p class="mb-0">{{ message.summary }} </p>
                </div>
                <div class="flex-00-auto">
                  <i
                    class="fa fa-fw fa-2x"
                    :class="{
                      'fa-check': message.status === 'Operational',
                      'fa-wrench': message.status === 'Maintenance',
                      'fa-exclamation': message.status === 'Down'
                    }"></i>
                </div>
              </div>

              <div v-if="!error && (!endpoints || endpoints.length == 0)" class="card border-success mb-3" >
                <div class="card-body">
                  <h5 class="card-title text-success">Welcome to uptime!</h5>
                  <p class="card-text">
                    It looks like it's your first time here <i class="fa fa-thumbs-up"></i><br/>
                    Add your first service to begin monitoring its uptime status.
                  </p>
                  <p class="card-text">
                    <router-link
                      :to="`/dashboard/services/add`"
                      tag="button"
                      class="btn btn-success btn-block">
                      <i class="fa fa-plus"></i> <span class="ml-1">Add a service</span>
                    </router-link>
                  </p>
                </div>
              </div>

              <services v-if="endpoints && endpoints.length > 0" :endpoints="endpoints"></services>

              <timeline v-if="endpoints && endpoints.length > 0" :endpoints="endpoints"></timeline>

            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import Loading from '../components/Loading.vue'
import Error from '../components/Error.vue'
import Subscribe from '../components/Subscribe.vue'
import Services from '../components/Services.vue'
import Timeline from '../components/Timeline.vue'

export default Vue.extend({
  components: {
    Loading,
    Error,
    Subscribe,
    Services,
    Timeline
  },
  created () {
    this.$store.dispatch('getSettings')
    this.$store.dispatch('getServices')
  },
  computed: {
    error () {
      return this.$store.state.error
    },
    settings () {
      return this.$store.state.settings
    },
    endpoints () {
      return this.$store.state.services
    },
    messages () {
      return this.$store.state.services
        .filter(endpoint => endpoint.messages.length > 0)
        .reduce((final, endpoint) => final.concat(endpoint.messages.filter(message => message.active)), [])
    }
  }
})
</script>
