<template>
  <main id="main-container">
    <div class="hero-static bg-white">
      <div class="content content-full">
        <div class="px-3 py-5">
          <div class="mb-5 text-center">
            <router-link
              to="/"
              class="link-fx font-w700 font-size-h1 display-4"
              tag="a">
              <span class="text-dark">API</span><span class="text-primary"></span>
            </router-link>
            <p class="text-uppercase font-w700 font-size-sm text-muted">Status Page</p>
          </div>
          <div class="row no-gutters d-flex justify-content-center">
            <div class="col-md-6 col-xl-4">
              <div class="d-flex justify-content-between">
                
                <router-link
                  to="/status"
                  class="btn btn-outline-secondary btn-hero-sm btn-hero-secondary"
                  tag="a">
                  <i class="fa fa-arrow-left mr-1"></i> 
                  Status
                </router-link>

                <subscribe></subscribe>
              </div>
              <hr>

              <h1>404</h1>
              <p>Not found!</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import Subscribe from '../components/Subscribe.vue'

export default Vue.extend({
  components: {
    Subscribe
  }
})
</script>
