(function(t){function e(e){for(var n,a,c=e[0],l=e[1],o=e[2],d=0,f=[];d<c.length;d++)a=c[d],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&f.push(s[a][0]),s[a]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);u&&u(e);while(f.length)f.shift()();return r.push.apply(r,o||[]),i()}function i(){for(var t,e=0;e<r.length;e++){for(var i=r[e],n=!0,c=1;c<i.length;c++){var l=i[c];0!==s[l]&&(n=!1)}n&&(r.splice(e--,1),t=a(a.s=i[0]))}return t}var n={},s={app:0},r=[];function a(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=n,a.d=function(t,e,i){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(i,n,function(e){return t[e]}.bind(null,n));return i},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/nokiatwin/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var o=0;o<c.length;o++)e(c[o]);var u=l;r.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"034f":function(t,e,i){"use strict";var n=i("85ec"),s=i.n(n);s.a},"0771":function(t,e,i){"use strict";var n=i("1701"),s=i.n(n);s.a},1701:function(t,e,i){},"26d7":function(t,e,i){"use strict";var n=i("551b"),s=i.n(n);s.a},"2c95":function(t,e,i){},"551b":function(t,e,i){},"56d7":function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var n=i("2b0e"),s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container-fluid h-100"},[i("div",{staticClass:"row justify-content-center h-100"},[i("sidebar"),i("vis")],1)])},r=[],a=(i("a15b"),i("d81d"),i("4fad"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"col-4 sidebar hidden-md-down"},[i("h1",[t._v("Open Inc")]),t.selectedMetric?i("metrics",{ref:"metrics",attrs:{selected:t.selectedMetric}}):t._e(),i("div",{staticClass:"addLine"},[i("button",{on:{click:t.addLine}},[t._v("Add Line")])]),i("p",{staticStyle:{padding:"0px 30px"}},[t._v("Select filter to change visualization:")]),i("ul",t._l(t.lines,(function(t,e){return i("filterRow",{key:e,ref:"filterRow-"+t.identifier,refInFor:!0,attrs:{line:t}})})),1)],1)}),c=[],l=(i("7db0"),i("4160"),i("c975"),i("ac1f"),i("1276"),i("159b"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("li",{staticClass:"filterRow",style:"border-color: "+this.line.color},[i("ul",{staticClass:"controls"},[i("li",{class:{rotate:!t.collapsed}},[i("a",{on:{click:function(e){return t.collapse(t.collapsed)}}},[i("svg",{staticClass:"bi bi-arrow-down-circle-fill",attrs:{width:"1em",height:"1em",viewBox:"0 0 16 16",fill:this.line.color,xmlns:"http://www.w3.org/2000/svg"}},[i("path",{attrs:{"fill-rule":"evenodd",d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 5a.5.5 0 0 0-1 0v4.793L5.354 7.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 9.793V5z"}})])])]),i("li",{staticClass:"delete"},[i("a",{on:{click:function(e){return t.removeLine(t.line.identifier)}}},[i("svg",{staticClass:"bi bi-x-circle-fill",attrs:{width:"1em",height:"1em",viewBox:"0 0 16 16",fill:this.line.color,xmlns:"http://www.w3.org/2000/svg"}},[i("path",{attrs:{"fill-rule":"evenodd",d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"}})])])])]),i("div",{staticClass:"collapsed",class:{hidden:!t.collapsed}},[t.collapsedItems.length>0?i("div",[i("ul",{staticClass:"items"},t._l(t.collapsedItems,(function(e,n){return i("li",{key:"selected-"+n},[e.selected?i("div",{style:{"font-color":"bold",background:t.line.color}},[t._v(t._s(e.selected))]):t._e()])})),0)]):i("div",[t._v(" No filters selected ")])]),t._l(t.filterColumns,(function(e,n){return i("div",{key:"list-"+n,ref:e.display,refInFor:!0,staticClass:"expanded",class:{hidden:t.collapsed}},[i("strong",[t._v(t._s(e.display))]),i("ul",{staticClass:"items"},t._l(e.elements,(function(n){return i("li",{key:n.key},[i("div",{style:[t.selected.find((function(t){return t.display==e.display})).selected==n.key?{"font-weight":"bold",background:t.line.color}:{background:"none"}],on:{click:function(i){return t.select(e.display,n)}}},[t._v(" "+t._s(n.key)+" "),t.selected.find((function(t){return t.display==e.display})).selected==n.key?i("svg",{attrs:{width:"1em",height:"1em",viewBox:"0 0 16 16"}},[i("path",{attrs:{transform:"scale(.04)",fill:"white",d:"M247.244,169.59l83.938-83.938c5.332-5.327,7.994-11.798,7.994-19.414c0-7.614-2.669-14.084-7.994-19.414L292.355,7.993C287.026,2.665,280.556,0,272.944,0c-7.617,0-14.085,2.665-19.417,7.993L169.59,91.931L85.651,7.993C80.325,2.665,73.854,0,66.237,0c-7.611,0-14.083,2.665-19.414,7.993L7.994,46.824C2.667,52.15,0,58.624,0,66.238c0,7.616,2.664,14.084,7.994,19.414l83.937,83.938L7.994,253.528C2.667,258.859,0,265.327,0,272.945c0,7.61,2.664,14.082,7.994,19.41l38.83,38.828c5.33,5.332,11.803,7.994,19.414,7.994c7.616,0,14.084-2.669,19.414-7.994l83.939-83.938l83.944,83.938c5.328,5.332,11.793,7.994,19.417,7.994c7.611,0,14.082-2.669,19.411-7.994l38.82-38.828c5.332-5.324,7.994-11.8,7.994-19.41c0-7.618-2.662-14.086-7.994-19.417L247.244,169.59z"}})]):t._e()])])})),0),e.autocomplete.length>5?i("div",{staticClass:"typeahead"},[i("vue-bootstrap-typeahead",{attrs:{data:e.autocomplete,size:"sm",serializer:function(t){return t.key},placeholder:"Add "+e.display},on:{hit:function(i){return t.addFilter(e,i)}},model:{value:t.selected.find((function(t){return t.display==e.display})).selected,callback:function(i){t.$set(t.selected.find((function(t){return t.display==e.display})),"selected",i)},expression:"selected.find(x=>x.display == col.display).selected"}})],1):t._e()])}))],2)}),o=[],u=(i("4de4"),i("c7400"),i("d45f")),d={components:{VueBootstrapTypeahead:u["a"]},data:function(){return{collapsed:!1}},computed:{filterColumns:{cache:!0,get:function(){return this.$store.getters.getFilterColumns}},selected:{cache:!1,get:function(){var t=this,e=this.filterColumns.map((function(e){var i="";return e.filters.forEach((function(e){t.line.query[e]&&(i=t.line.query[e])})),{display:e.display,selected:i}}));return e}},collapsedItems:{cache:!1,get:function(){return this.selected.filter((function(t){return t.selected}))}}},methods:{select:function(t,e){var i=this,n=this.selected.find((function(e){return e.display==t})),s={};n.selected==e.key?(s[e.filter]=null,this.$store.commit("writeQuery",{identifier:this.line.identifier,query:s}),this.$store.dispatch("getData",{identifier:this.line.identifier,col:t,query:{filter:e.filter,key:void 0}})):(s[e.filter]=e.key,this.$store.commit("writeQuery",{identifier:this.line.identifier,query:s}),this.$store.dispatch("getData",{identifier:this.line.identifier}));var r,a=this.$route.query,c=a[e.filter]?a[e.filter].split(","):[],l=this.$store.state.lines.findIndex((function(t){return t.identifier==i.line.identifier}));n.selected==e.key?c[l]=null:c[l]=e.key,c=c.join(","),a[e.filter]=c,r=Object.entries(a).map((function(t){return encodeURIComponent(t[0])+"="+encodeURIComponent(t[1])})).join("&"),history.pushState({},null,this.$route.path+"nokiatwin/#/?"+r),this.$forceUpdate()},removeLine:function(t){this.$store.commit("removeLine",t);var e=this.$route.query;e.lines=this.$store.state.lines.length;var i=Object.entries(e).map((function(t){return encodeURIComponent(t[0])+"="+encodeURIComponent(t[1])})).join("&");history.pushState({},null,this.$route.path+"nokiatwin/#/?"+i)},collapse:function(t){this.collapsed=!t},addFilter:function(t,e){this.$store.commit("addFilter",e),this.select(t.display,e)},log:function(t){console.log(t)}},mounted:function(){},props:{line:Object}},f=d,h=(i("0771"),i("d0b7"),i("2877")),m=Object(h["a"])(f,l,o,!1,null,"09210b7a",null),p=m.exports,v=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"metric"},[t.metrics.length<10?[i("ul",t._l(t.metrics,(function(e){return i("li",{key:e.key},[i("span",{class:{active:e.key==t.active},on:{click:function(i){return t.select(e)}}},[t._v(t._s(e.display))])])})),0)]:[i("select",{staticClass:"custom-select",on:{change:t.filterBullshitFromSelect}},[i("option",{attrs:{disabled:""}},[t._v("Choose Metric")]),t._l(t.metrics,(function(e){return i("option",{key:e.key,domProps:{value:e.key}},[t._v(t._s(e.display))])}))],2)]],2)},y=[],g={data:function(){return{active:null}},props:{selected:String},computed:{metrics:function(){return this.$store.state.metrics}},created:function(){this.active=this.selected},mounted:function(){},methods:{select:function(t){if(t.key!=this.active){this.$store.commit("setActiveMetric",t),this.active=t.key;var e=this.$route.query;e.metric=t.key;var i=Object.entries(e).map((function(t){return encodeURIComponent(t[0])+"="+encodeURIComponent(t[1])})).join("&");history.pushState({},null,this.$route.path+"nokiatwin/#/?"+i),this.$store.commit("writeQuery",{identifier:!1,query:{metric:t.key}}),this.$store.dispatch("getData",{identifier:!1})}},filterBullshitFromSelect:function(t){var e=t.target.value,i=this.metrics.find((function(t){return t.key==e}));this.select(i)}}},b=g,x=(i("8268"),Object(h["a"])(b,v,y,!1,null,"15aedf00",null)),k=x.exports,w={data:function(){return{selectedMetric:void 0,lines:void 0}},computed:{metrics:function(){return this.$store.state.metrics},filterColumns:function(){return this.$store.state.filterColumns}},watch:{metrics:function(t){t.length>0&&this.setMetric()},filterColumns:function(t){t.length>0&&this.setLines()}},mounted:function(){},methods:{setMetric:function(){var t=this;this.$route.query.metric&&-1!==this.metrics.map((function(t){return t.key})).indexOf(this.$route.query.metric)?this.selectedMetric=this.$route.query.metric:this.selectedMetric=this.metrics[0].key,this.$store.commit("setActiveMetric",this.metrics.find((function(e){return e.key==t.selectedMetric})))},setLines:function(){for(var t=this,e=this.$route.query.lines?this.$route.query.lines:1,i=function(e){var i={metric:t.selectedMetric};t.$store.state.filterColumns.forEach((function(n){n.db_columns.forEach((function(n){t.$route.query[n]&&t.$route.query[n].split(",")[e]&&(i[n]=t.$route.query[n].split(",")[e])}))})),t.$store.dispatch("addLine",i)},n=0;n<e;n++)i(n);this.lines=this.$store.getters.getLines},addLine:function(){this.$store.dispatch("addLine");var t=this.$route.query;t.lines=this.lines.length;var e=Object.entries(t).map((function(t){return encodeURIComponent(t[0])+"="+encodeURIComponent(t[1])})).join("&");history.pushState({},null,this.$route.path+"nokiatwin/#/?"+e)}},components:{filterRow:p,metrics:k},created:function(){}},_=w,C=(i("9f77"),Object(h["a"])(_,a,c,!1,null,"2b6514cc",null)),$=C.exports,L=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"vis",staticClass:"col-8",staticStyle:{"margin-top":"50px"}},[i("div",{staticClass:"row errors"},[i("div",{staticClass:"col"},[t._l(t.lines,(function(e,n){return i("div",{key:n},[t.dataState&&e.values.length<1?i("div",{staticClass:"alert alert-danger",staticStyle:{"margin-top":"10px"},attrs:{role:"alert"}},[t._v(" Line "+t._s(n+1)+" has no data. Maybe too much filters are active. ")]):t._e()])})),t.$route.query.table?t._e():i("div",{staticClass:"alert alert-danger",staticStyle:{"margin-top":"10px"},attrs:{role:"alert"}},[t._v(" No table defined ")])],2)]),i("div",{staticClass:"row"},[i("div",{staticClass:"col"},[t.dataState?i("svg",{staticClass:"lines",attrs:{id:"chart",width:t.style.width,height:t.style.height+t.style.margin.top+t.style.margin.bottom}},[i("defs",[i("clipPath",{attrs:{id:"mask"}},[i("rect",{attrs:{x:t.style.margin.left,y:"0",width:t.style.width,height:t.style.height-t.style.margin.top-t.style.margin.bottom}})])]),i("g",{staticClass:"axes",attrs:{transform:"translate(0,"+t.style.margin.top+")"}},[i("text",{attrs:{"font-size":"6pt",y:"-10",x:t.style.margin.left+10,"text-anchor":"middle"}},[t._v(t._s(t.activeMetric.display))]),i("g",{directives:[{name:"axis",rawName:"v-axis:x",value:t.scales,expression:"scales",arg:"x"}],staticClass:"xAxes",attrs:{transform:"translate(0,"+(t.style.height-t.style.margin.top-t.style.margin.bottom)+")"}}),i("g",{directives:[{name:"axis",rawName:"v-axis:y",value:t.scales,expression:"scales",arg:"y"}],staticClass:"yAxes",attrs:{transform:"translate("+t.style.margin.left+",0)"}})]),t.showEvents?i("g",{staticClass:"events",attrs:{"clip-path":"url(#mask)",transform:"translate(0,"+t.style.margin.top+")"}},t._l(t.events,(function(e,n){return i("g",{key:"event-"+n,class:"event-"+n,attrs:{transform:"translate("+e.x+",0)"}},[e.filters.filter((function(e){return t.activeFilters.includes(e)})).length>0?i("line",{attrs:{x0:"0",y0:t.style.margin.top,x1:"0",y1:t.style.height-t.style.margin.bottom-t.style.margin.top,stroke:"lightgrey","stroke-width":"2",fill:"lightgrey"},on:{mouseover:function(i){return t.showText(!0,e,n)},mouseout:function(e){return t.showText(!1,{date:"",text:""},n)}}}):t._e()])})),0):t._e(),i("g",{attrs:{"clip-path":"url(#mask)",transform:"translate(0,"+t.style.margin.top+")"}},t._l(t.lines,(function(e){return i("g",{key:e.identifier,staticClass:"lines"},[e.path?i("path",{attrs:{d:e.path,fill:e.color,opacity:".8",stroke:"none"}}):t._e()])})),0),i("g",{staticClass:"legend",attrs:{transform:"translate("+(t.style.width-t.style.margin.right-50)+","+(t.style.height-t.style.margin.bottom-50)+")"}},[i("g",[i("text",{attrs:{"text-anchor":"end"}},[t._v("less confident")]),i("line",{attrs:{x0:"0",x1:"20",y0:"0",y1:"0",transform:"translate(2,-3)",stroke:"black","stroke-width":"2"}})]),i("g",{attrs:{transform:"translate(0,10)"}},[i("text",{attrs:{"text-anchor":"end"}},[t._v("more confident")]),i("line",{attrs:{x0:"0",x1:"20",y0:"0",y1:"0",transform:"translate(2,-3)",stroke:"black","stroke-width":"5"}})]),i("g",{attrs:{transform:"translate(0,25)"}},t._l(t.lines,(function(e,n){return i("text",{key:n,attrs:{y:10*n,fill:e.color,"text-anchor":"end"}},[t._v(t._s(e.legend)+" ")])})),0)])]):t._e()])]),i("div",{staticClass:"row brush"},[i("div",{staticClass:"col"},[i("svg",{staticStyle:{"background-color":"lightgrey"},attrs:{width:t.style.width,height:"50"}},[t.dataState?i("g",t._l(t.lines,(function(e){return i("g",{key:e.identifier,staticClass:"lines"},[e.micro?i("path",{attrs:{d:e.micro,stroke:e.color,"stroke-opacity":"0.5",fill:"none"}}):t._e()])})),0):t._e(),i("g",{staticClass:"brush"},[i("g",{staticClass:"leftHandle"},[i("g",{attrs:{transform:"translate(-5,0)"}},[i("path",{attrs:{fill:"grey",transform:"scale(0.015)",d:"M990,500c0-13.6-5.9-25.7-15.2-34.1l0,0L821.7,328l0,0c-8.1-7.3-18.9-11.8-30.7-11.8c-25.4,0-45.9,20.6-45.9,45.9c0,13.6,5.9,25.7,15.2,34.1l0,0l64.1,57.7H175.7l64.1-57.7l0,0c9.3-8.4,15.2-20.6,15.2-34.1c0-25.4-20.6-45.9-45.9-45.9c-11.8,0-22.6,4.5-30.7,11.8l0,0L25.2,465.9l0,0C15.9,474.3,10,486.4,10,500s5.9,25.7,15.2,34.1l0,0L178.3,672l0,0c8.1,7.3,18.9,11.8,30.7,11.8c25.4,0,45.9-20.6,45.9-45.9c0-13.6-5.9-25.7-15.2-34.1l0,0l-64.1-57.7h648.7l-64.1,57.7l0,0c-9.3,8.4-15.2,20.6-15.2,34.1c0,25.4,20.6,45.9,45.9,45.9c11.8,0,22.6-4.5,30.7-11.8l0,0l153.1-137.8l0,0C984.1,525.8,990,513.6,990,500z"}})])]),i("g",{staticClass:"rightHandle"},[i("g",{attrs:{transform:"translate(-5,0)"}},[i("path",{attrs:{fill:"grey",transform:"scale(0.015)",d:"M990,500c0-13.6-5.9-25.7-15.2-34.1l0,0L821.7,328l0,0c-8.1-7.3-18.9-11.8-30.7-11.8c-25.4,0-45.9,20.6-45.9,45.9c0,13.6,5.9,25.7,15.2,34.1l0,0l64.1,57.7H175.7l64.1-57.7l0,0c9.3-8.4,15.2-20.6,15.2-34.1c0-25.4-20.6-45.9-45.9-45.9c-11.8,0-22.6,4.5-30.7,11.8l0,0L25.2,465.9l0,0C15.9,474.3,10,486.4,10,500s5.9,25.7,15.2,34.1l0,0L178.3,672l0,0c8.1,7.3,18.9,11.8,30.7,11.8c25.4,0,45.9-20.6,45.9-45.9c0-13.6-5.9-25.7-15.2-34.1l0,0l-64.1-57.7h648.7l-64.1,57.7l0,0c-9.3,8.4-15.2,20.6-15.2,34.1c0,25.4,20.6,45.9,45.9,45.9c11.8,0,22.6-4.5,30.7-11.8l0,0l153.1-137.8l0,0C984.1,525.8,990,513.6,990,500z"}})])])])])])]),i("div",{staticClass:"row",staticStyle:{"margin-top":"20px"}},[i("div",{staticClass:"events col-8"},[i("form",[i("div",{staticClass:"form-check"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.showEvents,expression:"showEvents"}],staticClass:"form-check-input",attrs:{type:"checkbox",id:"exampleCheck1"},domProps:{checked:Array.isArray(t.showEvents)?t._i(t.showEvents,null)>-1:t.showEvents},on:{click:function(e){t.showEvents=!t.showEvents},change:function(e){var i=t.showEvents,n=e.target,s=!!n.checked;if(Array.isArray(i)){var r=null,a=t._i(i,r);n.checked?a<0&&(t.showEvents=i.concat([r])):a>-1&&(t.showEvents=i.slice(0,a).concat(i.slice(a+1)))}else t.showEvents=s}}}),i("label",{staticClass:"form-check-label",attrs:{for:"exampleCheck1"}},[t._v("Events:")])])]),i("div",{staticClass:"currentEvent"},[i("span",{staticClass:"date"},[t._v(t._s(t.currentEvent.date))]),t._l(t.currentEvent.content,(function(e,n){return i("p",{key:n},[t.activeFilters.includes(e.filter)?i("span",{domProps:{innerHTML:t._s(e.text)}}):t._e()])}))],2)]),i("div",{staticClass:"col-4 settings",staticStyle:{"border-left":"1px dotted grey","padding-left":"10px"}},[i("span",{staticClass:"pickDescription"},[t._v("Start: ")]),i("VueDatePicker",{on:{onChange:function(e){return t.pickDate(0)}},model:{value:t.datePicker[0],callback:function(e){t.$set(t.datePicker,0,e)},expression:"datePicker[0]"}}),i("span",{staticClass:"pickDescription"},[t._v("End: ")]),i("VueDatePicker",{on:{onChange:function(e){return t.pickDate(1)}},model:{value:t.datePicker[1],callback:function(e){t.$set(t.datePicker,1,e)},expression:"datePicker[1]"}}),i("button",{staticClass:"btn btn-outline-primary btn-sm",attrs:{type:"button"},on:{click:t.savePNG}},[t._v("Download PNG")])],1)])])},E=[],j=(i("a623"),i("b64b"),i("d3b7"),i("2ca0"),i("ddb0"),i("5698")),P=i("bd0e"),q=(i("7ce0"),i("bc05")),M={components:{VueDatePicker:P["a"]},data:function(){return{showEvents:!0,currentEvent:{},xDomain:[],datePicker:[],brush:null,lineThickness:[3,7],style:{width:1e3,height:300,margin:{top:30,right:25,bottom:0,left:40}}}},computed:{events:{cache:!0,get:function(){var t=this,e=j["timeParse"]("%d-%m-%Y"),i=[];return this.$store.state.events.forEach((function(n){var s=i.findIndex((function(t){return t.date==n.date}));-1===s?i.push({date:n.date,x:t.scales.x(e(n.date)),filters:[n.filter],content:[{filter:n.filter,text:n.text}]}):(i[s].content.push({filter:n.filter,text:n.text}),i[s].filters.push(n.filter))})),i}},activeMetric:function(){return this.$store.getters.getActiveMetric},data:{cache:!0,get:function(){return this.$store.getters.getLines.map((function(t){t.touched=0;var e=Object.keys(t.query).filter((function(t){return t.startsWith("filter")})).map((function(e){return t.query[e]})).join(", ");return t.legend=""!=e?e:"All data showing, no filters selected",t}))}},activeFilters:function(){var t=this.lines.map((function(t){if("All data showing, no filters selected"!=t.legend)return t.legend}));return console.log(t),t},dataState:function(){var t=!1,e=this.data.map((function(t){return!!t.values}));return e.length>0&&e.every((function(t){return t}))&&(t=!0),t},scales:{cache:!0,get:function(){var t=j["timeParse"](this.$store.state.granularity),e=this.style,i=j["scaleTime"]().range([e.margin.left,e.width-e.margin.left-e.margin.right]),n=j["scaleLinear"]().range([e.height-e.margin.top-e.margin.bottom,e.margin.bottom]),s=j["scaleLinear"]().range(this.lineThickness),r=j["scaleLinear"]().range([e.margin.left,e.width-e.margin.left-e.margin.right]),a=j["scaleLinear"]().range([45,5]);if(j["axisLeft"]().scale(i),j["axisBottom"]().scale(n),this.dataState){var c=[];this.data.forEach((function(t){t.values.forEach((function(t){c.push(t)}))}));var l=this.xDomain.length>0?this.xDomain:j["extent"](c,(function(e){return t(e.d)})),o=j["extent"](c,(function(t){return+t.r}));this.activeMetric.metric_low_end&&(o[0]=this.activeMetric.metric_low_end),this.activeMetric.metric_high_end&&(o[1]=this.activeMetric.metric_high_end),i.domain(l),r.domain(j["extent"](c,(function(e){return t(e.d)}))),n.domain(o).nice(),a.domain(o),s.domain(j["extent"](c,(function(t){return+t.c})))}return{x:i,y:n,microX:r,microY:a,confidence:s}}},lines:{cache:!1,get:function(){var t=this,e=j["timeParse"](this.$store.state.granularity),i=j["area"]().curve(j["curveBasis"]).x((function(i){return t.scales.x(e(i.d))})).y0((function(e){return t.scales.y(e.r)-t.scales.confidence(e.c)})).y1((function(e){return t.scales.y(e.r)+t.scales.confidence(e.c)})),n=j["line"]().curve(j["curveBasis"]).x((function(i){return t.scales.microX(e(i.d))})).y((function(e){return t.scales.microY(e.r)}));return this.data.map((function(t){return t.values&&(t.path=i(t.values),t.micro=n(t.values)),t}))}}},directives:{axis:function(t,e){var i=e.arg,n={x:"axisBottom",y:"axisLeft"}[i],s=e.value[i];j["select"](t).transition().call(j[n](s).ticks(5))}},watch:{dataState:function(t){t&&this.initBrush()},scales:function(){this.datePicker=this.scales.x.domain()}},mounted:function(){this.getWidth(),this.$nextTick((function(){window.addEventListener("resize",this.getWidth)}))},methods:{pickDate:function(t){var e=this,i=j["timeParse"]("%Y-%m-%d");this.datePicker[t]=i(this.datePicker[t]),this.$set(this.xDomain,t,this.datePicker[t]),j["select"]("g.brush").call(this.brush).call(this.brush.move,this.datePicker.map((function(t){return e.scales.microX(t)})))},writeDatestoURL:function(t){var e=j["timeFormat"]("%Y-%m-%d"),i=this.$route.query;i.period=t.map((function(t){return e(t)})).join(",");var n=Object.entries(i).map((function(t){return encodeURIComponent(t[0])+"="+encodeURIComponent(t[1])})).join("&");history.pushState({},null,this.$route.path+"nokiatwin/#/?"+n)},savePNG:function(){q["saveSvgAsPng"](document.getElementById("chart"),"chart.png")},initBrush:function(){var t=this;this.brush=j["brushX"]().extent(this.scales.microX.range().map((function(t,e){return[t,50*e]}))).on("end",this.updateX);var e=j["timeParse"]("%Y-%m-%d"),i=this.$route.query.period?this.$route.query.period.split(",").map((function(i){return t.scales.microX(e(i))})):this.scales.x.range();j["select"]("g.brush").call(this.brush).call(this.brush.move,i)},updateX:function(){var t=this,e=j["event"].selection.map((function(e){return t.scales.microX.invert(e)}));e.forEach((function(e,i){t.$set(t.xDomain,i,e)})),j["select"](".xAxes").transition().call(j["axisBottom"](this.scales.x)),this.writeDatestoURL(this.scales.x.domain()),j["select"]("g.brush .leftHandle").attr("transform","translate("+j["select"](".handle--w").attr("x")+",20)"),j["select"]("g.brush .rightHandle").attr("transform","translate("+j["select"](".handle--e").attr("x")+",20)")},getWidth:function(){this.$refs.vis&&(this.style.width=this.$refs.vis.clientWidth,this.dataState&&this.initBrush())},showText:function(t,e,i){this.currentEvent=e,t?j["select"](".event-"+i+" line").transition().attr("stroke-width",8).attr("x",-4):j["selectAll"](".events line").transition().attr("stroke-width",2).attr("x",0)}}},S=M,A=(i("26d7"),Object(h["a"])(S,L,E,!1,null,"b0a21af8",null)),I=A.exports,O={name:"App",components:{sidebar:$,vis:I},beforeCreate:function(){var t;switch(this.$route.query.granularity){case"day":t="%Y-%m-%d";break;case"week":t="%Y-%V";break;case"month":t="%Y-%m";break;case"year":t="%Y";break;default:t="%Y-%m";break}if(this.$store.state.granularity=t,!this.$route.query.granularity){var e=this.$route.query;e.granularity="month";var i=Object.entries(e).map((function(t){return encodeURIComponent(t[0])+"="+encodeURIComponent(t[1])})).join("&");history.pushState({},null,this.$route.path+"nokiatwin/#/?"+i)}if(this.$route.query.table)this.$store.commit("setTable",this.$route.query.table);else{var n=this.$route.query;n.table="example";var s=Object.entries(n).map((function(t){return encodeURIComponent(t[0])+"="+encodeURIComponent(t[1])})).join("&");history.pushState({},null,this.$route.path+"nokiatwin/#/?"+s),this.$store.commit("setTable","example")}this.$store.dispatch("getMetricsAndFilters"),this.$store.dispatch("getEvents")},methods:{}},F=O,T=(i("034f"),Object(h["a"])(F,s,r,!1,null,null,null)),U=T.exports,D=i("bc3a"),R=i.n(D),B=i("a7fe"),z=i.n(B),Y=(i("99af"),i("caad"),i("fb6a"),i("a434"),i("2532"),i("2f62")),N=i("cc98"),X=i.n(N);n["a"].use(Y["a"]);var V="/nokiatwin/api.php",H=new Y["a"].Store({state:{error:"",table:"",lines:[],metrics:[],granularity:"%Y-%m",activeMetric:"",filterColumns:[],colors:[{hex:"#20C5A0",used:!1},{hex:"#BD10E0",used:!1},{hex:"#F5A623",used:!1},{hex:"#4A90E2",used:!1},{hex:"#ACC000",used:!1}],addedFilters:[],events:[]},getters:{getFilterColumns:function(t){return t.filterColumns.map((function(e){var i=e.elements.slice(0,5),n=t.addedFilters.filter((function(t){return e.db_columns.includes(t.filter)}));return i=i.concat(n),{display:e.display,filters:e.db_columns,elements:i,autocomplete:e.elements.filter((function(t){return null!=t.key}))}}))},getLines:function(t){return t.lines},getContext:function(t){return t.context},getActiveMetric:function(t){return t.activeMetric}},mutations:{setTable:function(t,e){e?t.table=e:t.error="No Table."},setActiveMetric:function(t,e){e&&(t.activeMetric=e)},removeLine:function(t,e){n["a"].set(t.colors.find((function(t){return t.used==e})),"used",!1),t.lines.length>1&&t.lines.splice(t.lines.findIndex((function(t){return t.identifier==e})),1)},writeQuery:function(t,e){if(e.identifier){var i=Object.entries(e.query),s=i[0][0],r=i[0][1];null!=r?n["a"].set(t.lines.find((function(t){return t.identifier==e.identifier})).query,s,r):n["a"].delete(t.lines.find((function(t){return t.identifier==e.identifier})).query,s)}else{var a=Object.entries(e.query),c=a[0][0],l=a[0][1];t.lines.forEach((function(e,i){n["a"].set(t.lines[i].query,c,l)}))}},writeValues:function(t,e){n["a"].set(t.lines[e.index],"values",e.values)},addFilter:function(t,e){n["a"].set(t.addedFilters,t.addedFilters.length,e)}},actions:{addLine:function(t,e){var i=t.state,s=t.dispatch,r={};r.query=e||{metric:i.lines[0].query.metric},r.identifier=X.a.time();var a=i.colors.findIndex((function(t){return!t.used}));r.color=i.colors[a].hex,n["a"].set(i.colors[a],"used",r.identifier),n["a"].set(i.lines,i.lines.length,r),s("getData",{identifier:r.identifier})},getData:function(t,e){var i=t.dispatch,n=t.state;e.identifier?i("callAPI",e.identifier):n.lines.forEach((function(t){i("callAPI",t.identifier)}))},callAPI:function(t,e){var i=t.commit,n=t.state,s=n.lines.find((function(t){return t.identifier==e})).query;s.type="result",s.table=n.table,s.granularity=n.granularity,R.a.post(V,s,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).then((function(t){i("writeValues",{index:n.lines.findIndex((function(t){return t.identifier==e})),values:t.data})})).catch((function(t){console.log(t)}))},debugAPI:function(){var t={type:"debug",metric:"metric_rating_overall",filter_company:"starbucks",filter_country:"United Kingdom",filter_employee_title:"Barista"};R.a.post(V,t,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).then((function(t){console.log(t.data.split("end_output")[0])})).catch((function(t){console.log(t)}))},getMetricsAndFilters:function(t){var e=t.dispatch,i=t.state,s={type:"metrics",table:i.table};R.a.post(V,s,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).then((function(t){var s=t.data.filter((function(t){return t.key.startsWith("metric_")})).map((function(t){return t.display||(t.display=t.key),t}));n["a"].set(i,"metrics",s),e("getFilters",t.data.filter((function(t){return t.key.startsWith("filter_")})))})).catch((function(t){console.log(t)}))},getEvents:function(t){var e=t.state,i={type:"events",table:e.table};R.a.post(V,i,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).then((function(t){n["a"].set(e,"events",t.data)})).catch((function(t){console.log(t)}))},getFilters:function(t,e){var i=t.state,s=[];e.forEach((function(t){var e=s.find((function(e){return e.display==t.display}));e?e.db_columns.push(t.key):s.push({display:t.display,db_columns:[t.key]})})),s=s.map((function(t){return t.elements=[],t.db_columns.forEach((function(e){var n={type:"selectors",listSelector:e,table:i.table};R.a.post(V,n,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).then((function(i){i.data.forEach((function(i){var n={key:i[e],filter:e,count:i.count};t.elements.push(n)})),t.elements.sort((function(t,e){return e.count-t.count}))}))})),t})),n["a"].set(i,"filterColumns",s)}}}),W=i("8c4f");n["a"].use(W["a"]);var Q=new W["a"]({});i("f9e3"),i("2dd8");n["a"].use(z.a,R.a),n["a"].config.productionTip=!1,new n["a"]({store:H,router:Q,render:function(t){return t(U)}}).$mount("#app"),n["a"].mixin({methods:{setURL:function(t){console.log(t),console.log(this.$router)}}})},"7e36":function(t,e,i){},8268:function(t,e,i){"use strict";var n=i("7e36"),s=i.n(n);s.a},"85ec":function(t,e,i){},"9f77":function(t,e,i){"use strict";var n=i("ab68"),s=i.n(n);s.a},ab68:function(t,e,i){},d0b7:function(t,e,i){"use strict";var n=i("2c95"),s=i.n(n);s.a}});
//# sourceMappingURL=app.dc1782ae.js.map