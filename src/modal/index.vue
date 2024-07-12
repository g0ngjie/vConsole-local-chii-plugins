<script setup lang="ts">
import { NModal } from "naive-ui";
import { NConfigProvider } from "naive-ui";
import { onMounted, ref } from "vue";
import { useTheme, useThemeOverrides } from "./hooks";
import IpSet from "./ipset.vue";

const showModal = ref(false);

// 主题
const theme = useTheme();
// ui样式覆盖
const themeOverrides = useThemeOverrides();

onMounted(() => {
  showModal.value = true;
});
</script>

<template>
  <NConfigProvider :theme="theme" :theme-overrides="themeOverrides">
    <NModal
      v-model:show="showModal"
      title="IP 设置"
      style="width: 90%;"
      :maskClosable="false"
      size="small"
      preset="card"
      :zIndex="999999"
    >
      <IpSet />
    </NModal>
  </NConfigProvider>
</template>
