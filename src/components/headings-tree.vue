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

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import TreeNode from './headings-tree-node.vue';

class HeadingNode {
  // 声明属性的类型
  level: number;
  name: string;
  children: HeadingNode[];
  parent?: HeadingNode;
  constructor(level: number, text: string) {
    this.level = level;
    this.name = text;
    this.children = [];
  }
}
function buildHeadingTree(headingsList: HTMLElement[]) {
  const root = new HeadingNode(0, "Root");
  let currentParent = root;
  headingsList.forEach((heading) => {
    // 从'h1'、'h2'等标签名中提取等级数字
    const level = parseInt(heading.tagName.slice(1));
    const text = heading.textContent || '(empty)';
    const newNode = new HeadingNode(level, text);
    // 向上查找正确的父节点
    while (level <= currentParent.level) {
      currentParent = currentParent.parent!;
    }
    newNode.parent = currentParent;
    currentParent.children.push(newNode);
    currentParent = newNode;
  });
  return root;
}

let headingTree = reactive({});

const props = defineProps({
  headingDOM: {
    type: [Object, Array],
    required: true,
  },
});

let treeData = reactive([]);

function update(){
  Object.assign(treeData, buildHeadingTree(props.headingDOM as HTMLElement[]).children);
}
function position(){
  console.log('position');
}

defineExpose({
  update
})

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
