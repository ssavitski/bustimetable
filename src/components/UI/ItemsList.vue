<template>
  <div class="overflow-auto">
    <h6 class="p-3 m-0 list-header">{{ header }}</h6>
    <ul class="list-group">
      <li
        class="list-group-item py-2 btn"
        v-for="(item, index) in items"
        :key="`item-${item}-${index}`"
        @click="$emit('itemSelected', item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ items: string[], header: string }>()
</script>

<style scoped lang="scss">
.list {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  &-header {
    border-bottom: 1px solid #E2E4EA;
  }
}

.list-group {
  border: none;

  &-item {
    text-align: left;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #E2E4EA;

    &:hover {
      background-color: #F3F4F9;
    }
  }
}
</style>
