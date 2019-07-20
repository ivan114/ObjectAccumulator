// tslint:disable:no-any

type AcceptedTargets<T> = T | T[] | Accumulator<T> | Array<Accumulator<T>>

export class Accumulator<T> {
  static from<T>(item?: AcceptedTargets<T>) {
    if (item instanceof Accumulator) {
      return item
    }
    const accumulator = new Accumulator<T>()
    accumulator.add(item)

    return accumulator
  }

  e = this.extract

  private source: T[] = []

  add(item?: AcceptedTargets<T>) {
    if (item instanceof Accumulator) {
      this.source.push(...item.source)
    } else if (Array.isArray(item)) {
      ;(item as Array<Accumulator<T> | T>).forEach((i: Accumulator<T> | T) => {
        if (i instanceof Accumulator) {
          this.source.push(...i.source)
        } else {
          this.source.push(i)
        }
      })
    } else if (item !== undefined) {
      this.source.push(item)
    }

    return this
  }

  extract(extractor: ((item: T) => any) | string) {
    // use while loop to search backward is faster;
    let searchingIndex = this.source.length - 1
    while (searchingIndex !== -1) {
      const item = this.source[searchingIndex]
      if (item !== undefined) {
        const result =
          typeof extractor === 'string'
            ? (item as any)[extractor]
            : extractor(item)
        if (result !== undefined) {
          return result
        }
      }
      searchingIndex--
    }

    return undefined
  }

  merge(nestedMergeKeys: string[] = []): T {
    const nestedMerge = nestedMergeKeys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: Object.assign(
          {},
          ...this.source.filter((i) => i).map((i) => (i as any)[key])
        ),
      }),
      {}
    )

    return Object.assign({}, ...this.source, nestedMerge)
  }

  clone(add?: AcceptedTargets<T>) {
    return Accumulator.from(this.source).add(add)
  }
}
