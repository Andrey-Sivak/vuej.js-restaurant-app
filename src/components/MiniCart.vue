<template>
  <div class="mini-cart">
    <div class="">
      <span class="mini-cart-count">{{
        formatProductCount(cartItemCount)
      }}</span>
      <span class="mini-cart-summ" v-if="cartItemSumm > 0"
        >на сумму&nbsp;{{ formatPrice(cartItemSumm) }}&nbsp;₽</span
      >
    </div>
    <router-link to="/cart" class="mini-cart-button">
      <IconCart />
    </router-link>
  </div>
</template>

<script>
import IconCart from "@/components/IconCart.vue";
import { mapGetters } from "vuex";

export default {
  name: "MiniCart",
  components: { IconCart },
  computed: {
    ...mapGetters(["cartItemCount", "cartItemSumm"]),
  },
  methods: {
    formatProductCount(count) {
      if (!count) {
        return "Корзина пуста";
      } else if (count === 1) {
        return `${count} товар`;
      } else if (count > 1 && count < 5) {
        return `${count} товара`;
      } else {
        return `${count} товаров`;
      }
    },
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  },
};
</script>

<style>
.mini-cart {
  display: flex;
  align-items: center;
  column-gap: 20px;
}

.mini-cart-button:hover circle {
  fill: white;
}

.mini-cart-button:hover path {
  fill: var(--orange-color);
}

.mini-cart-count,
.mini-cart-summ {
  display: block;
  font-size: 17px;
  font-weight: 500;
  text-align: right;
  color: #fff;
}
</style>
