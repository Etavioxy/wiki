<template>
  <div class="wiki">
    <div style="position:fixed;top:0;display:flex">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
    </div>
    <div class="container">
      <div id="markdown" v-html="html"></div>
      <div class="info"></div>
    </div>
    <!-- <ListMenu v-for="list in lists" :title="list.title" :items="list.items"></ListMenu> -->
    <div class="info" :class="nowAnchor!=0 ? 'info-fixed':'info-absolute'">
      <p>heading = {{focus}}</p>
      <HeadingsTree :tree-data='headingTree'></HeadingsTree>
    </div>
  </div>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
</template>

<script setup lang="ts">
//import md from '../scripts/md.ts';
import { useRoute } from 'vue-router';
import { ref, reactive, watch, computed, onUpdated } from 'vue';
import HeadingsTree from '../components/headings-tree.vue';
//import ListMenu from '../components/list-menu.vue';
//import Vote from '../components/vote.vue';

let router = useRoute(); // 获取id参数

//let lists = [
//  {
//    title: "table1",
//    items: [["123",3], ["000",4], ["333"]]
//  },
//  {
//    title: "table2",
//    items: [["123"], ["345",3]]
//  },
//];

//let tree = reactive([
//  {
//    name: 'a',
//    children:[{ name: 'aa' }]
//  },
//  { name: 'b' },
//  { name: 'c' }
//]);

//let tree = reactive(
//  {
//    name: 'a',
//    children:[{ name: 'aa' }]
//  }
//);

//let env = {};
let html = ref('');
let htmlUpdated = false;

async function renew(id: string) {
  console.log('renew', id);
  let text = await fetch(`/${id}.md.html`).then(res => res.text());
  htmlUpdated = true;
    console.log('html updated');
  html.value = text; //md.render(text, env);
  console.log('insert html');
}


let id = ref(router.params.id);
if (typeof id.value !== 'string') {
  id.value = id.value.join('/');
}
renew(id.value);
watch(
  // 使用id.value来访问响应式对象的值
  () => id.value,
  (newValue: unknown) => {
    renew(newValue as string)
  }
);
//TODO lazy route

interface OffsetObject {
  offsetTop: number;
  innerText: string;
}
let headings: (OffsetObject|HTMLElement)[] = [
  {offsetTop:0, innerText:'(Top)'},
  {offsetTop:Infinity, innerText:'(Buttom)'}
];
let nowAnchor = ref(0);

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

onUpdated(() => {
  // console.log('Updated');
  if( htmlUpdated ){
    console.log('htmlUpdated');
    htmlUpdated = false;
    let headingDOM = [...document.querySelectorAll('#markdown > h1, h2, h3, h4, h5, h6')] as HTMLElement[];
    Object.assign(headingTree, buildHeadingTree(headingDOM).children);

    headings.splice(1, headings.length-2, ...headingDOM);
  }
});

// 监听页面滚动事件和元素点击事件，比如使用 `window.addEventListener('scroll', callback)`、`element.addEventListener('click', callback)` 等方法。
// 获取页面滚动位置和元素的位置信息，比如使用 `window.scrollY`、`element.offsetTop` 等属性或方法。
window.addEventListener('scroll', () => {
  while( headings[nowAnchor.value].offsetTop > window.scrollY ){
    nowAnchor.value--;
  }
  while( headings[nowAnchor.value+1].offsetTop <= window.scrollY ){
    nowAnchor.value++;
  }
});

let focus = computed(() => headings[nowAnchor.value].innerText);

// my-plugin.js

// 如何操作元素的样式和类名，比如使用 `element.style`、`element.classList` 等属性或方法。
// 如何实现平滑滚动和锚点跳转，比如使用 `window.scrollTo(options)`、`element.scrollIntoView(options)` 等方法。

//import { onBeforeMount, onMounted, onBeforeUpdate, onBeforeUnmount, onUnmounted } from 'vue'
//
//onBeforeMount(() => {
//  console.log('onBeforeMount')
//})
//onMounted(() => {
//  console.log('onMounted')
//})
//onBeforeUpdate(() => {
//  console.log('onBeforeUpdate')
//})
//onBeforeUnmount(() => {
//  console.log('onBeforeUnmount')
//})
//onUnmounted(() => {
//  console.log('onUnmounted')
//})

</script>

<style scoped>
.container {
  margin: 120px 78px 0;
  min-height: calc(100vh - 200px);
  border-radius: 40px 40px 0px 0px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0px 50px 30px 50px rgba(0, 0, 0, 0.5125);
  display: flex;
}
#markdown {
  margin: 50px;
}
:deep(#markdown img) {
  max-width: 100%;
}
.info {
  width: 20%;
  min-width: 300px;
  margin: 0;
  padding: 50px 50px 0 0;
  /* transition: top 0.5s ease 0.1s; */
}
.info-absolute {
  position: absolute;
  right: 78px;
  top: 170px;
}
.info-fixed {
  position: fixed;
  right: 78px;
  top: -50px;
}
.info > * {
  margin: 80px 0px;
}
</style>
