<template>
  <main>
    <ul class="cart-list" v-if="!loading">
      <template v-if="cartList.length">
        <CartItem v-for="item of cartList" :key="item.id" :product="item" />
      </template>
      <div class="cart-empty" v-else>
        Корзина пуста.
        <br />
        <router-link to="/">Перейти в магазин</router-link>
      </div>
    </ul>
  </main>
</template>

<script>
import { mapState } from "vuex";
import CartItem from "@/components/CartItem.vue";

export default {
  name: "CartList",
  components: { CartItem },
  data() {
    return {
      loading: true,
      products: [],
    };
  },
  computed: {
    ...mapState(["cart"]),
    cartList() {
      return (
        this.cart.map((item) =>
          this.products.find((product) => product.id === item.id)
        ) || []
      );
    },
  },
  mounted() {
    this.products = JSON.parse(
      window.localStorage.getItem("restaurant-products")
    );
    this.loading = false;
  },
};
</script>

<style scoped>
.cart-list {
  margin-top: 38px;
  display: grid;
  row-gap: 31px;
}

.cart-empty {
  color: #fff;
  font-size: 24px;
}

.cart-empty a {
  color: #fff;
  text-decoration: underline;
}
</style>
