<template>
  <li class="tree-node">
    <!-- 渲染插槽内容，并添加点击事件 -->
    <div v-if="node.children && node.children.length > 0"
      class="node-slot" @click="node.toggle()">
      <slot :node="node"></slot>
      <!-- 根据节点是否有子节点，显示不同的图标 -->
      <i class="iconfont"
        :class="node.open ? 'icon-plus' : 'icon-minus'"
      ></i>
    </div>
    <div v-else>
      <slot :node="node"></slot>
    </div>
    <!-- 如果节点有子节点，并且处于展开状态，递归渲染子节点 -->
    <ul :style="{display: node.children && node.children.length > 0 && (node.open || node.active) ? 'block':'none'}">
      <TreeNode
        v-for="(child, index) in node.children"
        :key="index"
        :node="child"
        v-slot="{ node }"
      >
        <slot :node="node"></slot>
      </TreeNode>
    </ul>
  </li>
</template>

<script setup lang="ts">
const props = defineProps({
  node: {
    type: Object,
    required: true,
  }
});
</script>
