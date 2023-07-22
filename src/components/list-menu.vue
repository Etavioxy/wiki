<template>
  <div class="mw-collapsible">
    <span class="mw-collapsible-toggle" @click="toggle">{{title}}</span>
    <ul class="mw-collapsible-content" v-if="open">
      <li v-for="item in items" :key="item[0]">
        <span :style="{lineHeight: (item[1]===undefined?1:item[1])*16 + 'px'}">○</span>
        <a :href="'/wiki/'+item[0]">{{item[0]}}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { PropType } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array as PropType<Array<[string, number?]>>,
    required: true
  }
});

let open = ref(false);

function toggle(){
  open.value = !open.value;
}
</script>

<style scoped>
div {
  border: 1px solid black;
  padding: 10px;
}
span {
  font-weight: bold;
  cursor: pointer;
}
ul {
  display: flex;
  list-style-type: none;
}
</style>
