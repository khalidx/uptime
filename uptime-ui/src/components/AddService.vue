<template>
  <div>
    <form>
      <p><em>Add a new service</em></p>
      <div class="form-row align-items-center">
        <div class="col">
          <label for="title"><strong>Service Title</strong></label>
          <input type="text" v-model="title" class="form-control" id="title" placeholder="My Awesome API">
        </div>
      </div>
      <div class="form-row align-items-center mt-3">
        <div class="col">
          <label for="location"><strong>Service Location</strong></label>
          <input type="text" v-model="location" class="form-control" id="location" placeholder="https://example.com/api or 192.168.0.1:8080">
        </div>
      </div>
      <div class="form-row align-items-center mt-3">
        <div class="col">
          <label for="cron"><strong>Ping Frequency</strong></label>
          <input type="text" v-model="cron" class="form-control" id="cron" placeholder="Use 10 * * * * (cron syntax)">
        </div>
      </div>
      <div class="form-row align-items-center mt-3">
        <div class="col">
          <label for="selectStatus"><strong>Initial Status</strong></label>
          <select class="custom-select form-control mb-2" id="selectStatus" @change="onSelectStatusChange">
            <option selected>Select a status</option>
            <option
              v-for="status in [ 'Operational', 'Maintenance', 'Down' ]"
              :key="status"
              :value="status">
              {{ status }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-row justify-content-end align-items-center mt-3">
        <div class="col-auto">
          <button
            type="cancel"
            class="btn btn-outline-danger btn-hero-sm btn-hero-success mb-2"
            @click="cancel">
            <i class="fa fa-window-close"></i> <span class="d-none d-sm-inline-block ml-1">Cancel</span>
          </button>
        </div>
        <div class="col-auto">
          <button
            type="submit"
            class="btn btn-primary btn-hero-sm btn-hero-success mb-2"
            @click="submit"
            :disabled="!submittable">
            <i class="fa fa-paper-plane"></i> <span class="d-none d-sm-inline-block ml-1">Submit</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import uuid from 'uuid/v4'
import moment from 'moment'

export default Vue.extend({
  data () {
    return {
      title: '',
      location: '',
      cron: '',
      selectedStatus: ''
    }
  },
  computed: {
    endpoints () {
      return this.$store.state.services
    },
    submittable () {
      if (!this.title || this.title.length == 0
        || !this.location || this.location.length == 0
        || !this.selectedStatus || this.selectedStatus.length == 0
        ) {
        return false
      }
      return true
    }
  },
  methods: {
    onSelectStatusChange (event) {
      this.selectedStatus = event.target.value
    },
    cancel () {
      this.$router.push('/dashboard')
    },
    submit () {
      if (!this.submittable) return
      this.endpoints.push({
        id: uuid(),
        name: encodeURIComponent(this.title.toLowerCase()),
        title: this.title,
        location: this.location,
        status: this.selectedStatus,
        requests: [ 5, 4, 3, 2, 1 ].map(n => {
          return {
            start: moment().subtract(n, 'days').format('YYYY-MM-DD'),
            end: moment().subtract(n, 'days').add(2, 'seconds').format('YYYY-MM-DD'),
            latency: '2000',
            response: {
              type: 'error',
              message: '200 OK',
              raw: ''
            }
          }
        }),
        checks: [
          {
            cron: this.cron || '@hourly',
            lastCheck: moment().calendar(),
            nextCheck: moment().add(1, 'hours').calendar()
          }
        ],
        feedback: [
          {
            submitted: moment().subtract(3, 'months').subtract(4, 'hours').subtract(23, 'minutes').calendar(),
            content: 'You guys are awesome! The service is so fast. Keep the good work going!'
          },
          {
            submitted: moment().subtract(1, 'days').subtract(14, 'seconds').calendar(),
            content: 'That has to be a fake review down there. This has been down for hours and no-one is on-call!'
          }
        ],
        messages: []
      })
      // TODO data.saveEndpoints(this.endpoints)
      this.$router.push('/status')
    }
  }
})
</script>
