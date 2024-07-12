<script setup lang="ts">
import {
  NInput,
  NInputGroup,
  NForm,
  NFormItem,
  InputInst,
  NButton
} from "naive-ui";
import { computed, ref } from "vue";

import { useLocalStorage } from "@vueuse/core";

const LocalChiiUrl = "localchiiurl";
const LocalChiiPort = "localchiiport";

const localUrl = useLocalStorage(LocalChiiUrl, "127.0.0.1");

const localPort = useLocalStorage(LocalChiiPort, "8080");
const ips = computed(() => localUrl.value.split("."));
const inp1 = computed({
  get() {
    return ips.value[0];
  },
  set(val) {
    localUrl.value = `${val}.${ips.value[1]}.${ips.value[2]}.${ips.value[3]}`;
  }
});

const inp2 = computed({
  get() {
    return ips.value[1];
  },
  set(val) {
    localUrl.value = `${ips.value[0]}.${val}.${ips.value[2]}.${ips.value[3]}`;
  }
});
const inp3 = computed({
  get() {
    return ips.value[2];
  },
  set(val) {
    localUrl.value = `${ips.value[0]}.${ips.value[1]}.${val}.${ips.value[3]}`;
  }
});
const inp4 = computed({
  get() {
    return ips.value[3];
  },
  set(val) {
    localUrl.value = `${ips.value[0]}.${ips.value[1]}.${ips.value[2]}.${val}`;
  }
});

const ref1 = ref<InputInst | null>(null);
const ref2 = ref<InputInst | null>(null);
const ref3 = ref<InputInst | null>(null);
const ref4 = ref<InputInst | null>(null);
const inpChange = (val: number, nextDom: number, preDom: number) => {
  const len = (val + "").length;
  if (len == 3) {
    switch (nextDom) {
      case 1:
        ref2.value?.focus();
        break;
      case 2:
        ref3.value?.focus();
        break;
      case 3:
        ref4.value?.focus();
        break;
    }
  }
  if (len == 0) {
    switch (preDom) {
      case 1:
        ref1.value?.focus();
        break;
      case 2:
        ref2.value?.focus();
        break;
      case 3:
        ref3.value?.focus();
        break;
    }
  }
};

const handleSubmit = () => {
  location.reload();
};
</script>

<template>
  <NForm>
    <NFormItem label="地址">
      <NInputGroup>
        <NInput
          ref="ref1"
          style="width:50px"
          :maxlength="3"
          placeholder="0"
          v-model:value="inp1"
          @update:value="(value) => (inp1 = value)"
          @input="(value: any) => inpChange(value, 1, -1)"
        ></NInput>
        <NInput
          ref="ref2"
          :maxlength="3"
          style="width:50px"
          placeholder="0"
          v-model:value="inp2"
          @update:value="(value) => (inp2 = value)"
          @input="(value: any) => inpChange(value, 2, 1)"
        ></NInput>
        <NInput
          ref="ref3"
          :maxlength="3"
          style="width:50px"
          placeholder="0"
          v-model:value="inp3"
          @update:value="(value) => (inp3 = value)"
          @input="(value: any) => inpChange(value, 3, 2)"
        ></NInput>
        <NInput
          ref="ref4"
          style="width:50px"
          :maxlength="3"
          placeholder="0"
          v-model:value="inp4"
          @input:value="(value: any) => (inp4 = value)"
          @input="(value: any) => inpChange(value, -1, 3)"
        ></NInput>
      </NInputGroup>
    </NFormItem>
    <NFormItem label="端口号">
      <NInput
        style="width:80px"
        :maxlength="4"
        placeholder="8080"
        v-model:value="localPort"
        @update:value="(value) => (localPort = value)"
      ></NInput>
    </NFormItem>
    <NFormItem>
      <NButton type="primary" @click="handleSubmit">确认</NButton>
    </NFormItem>
  </NForm>
</template>
