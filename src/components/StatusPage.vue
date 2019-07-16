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
                <a class="btn  btn-outline-secondary btn-hero-sm btn-hero-secondary" href="#">
                  <i class="fa fa-arrow-left mr-1"></i> 
                  Dashboard
                </a>
                <a class="btn btn-outline-secondary btn-hero-sm btn-hero-success" href="javascript:void(0)">
                  <i class="fa fa-rss"></i> <span class="d-none d-sm-inline-block ml-1">Subscribe</span>
                </a>
              </div>
              <hr>
              <div
                v-for="message in messages" :key="message.id"
                :class="{
                  'alert-warning': message.status === 'Maintenance',
                  'alert-danger': message.status === 'Down'
                }"
                class="alert d-flex align-items-center justify-content-between" role="alert">
                <div class="flex-fill mr-3">
                  <p class="mb-0">{{ message.text }} </p>
                </div>
                <div class="flex-00-auto">
                  <i
                    class="fa fa-fw fa-2x"
                    :class="{
                      'fa-exclamation-triangle': message.status === 'Maintenance',
                      'fa-bug': message.status === 'Down'
                    }"></i>
                </div>
              </div>
              <ul class="list-group push">
                <li
                  v-for="endpoint in endpoints" :key="endpoint.title"
                  class="list-group-item d-flex justify-content-between align-items-center">
                  {{ endpoint.title }}
                  <span v-if="endpoint.status === 'Operational'" class="badge badge-pill badge-success">{{ endpoint.status }}</span>
                  <span v-if="endpoint.status === 'Maintenance'" class="badge badge-pill badge-warning">{{ endpoint.status }}</span>
                  <span v-if="endpoint.status === 'Down'" class="badge badge-pill badge-danger">{{ endpoint.status }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      messages: [
        { id: 1, text: 'API is currently under maintenance.', status: 'Maintenance' },
        { id: 2, text: 'Helpdesk is experiencing issues.', status: 'Down' }
      ],
      endpoints: [
        { title: 'Backend', status: 'Operational' },
        { title: 'Frontend', status: 'Operational' },
        { title: 'API', status: 'Maintenance' },
        { title: 'Payments', status: 'Operational' },        
        { title: 'Helpdesk', status: 'Down' }        
      ]
    }
  }
})
</script>
