<template>
  <div class="home">
    <div class="container">
      <HomeHeader heading="Our Dishes" />
      <ProductList />
    </div>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import HomeHeader from "@/components/HomeHeader.vue";

export default {
  name: "HomeView",
  components: { HomeHeader, ProductList },
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
