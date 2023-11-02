<template>
  <li class="product">
    <div class="">
      <figure class="product-img-wrap">
        <img
          :src="require(`@/assets/product-images/${product.image}`)"
          :alt="product.name"
          width="270"
          height="270"
        />
      </figure>
      <p class="product-name">{{ product.name }}</p>
      <p class="product-description">{{ product.description }}</p>
    </div>
    <div class="product-footer">
      <p class="product-price">{{ formattedPrice }}&nbsp;₽</p>
      <button class="add-to-cart"><IconPlus /></button>
    </div>
  </li>
</template>

<script>
import IconPlus from "@/components/IconPlus.vue";

export default {
  name: "ProductCard",
  components: { IconPlus },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedPrice() {
      return this.product.price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  },
};
</script>

<style>
.product {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 43px 20px 32px;
  color: #fff;
  border: 1px solid var(--orange-color);
  border-radius: 2px;
}

.product:hover .product-name,
.product:hover .product-price,
.product:hover .product-description {
  color: var(--orange-color);
}

.product-img-wrap img {
  user-select: none;
  max-width: 100%;
  display: block;
  height: auto;
  margin-bottom: 30px;
}

.product-name {
  transition: all ease 0.3s;
  display: block;
  color: #fff;
  margin-bottom: 9px;
  font-size: 17px;
  font-weight: 500;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-name:hover {
  text-decoration: underline;
}

.product-description {
  transition: all ease 0.3s;
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
}

.product-footer {
  margin-top: 28px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-price {
  transition: all ease 0.3s;
  font-size: 17px;
  font-weight: 500;
}

.add-to-cart {
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

.add-to-cart:hover svg path,
.add-to-cart:hover svg circle {
  stroke: var(--orange-color);
}
</style>
