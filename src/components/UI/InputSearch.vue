<template>
  <div class="search">
    <input
      class="search-input"
      type="text"
      placeholder="Search..."
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>

<style scoped lang="scss">
.search {
  position: relative;

  &-input {
    height: 40px;
    line-height: 40px;
    padding: 12px 16px;
    border-radius: 4px;
    border: 1px solid #E2E4EA;
    background: url("~/public/icons/search-icon-gray.svg") no-repeat center right 16px;
    background-size: 16px 16px;

    &:focus-visible {
      border-color: #1952E1;
      outline-color: #1952E1;
      background-image: url("~/public/icons/search-icon-blue.svg");
    }
  }
}
</style>
