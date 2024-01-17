import { createStore, Store } from 'vuex'
import { InjectionKey } from "vue"
import axios from "axios"
import { ISchedule, LineSchedule } from "@/types/stops"

export interface State {
  schedule: { [index: number]: LineSchedule },
  stops: string[],
  lines: number[],
  stopsLoaded: boolean,
}

export const key: InjectionKey<Store<State>> = Symbol()

const sortTime = (a: string, b: string) => {
  const timeA = a.split(':')
  const timeB = b.split(':')

  if (+timeA[0] < +timeB[0]) {
    return -1
  }

  if (+timeA[0] > +timeB[0]) {
    return 1
  }

  if (+timeA[0] === +timeB[0]) {

    if (+timeA[1] < +timeB[1]) {
      return -1
    }

    if (+timeA[1] > +timeB[1]) {
      return 1
    }

  }

  return 0
}

export default createStore<State>({
  state: {
    schedule: {},
    stops: [],
    lines: [],
    stopsLoaded: false,
  },
  getters: {
    getStopsByLine(state) {
      return (line: number) => state.schedule[line].stops
    },
    getScheduleByLineAndStop(state) {
      return (line: number, stop: string) => state.schedule[line].stopsSchedule[stop]
    },
  },
  mutations: {
    setStops(state, value) {
      state.stops = value
    },
    setLines(state, value) {
      state.lines = value
    },
    setSchedule(state, value) {
      state.schedule = value
    },
    setStopsLoaded(state, value) {
      state.stopsLoaded = value
    }
  },
  actions: {
    async loadStops(store) {
      try {
        const response = await axios.get('http://localhost:3000/stops')

        store.dispatch('parseResponse', response.data)
      } catch (e) {
        console.error(e)
      }
    },

    parseResponse(store, data: ISchedule[]) {
      const lines = [... new Set(data.map((stop) => stop.line))].sort()
      const stops = [...new Set(data.map((stop) => stop.stop))].sort().reverse()
      const schedule: { [index: number]: LineSchedule } = {}

      lines.forEach((line) => {
        const lineStops = data.filter((stop) => stop.line === line)
        const stopsSchedule: { [index: string]: string[] } = {}

        lineStops.forEach((stop) => {
          if(!Array.isArray(stopsSchedule[stop.stop])) {
            stopsSchedule[stop.stop] = []
          }

          stopsSchedule[stop.stop].push(stop.time)
        });

        Object.keys(stopsSchedule)
          .forEach((schedule) => stopsSchedule[schedule].sort(sortTime))

        const sortedStops = lineStops
          .sort((a,b) => a.order - b.order)
          .map((stop) => stop.stop)

        schedule[line] = {
          stops: [...new Set(sortedStops)],
          stopsSchedule,
        }
      });

      store.commit('setLines', lines)
      store.commit('setStops', stops)
      store.commit('setSchedule', schedule)
      store.commit('setStopsLoaded', true)
    }
  },
})
