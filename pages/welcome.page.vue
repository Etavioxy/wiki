<template>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  <p>
    <a href="/wiki/index">index.md</a>
    <br>
    <a href="/wiki/a">a.md</a>
    <br>
    <a href="/wiki/b">b.md</a>
    <br>
    <a href="/wiki/components">components.md</a>
  </p>
  <ExamplePalette defaultColor="red">说明</ExamplePalette>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
