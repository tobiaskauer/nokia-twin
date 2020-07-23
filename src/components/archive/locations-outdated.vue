<template>
    <div>
      <b-button v-b-toggle.collapse-4 variant="link">
        Location
        <b-icon icon="caret-down-fill" style="height: 15px; padding-left: 10px" aria-hidden="true"></b-icon>
      </b-button>
      <b-collapse visible id="collapse-4">
      <div class="row elements">
        <div class="col">
          <ul> <!-- TODO: use dynamic components and iterate over them to not repeat yourself -->
            <li class="green" v-for="element in elements" v-bind:class="{highlight:element.key == selected0}" :key="element.key" @click="click(0,element.key)">{{element.display}}</li>
          </ul>
        </div>
        <div class="col">
          <ul>
            <li class="purple" v-for="element in elements" v-bind:class="{highlight:element.key == selected1}" :key="element.key" @click="click(1,element.key)">{{element.display}}</li>
          </ul>
        </div>
      </div>
      <input class="form-control form-control-sm" type="text" placeholder="Find more locations">
      </b-collapse>
    </div>
</template>

<script>

  export default {
    data() {
      return {
        selected0: undefined,
        selected1: undefined,
        elements: [ //static for now, fed by db or files later.
          {key: "UK", selector: "country", display: "United Kingdom"},
          {key: "Hyderābād", selector: "location", display: "Hyderābād"},
          {key: "India", selector: "country", display: "India"},
          {key: "Hangzhou, Zhejiang", selector: "location", display: "Hangzhou, Zhejiang"},
          {key: "London, England", selector: "location", display: "London, England"},
          {key: "Cupertino, CA", selector: "location", display: "Cupertino, CA"},
          {key: "Bangalore", selector: "location", display: "Bangalore"},
        ]
      }
    }, methods:  {
      click: function(n,key) {
        if (n == 0) this.selected0 = key
        if (n == 1) this.selected1 = key //TODO: this would have been so much prettier as an array
        this.$emit("clicked",{queryID: n,attr: "location", value: key}) //pass this to sidebar, which will then build the query
      }
    }
  }
  </script>
