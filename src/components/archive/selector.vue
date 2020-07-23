<template>
  <li :class="['firstLevel',listItem.name]">
      <!--<b-button v-b-toggle.collapse-'"foobar"' variant="link">-->
      <b-button :aria-controls="'collapse-'+listItem.name.toLowerCase()" @click="visible = !visible">
      {{ listItem.name }}
      <b-icon icon="caret-down-fill" style="height: 15px; padding-left: 10px" aria-hidden="true"></b-icon>
    </b-button>
    <b-collapse v-model="visible" :id="'collapse-'+listItem.name.toLowerCase()">
      <div class="row elements">
        <!-- TODO: making this dependend on this.selected is flimsy and inconsistent. introduce a column counter when building addColumn-feature  -->
          <selectorList
            v-for="(n, index) in columnCount"
            v-bind:index="index"
            v-bind:key="index"
            v-bind:elements="displayed"
            v-bind:selector="listItem.name.toLowerCase()"
            v-bind:selected="listItem.selected[index]" />
      </div>
      <!--<input
        class="form-control form-control-sm"
        v-model="search"
        @input="onChange"
        type="text"
        placeholder="Find more" />-->
      <!--<button v-on:click="click">add company</button>-->
    </b-collapse>
  </li>
</template>

<script>
import selectorList from './selectorList.vue'

export default {
  components: {
    selectorList
  },

  data() {
    return {
      visible: true,
      added: [],
      isOpen: false,
    }
  },

  computed: {
    displayed: function() {
      return this.listItem.elements
        .filter((x,i)=>i <= this.count)
        .concat(this.added)
    }
  },

  methods: {

  },

  mounted() {
  },

  props: {
    listItem: Object,
    count: Number,
    columnCount: Number
  }
}
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
}

li.Metric {
  background-image: linear-gradient(-132deg, #BD10E0 0%, #50E3C2 96%);
background-image: linear-gradient(135deg, #20C5A0 0%, #BD10E0 47%, #F5A623 100%);
  border-bottom: 0 !important;
}

li.firstLevel {
  font-size: 16px;
  border-bottom: 1px solid darkgrey;
  padding: 20px;
  list-style: none;
}

button.btn {
  color: white;
  padding: 0;
  background: none;
  border: none;
}
</style>
