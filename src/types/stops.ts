export interface ISchedule {
  "line": number,
  "stop": string,
  "order": number,
  "time": string,
}

export type LineSchedule = {
  stops: string[],
  stopsSchedule: { [index: string]: string[] }
}
