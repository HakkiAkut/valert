import Vue from "vue";

window.valertBus = new Vue();

Vue.prototype.$valert = function (data) {
  window.valertBus.$emit("custom-alert", data);
};
