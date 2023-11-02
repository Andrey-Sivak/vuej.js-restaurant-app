<template>
  <!--  <nav>-->
  <!--    <router-link to="/">Home</router-link> |-->
  <!--    <router-link to="/about">About</router-link>-->
  <!--  </nav>-->
  <router-view />
</template>

<style>
:root {
  --black-color: #161516;
  --orange-color: #d58c51;
  --red-color: #ff0b0b;
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
</style>
