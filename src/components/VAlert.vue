<template>
  <div class="alert" v-if="value.show" :class="type">
    <div :class="type_icon" v-if="value.type == 'success'">
      <svg class="alert-icon-svg" viewBox="0 0 507.2 507.2">
        <circle style="fill: #32ba7c" cx="253.6" cy="253.6" r="253.6" />
        <path
          style="fill: #0aa06e"
          d="M188.8,368l130.4,130.4c108-28.8,188-127.2,188-244.8c0-2.4,0-4.8,0-7.2L404.8,152L188.8,368z"
        />
        <path
          style="fill: #ffffff"
          d="M260,310.4c11.2,11.2,11.2,30.4,0,41.6l-23.2,23.2c-11.2,11.2-30.4,11.2-41.6,0L93.6,272.8
		c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L260,310.4z"
        />
        <path
          style="fill: #ffffff"
          d="M348.8,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6l-176,175.2
		c-11.2,11.2-30.4,11.2-41.6,0l-23.2-23.2c-11.2-11.2-11.2-30.4,0-41.6L348.8,133.6z"
        />
      </svg>
    </div>
    <div :class="type_icon" v-else-if="value.type == 'error'">
      <svg class="alert-icon-svg" viewBox="0 0 297 297">
        <circle style="fill: #c0392b" cx="148.5" cy="148.5" r="148.5" />
        <path
          style="fill: #931515"
          d="M223.53,86.581L85.344,222.292l74.293,74.293c73.135-5.423,131.525-63.813,136.948-136.948
		L223.53,86.581z"
        />
        <polygon
          style="fill: #ecf0f1"
          points="231.823,94.875 202.125,65.177 148.5,118.802 94.875,65.177 65.177,94.875 118.802,148.5 
		65.177,202.125 94.875,231.823 148.5,178.198 202.125,231.823 231.823,202.125 178.198,148.5 	"
        />
      </svg>
    </div>
    <div :class="type_icon" v-else-if="value.type == 'warning'">
      <svg class="alert-icon-svg" viewBox="0 0 473.931 473.931">
        <circle style="fill: #e79e2d" cx="236.966" cy="236.966" r="236.966" />
        <path
          style="fill: #ffffff"
          d="M214.399,252.389l-6.698-100.159c-1.257-19.517-1.871-33.526-1.871-42.027
	c0-11.57,3.035-20.602,9.085-27.072c6.065-6.499,14.054-9.74,23.94-9.74c11.996,0,20.022,4.15,24.056,12.445
	c4.034,8.303,6.065,20.258,6.065,35.857c0,9.205-0.494,18.559-1.459,28.022l-8.995,103.089c-0.973,12.277-3.061,21.68-6.279,28.239
	c-3.207,6.544-8.509,9.815-15.888,9.815c-7.536,0-12.756-3.158-15.682-9.512C217.744,275.016,215.645,265.351,214.399,252.389z
	 M237.609,389.974c-8.501,0-15.936-2.739-22.267-8.251c-6.346-5.497-9.512-13.197-9.512-23.102c0-8.647,3.035-16.004,9.085-22.069
	c6.065-6.065,13.493-9.092,22.275-9.092c8.786,0,16.269,3.027,22.477,9.092c6.204,6.065,9.31,13.425,9.31,22.069
	c0,9.751-3.136,17.414-9.418,22.997C253.291,387.19,245.976,389.974,237.609,389.974z"
        />
      </svg>
    </div>
    <div :class="type_icon" v-else-if="value.type == 'information'">
      <svg class="alert-icon-svg" viewBox="0 0 60 60">
        <path
          fill="#2e5aac"
          fill-rule="evenodd"
          d="M1050,360a30,30,0,1,1,30,30A30,30,0,0,1,1050,360Zm30,18a4,4,0,0,1-4-4V358a4,4,0,0,1,8,0v16A4,4,0,0,1,1080,378Zm0-36a4,4,0,1,1-4,4A4,4,0,0,1,1080,342Z"
          transform="translate(-1050 -330)"
        />
      </svg>
    </div>

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
    type_icon: function () {
      return `alert-icon alert-icon--${this.value.type}`;
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

<style scoped>
.alert {
  position: fixed;
  box-shadow: 20px 34px 74px rgba(21, 21, 106, 0.07);
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 450px;
  min-height: 130px;
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  gap: 15px;
  z-index: 9999;
}
.alert--right-top {
  right: 10px;
  top: 10px;
}
.alert--right-center {
  right: 10px;
  top: calc(50vh - (130px / 2));
}
.alert--right-bottom {
  right: 10px;
  bottom: 10px;
}
.alert--left-top {
  left: 10px;
  top: 10px;
}
.alert--left-center {
  left: 10px;
  top: calc(50vh - (130px / 2));
}
.alert--left-bottom {
  left: 10px;
  bottom: 10px;
}
.alert--center-top {
  top: 10px;
}
.alert--center {
  top: calc(50vh - (130px / 2));
}
.alert--center-bottom {
  bottom: 10px;
}

.alert-text {
  margin: 0;
  font-family: "Arial", sans-serif;
  color: #000;
  font-size: 18px;
}
.alert-text--title {
  font-size: 20px;
  font-weight: 600;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
  margin-left: 100px;
}

.alert-icon {
  position: absolute;
  background-color: #edf9f0;
  width: fit-content;
  padding: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-right-radius: 50%;
  border-top-right-radius: 50%;
}
.alert-icon-svg {
  width: 60px;
  height: 60px;
}
.alert-icon.alert-icon--error {
  background-color: #feefef;
}
.alert-icon.alert-icon--warning {
  background-color: #fff4ec;
}
.alert-icon.alert-icon--information {
  background-color: #eef2fa;
}

@media (max-width: 600px) {
  .alert {
    min-height: 80px;
    width: 270px;
  }
  .alert-icon {
    width: fit-content;
    padding: 10px;
    height: 100%;
  }
  .alert-text {
    font-size: 16px;
  }
  .alert-text--title {
    font-size: 18px;
  }
  .alert-icon-svg {
    width: 50px;
    height: 50px;
  }
  .column {
    margin-left: 80px;
  }
}
</style>
