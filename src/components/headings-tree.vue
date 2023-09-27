<template>
  <!-- 根节点 -->
  <ul class="tree-root">
    <!-- 遍历树形数据，渲染每个子节点 -->
    <TreeNode
      v-for="(node, index) in treeRootChildren"
      :key="index"
      :node="node"
      v-slot="{ node }"
    >
      <!-- 使用插槽自定义节点内容 -->
      <span :class="{'node-active': node.active}" class="node-content">
        {{ node.name }}
      </span>
    </TreeNode>
  </ul>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, onMounted } from 'vue';
import TreeNode from './headings-tree-node.vue';

class HeadingNode {
  // 声明属性的类型
  level: number;
  name: string;
  active: bool;
  open: bool;
  children: HeadingNode[];
  parent?: HeadingNode;
  constructor(level: number, text: string) {
    this.level = level;
    this.name = text;
    this.active = false;
    this.open = false;
    this.children = [];
  }
  toggle() {
    this.open = !this.open;
  }
}

let treeRootChildren = reactive([]);
let headingsNodeList = [];

function buildHeadingTree(headingsList: HTMLElement[]) {
  const root = new HeadingNode(0, "Root");
  headingsNodeList = [];
  let currentParent = root;
  headingsList.forEach((heading, index) => {
    // 从'h1'、'h2'等标签名中提取等级数字
    const level = parseInt(heading.tagName.slice(1));
    const text = heading.textContent || '(empty)';
    const newNode = new HeadingNode(level, text);
    headingsNodeList.push(newNode);
    // 向上查找正确的父节点
    while (level <= currentParent.level) {
      currentParent = currentParent.parent!;
    }
    newNode.parent = currentParent;
    currentParent.children.push(newNode);
    currentParent = newNode;
  });
  Object.assign(treeRootChildren, root.children);
}

const props = defineProps({
  headingDOM: {
    type: [Object, Array],
    required: true,
  },
  nowAnchor: {
    type: Number,
    required: true,
  }
});

function update(){
  buildHeadingTree(props.headingDOM as HTMLElement[]);
}

watch(() => props.nowAnchor, (newValue, oldValue) => {
  console.log(oldValue, newValue);
  if (headingsNodeList[oldValue - 1]) {
    headingsNodeList[oldValue - 1].active = false;
  }
  if (headingsNodeList[newValue - 1]) {
    headingsNodeList[newValue - 1].active = true;
  }
});

defineExpose({
  update
})

</script>

<style>
.tree-root,
.tree-node > ul {
  list-style: none;
  padding-inline-start: 15px;
}

.node-slot {
  cursor: pointer;
}

.node-content {
  border-left: 2px solid transparent;
  transition: border-left-color 0.5s;
}
.node-active {
  border-left: 2px solid red;
  transition: border-left-color 0.5s;
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
