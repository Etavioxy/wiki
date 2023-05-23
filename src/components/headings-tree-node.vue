<template>
  <li class="tree-node">
    <!-- 渲染插槽内容，并添加点击事件 -->
    <div v-if="node.children && node.children.length > 0"
      class="node-slot" @click="toggle()">
      <slot :node="node"></slot>
      <!-- 根据节点是否有子节点，显示不同的图标 -->
      <i class="iconfont"
        :class="open ? 'icon-plus' : 'icon-minus'"
      ></i>
    </div>
    <div v-else>
      <slot :node="node"></slot>
    </div>
    <!-- 如果节点有子节点，并且处于展开状态，递归渲染子节点 -->
    <ul :style="{display: node.children && node.children.length > 0 && open ? 'block':'none'}">
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

<script>
// 定义一个递归的组件，用于渲染树形结构
export default {
  // 接收一个节点对象作为prop
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  // 定义一个响应式的布尔值，用于控制节点是否展开
  data() {
    return {
      open: false,
    };
  },
  // 定义一个方法，用于切换节点的展开状态
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
  created() {
  },
};
</script>
