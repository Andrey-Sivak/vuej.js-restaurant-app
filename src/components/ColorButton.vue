<template>
  <button class="button" :class="color" type="submit">{{ text }}</button>
</template>

<script>
export default {
  name: "ColorButton",
  props: {
    color: {
      type: String,
      required: true,
      validator: function (value) {
        return ["black", "orange"].includes(value);
      },
      default: "orange",
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.button {
  display: block;
  width: 200px;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  padding: 12px 0;
  font-size: 14px;
  outline: none;
  transition: all ease 0.3s;
  border: 1px solid var(--orange-color);
}

.button.orange {
  background-color: var(--orange-color);
  color: var(--black-color);
}

.button.orange:hover {
  background-color: var(--black-color);
  color: var(--orange-color);
}

.button.black {
  background-color: var(--black-color);
  color: var(--orange-color);
}

.button.black:hover {
  background-color: var(--orange-color);
  color: var(--black-color);
}
</style>
