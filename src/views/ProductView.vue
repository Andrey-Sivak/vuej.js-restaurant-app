<template>
  <div class="product-view">
    <div class="container">
      <HomeHeader />

      <main class="product-content" v-if="!loading">
        <figure class="product-image">
          <img
            :src="require(`@/assets/product-images/${product.image}`)"
            :alt="product.name"
          />
        </figure>
        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>
          <p class="product-desc">{{ product.description }}</p>
          <div class="product-info-footer">
            <p class="product-info-price">{{ formattedPrice }}&nbsp;₽</p>
            <ColorButton
              @click="addProductToCart"
              text="В корзину"
              color="orange"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import HomeHeader from "@/components/HomeHeader.vue";
import ColorButton from "@/components/ColorButton.vue";
import { mapActions } from "vuex";
import { generalLocalStorageKey } from "@/api/api";
import router from "@/router";

export default {
  name: "ProductView",
  components: { ColorButton, HomeHeader },
  data() {
    return {
      loading: true,
      product: {},
    };
  },
  computed: {
    formattedPrice() {
      return this.product.price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  },
  methods: {
    ...mapActions(["addToCart"]),
    addProductToCart() {
      this.addToCart(this.product.id);
    },
  },
  mounted() {
    const restaurantData = JSON.parse(
      window.localStorage.getItem(generalLocalStorageKey)
    );

    if (!restaurantData?.activeUser?.id) {
      router.push("/login");
      return;
    }

    const products = JSON.parse(
      window.localStorage.getItem("restaurant-products")
    );

    this.product = products.find(
      (product) => Number(product.id) === Number(this.$route.params.id)
    );
    this.loading = false;
  },
};
</script>

<style scoped>
.container {
  max-width: 1300px;
  margin: 0 auto;
}

.product-view {
  background-image: url("@/assets/product-view-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
}

.product-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 100px;
  align-items: center;
}

.product-image {
  width: 75%;
  margin: 0 auto;
}

.product-image img {
  width: 100%;
}

.product-title {
  color: var(--orange-color);
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: 500;
}

.product-desc {
  color: white;
  font-size: 16px;
  line-height: 1.2;
  margin-bottom: 34px;
  margin-top: 0;
}

.product-info-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-info-price {
  color: #fff;
  font-weight: 500;
  font-size: 23px;
}
</style>
