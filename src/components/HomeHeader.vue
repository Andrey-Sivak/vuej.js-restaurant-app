<template>
  <header class="header">
    <div class="header-left">
      <button
        class="back-button"
        v-if="$route.name !== 'home'"
        @click="hasHistory() ? $router.go(-1) : $router.push('/')"
      >
        <IconBack />
      </button>
      <h1 v-if="heading" class="caption">{{ heading }}</h1>
    </div>

    <div class="mini-cart">
      <router-link to="/login">
        <ColorButton text="Войти" color="orange" />
      </router-link>

      <ColorButton text="Выйти" color="black" />
    </div>
  </header>
</template>

<script>
import ColorButton from "@/components/ColorButton.vue";
import IconBack from "@/components/IconBack.vue";

export default {
  name: "HomeHeader",
  components: { IconBack, ColorButton },
  props: {
    heading: {
      type: String,
      required: false,
    },
  },
  methods: {
    hasHistory() {
      return window.history.length > 2;
    },
  },
};
</script>

<style>
.header {
  padding-top: 54px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 75px;
}

.caption {
  font-size: 31px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
}

.header-left {
  display: flex;
  align-items: center;
  column-gap: 63px;
}

.back-button {
  border: none;
  margin: 0;
  padding: 0;
  background-color: transparent;
  outline: none;
  cursor: pointer;
}

.back-button:hover path {
  fill: white;
}

.back-button:hover circle {
  stroke: white;
}
</style>
