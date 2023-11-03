import { createStore } from "vuex";
import { generalLocalStorageKey, updateCart } from "@/api/api";

export default createStore({
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, productId) {
      if (!state.cart?.length) {
        state.cart.push({
          id: productId,
          count: 1,
        });
      } else {
        const currentProductInCartIndex = state.cart.findIndex(
          (cartItem) => cartItem.id === productId
        );

        if (currentProductInCartIndex >= 0) {
          state.cart[currentProductInCartIndex].count++;
        } else {
          state.cart.push({
            id: productId,
            count: 1,
          });
        }
      }

      updateCart(state.cart);
    },

    decreaseProductCount(state, productId) {
      const productToDecreaseIndex = state.cart.findIndex(
        (item) => item.id === productId
      );

      if (state.cart[productToDecreaseIndex].count <= 1) {
        this.commit("removeFromCart", productId);
        return;
      }

      state.cart[productToDecreaseIndex].count--;
      updateCart(state.cart);
    },

    removeFromCart(state, productId) {
      state.cart = state.cart.filter((item) => item.id !== productId);
      updateCart(state.cart);
    },

    setCart(state, cartData) {
      state.cart = cartData;
    },
  },
  actions: {
    addToCart({ commit }, productId) {
      commit("addToCart", productId);
    },

    removeFromCart({ commit }, productId) {
      commit("removeFromCart", productId);
    },

    decreaseProductCount({ commit }, productId) {
      commit("decreaseProductCount", productId);
    },

    initializeCart({ commit }) {
      const restaurantData = JSON.parse(
        window.localStorage.getItem(generalLocalStorageKey)
      );

      if (!restaurantData) return;

      const activeUser = restaurantData?.activeUser;

      if (!activeUser) return;

      const initialCartData = activeUser.cart;
      commit("setCart", initialCartData || []);
    },
  },
  getters: {
    cartItemCount: (state) => {
      if (!state.cart?.length) return 0;

      return state.cart.reduce((total, item) => total + item.count, 0);
    },

    cartItemSumm: (state) => {
      if (!state.cart?.length) return 0;

      const products = JSON.parse(
        window.localStorage.getItem("restaurant-products")
      );

      return products.reduce((total, item) => {
        const productInCart = state.cart.find(
          (cartItem) => item.id === cartItem.id
        );

        if (!productInCart) return 0;

        return total + productInCart.count * item.price;
      }, 0);
    },
  },
  modules: {},
});
