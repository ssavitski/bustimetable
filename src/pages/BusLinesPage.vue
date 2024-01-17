<template>
  <div class="d-flex flex-column content-container">
    <div class="card p-3">
      <h5 class="pb-3">Select Bus Line</h5>
      <div class="d-flex gap-2 btn-group">
        <div
          v-for="line in lines"
          :key="`line-btn-${line}`"
          role="group"
        >
          <input
            type="radio"
            class="btn-check"
            name="btn-radio"
            :id="`btn-radio-${line}`"
            @change="changeCurrentLine(line)"
          />
          <label :for="`btn-radio-${line}`" class="btn btn-primary">{{ line }}</label>
        </div>
      </div>
    </div>
    <div class="my-3 gap-3 w-100 d-flex flex-row flex-grow-1 bus-stops-container">
      <div v-if="currentLine < 0" class="card bus-placeholder w-50 d-flex justify-content-center align-items-center border-1">
        Please select the bus line first
      </div>
      <BusLineList
        v-else
        class="w-50 card"
        :line="currentLine"
        @stopSelected="stopSelected"
      />

      <div v-if="!currentStop" class="card bus-placeholder w-50 d-flex justify-content-center align-items-center border-1">
        {{ currentLine >= 0 ? 'Please select the bus stop first' : 'Please select the bus line first' }}
      </div>
      <BusTimeList
        v-else
        class="w-50 card"
        :stop="currentStop"
        :line="currentLine"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useStore } from "vuex"
import { key } from "@/store"
import BusLineList from "@/components/BusLineList.vue"
import BusTimeList from "@/components/BusTimeList.vue"

const store = useStore(key)

const lines = computed(() => store.state.lines)
const stopsLoaded = computed(() => store.state.stopsLoaded)

const currentLine = ref(-1)
const currentStop = ref('')

const changeCurrentLine = (line: number) => {
  currentLine.value = line
};

const stopSelected = (stop: string) => {
  currentStop.value = stop
};

onMounted(() => {
  if(!stopsLoaded.value) {
    store.dispatch('loadStops')
  }
})
</script>

<style scoped>
.bus-placeholder {
  border: 2px dashed #9A9DA4;
}

.content-container {
  height: calc(100% - 162px);
}

.bus-stops-container {
  height: calc(100% - 152px);
}
</style>
