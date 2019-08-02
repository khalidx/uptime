<template>
  <main id="main-container">
    <div class="hero-static bg-white">
      <loading></loading>
      <div v-if="endpoint" class="content content-full">
        <div class="px-3 py-5">
          <div class="mb-5 text-center">
            <a class="link-fx font-w700 font-size-h1 display-4" href="#">
              <span class="text-dark">{{ endpoint.title }}</span><span class="text-primary"></span>
            </a>
            <p class="text-uppercase font-w700 font-size-sm text-muted">Status Page</p>
            <p class="font-w700 font-size-sm text-muted">{{ endpoint.location }}</p>
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

              <div v-if="endpoint.status === 'Operational'" class="alert alert-success" role="alert">
                <i class="fa fa-thumbs-up"></i> <strong>{{ endpoint.status }}</strong>
              </div>
              <div v-if="endpoint.status === 'Maintenance'" class="alert alert-warning" role="alert">
                <i class="fa fa-wrench"></i> <strong>{{ endpoint.status }}</strong>
              </div>
              <div v-if="endpoint.status === 'Down'" class="alert alert-danger" role="alert">
                <i class="fa fa-thumbs-down"></i> <strong>{{ endpoint.status }}</strong>
              </div>

              <feedback></feedback>

              <div class="card shadow-lg mb-3 bg-white rounded">
                <h5 class="card-header">Latency</h5>
                <div class="card-body">
                  <trend :endpoint="endpoint"></trend>
                </div>
              </div>

              <div class="card mb-3">
                <h5 class="card-header">Errors</h5>
                <div class="card-body">
                  <chart :values="{ '2019-07-10': 2, '2019-07-12': 5, '2019-07-14': 1, '2019-07-16': 3, '2019-07-18': 3 }"></chart>
                </div>
              </div>

              <div class="card mb-3">
                <h5 class="card-header">Responses</h5>
                <div class="card-body">
                  <advanced-chart></advanced-chart>
                </div>
              </div>

              <div class="card shadow-lg mb-3 bg-white rounded">
                <h5 class="card-header">Checks</h5>
                <div class="card-body">
                  <p class="card-text"><em>Scheduled pings and requests</em></p>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">cron</th>
                        <th scope="col">Last check</th>
                        <th scope="col">Next check</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(check, index) in endpoint.checks" :key="index">
                        <th scope="row">{{ check.cron }}</th>
                        <td>{{ check.lastCheck }}</td>
                        <td>{{ check.nextCheck }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="card mb-3">
                <h5 class="card-header">Submissions</h5>
                <div class="card-body">
                  <p class="card-text"><em>Recently submitted feedback</em></p>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Submitted</th>
                        <th scope="col">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(feedback, index) in endpoint.feedback" :key="index">
                        <th scope="row">{{ feedback.submitted }}</th>
                        <td>{{ feedback.content }}</td>
                      </tr>
                    </tbody>
                  </table>
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

import Loading from '../components/Loading'
import Subscribe from '../components/Subscribe'
import Trend from '../components/Trend'
import Chart from '../components/Chart'
import AdvancedChart from '../components/AdvancedChart'
import Feedback from '../components/Feedback'

export default Vue.extend({
  components: {
    Loading,
    Subscribe,
    Trend,
    Chart,
    AdvancedChart,
    Feedback
  },
  props: {
    name: {
      required: true,
    }
  },
  created () {
    this.$store.dispatch('getServices')
  },
  computed: {
    endpoint () {
      return this.$store.state.services.find(endpoint => endpoint.name === this.name)
    }
  }
})
</script>
