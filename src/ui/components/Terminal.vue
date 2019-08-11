<template>
  <section>
    <div class="terminal">
      <div class="terminal-header">
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="terminal-body">
        <pre>
          <code class="langauge-bash">
            {{ content }}
          </code>  
        </pre>    
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    content: {
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
$radius: 4px;

.terminal {
  display: block;
  border-radius: 0.27 rem;
  box-shadow: rgba(0,0,0,0.25) 0px 14px 45px;
  margin: 0 auto;
}

.terminal-header {
  background: #e2e2e2;
  border-top-left-radius: $radius;
  border-top-right-radius: $radius;  
  
  ul, li {
    display: inline-block;
  }
  ul {
    margin: 6px 0 6px 0;
    padding-left: 15px;
  }
  ul li {
    width: 12px;
    height: 12px;
    margin-right: 2px;
    border-radius: 50%;
    
    &:first-child {
      background-color: #ff6059;
      box-shadow: inset 0px 0px 1px #000;
    }
    &:nth-child(2) {
      background-color: #ffbd2e;
      box-shadow: inset 0px 0px 1px #000;
    }
    &:last-child {
      background-color: #29ca42;
      box-shadow: inset 0px 0px 1px #000;
    }
  }
}

.terminal-body {
  background: #333;
  border-bottom-left-radius: $radius;
  border-bottom-right-radius: $radius;
  
  pre {
    margin: 0 10px;
    line-height: 2;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    tab-size: 4;
    color: #f0f0f0;
  }
  
}
</style>
