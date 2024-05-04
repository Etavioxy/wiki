<template>
  <div class="wiki">
    <nav style="position:fixed;top:0;display:flex">
      <a href="/">
        <img src="/vite.svg" class="logo"/>
      </a>
    </nav>
    <div class="container">
      <div id="markdown">
        <slot></slot>
      </div>
      <div class="info">
        <HeadingsTree ref="headingTree" :headingDOM="headingDOM" :nowAnchor="nowAnchor"></HeadingsTree>
      </div>
    </div>
    <ListMenu v-for="list in lists" :title="list.title" :items="list.items"></ListMenu>
  </div>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV" crossorigin="anonymous">
  <link href="/css/prism-material-oceanic.css" rel="stylesheet" />
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, onMounted } from 'vue';
import HeadingsTree from '@/components/headings-tree.vue';
import ListMenu from '@/components/list-menu.vue';
//import Vote from '@/components/vote.vue';
const headingTree = ref()

const props = defineProps(['id']);

let htmlUpdated = true;

let id = ref(props.id);

interface List{
  title: any;
  items: any;
};

let lists: List[] = reactive([]);

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

  function updateAnchor() {
    while( headings[nowAnchor.value].offsetTop > window.scrollY ){
      nowAnchor.value--;
    }
    while( headings[nowAnchor.value+1].offsetTop <= window.scrollY ){
      nowAnchor.value++;
    }
  }
  window.addEventListener('scroll', updateAnchor);
  updateAnchor();

  // for list
  (async () => {
    let data = await fetch('http://localhost:3000/example-list.json');
    let json = await data.json();
    Object.assign(lists, json)
  })();

})
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
@media (max-width: 900px) {
  .container {
    border-radius: 0;
    margin: 0;
  }
  .info {
    display: none;
  }
}
#markdown {
  width: 100%;
  margin: 50px;
}
:deep(#markdown img) {
  max-width: 100%;
}
.info {
  width: 20%;
  min-width: 300px;
  margin: 0;
  padding: 0 50px 0 0;
  position: sticky;
  top: 0;
  height: max-content;
  max-height: 95vh;
  overflow-y: auto;
}
.info > * {
  margin: 80px 0px;
}
</style>
