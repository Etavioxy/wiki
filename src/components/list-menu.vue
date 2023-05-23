<template>
  <div class="mw-collapsible">
    <span class="mw-collapsible-toggle" @click="toggle">{{title}}</span>
    <ul class="mw-collapsible-content" v-if="open">
      <li v-for="item in items" :key="item">
        <span :style="{lineHeight: (item[1]===undefined?1:item[1])*16 + 'px'}">○</span>
        <a :href="'/wiki/'+item[0]">{{item[0]}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  // 导出 vue 组件
  export default {
    // 定义组件的属性，包括 title 和 items
    props: {
      title: {
        type: String,
        required: true
      },
      items: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        open: false
      }
    },
    methods: {
      toggle(){
        this.open = !this.open;
      }
    },
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
