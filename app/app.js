import Vue from "nativescript-vue";

import Home from "./components/Home";

Vue.registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView)

Vue.config.silent = false;

new Vue({
    render: h => h('frame', [h(Home)]),
}).$start();
