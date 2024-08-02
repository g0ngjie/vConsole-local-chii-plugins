<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const showModal = ref(false);

const cacheUrl = "CHII_CACHE_URL";

const domain = computed({
  get() {
    return localStorage.getItem(cacheUrl) || "https://";
  },
  set(val) {
    localStorage.setItem(cacheUrl, val);
  }
});

onMounted(() => {
  showModal.value = true;
});

const handleSubmit = () => location.reload();
</script>

<template>
  <div
    style="position:absolute;z-index:999999;top:100px;left:10px;width:400px;height:300px;background:gray;display:flex;justify-content:center;align-items:center;"
  >
    <input
      placeholder="添加chii代理地址"
      style="width:200px;height:25px;padding-left:10px;"
      type="text"
      v-model="domain"
    />
    <button @click="handleSubmit">确认</button>
  </div>
</template>
