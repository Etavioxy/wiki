<template>
  <!-- 根节点 -->
  <ul class="tree-root">
    <!-- 遍历树形数据，渲染每个子节点 -->
    <TreeNode
      v-for="(node, index) in treeData"
      :key="index"
      :node="node"
      v-slot="{ node }"
    >
      <!-- 使用插槽自定义节点内容 -->
      <span class="node-content">
        <!-- 显示节点的名称 -->
        {{ node.name }}
      </span>
    </TreeNode>
  </ul>
</template>

<script lang="ts">
import TreeNode from './headings-tree-node.vue';
export default {
  // 接收一个树形数据作为prop
  props: {
    treeData: {
      type: [Object, Array],
      required: true,
    },
  },
};
</script>

<style>
/* 添加一些基本的样式 */
.tree-root,
.tree-node > ul {
  list-style: none;
  padding-inline-start: 15px;
}

.node-slot {
  cursor: pointer;
}

.iconfont {
  font-family: "iconfont" !important;
}

.icon-plus:before {
  content: "+";
}

.icon-minus:before {
  content: "-";
}
</style>
