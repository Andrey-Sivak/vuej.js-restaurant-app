<template>
  <router-view />
</template>

<script>
import products from "@/data/products.json";

export default {
  name: "App",
  mounted() {
    window.localStorage.setItem(
      "restaurant-products",
      JSON.stringify(products)
    );
  },
};
</script>

<style>
:root {
  --black-color: #161516;
  --orange-color: #d58c51;
  --red-color: #ff0b0b;
}

p,
ol,
ul,
li,
h1 {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  color: var(--black-color);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
}
</style>
