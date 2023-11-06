<template>
  <div v-if="isUserLoggedIn" class="cart-view">
    <div class="container">
      <HomeHeader heading="Cart" :is-mini-cart="false" />

      <CartList />
    </div>
    <CartFooter v-if="$store.state.cart.length" />
  </div>
</template>

<script>
import HomeHeader from "@/components/HomeHeader.vue";
import CartList from "@/components/CartList.vue";
import CartFooter from "@/components/CartFooter.vue";
import { generalLocalStorageKey } from "@/api/api";
import router from "@/router";

export default {
  name: "CartView",
  components: { CartFooter, CartList, HomeHeader },
  data() {
    return {
      isUserLoggedIn: false,
    };
  },
  beforeCreate() {
    const restaurantData = JSON.parse(
      window.localStorage.getItem(generalLocalStorageKey)
    );

    if (!restaurantData?.activeUser?.id) {
      router.push("/login");
      return;
    }

    this.isUserLoggedIn = true;
  },
};
</script>

<style scoped>
.container {
  max-width: 1300px;
  margin: 0 auto;
  width: 100%;
}

.cart-view {
  background-color: var(--black-color);
  width: 100%;
  min-height: 100vh;
  padding-bottom: 100px;
}
</style>
