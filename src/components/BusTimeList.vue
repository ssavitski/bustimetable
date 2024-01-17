<template>
  <div class="time-list">
    <h5 class="px-3 pt-3">Bus Stop: {{stop}}</h5>
    <ItemsList header="Time" :items="stopSchedule" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue"
import { useStore } from "vuex"
import { key } from "@/store"
import ItemsList from "@/components/UI/ItemsList.vue"

const props = defineProps<{
  line: number,
  stop: string,
}>()

const store = useStore(key)

const stopSchedule = computed(() => store.getters.getScheduleByLineAndStop(props.line, props.stop))
</script>

<style scoped lang="scss">
.time-list {
  max-height: 100%;
}

.list-group {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
