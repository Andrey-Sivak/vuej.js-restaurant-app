<template>
  <div class="home">
    <div class="container">
      <HomeHeader />
      <ProductsList />
    </div>
  </div>
</template>

<script>
import ProductsList from "@/components/ProductList.vue";
import HomeHeader from "@/components/HomeHeader.vue";

export default {
  name: "HomeView",
  components: { HomeHeader, ProductsList },
};
</script>

<style>
.home {
  padding: 54px 20px 100px;
  background-color: var(--black-color);
  color: white;
  min-height: 100vh;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
}
</style>
