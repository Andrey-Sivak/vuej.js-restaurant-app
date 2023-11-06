<template>
  <li class="cart-item">
    <figure class="cart-item-img">
      <img
        :src="require(`@/assets/product-images/${product.image}`)"
        :alt="product.name"
        width="122"
        height="122"
      />
    </figure>
    <router-link :to="`/product/${product.id}`" class="cart-item-title">{{
      product.name
    }}</router-link>
    <div class="cart-item-counter">
      <button class="counter-btn">
        <IconMinus @click="decrease" />
      </button>
      <span>{{ countInCart }}</span>
      <button class="counter-btn" @click="add">
        <IconPlus />
      </button>
    </div>
    <div class="cart-item-count">
      <div class="cart-item-summ">{{ formatPrice(summ) }}&nbsp;$</div>
      <button class="cart-item-remove" @click="removeItem">
        <IconRemove />
      </button>
    </div>
  </li>
</template>

<script>
import IconRemove from "@/components/IconRemove.vue";
import { mapActions, mapState } from "vuex";
import IconMinus from "@/components/IconMinus.vue";
import IconPlus from "@/components/IconPlus.vue";

export default {
  name: "CartItem",
  components: { IconPlus, IconMinus, IconRemove },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(["decreaseProductCount", "removeFromCart", "addToCart"]),

    formatPrice(price) {
      return price.toFixed(2);
    },

    decrease() {
      this.decreaseProductCount(this.product.id);
    },

    removeItem() {
      this.removeFromCart(this.product.id);
    },

    add() {
      this.addToCart(this.product.id);
    },
  },
  computed: {
    ...mapState(["cart"]),

    countInCart() {
      return this.cart.find((item) => item.id === this.product.id)?.count;
    },

    summ() {
      return this.countInCart * this.product.price;
    },
  },
};
</script>

<style>
.cart-item {
  display: flex;
  align-items: center;
  column-gap: 50px;
  width: 100%;
}

.cart-item-img {
  margin: 0;
  padding: 0;
}

.cart-item-title {
  flex-grow: 1;
  padding-left: 48px;
  color: #fff;
  font-size: 17px;
  font-weight: 500;
}

.cart-item-remove {
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.cart-item-remove:hover path {
  fill: white;
}

.cart-item-remove:hover circle {
  stroke: white;
}

.cart-item-title:hover {
  text-decoration: underline;
}

.cart-item-count {
  flex-basis: 150px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 15px;
}

.cart-item-summ {
  color: var(--orange-color);
  font-size: 24px;
}

.cart-item-counter {
  color: white;
  text-align: center;
  font-size: 18px;
  display: grid;
  grid-template-columns: repeat(3, 40px);
  align-items: center;
  flex-basis: 150px;
}

.counter-btn {
  display: block;
  background-color: transparent;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  cursor: pointer;
}

.counter-btn circle {
  stroke: transparent;
}

.counter-btn path {
  stroke: var(--orange-color);
}

.counter-btn:hover circle,
.counter-btn:hover path {
  stroke: white;
}
</style>
