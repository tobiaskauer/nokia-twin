<template>
    <div id="metrics">
      <b-button v-b-toggle.collapse-2 variant="link">
        Metrics
        <b-icon icon="caret-down-fill" style="height: 15px; padding-left: 10px" aria-hidden="true"></b-icon>
      </b-button>
      <b-collapse visible id="collapse-2">
          <ul class="elements">
            <li class="neutral" v-for="metric in metrics" :key="metric.key" :class="{highlight:metric.key == selected}" @click="send(metric.key)">{{metric.name}}</li>
          </ul>
          <input class="form-control form-control-sm" type="text" placeholder="Find more metrics">
      </b-collapse>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        metrics: [ //static for now, fed by db or files later.
          {key: "rating_overall", name: "Overall Ratings"},
          {key: "rating_balance", name: "Work-Life Balance"},
          {key: "rating_culture", name: "Culture & Values"},
          {key: "rating_career", name: "Career Opportunities"},
          {key: "rating_comp", name: "Compensation & Benefits"},
          {key: "rating_mgmt", name: "Senior Leadership"}
        ]
      }
    }, props: {
      selected: undefined,
    },
    methods:  {
      send: function(key) {
        this.selected = key
        this.$emit("clicked",{attr: "metric", value: this.selected}) //pass this to sidebar, which will then build the query
      }
    },
    mounted() {
      if(this.selected) this.send(this.selected) //write selected metric to query
    }
  }
  </script>
