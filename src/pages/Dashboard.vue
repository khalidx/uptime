<template>
  <main id="main-container">
    <div class="hero-static bg-white">
      <div class="content content-full">
        <div class="px-3 py-5">
          <div class="mb-5 text-center">
            <a class="link-fx font-w700 font-size-h1 display-4" href="#">
              <span class="text-dark">API</span><span class="text-primary"></span>
            </a>
            <p class="text-uppercase font-w700 font-size-sm text-muted">Dashboard Page</p>
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

              <div class="d-flex justify-content-between">
                <ul>
                  <li class="mb-3">
                    <a class="btn btn-outline-primary btn-hero-sm btn-hero-success" href="javascript:void(0)">
                      <i class="fa fa-plus"></i> <span class="d-none d-sm-inline-block ml-1">Broadcast a change in service health</span>
                    </a>
                  </li>
                  <li class="mb-3">
                    <a class="btn btn-outline-success btn-hero-sm btn-hero-success" href="javascript:void(0)">
                      <i class="fa fa-plus"></i> <span class="d-none d-sm-inline-block ml-1">Add a new service</span>
                    </a>
                  </li>
                  <li class="mb-3">
                    <a class="btn btn-outline-success btn-hero-sm btn-hero-success" href="javascript:void(0)">
                      <i class="fa fa-plus"></i> <span class="d-none d-sm-inline-block ml-1">Add a new service check</span>
                    </a>
                  </li>
                  <li class="mb-3">
                    <a class="btn btn-outline-danger btn-hero-sm btn-hero-success" href="javascript:void(0)">
                      <i class="fa fa-minus"></i> <span class="d-none d-sm-inline-block ml-1">Remove a service</span>
                    </a>
                  </li>
                </ul>
              </div>
              
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
  data () {
    return {}
  }
})
</script>
