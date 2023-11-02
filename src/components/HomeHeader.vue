<script>
import ColorButton from "@/components/ColorButton.vue";

export default {
  name: "HomeHeader",
  components: { ColorButton },
};
</script>

<template>
  <header class="header">
    <h1 class="caption">наша продукция</h1>
    <div class="mini-cart">
      <router-link to="/login">
        <ColorButton text="Войти" color="orange" />
      </router-link>

      <ColorButton text="Выйти" color="black" />
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 75px;
}

.caption {
  font-size: 31px;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
