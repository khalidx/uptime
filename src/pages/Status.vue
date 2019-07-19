<template>
  <main id="main-container">
    <div class="hero-static bg-white">
      <div class="content content-full">
        <div class="px-3 py-5">
          <div class="mb-5 text-center">
            <a class="link-fx font-w700 font-size-h1 display-4" href="#">
              <span class="text-dark">{{ settings.title }}</span><span class="text-primary"></span>
            </a>
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

              <services></services>

            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import Subscribe from '../components/Subscribe'
import Services from '../components/Services'

import data from '../services/data'

export default Vue.extend({
  components: {
    Subscribe,
    Services
  },
  data () {
    return {
      settings: data.getSettings(),
      endpoints: data.getEndpoints()
    }
  },
  computed: {
    messages () {
      return (this.endpoints || [])
        .filter(endpoint => endpoint.messages.length > 0)
        .reduce((final, endpoint) => final.concat(endpoint.messages.filter(message => message.active)), [])
    }
  }
})
</script>
