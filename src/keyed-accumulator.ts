import { Accumulator } from './accumulator'
import { KeyedType } from './types'

type AcceptTarget<T> = KeyedType<T> | Array<KeyedType<T>> | KeyedAccumulator<T>

export class KeyedAccumulator<T> {
  static from<T>(map?: AcceptTarget<T>) {
    const accumulator = new KeyedAccumulator<T>()
    accumulator.add(map)

    return accumulator
  }

  g = this.get
  private source: Array<KeyedType<T>> = []

  add(map?: AcceptTarget<T>) {
    if (map instanceof KeyedAccumulator) {
      this.source.push(...map.source)
    } else if (Array.isArray(map)) {
      this.source.push(...map)
    } else if (map !== undefined) {
      this.source.push(map)
    }

    return this
  }

  get(key: string) {
    return Accumulator.from(this.source.map((map) => map[key]))
  }

  merge(): KeyedType<T> {
    const keys = new Set<string>()
    this.source
      .map((m) => Object.keys(m))
      .forEach((keyArray) => {
        keyArray.forEach((key) => {
          keys.add(key)
        })
      })

    return Array.from(keys.values()).reduce(
      (acc, key) => ({ ...acc, [key]: this.get(key).merge() }),
      {}
    )
  }

  clone(add?: AcceptTarget<T>) {
    return KeyedAccumulator.from(this.source).add(add)
  }
}
