# valert
It's a Vue 2.x package which provides custom alerts

[Live Demo](https://valert.vercel.app/)

## Getting Started

1. install the package
```
npm install @hakut/valert
```
2. add package into main.js
```
import Vue from "vue";
import VAlert from "@hakut/valert";

Vue.use(VAlert);
```
3. add VAlert into App.vue
```
<template>
  <div id="app">
    <v-alert />
    <router-view />
  </div>
</template>

<script>
import VAlert from "@hakut/valert";
export default {
  name: "App",
  components: {
    VAlert,
  },
};
</script>
```
4. call the alert
```
this.$valert({
  type: "alert type",
  title: "alert title",
  desc: "alert text",
  duration: 2,
  position: "position",
});
```

## Usage

import and add VAlert inside template

```
<template>
  <div id="app">
    <v-alert />
  </div>
</template>
```

call this.$valert()
```
this.$valert({
  type: "alert type",
  title: "alert title",
  desc: "alert text",
  duration: 2,
  position: "position",
});
```

### properties

type: required
```
"success"
"error"
"warning"
"information"
```
title: required
```
"Any string"
```
desc: required
```
"Any string"
```
duration: required
```
1 // seconds
```
position: default="right-top"
```
"right-top",
"right-center",
"right-bottom",
"left-top",
"left-center",
"left-bottom",
"center-top",
"center",
"center-bottom",
```
