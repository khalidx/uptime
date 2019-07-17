<template>
  <main id="main-container">
    <div class="hero-static bg-white">
      <div class="content content-full">
        <div class="px-3 py-5">
          <div class="mb-5 text-center">
            <a class="link-fx font-w700 font-size-h1 display-4" href="#">
              <span class="text-dark">API</span><span class="text-primary"></span>
            </a>
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

              <div class="card">
                <h5 class="card-header">Feedback</h5>
                <div class="card-body">
                  <h5 class="card-title">Submit a bug report</h5>
                  <p class="card-text">Help us improve this service! Your feedback is appreciated.</p>
                  <a href="#" class="btn btn-primary">Say something</a>
                </div>
              </div>

              <br />

              <div class="card">
                <h5 class="card-header">Latency</h5>
                <div class="card-body">
                  <trend :endpoint="{}"></trend>
                </div>
              </div>

              <br />

              <div class="card">
                <h5 class="card-header">Status</h5>
                <div class="card-body">
                  <chart></chart>
                </div>
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
import Trend from '../components/Trend'
import Chart from '../components/Chart'

export default Vue.extend({
  components: {
    Subscribe,
    Trend,
    Chart
  },
  data () {
    return {
    }
  }
})
</script>
