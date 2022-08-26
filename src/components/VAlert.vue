<template>
  <div class="alert" v-if="value.show" :class="type">
    <div class="column">
      <p class="alert-text alert-text--title">{{ value.title }}</p>
      <p class="alert-text">{{ value.desc }}</p>
    </div>
  </div>
</template>

<script>
import "@/service.js";
export default {
  name: "VAlert",
  data: () => ({
    duration: null,
    required: true,
    value: {
      show: false,
      title: "",
      desc: "",
      duration: 1,
      type: "success",
      position: "right-top",
    },
  }),

  computed: {
    type: function () {
      return `alert--${this.value.type} alert--${
        this.value.position ?? "right-top"
      }`;
    },
  },
  methods: {
    checkError: function () {
      if (
        this.value.show == null ||
        this.value.title == null ||
        this.value.desc == null ||
        this.value.duration == null ||
        this.value.type == null
      ) {
        this.changeToDefault();
        throw new Error(
          "Some values are missing. CustomAlert requires {show: Boolean, title: String, desc: String, duration: Number, type: (success or error or warning or information) }"
        );
      } else if (
        this.value.type != "success" &&
        this.value.type != "error" &&
        this.value.type != "warning" &&
        this.value.type != "information"
      ) {
        this.changeToDefault();
        throw new Error(
          "invalid type. type can only be {success or error or warning or information}"
        );
      }
    },
    changeToDefault: function () {
      this.value = {
        show: false,
        title: "",
        desc: "",
        duration: 1,
        type: "success",
        position: "right-top",
      };
    },
  },
  mounted() {
    window.valertBus.$on("custom-alert", (data) => {
      data.show = true;
      this.value = data;
    });
  },
  watch: {
    value() {
      this.checkError();
      clearTimeout(this.duration);
      this.duration = setTimeout(() => {
        this.changeToDefault();
      }, this.value.duration * 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
//font family
$arial: "Arial", sans-serif;

// size
$width: 450px;
$height: 130px;
$p-10: 10px;
$p-15: 15px;

// colors
$black: #000;
$background: #fff;
$error: #feefef;
$success: #edf9f0;
$warning: #fff4ec;
$info: #eef2fa;

.alert {
  position: fixed;
  box-shadow: 20px 34px 74px rgba(21, 21, 106, 0.07);
  display: flex;
  flex-direction: row;
  align-items: center;
  width: $width;
  min-height: $height;
  height: auto;
  background-color: $background;
  border-radius: $p-15;
  overflow: hidden;
  gap: $p-15;
  z-index: 9999;

  &#{&}--right-top {
    right: $p-10;
    top: $p-10;
  }
  &#{&}--right-center {
    right: $p-10;
    top: calc(50vh - ($height/2));
  }
  &#{&}--right-bottom {
    right: $p-10;
    bottom: $p-10;
  }
  &#{&}--left-top {
    left: $p-10;
    top: $p-10;
  }
  &#{&}--left-center {
    left: $p-10;
    top: calc(50vh - ($height/2));
  }
  &#{&}--left-bottom {
    left: $p-10;
    bottom: $p-10;
  }
  &#{&}--center-top {
    top: $p-10;
  }
  &#{&}--center {
    top: calc(50vh - ($height/2));
  }
  &#{&}--center-bottom {
    bottom: $p-10;
  }

  &-text {
    margin: 0;
    font-family: $arial;
    color: $black;
    font-size: 18px;
    &#{&}--title {
      font-size: 20px;
      font-weight: 600;
    }
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: $p-10;
  }

  &::before {
    background-color: $success;
    content: url("@/assets/checked.svg");
    width: 90px;
    height: $height;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-right-radius: 50%;
    border-top-right-radius: 50%;
  }
  &#{&}--error::before {
    background-color: $error;
    content: url("@/assets/unchecked.svg");
  }
  &#{&}--warning::before {
    background-color: $warning;
    content: url("@/assets/warning.svg");
  }
  &#{&}--information::before {
    background-color: $info;
    content: url("@/assets/information.svg");
  }
}
</style>
