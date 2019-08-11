<template>
  <div>
    <div v-if="values" id="wrapper">
      <div id="chart-area">
        <apexchart :height="options1.chart.height" :type="options1.chart.type" :options="options1" :series="options1.series"></apexchart>
      </div>
      <div id="chart-bar">
        <apexchart :height="options2.chart.height" :type="options2.chart.type" :options="options2" :series="options2.series"></apexchart>
      </div>    
    </div>
    <p v-else>Not enough response data. Check back soon!</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

export default Vue.extend({
  props: {
    endpoint: {
      required: true
    }
  },
  methods: {
    generateDayWiseTimeSeries (baseval, count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        series.push([x, y]);
        baseval += 86400000;
        i++;
      }
      return series;
    }
  },
  computed: {
    values () {
      return this.generateDayWiseTimeSeries(new Date("22 Apr 2017").getTime(), 115, {
        min: 30,
        max: 90
      })
    },
    options1 () {
      return {
        chart: {
          id: "chart2",
          type: "area",
          height: 230,
          foreColor: "#ccc",
          toolbar: {
            autoSelected: "pan",
            show: false
          }
        },
        colors: ["#00BAEC"],
        stroke: {
          width: 3
        },
        grid: {
          borderColor: "#555",
          clipMarkers: false,
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          gradient: {
            enabled: true,
            opacityFrom: 0.55,
            opacityTo: 0
          }
        },
        markers: {
          size: 5,
          colors: ["#000524"],
          strokeColor: "#00BAEC",
          strokeWidth: 3
        },
        series: [
          {
            data: this.values
          }
        ],
        tooltip: {
          theme: "dark"
        },
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          min: 0,
          tickAmount: 4
        }
      }
    },
    options2 () {
      return {
        chart: {
          id: "chart1",
          height: 130,
          type: "bar",
          foreColor: "#ccc",
          brush: {
            target: "chart2",
            enabled: true
          },
          selection: {
            enabled: true,
            fill: {
              color: "#fff",
              opacity: 0.4
            },
            xaxis: {
              min: new Date("27 Jul 2017 10:00:00").getTime(),
              max: new Date("14 Aug 2017 10:00:00").getTime()
            }
          }
        },
        colors: ["#FF0080"],
        series: [
          {
            data: this.values
          }
        ],
        stroke: {
          width: 2
        },
        grid: {
          borderColor: "#444"
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: "datetime",
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
          tickAmount: 2
        }
      }
    }
  }
})
</script>

<style scoped>
#wrapper {
  position: relative;
  padding-top: 20px;
  background: #000524;
  border: 1px solid #000;
  box-shadow: 0 22px 35px -16px rgba(0, 0, 0, 0.71);
  max-width: 850px;
  margin: 5px auto;
}

#chart-bar {
  position: relative;
  margin-top: -38px;
}
</style>
