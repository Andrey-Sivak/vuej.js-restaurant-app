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

    <div class="header-right">
      <MiniCart v-if="isUserLoggedIn && isMiniCart" />

      <router-link to="/login" v-if="!isUserLoggedIn">
        <ColorButton text="Войти" color="orange" />
      </router-link>
      <ColorButton text="Выйти" color="black" v-else @click="logout" />
    </div>
  </header>
</template>

<script>
import ColorButton from "@/components/ColorButton.vue";
import IconBack from "@/components/IconBack.vue";
import { generalLocalStorageKey, userLogout } from "@/api/api";
import MiniCart from "@/components/MiniCart.vue";

export default {
  name: "HomeHeader",
  components: { MiniCart, IconBack, ColorButton },
  props: {
    heading: {
      type: String,
      required: false,
    },
    isMiniCart: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      isUserLoggedIn: false,
    };
  },
  methods: {
    hasHistory() {
      return window.history.length > 2;
    },

    logout() {
      userLogout();
      this.isUserLoggedIn = false;
    },
  },
  mounted() {
    const restaurantData = JSON.parse(
      window.localStorage.getItem(generalLocalStorageKey)
    );

    if (restaurantData?.activeUser?.id) this.isUserLoggedIn = true;
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

.header-right {
  display: flex;
  align-items: center;
  column-gap: 22px;
}
</style>
