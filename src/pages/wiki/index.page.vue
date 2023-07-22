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
      <HeadingsTree ref="headingTree" :headingDOM="headingDOM"></HeadingsTree>
    </div>
  </div>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import HeadingsTree from '@/components/headings-tree.vue';
//import ListMenu from '@/components/list-menu.vue';
//import Vote from '@/components/vote.vue';
const headingTree = ref()

const props = defineProps(['id', 'html']);

import { usePageContext } from '@/utils/usePageContext'

let htmlUpdated = true;

let id = ref(props.id);

///async function renew(id: string) {
///  console.log('renew', id);
///  let text = await fetch(`/${id}.md.html`).then(res => res.text());
///  htmlUpdated = true;
///  html.value = text; //md.render(text, env);
///  console.log('insert html');
///}

///watch(
///  // 使用id.value来访问响应式对象的值
///  () => id.value,
///  (newValue: unknown) => {
///    renew(newValue as string)
///  }
///);
/////TODO lazy route

interface OffsetObject {
  offsetTop: number;
  innerText: string;
}
let headings: (OffsetObject|HTMLElement)[] = [
  {offsetTop:0, innerText:'(Top)'},
  {offsetTop:Infinity, innerText:'(Buttom)'}
];
let nowAnchor = ref(0);
let headingDOM: HTMLElement[] = reactive([]);

let focus = computed(() => headings[nowAnchor.value].innerText);

onMounted(() => {
  console.log('onMounted')
  if( htmlUpdated ){
    console.log('htmlUpdated');
    htmlUpdated = false;
    Object.assign(headingDOM, Array.from(document.querySelectorAll('#markdown  h1, h2, h3, h4, h5, h6')) as HTMLElement[]);
    headingTree.value.update()

    headings.splice(1, headings.length-2, ...headingDOM);
  }
  window.addEventListener('scroll', () => {
    while( headings[nowAnchor.value].offsetTop > window.scrollY ){
      nowAnchor.value--;
    }
    while( headings[nowAnchor.value+1].offsetTop <= window.scrollY ){
      nowAnchor.value++;
    }
  });
})

// 如何操作元素的样式和类名，比如使用 `element.style`、`element.classList` 等属性或方法。
// 如何实现平滑滚动和锚点跳转，比如使用 `window.scrollTo(options)`、`element.scrollIntoView(options)` 等方法。

</script>

<style scoped>
.container {
  margin: 120px 78px 0;
  min-height: calc(100vh - 200px);
  border-radius: 40px 40px 0px 0px;
  background: rgba(255, 255, 255, 0.10);
  /*box-shadow: 0px 50px 30px 50px rgba(0, 0, 0, 0.5125);*/
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
