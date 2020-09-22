export type Stats = {
  mean: number
  took: number
  total: number
  count: number
  min: number
  max: number
}

export type Timer = {
  start(id?: string): Timer
  stop(id?: string): number
  reset(): void
  total(): number
  took(): number
  mean(): number
  count(): number
  min(): number
  max(): number
  stats(): Stats
  info(precision?: number): string
  log(): void
}

export default function<T extends string | string[]>(
  tags?: T,
): T extends string[] ? Timer[] : Timer
