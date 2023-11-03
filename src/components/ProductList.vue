<template>
  <main>
    <template v-if="products.length">
      <ul class="products">
        <ProductCard
          v-for="product of products"
          :product="product"
          :key="product.id"
        />
      </ul>
    </template>
  </main>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "ProductList",
  components: { ProductCard },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.products = JSON.parse(
      window.localStorage.getItem("restaurant-products")
    );
  },
};
</script>

<style scoped>
.products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 35px;
}
</style>
