<template>
  <div class="mini-cart">
    <div class="">
      <span class="mini-cart-count">{{
        formatProductCount(cartItemCount)
      }}</span>
      <span class="mini-cart-summ" v-if="cartItemSumm > 0"
        >Total:&nbsp;{{ formatPrice(cartItemSumm) }}&nbsp;$</span
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
      if (!count) return "Cart is empty";

      if (count === 1) return `${count} dish`;

      return `${count} dishes`;
    },
    formatPrice(price) {
      return price.toFixed(2);
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
