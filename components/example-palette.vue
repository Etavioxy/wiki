<template>
  <div class="palette">
    <div class="color" v-for="color in colors" :key="color" :style="{ backgroundColor: color }" @click="selectColor(color)"></div>
    <div class="color" :style="{ backgroundColor: currentColor }"></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from "vue";

// Define a prop to accept the default color
const props = defineProps({
  defaultColor: {
    type: String,
    default: "white",
  },
});

// A list of colors to display in the palette
const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

// A ref to store the selected color
const selectedColor = ref("");

// A computed property to return the selected color or the default color
const currentColor = computed(() => selectedColor.value || props.defaultColor);

// A function to set the selected color
const selectColor = (color: string) => {
  selectedColor.value = color;
};
</script>

<style scoped>
.palette {
  display: flex;
  flex-wrap: wrap;
  width: 340px;
  margin: 10px auto;
  border: 2px solid black;
  border-radius: 10px;
}

.color {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.color:hover {
  transform: scale(1.1);
}

.color:active {
  transform: scale(0.9);
}
</style>
