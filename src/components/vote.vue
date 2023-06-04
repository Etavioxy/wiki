<template>
  <div class="poll">
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="(option, index) in options" :key="index">
        <label>
          <input type="radio" name="poll" v-model="selected" :value="option.value" />
          {{ option.label }}
        </label>
      </li>
    </ul>
    <button @click="vote">投票</button>
    <div v-if="showResult">
      <h2>投票结果</h2>
      <ul>
        <li v-for="(option, index) in options" :key="index">
          {{ option.label }}: {{ option.count }} 票
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRefs } from "vue";
import axios from "axios";

// 定义props类型
interface Props {
  title: string
}

const props = defineProps<Props>()

const { title } = toRefs(props);

// data
const selected = ref(null);
const showResult = ref(false);

// computed
const options = computed(() => [
  { label: "A", value: "a", count: 0 },
  { label: "B", value: "b", count: 0 },
  { label: "C", value: "c", count: 0 },
]);

// methods
const vote = async () => {
  if (!selected.value) {
    alert("请选择一个选项");
    return;
  }
  // send request to submit vote
//  await axios.post("/api/vote", { option: selected.value });
//  // get vote result
  const res = await axios.get("/api/result");
  //const res = {data:{ a: 1145, b: 1419, c: 810}};
  // update options with result
  options.value.forEach((option) => {
    option.count = res.data[option.value] || 0;
  });
  // show result
  showResult.value = true;
};
</script>

<style scoped>
.poll {
  width: 300px;
  margin: auto;
}

.poll h1 {
  text-align: center;
}

.poll ul {
  list-style: none;
}

.poll button {
  display: block;
  width: 100%;
}

.poll h2 {
  text-align: center;
}
</style>
