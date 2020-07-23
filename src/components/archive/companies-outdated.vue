<template>
    <div>
      <b-button v-b-toggle.collapse-3 variant="link">
        Company
        <b-icon icon="caret-down-fill" style="height: 15px; padding-left: 10px" aria-hidden="true"></b-icon>
      </b-button>
      <b-collapse visible id="collapse-3">
        <div class="row elements">

            <selectorList
              v-for="(item, index) in selected"
              v-bind:item="item"
              v-bind:index="index"
              v-bind:key="'selectorList-'+index"
              v-bind:elements="elements"
              selector="company"
              v-bind:selected="selected[index]"/>

        </div>
        <input class="form-control form-control-sm" type="text" placeholder="Find more companies">
      </b-collapse>
    </div>
</template>

<script>
import selectorList from './selectorList.vue'

  export default {
    components: {
      selectorList
    },
    data() {
      return {
        elements: [ //static for now, fed by db or files later.
          {key: "apple", display: "Apple"},
          {key: "amazon", display: "Amazon"},
          {key: "nokia", display: "Nokia"},
          {key: "ericsson", display: "Ericsson"},
          {key: "macys", display: "Macy's"},
          {key: "mcdonalds", display: "McDonald's"},
          /*{key: "huawei", display: "Huawei"},
          {key: "starbucks", display: "Starbucks"},
          {key: "telefonica", display: "Telefonica"}*/
        ]
      }
    },

    props: {
      selected: Array,
    }
  }
  </script>
