<template>
  <div>
    <error></error>
    <p><em>Broadcast a change in service health</em></p>
    <p v-if="!endpoints || endpoints.length == 0" class="text-primary">There are no services.</p>
    <form v-else>
      <div class="form-row align-items-center">
        <div class="col">
          <label class="sr-only" for="selectService">Service</label>
          <select class="custom-select form-control mb-2" id="selectService" @change="onSelectServiceChange">
            <option selected>Select a service</option>
            <option
              v-for="(endpoint, index) in endpoints"
              :key="index"
              :value="endpoint.id">
              {{ endpoint.title }} | {{ endpoint.location }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-row align-items-center">
        <div class="col">
          <label class="sr-only" for="selectStatus">Status</label>
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
      <div class="form-row align-items-center mt-3">
        <div class="col">
          <label for="text"><strong>Enter a short summary</strong></label>
          <input type="text" v-model="summary" class="form-control" id="text" placeholder="Describe what is going on, in a few words">
        </div>
      </div>
      <div class="form-row align-items-center mt-3">
        <div class="col">
          <label for="text"><strong>Enter a message</strong> (text or markdown)</label>
          <textarea class="form-control" id="text" v-model="content" rows="8"></textarea>
        </div>
      </div>
      <div class="form-row align-items-center mt-3">
        <div class="col-auto">
          <label for="name"><strong>Add your signature</strong></label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">@</div>
            </div>
            <input type="text" v-model="signature" class="form-control" id="name" placeholder="Name">
          </div>
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
            @click="submit"
            :disabled="!submittable">
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

import Error from './Error.vue'

export default Vue.extend({
  components: {
    Error
  },
  created () {
    this.$store.dispatch('getServices')
  },
  data () {
    return {
      selectedService: '',
      selectedStatus: '',
      summary: '',
      content: '',
      signature: ''
    }
  },
  computed: {
    endpoints () {
      return this.$store.state.services
    },
    submittable () {
      if (!this.selectedService || this.selectedService.length == 0
        || !this.selectedStatus || this.selectedStatus.length == 0
        || !this.summary || this.summary.length == 0
        || !this.signature || this.signature.length == 0
        ) {
        return false
      }
      return true
    }
  },
  methods: {
    onSelectServiceChange (event) {
      this.selectedService = event.target.value
    },
    onSelectStatusChange (event) {
      this.selectedStatus = event.target.value
    },
    cancel () {
      this.$router.push('/dashboard')
    },
    submit () {
      if (!this.submittable) return
      this.$store.dispatch('createMessage', {
        serviceId: this.selectedService,
        message: {
          content: this.content,
          summary: this.summary,
          status: this.selectedStatus,
          signature: this.signature
        }
      }).then(() => this.$router.push('/status'))
    }
  }
})
</script>
