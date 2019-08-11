<template>
  <div>
    <error></error>
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
          <label for="rate"><strong>Ping Frequency</strong></label>
          <input type="text" v-model="rate" class="form-control" id="rate" placeholder="Use 10 * * * * (cron syntax)">
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

import { CreateService } from '../../app/core/services'
import Error from './Error.vue'

export default Vue.extend({
  components: {
    Error
  },
  data () {
    return {
      title: '',
      location: '',
      rate: '',
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
      let service: CreateService = {
        title: this.title,
        location: this.location,
        status: this.selectedStatus,
        checks: [
          {
            rate: this.rate
          }
        ]
      }
      this.$store.dispatch('createService', service).then(() => this.$router.push('/status'))
    }
  }
})
</script>
