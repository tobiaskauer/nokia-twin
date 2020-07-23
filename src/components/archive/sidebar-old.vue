<template>
  <div class="col-sm-3 sidebar">
    <h1>Twin DB</h1>
      <ul>
        <selector v-bind:listItem="metric" :columnCount="1" :count="metric.elements.length"/>
        <selector v-bind:listItem="company" :columnCount="columnCount" :count="4" />
        <selector v-bind:listItem="location" :columnCount="columnCount" :count="5" />
        <selector v-bind:listItem="employee_title" :columnCount="columnCount" :count="5" />
    </ul>
  </div>
</template>

<script>
import selector from './selector.vue'
import axios from 'axios'

export default {
  data() {
    return {
      columnCount: 2  ,
      metric: {
        name: "Metric",
        selected: ['rating_overall'],
        elements: [ //static for now, fed by db or files later.
          {key: "rating_overall", display: "Overall Ratings", selector: "metric"},
          {key: "rating_balance", display: "Work-Life Balance", selector: "metric"},
          {key: "rating_culture", display: "Culture & Values", selector: "metric"},
          {key: "rating_career", display: "Career Opportunities", selector: "metric"},
          {key: "rating_comp", display: "Compensation & Benefits", selector: "metric"},
          {key: "rating_mgmt", display: "Senior Leadership", selector: "metric"}
        ]
      },
      location: {
        name: "Location",
        selected: ["US ", "UK"],
        elements: [
        /*  {key: "UK", selector: "country"},
          {key: "Hyderābād", selector: "location"},
          {key: "India", selector: "country"},
          {key: "Hangzhou, Zhejiang", selector: "location"},
          {key: "London, England", selector: "location"},
          {key: "Cupertino, CA", selector: "location"},
          {key: "Bangalore", selector: "location"},*/
        ]
      },
      employee_title: {
        name: "employee_title",
        selected: [],
        //selected: ['  Crew Member ','  Specialist '],
        elements: []
      },
      company: {
        name: "Company",
        selected: [],
        elements: []
      }
    }
  },

  created() {
    let lists = [
      {db_column: "company", target: "company"},
      {db_column: "employee_title", target: "employee_title"},
      {db_column: "location", target: "location"},
      {db_column: "country", target: "location"},
    ]

    lists.forEach(list => {
      this.listElements(list) //get lists to be displayed / suggested in sidebar
    })

  },

  methods: {
    listElements: function(selector) {
      let query = {
        type: 'selectors',
        listSelector: selector.db_column
      }
      axios.post( "http://localhost:8080/nokia/nokia-twin/comparison-api.php?",query,
        {headers: {'Content-Type': 'application/json;charset=UTF-8'}
      })
      .then(response => {
        /*let list = response.data.map(element => {
          return {
            key: element[selector.db_column],
            selector: selector.db_column,
            count: element.count
          }
        })*/

        let startAppendAt = this[selector.target].elements.length
        response.data.forEach((element,i) => {
          let item = {
            key: element[selector.db_column],
            selector: selector.db_column,
            count: element.count
          }
          let index = startAppendAt + i
          this.$set(this[selector.target].elements, index, item)
        })
        this[selector.target].elements.sort((a,b) => b.count - a.count)
      })
      .catch(error => {
        console.log(error)
      });
    }
  },

  components: {
    selector,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: center;
}
.sidebar {
  background-color: #39393B;
  color: white;
  min-width: 300px;
  padding: 0px !important;
}
</style>
