<template>
<!--<li class="filterRow" :style="'border-color: ' +this.line.color" :key="refreshCount">-->
<li class="filterRow" :style="'border-color: ' +this.line.color">
  <!-- line control elements, always visible -->
  <ul class="controls">
    <li :class="{rotate: !collapsed}"><!-- toggle collapse -->
      <a v-on:click="collapse(collapsed)">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down-circle-fill" :fill="this.line.color" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 5a.5.5 0 0 0-1 0v4.793L5.354 7.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 9.793V5z"/>
        </svg>
      </a>
    </li>
    <li class="delete">
      <a v-on:click="removeLine(line.identifier)">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" :fill="this.line.color" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"/>
        </svg>
      </a>
    </li>
  </ul>

  <!-- collapsed view of line -->
  <div class="collapsed" :class="{hidden: !collapsed}">
    <div v-if="collapsedItems.length > 0">
      <ul class="items">
        <li v-for="(item, index) in collapsedItems" :key="'selected-'+index">
          <div v-if="item.selected" :style="{'font-color': 'bold', 'background': line.color}">{{item.selected}}</div>
        </li>
      </ul>
    </div>
    <div v-else>
      No filters selected
    </div>
  </div>

  <!-- expanded view of line -->
  <div class="expanded" :class="{hidden: collapsed}" v-for="(col, index) in filterColumns" :ref="col.display" :key="'list-'+index">
    <strong>{{col.display}}</strong>
      <ul class="items">
        <li v-for="element in col.elements" :key="element.key">
          <div v-bind:style="[selected.find(x=>x.display == col.display).selected == element.key ? {'font-weight': 'bold', 'background': line.color} : {'background': 'none'}]" v-on:click="select(col.display, element)">
            {{element.key}}
            <svg width="1em" height="1em" viewBox="0 0 16 16" v-if="selected.find(x=>x.display == col.display).selected == element.key">
              <path transform="scale(.04)" fill="white" d="M247.244,169.59l83.938-83.938c5.332-5.327,7.994-11.798,7.994-19.414c0-7.614-2.669-14.084-7.994-19.414L292.355,7.993C287.026,2.665,280.556,0,272.944,0c-7.617,0-14.085,2.665-19.417,7.993L169.59,91.931L85.651,7.993C80.325,2.665,73.854,0,66.237,0c-7.611,0-14.083,2.665-19.414,7.993L7.994,46.824C2.667,52.15,0,58.624,0,66.238c0,7.616,2.664,14.084,7.994,19.414l83.937,83.938L7.994,253.528C2.667,258.859,0,265.327,0,272.945c0,7.61,2.664,14.082,7.994,19.41l38.83,38.828c5.33,5.332,11.803,7.994,19.414,7.994c7.616,0,14.084-2.669,19.414-7.994l83.939-83.938l83.944,83.938c5.328,5.332,11.793,7.994,19.417,7.994c7.611,0,14.082-2.669,19.411-7.994l38.82-38.828c5.332-5.324,7.994-11.8,7.994-19.41c0-7.618-2.662-14.086-7.994-19.417L247.244,169.59z"/>
            </svg>
          </div>

        </li>
      </ul>

      <!-- typeahead field to add additional filters -->
      <div class="typeahead" v-if="col.autocomplete.length > 5">
        <!--{{log(selected)}}
        {{log(col.autocomplete)}}-->
        <vue-bootstrap-typeahead
          :data="col.autocomplete"
          v-model="selected.find(x=>x.display == col.display).selected"
          size="sm"
          :serializer="s => s.key"
          :placeholder="'Add '+col.display"
          @hit="addFilter(col,$event)"
        />
      </div>
    </div>
</li>
</template>

<script>
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';

export default {
  components: {
    VueBootstrapTypeahead
  },

  data() {
    return {
      collapsed: false, //view state for each ui element
    }
  },

  computed: {
    //get filter columns (e.g. company, Location, etc) from store
    filterColumns: {
      cache: true,
      get: function() {
        return this.$store.getters.getFilterColumns
      }
    },

    //selected lines for UI view
    selected: {
      cache: false,
      get: function() {
        //go through each filter column (e.g. company, country, role, etc)
        let activeFilters = this.filterColumns.map(col => {
          //search the query of the line for active filters
          let value = ""
          col.filters.forEach(filter => { //here we have to iterate through all existing filters in case we have multuple database columns combined in one filter column (e.g. "city" and "country" in "location")
            if(this.line.query[filter])
              value = this.line.query[filter]
          })
          //assign them to a display name and return themg
          return {display: col.display, selected: value}
        })
        return activeFilters;
      }
    },

    //compute list to show in collasped filterRow view (or to display message when nothing is selected)
    collapsedItems: {
      cache: false,
      get: function() {
        return this.selected.filter(col => col.selected)
      }
    }
    },

  methods: {
    //select a filteritem
    select: function(col,item) {

      console.log(col,item)
      //find currently selected item to compare the newly clicked item to
      let currentCol = this.selected.find(x=>x.display == col)
      if(currentCol.selected == item.key) { //if already selected
        this.$store.dispatch('getData', {identifier: this.line.identifier, col: col, query: {filter: item.filter, key: undefined}})
        //this.$emit('clicked', {identifier: this.line.identifier, col: col, query: {filter: item.filter, key: undefined}}) //remove filter from query
      } else { //if new item
        this.$store.dispatch('getData', {identifier: this.line.identifier, col: col, query: item})
      }
      this.$forceUpdate()
    },

    //remove line when control-close is clicked
    removeLine: function(identifier) {
      this.$store.commit('removeLine',identifier)
    },

    //toggle collapse state when control-collapse is clicked
    collapse: function(collapse) {
      this.collapsed = !collapse
    },

    addFilter: function(col,filter) {
      this.$store.commit('addFilter',filter)
      this.select(col.display,filter)
      //TODO also select filter
    },

    log: function(message) {
      console.log(message)
    }


  },

  mounted() {
  },

  props: {
    line: Object //line-item (including colors, identifier and selected filters) will be passed from sidebar.vue
  }
}
</script>

<style scoped>
li.filterRow {
  margin: 20px 30px;;
  padding: 10px;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  border-left-width: 15px;
  list-style: none;
  position: relative;
}

ul.items {
  font-size: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

ul.items div {
  padding: 2px 4px;
  border-radius: 4px;
}

ul.items div:hover {
  cursor: pointer;
  font-weight: bold;
}

.expanded {
  margin: 0 30px 15px 0;
  display: inline-table;
}

.collapsed {
  width: 90%;
}

.collapsed li {
  display: inline-block;
  margin: 5px 5px 5px 0;
  font-weight: bold;
}

ul.controls {
  margin: 0;
  padding: 0;
  position: absolute;
  right: 10px;
  top: 5px;
}


ul.controls li {
  list-style: none;
  display: inline-block;
  margin-left: 5px;
  line-height: 0em;
  background: white;
  border-radius: 50%;

}
ul.controls li:hover {
cursor: pointer;
}

ul.controls li.rotate {
  transform: rotate(180deg);
}

.hidden {
  display: none !important;
}

</style>

<style>
.typeahead input {
  margin-top: 4px;
  width: 100px !important;
  font-size: 12pt;
}

.vbst-item {
  padding: 2px !important;
  font-size: 12px;
}
</style>
