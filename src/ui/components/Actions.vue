<template>
  <div>
    <p class="lead">Messages</p>
    <div class="d-flex justify-content-between">
      <ul>
        <li class="mb-3">
          <router-link
            to="/dashboard/messages/add"
            class="btn btn-primary btn-hero-sm btn-hero-success"
            tag="a">
            <i class="fa fa-rss"></i> <span class="d-none d-sm-inline-block ml-1">Broadcast a change in service health</span>
          </router-link>
        </li>
        <li class="mb-3">
          <router-link
            to="/dashboard/messages/archive"
            class="btn btn-warning btn-hero-sm btn-hero-success"
            tag="a">
            <i class="fa fa-history"></i> <span class="d-none d-sm-inline-block ml-1">Archive a message broadcast</span>
          </router-link>
        </li>
        <li class="mb-3">
          <router-link
            to="/dashboard/messages/remove"
            class="btn btn-outline-danger btn-hero-sm btn-hero-success"
            tag="a">
            <i class="fa fa-minus"></i> <span class="d-none d-sm-inline-block ml-1">Remove a message broadcast</span>
          </router-link>
        </li>
      </ul>
    </div>
    <p class="lead">Services</p>
    <div class="d-flex justify-content-between">
      <ul>
        <li class="mb-3">
          <router-link
            to="/dashboard/services/add"
            class="btn btn-success btn-hero-sm btn-hero-success"
            tag="a">
            <i class="fa fa-plus"></i> <span class="d-none d-sm-inline-block ml-1">Add a new service</span>
          </router-link>
        </li>
        <!--
        <li class="mb-3">
          <router-link
            to="/dashboard/services/checks/add"
            class="btn btn-outline-success btn-hero-sm btn-hero-success"
            tag="a">
            <i class="fa fa-plus"></i> <span class="d-none d-sm-inline-block ml-1">Add a new service check</span>
          </router-link>
        </li>
        -->
        <li class="mb-3">
          <router-link
            to="/dashboard/services/remove"
            class="btn btn-outline-danger btn-hero-sm btn-hero-success"
            tag="a">
            <i class="fa fa-minus"></i> <span class="d-none d-sm-inline-block ml-1">Remove a service</span>
          </router-link>
        </li>
      </ul>
    </div>
    <p class="lead">Settings</p>
    <div class="d-flex justify-content-between">
      <ul>
        <li class="mb-3">
          <router-link
            to="/dashboard/settings"
            class="btn btn-secondary btn-hero-sm btn-hero-success"
            tag="a">
            <i class="fa fa-gear"></i> <span class="d-none d-sm-inline-block ml-1">Edit system settings</span>
          </router-link>
        </li>
        <li class="mb-3">
          <router-link
            to="/dashboard/logs"
            class="btn btn-outline-secondary btn-hero-sm btn-hero-success"
            tag="a">
            <i class="fa fa-code"></i> <span class="d-none d-sm-inline-block ml-1">View pinger logs</span>
          </router-link>
        </li>
        <li class="mb-3">
          <router-link
            to="/dashboard/export"
            class="btn btn-primary btn-hero-sm btn-hero-success"
            tag="a">
            <i class="fa fa-code"></i> <span class="d-none d-sm-inline-block ml-1">Export configuration to JSON</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
