<template>
  <div id="main">
    <h3>Incident History</h3>
    <section class="timeline">
      <ul v-if="!sortedMessagesWithEndpointTitle || sortedMessagesWithEndpointTitle.length == 0">
        <li>
          <span></span>
          <div>No incidents reported</div>
          <div>Report your first incident in the dashboard.</div>
          <div>
            <router-link
              to="/dashboard/messages/add"
              class="btn btn-primary btn-hero-sm btn-hero-success mt-2"
              tag="a">
              <i class="fa fa-rss"></i> <span class="d-none d-sm-inline-block ml-1">Broadcast a change in service health</span>
            </router-link>
          </div>
          <div class="year">
            <span>{{ currentYear }}</span>
            <span></span>
          </div>
        </li>
      </ul>
      <ul v-else>
        <li v-for="(message, index) in sortedMessagesWithEndpointTitle" v-bind:key="index">
          <span></span>
          <div class="mb-2">{{ message.status }} <small class="text-info">{{ formatFromNow(message) }}</small></div>
          <div>{{ message.endpointTitle }}</div>
          <div class="mb-2">{{ formatLocalDate(message) }}</div>
          <div>{{ message.summary }}</div>
          <div>{{ message.content }}</div>
          <div class="year">
            <span>{{ isFirstMessage(index) ? formatYear(message) : '' }}</span>
            <span>{{ isLastMessage(index, sortedMessagesWithEndpointTitle) ? formatYear(message) : '' }}</span>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import moment from 'moment'

export default Vue.extend({
  props: {
    endpoints: {
      required: true
    }
  },
  methods: {
    formatYear (message) {
      return moment(message.submitted).year()
    },
    formatFromNow (message) {
      return moment(message.submitted).fromNow()
    },
    formatLocalDate (message) {
      return moment(message.submitted).format('MMMM Do YYYY, h:mm:ss a')
    },
    isFirstMessage (index) {
      return index == 0
    },
    isLastMessage(index, messages) {
      return index == messages.length - 1
    },
    isSameYear(message, message2) {
      return moment(message.submitted).isSame(message.submitted, 'year')
    }
  },
  computed: {
    currentYear () {
      return moment().year()
    },
    sortedMessagesWithEndpointTitle () {
      return (this.endpoints || [])
        .filter(endpoint => endpoint.messages.length > 0)
        .reduce((final, endpoint) => final.concat(endpoint.messages.map(message => {
          message.endpointTitle = endpoint.title
          return message
        })), [])
        .sort((a, b) => moment(b.submitted).valueOf() - moment(a.submitted).valueOf())
    }
  }
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');
$font-stack: 'Montserrat', sans-serif;
$font-color: #fff;
$bg-color: #fff;
$dark-blue: #2E4A62;
$light-blue: #4e9bfa;

@mixin clearfix {
  content: '';
  position: absolute;
  top: 0; left: 0;
}
@mixin set-border($thickness, $color, $radius) {
  border: $thickness solid $color;
  border-radius: $radius;
}

body {
    background-color: $bg-color;
}
:not(a):not(i), :not(a):not(i)::before, :not(a):not(i)::after {
    margin: 0; padding: 0;
	  box-sizing: border-box;
	  font-family: $font-stack;
	  color: $font-color;
}
#main {
    margin: 1em auto;
    padding: 40px;
    background: $dark-blue;
    border-radius: 4px;
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
}
.timeline {
  padding: 5px 45px;
  ul {
    position: relative;
    &::before {
      @include clearfix();
      height: 100%;
    }
  }
  li {
    position: relative;
    margin: 60px 35px;
    width: 100%;
    list-style: none;
    line-height: 25px;
    &>span {
      @include clearfix();
      left: -25px;
      height: 110%;
      @include set-border(2px, $font-color, none);
    }
    &>span::before, &>span::after {
      @include clearfix();
      width: 14px; height: 14px;
      @include set-border(3px, $font-color, 50%);
      left: -7px;
      background: $light-blue;
    }
    &>span::before {
      top: -15px;
    }
    &>span::after {
      top: 100%;
    }
    div {
      &:nth-child(2) {
        font-size: 1.2em;
      }
      &:nth-child(3), &:nth-child(4) {
        font-size: 1em;
        font-style: italic;
        color: darken($font-color, 25%);
      }
    }
    .year span {
      position: absolute;
      font-size: 1em;
      left: -85px;
      width: 40px;
      text-align: right;
      &:first-child {
        top: -20px;
      }
      &:last-child {
        top: 100%;
      }
    }
  }
}
</style>
