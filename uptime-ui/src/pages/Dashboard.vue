<template>
  <main id="main-container">
    <div class="hero-static bg-white">
      <div class="content content-full">
        <div class="px-3 py-5">
          <div class="mb-5 text-center">
            <a class="link-fx font-w700 font-size-h1 display-4" href="#">
              <span class="text-dark">{{ settings.title }}</span><span class="text-primary"></span>
            </a>
            <p class="text-uppercase font-w700 font-size-sm text-muted">Dashboard Page</p>
          </div>
          <div class="row no-gutters d-flex justify-content-center">
            <div class="col-md-6 col-xl-4">
              <div class="d-flex justify-content-between">
                
                <router-link
                  :to="$route.path.includes('/dashboard/') ? '/dashboard' : '/status'"
                  class="btn btn-outline-secondary btn-hero-sm btn-hero-secondary"
                  tag="a">
                  <i class="fa fa-arrow-left mr-1"></i> 
                  {{ $route.path.includes('/dashboard/') ? 'Dashboard' : 'Status' }}
                </router-link>

                <subscribe></subscribe>
              </div>
              <hr>

              <router-view></router-view>

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

export default Vue.extend({
  components: {
    Subscribe
  },
  computed: {
    settings () {
      return this.$store.state.settings
    }
  }
})
</script>
