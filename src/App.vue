<template>
  <div id="app">
    <VAlert />
    <button @click="call">button</button>
  </div>
</template>

<script>
import VAlert from "./components/VAlert.vue";
export default {
  name: "App",
  data: () => ({
    alert: { show: false, title: "", desc: "", duration: 1, type: "success" },
  }),
  methods: {
    call: function () {
      this.$valert({
        type: "success",
        title: "item.title asdasdasda adasdas adas das",
        desc: "item.desc adasdasd asdasd asdas dasd a sd item.desc adasdasd asdasd asdas dasd a sd item.desc",
        duration: 200,
      });
    },
  },
  components: { VAlert },
};
</script>
