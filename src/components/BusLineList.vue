<template>
  <div class="line-list">
    <h5 class="pt-3 px-3">Bus Line: {{line}}</h5>
    <ItemsList
      header="Bus Stops"
      :items="lineStops"
      @itemSelected="(item) => $emit('stopSelected', item)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useStore } from "vuex"
import { key } from "@/store"
import ItemsList from "@/components/UI/ItemsList.vue"

const props = defineProps<{
  line: number
}>()

const store = useStore(key)

const lineStops = computed(() => store.getters.getStopsByLine(props.line))
</script>

<style lang="scss" scoped>
.line-list {
  height: 100%;
}
</style>
