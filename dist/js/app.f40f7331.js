(function(e){function t(t){for(var i,a,c=t[0],o=t[1],l=t[2],d=0,f=[];d<c.length;d++)a=c[d],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&f.push(r[a][0]),r[a]=0;for(i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i]);u&&u(t);while(f.length)f.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],i=!0,c=1;c<n.length;c++){var o=n[c];0!==r[o]&&(i=!1)}i&&(s.splice(t--,1),e=a(a.s=n[0]))}return e}var i={},r={app:0},s=[];function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/nokiatwin/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var u=o;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"004d":function(e,t,n){"use strict";var i=n("ae41"),r=n.n(i);r.a},"034f":function(e,t,n){"use strict";var i=n("85ec"),r=n.n(i);r.a},"133a":function(e,t,n){"use strict";var i=n("fac2"),r=n.n(i);r.a},"2a59":function(e,t,n){},"2c95":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t),n.d(t,"bus",(function(){return N}));n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container-fluid h-100"},[n("div",{staticClass:"row justify-content-center h-100"},[n("sidebar"),n("vis")],1)])},s=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"col-4 sidebar hidden-md-down"},[n("h1",[e._v("Twin DB")]),n("metrics",{attrs:{initial:"rating_overall"},on:{clicked:e.select}}),n("ul",e._l(e.lines,(function(t,i){return n("filterRow",{key:i,attrs:{line:t},on:{clicked:e.select}})})),1),n("div",{staticClass:"addLine"},[n("button",{on:{click:e.addLine}},[e._v("Add Line")])])],1)},c=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{staticClass:"filterRow",style:"border-color: "+this.line.color},[n("ul",{staticClass:"controls"},[n("li",{class:{rotate:!e.collapsed}},[n("a",{on:{click:function(t){return e.collapse(e.collapsed)}}},[n("svg",{staticClass:"bi bi-arrow-down-circle-fill",attrs:{width:"1em",height:"1em",viewBox:"0 0 16 16",fill:this.line.color,xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{"fill-rule":"evenodd",d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 5a.5.5 0 0 0-1 0v4.793L5.354 7.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 9.793V5z"}})])])]),n("li",{staticClass:"delete"},[n("a",{on:{click:function(t){return e.removeLine(e.line.identifier)}}},[n("svg",{staticClass:"bi bi-x-circle-fill",attrs:{width:"1em",height:"1em",viewBox:"0 0 16 16",fill:this.line.color,xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{"fill-rule":"evenodd",d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"}})])])])]),n("div",{staticClass:"collapsed",class:{hidden:!e.collapsed}},[e.collapsedItems.length>0?n("div",[n("ul",{staticClass:"items"},e._l(e.collapsedItems,(function(t,i){return n("li",{key:"selected-"+i},[t.selected?n("div",{style:{"font-color":"bold",background:e.line.color}},[e._v(e._s(t.selected))]):e._e()])})),0)]):n("div",[e._v(" No filters selected ")])]),e._l(e.filterColumns,(function(t,i){return n("div",{key:"list-"+i,staticClass:"expanded",class:{hidden:e.collapsed}},[n("strong",[e._v(e._s(t.name))]),n("ul",{staticClass:"items"},e._l(t.elements,(function(i){return n("li",{key:i.key},[n("div",{style:[e.selected.find((function(e){return e.name==t.name})).selected==i.key?{"font-weight":"bold",background:e.line.color}:{background:"none"}],on:{click:function(n){return e.select(t.name,i)}}},[e._v(" "+e._s(i.key)+" "),e.selected.find((function(e){return e.name==t.name})).selected==i.key?n("svg",{attrs:{width:"1em",height:"1em",viewBox:"0 0 16 16"}},[n("path",{attrs:{transform:"scale(.04)",fill:"white",d:"M247.244,169.59l83.938-83.938c5.332-5.327,7.994-11.798,7.994-19.414c0-7.614-2.669-14.084-7.994-19.414L292.355,7.993C287.026,2.665,280.556,0,272.944,0c-7.617,0-14.085,2.665-19.417,7.993L169.59,91.931L85.651,7.993C80.325,2.665,73.854,0,66.237,0c-7.611,0-14.083,2.665-19.414,7.993L7.994,46.824C2.667,52.15,0,58.624,0,66.238c0,7.616,2.664,14.084,7.994,19.414l83.937,83.938L7.994,253.528C2.667,258.859,0,265.327,0,272.945c0,7.61,2.664,14.082,7.994,19.41l38.83,38.828c5.33,5.332,11.803,7.994,19.414,7.994c7.616,0,14.084-2.669,19.414-7.994l83.939-83.938l83.944,83.938c5.328,5.332,11.793,7.994,19.417,7.994c7.611,0,14.082-2.669,19.411-7.994l38.82-38.828c5.332-5.324,7.994-11.8,7.994-19.41c0-7.618-2.662-14.086-7.994-19.417L247.244,169.59z"}})]):e._e()])])})),0),n("div",{staticClass:"typeahead"},[n("vue-bootstrap-typeahead",{attrs:{data:t.autocomplete,size:"sm",serializer:function(e){return e.key},placeholder:"Add "+t.name},on:{hit:function(n){return e.addFilter(t,n)}},model:{value:e.selected.find((function(e){return e.name==t.name})).selected,callback:function(n){e.$set(e.selected.find((function(e){return e.name==t.name})),"selected",n)},expression:"selected.find(x=>x.name == col.name).selected"}})],1)])}))],2)},l=[],u=(n("4de4"),n("7db0"),n("d81d"),n("b0c0"),n("d45f")),d={components:{VueBootstrapTypeahead:u["a"]},data:function(){return{collapsed:!1}},computed:{filterColumns:{cache:!0,get:function(){return this.$store.getters.getFilterColumns}},selected:{cache:!0,get:function(){return this.filterColumns.map((function(e){return{name:e.name}}))}},collapsedItems:{cache:!1,get:function(){return this.selected.filter((function(e){return e.selected}))}}},methods:{select:function(e,t){var n=this.selected.find((function(t){return t.name==e}));n.selected==t.key?(this.$set(n,"selected",""),this.$emit("clicked",{identifier:this.line.identifier,col:e,query:{filter:t.filter,key:void 0}})):(this.$set(n,"selected",t.key),this.$emit("clicked",{identifier:this.line.identifier,col:e,query:t})),this.$forceUpdate()},removeLine:function(e){this.$store.commit("removeLine",e)},collapse:function(e){this.collapsed=!e},addFilter:function(e,t){this.$store.commit("addFilter",t),this.select(e.name,t)}},mounted:function(){},props:{line:Object}},f=d,h=(n("133a"),n("d0b7"),n("2877")),m=Object(h["a"])(f,o,l,!1,null,"7b27c190",null),p=m.exports,v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",{staticClass:"metric"},e._l(e.metrics,(function(t){return n("li",{key:t.key},[n("span",{class:{active:t.key==e.active},on:{click:function(n){return e.select(t)}}},[e._v(e._s(t.display))])])})),0)},y=[],g={props:{initial:String},data:function(){return{active:this.initial}},computed:{metrics:function(){return this.$store.state.metrics}},created:function(){},mounted:function(){},methods:{select:function(e){e.key!=this.active&&(this.active=e.key,this.$emit("clicked",{identifier:!1,filter:"metric",query:e}))}}},x=g,k=(n("b9df"),Object(h["a"])(x,v,y,!1,null,"6c7b06f5",null)),b=k.exports,w={computed:{lines:function(){return this.$store.state.lines}},mounted:function(){this.lines.length<1&&this.addLine()},methods:{addLine:function(){var e=void 0==this.lines[this.lines.length-1]?{}:this.lines[this.lines.length-1].query;this.$store.commit("addLine",e),this.$store.dispatch("getData",{identifier:!1,filter:"metric",query:{key:"rating_overall"}})},select:function(e){this.$store.dispatch("getData",e)}},components:{filterRow:p,metrics:b},data:function(){return{}},created:function(){}},C=w,_=(n("d08a"),Object(h["a"])(C,a,c,!1,null,"5fdcc66d",null)),L=_.exports,$=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"vis",staticClass:"col-8"},[e.dataState?n("svg",{staticClass:"lines",attrs:{width:e.style.width,height:e.style.height}},[n("g",{staticClass:"axes"},[n("g",{directives:[{name:"axis",rawName:"v-axis:x",value:e.scales,expression:"scales",arg:"x"}],staticClass:"xAxes",attrs:{transform:"translate(0,"+(e.style.height-e.style.margin.top-e.style.margin.bottom)+")"}}),n("g",{directives:[{name:"axis",rawName:"v-axis:y",value:e.scales,expression:"scales",arg:"y"}],staticClass:"yAxes",attrs:{transform:"translate("+e.style.margin.left+",0)"}})]),e.showContext?n("g",{staticClass:"context"},e._l(e.context,(function(t,i){return n("g",{key:"context-"+i,attrs:{transform:"translate("+t.x+",0)"}},[n("line",{attrs:{x1:"0",x2:"0",y1:e.style.margin.top,y2:e.style.height-e.style.margin.bottom-e.style.margin.top,stroke:"black","stroke-dasharray":"4"}}),n("text",{attrs:{x:"10",y:e.style.margin.top+20}},[e._v(e._s(t.text))])])})),0):e._e(),e.dataState?n("g",{staticClass:"extremeValues"},e._l(e.extremeValues,(function(t,i){return n("g",{key:"extreme-"+i},e._l(t.circles,(function(e,i){return n("circle",{key:"circle-"+i,attrs:{cx:e.x,cy:e.y,r:"10",fill:"none",stroke:t.color,"stroke-width":"1","stroke-dasharray":"4 1"}})})),0)})),0):e._e(),n("g",{staticClass:"legend",attrs:{transform:"translate("+(e.style.width-e.style.margin.right-50)+","+(e.style.height-e.style.margin.bottom-50)+")"}},[n("g",[n("text",{attrs:{"text-anchor":"end"}},[e._v("less confident")]),n("line",{attrs:{x0:"0",x1:"20",y0:"0",y1:"0",transform:"translate(2,-3)",stroke:"black","stroke-width":"2"}})]),n("g",{attrs:{transform:"translate(0,10)"}},[n("text",{attrs:{"text-anchor":"end"}},[e._v("more confident")]),n("line",{attrs:{x0:"0",x1:"20",y0:"0",y1:"0",transform:"translate(2,-3)",stroke:"black","stroke-width":"5"}})])]),e._l(e.lines,(function(t){return n("g",{key:t.identifier,staticClass:"lines"},[t.path?n("path",{attrs:{d:t.path,fill:t.color,stroke:"none"}}):e._e()])}))],2):e._e(),n("svg",{staticStyle:{"background-color":"lightgrey"},attrs:{width:e.style.width,height:"50"}},[e.dataState?n("g",e._l(e.lines,(function(t){return n("g",{key:t.identifier,staticClass:"lines"},[t.micro?n("path",{attrs:{d:t.micro,stroke:t.color,"stroke-opacity":"0.5",fill:"none"}}):e._e()])})),0):e._e(),n("g",{staticClass:"brush"})]),n("form",[n("div",{staticClass:"form-check"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.showContext,expression:"showContext"}],staticClass:"form-check-input",attrs:{type:"checkbox",id:"exampleCheck1"},domProps:{checked:Array.isArray(e.showContext)?e._i(e.showContext,null)>-1:e.showContext},on:{click:function(t){e.showContext=!e.showContext},change:function(t){var n=e.showContext,i=t.target,r=!!i.checked;if(Array.isArray(n)){var s=null,a=e._i(n,s);i.checked?a<0&&(e.showContext=n.concat([s])):a>-1&&(e.showContext=n.slice(0,a).concat(n.slice(a+1)))}else e.showContext=r}}}),n("label",{staticClass:"form-check-label",attrs:{for:"exampleCheck1"}},[e._v("Show context")])])])])},O=[],A=(n("99af"),n("a623"),n("4160"),n("fb6a"),n("d3b7"),n("159b"),n("ddb0"),n("5698")),j={data:function(){return{showContext:!0,xDomain:[],style:{width:1e3,height:300,margin:{top:25,right:25,bottom:0,left:40}}}},computed:{context:{cache:!1,get:function(){var e=this,t=A["timeParse"]("%Y-%m"),n=this.$store.getters.getContext.map((function(n){return n.x=e.scales.x(t(n.date)),n}));return n}},data:{cache:!1,get:function(){return this.$store.getters.getLines.map((function(e){return e.touched=0,e}))}},dataState:function(){var e=!1,t=this.data.map((function(e){return!!e.values}));return t.length>0&&t.every((function(e){return e}))&&(e=!0),e},scales:{cache:!0,get:function(){var e=A["timeParse"]("%Y-%m"),t=this.style,n=A["scaleTime"]().range([t.margin.left,t.width-t.margin.left-t.margin.right]),i=A["scaleLinear"]().range([t.height-t.margin.top-t.margin.bottom,t.margin.bottom]),r=A["scaleLinear"]().range([3,6]),s=A["scaleLinear"]().range([t.margin.left,t.width-t.margin.left-t.margin.right]),a=A["scaleLinear"]().range([45,5]);if(A["axisLeft"]().scale(n),A["axisBottom"]().scale(i),this.dataState){var c=[];this.data.forEach((function(e){e.values.forEach((function(e){c.push(e)}))}));var o=this.xDomain.length>0?this.xDomain:A["extent"](c,(function(t){return e(t.d)}));n.domain(o),s.domain(A["extent"](c,(function(t){return e(t.d)}))),i.domain(A["extent"](c,(function(e){return+e.r}))).nice(),a.domain(A["extent"](c,(function(e){return+e.r}))),r.domain(A["extent"](c,(function(e){return+e.c})))}return{x:n,y:i,microX:s,microY:a,confidence:r}}},extremeValues:function(){var e=this,t=A["timeParse"]("%Y-%m"),n=this.scales.x.domain();return this.data.map((function(i){var r=i.values.filter((function(e){var i=t(e.d);return i>n[0]&&i<n[1]})),s=r.sort((function(e,t){return e.r-t.r})),a=s.slice(0,2).concat(s.slice(s.length-2,s.length)),c=a.map((function(n){return{x:e.scales.x(t(n.d)),y:e.scales.y(n.r)}})),o={color:i.color,circles:c};return o}))},lines:{cache:!1,get:function(){var e=this,t=A["timeParse"]("%Y-%m"),n=A["area"]().curve(A["curveBasis"]).x((function(n){return e.scales.x(t(n.d))})).y0((function(t){return e.scales.y(t.r)-e.scales.confidence(t.c)})).y1((function(t){return e.scales.y(t.r)+e.scales.confidence(t.c)})),i=A["line"]().curve(A["curveBasis"]).x((function(n){return e.scales.microX(t(n.d))})).y((function(t){return e.scales.microY(t.r)}));return this.data.map((function(e){return e.values&&(e.path=n(e.values),e.micro=i(e.values)),e}))}}},directives:{axis:function(e,t){var n=t.arg,i={x:"axisBottom",y:"axisLeft"}[n],r=t.value[n];A["select"](e).transition().call(A[i](r).ticks(5))}},watch:{dataState:function(e){e&&this.brush()}},mounted:function(){this.getWidth(),this.$nextTick((function(){window.addEventListener("resize",this.getWidth)}))},methods:{brush:function(){var e=A["brushX"]().extent(this.scales.microX.range().map((function(e,t){return[e,50*t]}))).on("end",this.updateX);A["select"]("g.brush").call(e).call(e.move,this.scales.x.range())},updateX:function(){var e=this,t=A["event"].selection.map((function(t){return e.scales.microX.invert(t)}));t.forEach((function(t,n){e.$set(e.xDomain,n,t)})),A["select"](".xAxes").transition().call(A["axisBottom"](this.scales.x))},getWidth:function(){this.$refs.vis&&(this.style.width=this.$refs.vis.clientWidth,this.dataState&&this.brush())}}},S=j,E=(n("004d"),Object(h["a"])(S,$,O,!1,null,"14a348f4",null)),B=E.exports,P={name:"App",components:{sidebar:L,vis:B},methods:{}},F=P,q=(n("034f"),Object(h["a"])(F,r,s,!1,null,null,null)),T=q.exports,D=n("bc3a"),I=n.n(D),z=n("a7fe"),M=n.n(z),V=(n("c740"),n("a434"),n("2f62")),X=n("cc98"),Y=n.n(X);i["a"].use(V["a"]);var W=new V["a"].Store({state:{lines:[],metrics:[{key:"rating_overall",display:"Overall Ratings"},{key:"rating_balance",display:"Work-Life Balance"},{key:"rating_culture",display:"Culture & Values"},{key:"rating_career",display:"Career Opportunities"},{key:"rating_comp",display:"Compensation & Benefits"},{key:"rating_mgmt",display:"Senior Leadership"}],filterColumns:[{name:"Company",db_columns:["company"]},{name:"Location",db_columns:["location","country"]}].map((function(e){return e.elements=[],e.db_columns.forEach((function(t){var n={type:"selectors",listSelector:t};I.a.post("http://social-dynamics.net/nokiatwin/api.php",n,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).then((function(n){n.data.forEach((function(n){var i={key:n[t],filter:t,count:n.count};e.elements.push(i)})),e.elements.sort((function(e,t){return t.count-e.count}))}))})),e})),addedFilters:[],context:[{date:"2009-11",text:"Barrack Obama elected president"},{date:"2017-06",text:"Tobi starts at Bell Labs"}]},getters:{getFilterColumns:function(e){return e.filterColumns.map((function(t){var n=t.elements.slice(0,5),i=e.addedFilters.filter((function(e){return e.filter.toLowerCase()==t.name.toLowerCase()}));return n=n.concat(i),{name:t.name,elements:n,autocomplete:t.elements}}))},getLines:function(e){return e.lines},getContext:function(e){return e.context}},mutations:{addLine:function(e){var t={},n=["#20C5A0","#BD10E0","#F5A623","4A90E2","ACC000"];t.color=n[e.lines.length],t.query={};var r=[];e.filterColumns.forEach((function(e){e.db_columns.forEach((function(e){r.push(e)}))})),r.push("metric"),r.forEach((function(e){return t.query[e]=void 0})),t.identifier=Y.a.time(),i["a"].set(e.lines,e.lines.length,t)},removeLine:function(e,t){e.lines.length>1&&e.lines.splice(e.lines.findIndex((function(e){return e.identifier==t})),1)},writeQuery:function(e,t){i["a"].set(e.lines[t.index].query,t.filter,t.key)},writeValues:function(e,t){i["a"].set(e.lines[t.index],"values",t.values)},addFilter:function(e,t){i["a"].set(e.addedFilters,e.addedFilters.length,t)}},actions:{getData:function(e,t){var n=e.dispatch,i=e.commit,r=e.state;t.identifier?(i("writeQuery",{index:r.lines.findIndex((function(e){return e.identifier==t.identifier})),filter:t.query.filter,key:t.query.key}),n("callAPI",t.identifier)):r.lines.forEach((function(e,r){i("writeQuery",{index:r,filter:"metric",key:t.query.key}),n("callAPI",e.identifier)}))},callAPI:function(e,t){var n=e.commit,i=e.state,r=i.lines.find((function(e){return e.identifier==t})).query;r.metric||(r.metric="rating_overall"),r.type="result",I.a.post("http://social-dynamics.net/nokiatwin/api.php",r,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).then((function(e){n("writeValues",{index:i.lines.findIndex((function(e){return e.identifier==t})),values:e.data})})).catch((function(e){console.log(e)}))}}});n("f9e3"),n("2dd8");i["a"].use(M.a,I.a),i["a"].config.productionTip=!1;var N=new i["a"];new i["a"]({store:W,render:function(e){return e(T)}}).$mount("#app")},"85ec":function(e,t,n){},ae41:function(e,t,n){},b9df:function(e,t,n){"use strict";var i=n("2a59"),r=n.n(i);r.a},bf44:function(e,t,n){},d08a:function(e,t,n){"use strict";var i=n("bf44"),r=n.n(i);r.a},d0b7:function(e,t,n){"use strict";var i=n("2c95"),r=n.n(i);r.a},fac2:function(e,t,n){}});
//# sourceMappingURL=app.f40f7331.js.map