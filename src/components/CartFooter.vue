<template>
  <div class="cart-footer">
    <div class="container">
      <div class="wrap">
        <div class="footer-left">
          <p class="footer-left-text">Заказ на сумму:</p>
          <p class="footer-left-summ">{{ formatPrice(cartItemSumm) }}&nbsp;₽</p>
        </div>

        <div class="">
          <ColorButton text="Оформить заказ" color="orange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorButton from "@/components/ColorButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "CartFooter",
  components: { ColorButton },
  computed: {
    ...mapGetters(["cartItemSumm"]),
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  },
};
</script>

<style scoped>
.cart-footer {
  padding: 20px 0 27px;
  border-top: 1px solid var(--orange-color);
  position: fixed;
  bottom: 0;
  top: auto;
  width: 100%;
  left: 0;
  z-index: 10;
}

.container {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
}

.wrap {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.footer-left {
  display: flex;
  align-items: center;
  column-gap: 16px;
}

.footer-left-text {
  font-size: 21px;
  color: #fff;
  text-transform: uppercase;
}

.footer-left-summ {
  color: var(--orange-color);
  font-size: 18px;
}
</style>
