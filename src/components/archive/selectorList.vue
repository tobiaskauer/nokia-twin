<template>
  <div class="col">
    <ul :class="'selectorList-'+index">
      <li
        v-for="element in elements"
        v-bind:class="{highlight:element.key == active}"
        :key="element.key"
        @click="send(index,element)">
          {{element.display ? element.display : element.key}}
          <small>{{element.count ? element.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}}</small>
          <b-icon v-if="element.key == active" icon="x" style="width: 15px; padding-top: 3px "></b-icon>
      </li>
    </ul>
  </div>
</template>

<script>
import { bus } from '../main'

export default {
  props: {
    selected: String, //currently selected item
    elements: Array, //Elements of list items
    selector: String, //What part of the query to update?
    index: Number
  },

  data() {
    return {
      active: undefined
    }
  },

  mounted() {
    let parameter = {
      index: this.index, //sidebar column id (0,1)
      selector: this.selector, //filter (e.g. company, location)
      key: this.selected, //selected value (e.g. nokia, London)
    }
    bus.$emit('initial', parameter); //send new item to bus
    this.active = this.selected; //can't update a prop, so make it data
  },

  methods: {
    send: function(index,element) { //send query parameter to bus (accesses in results.vue)
      if(
        element.key == this.active //if clicked on an currently active item, deactive
         && element.selector != "metric" //except metric, because this we need
       ) { 
        bus.$emit('query', {
          index: index,
          selector: element.selector,
          key: undefined,
        });
        this.active = ""
      } else {
        this.active = element.key //switch selected item in menu
        bus.$emit('query', {
          index: index,
          selector: element.selector,
          key: element.key,
        });
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.selectorList-0 .highlight  {background: #50E3C2;}
.selectorList-1 .highlight {background: #BD10E0;}

li.Metric .highlight {
  background: white !important;
  color: #39393B;
}

.elements li {
  font-size: 12px;
}

li ul li {
  display: table;
  padding: 2px 4px;
  border-radius: 4px;
}

ul {
  margin: 0;
  padding: 0;
}

small {
  color: lightgrey;
  font-size: .6em
}
</style>
