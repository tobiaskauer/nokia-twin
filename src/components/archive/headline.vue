<template>
  <div>
    <h2>Compare {{h1}}</h2>
    <div class="labels">
      <span v-for="(name,i) in labels" :key="'key-'+i" :class="'label label-'+i">{{name}}</span>
    </div>
  </div>
</template>

<script>

export default {
  methods: {

  },

  computed: {
    h1: function() {
      let dict = [
        {key: "rating_overall", display: "Overall Ratings"},
        {key: "rating_balance", display: "Work-Life Balance"},
        {key: "rating_culture", display: "Culture & Values"},
        {key: "rating_career", display: "Career Opportunities"},
        {key: "rating_comp", display: "Compensation & Benefits"},
        {key: "rating_mgmt", display: "Senior Leadership"}
      ]
      //return (this.queries) ? dict.find(x=>x.key == this.queries[0].metric).display : ""
      return dict.find(x=>x.key == this.queries[0].metric).display
    },

    labels: function() {
      /*let l = [[],[]]
      let foo = "bar"; foo;
      this.queries.forEach((query,i) => {
        ["company","location","employee_title"].forEach(filter => {
          if(query[filter]) l[i].push(query[filter])
        })
      })
      return l.map(x=>x.join(" + x"))*/

        let bar = "foooo"; bar;
        let l = this.queries.map(query =>
          ["company","location","employee_title"].map(
            filter => {
              return query[filter]
            }).filter(x=>x).join(" + ")
        )
        return l
    }
  },

  props: {
    queries: {
      type: Array,
      //default: function() {return []}
    }
  }
}
</script>

<style scoped>
.label {
  margin-right: 5px;
  padding: 4px 6px;
  color: white;
  font-size: 11px;
  border-radius: 4px
}
.label-0 {
  background-color: #50E3C2;
}

.label-1 {
  background-color: #BD10E0;
}

h2 {
  margin-top: 20px;
}
</style>
