<template>
  <div>
    <form v-if="service">
      <p><em>Update the {{ service.title }} service</em></p>
      <div class="form-row align-items-center">
        <div class="col">
          <label for="title"><strong>Service Title</strong></label>
          <input type="text" v-model="title" class="form-control" id="title" :placeholder="service.title">
        </div>
      </div>
      <div class="form-row align-items-center mt-3">
        <div class="col">
          <label for="location"><strong>Service Location</strong></label>
          <input type="text" v-model="location" class="form-control" id="location" :placeholder="service.location">
        </div>
      </div>
      <div class="form-row align-items-center mt-3">
        <div class="col">
          <label for="selectRate"><strong>Ping Frequency</strong></label>
          <select class="custom-select form-control mb-2" id="selectRate" @change="onSelectRateChange">
            <option selected>Select a rate</option>
            <option
              v-for="rate in rates"
              :key="rate"
              :value="rate">
              {{ rate }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-row align-items-center mt-3">
        <div class="col">
          <label for="selectStatus"><strong>Status</strong></label>
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
            <i class="fa fa-window-close"></i> <span class="ml-1">Cancel</span>
          </button>
        </div>
        <div class="col-auto">
          <button
            type="submit"
            class="btn btn-primary btn-hero-sm btn-hero-success mb-2"
            @click="submit">
            <i class="fa fa-paper-plane"></i> <span class="ml-1">Submit</span>
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

import { CreateService, UpdateService } from '../../app/core/types'

export default Vue.extend({
  props: {
    id: {
      required: true
    }
  },
  data () {
    return {
      rates: [ '1 minute', '5 minutes', '15 minutes', '30 minutes', '1 hour' ],
      title: '',
      location: '',
      selectedRate: '',
      selectedStatus: '',
    }
  },
  created () {
    this.$store.dispatch('getServices')
  },
  computed: {
    service () {
      return this.$store.state.services.find(service => service.id === this.id)
    }
  },
  methods: {
    onSelectRateChange (event) {
      this.selectedRate = event.target.value
    },
    onSelectStatusChange (event) {
      this.selectedStatus = event.target.value
    },
    cancel () {
      this.$router.push('/dashboard')
    },
    submit () {
      let service: UpdateService = {}
      if (this.title) service.title = this.title
      if (this.location) service.location = this.location
      if (this.selectedStatus) service.status = this.selectedStatus
      if (this.selectedRate) service.checks = [ { rate: this.selectedRate } ]
      this.$store.dispatch('updateService', { id: this.id, service }).then(() => this.$router.push(`/status/${this.service.id}`))
    }
  }
})
</script>
