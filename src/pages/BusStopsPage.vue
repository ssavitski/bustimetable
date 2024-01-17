<template>
  <div class="card d-flex flex-column stops-page">
    <InputSearch class="m-3" v-model="search" />
    <ItemsList header="Bus Stops" :items="filteredStops" />
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue"
import { useStore } from "vuex"
import { key } from "@/store"
import InputSearch from "@/components/UI/InputSearch.vue"
import ItemsList from "@/components/UI/ItemsList.vue"

const store = useStore(key)

const search = ref('')

const stopsLoaded = computed(() => store.state.stopsLoaded)
const stops = computed(() => store.state.stops)

const filteredStops = computed(() => {
  if(!search.value) {
    return stops.value
  }
  return stops.value.filter((stop) => stop.toLowerCase().includes(search.value.toLowerCase()))
})

onMounted(() => {
  if(!stopsLoaded.value) {
    store.dispatch('loadStops')
  }
})
</script>

<style scoped>
.stops-page {
  height: calc(100% - 152px);
}
</style>
