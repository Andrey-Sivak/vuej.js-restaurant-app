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
import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "ProductList",
  components: { ProductCard },
  data() {
    return {
      products,
    };
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
