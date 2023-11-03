<template>
  <div class="home">
    <div class="container">
      <HomeHeader heading="наша продукция" />
      <ProductList />
    </div>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import HomeHeader from "@/components/HomeHeader.vue";
import { generalLocalStorageKey } from "@/api/api";
import router from "@/router";

export default {
  name: "HomeView",
  components: { HomeHeader, ProductList },
  mounted() {
    const restaurantData = JSON.parse(
      window.localStorage.getItem(generalLocalStorageKey)
    );

    if (!restaurantData?.activeUser?.id) router.push("/login");
  },
};
</script>

<style>
.home {
  padding: 0 20px 100px;
  background-color: var(--black-color);
  color: white;
  min-height: 100vh;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
}
</style>
