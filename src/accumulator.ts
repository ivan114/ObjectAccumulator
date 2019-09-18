// tslint:disable:no-any

type AcceptedTargets<T> = T | T[] | Accumulator<T> | Array<Accumulator<T>>

export class Accumulator<T> {
  static from<T>(item?: AcceptedTargets<T>) {
    if (item instanceof Accumulator) {
      return item
    } else if (Array.isArray(item)) {
      const filteredItems: Array<T | Accumulator<T>> = (item as Array<
        T | Accumulator<T>
      >).filter((i) => i)
      if (filteredItems.length === 0) {
        return new Accumulator<T>()
      }
      if (filteredItems[0] instanceof Accumulator) {
        const t = new Accumulator<T>()
        ;(filteredItems as Array<Accumulator<T> | undefined>).forEach(
          (i: Accumulator<T> | undefined) => {
            if (i === undefined) {
              return
            }
            t.add(i.source)
          }
        )

        return t
      }

      return new Accumulator<T>(filteredItems as T[])
    }

    if (item === undefined) {
      return new Accumulator<T>()
    }

    return new Accumulator<T>([item])
  }

  static f<T>(item?: AcceptedTargets<T>) {
    return Accumulator.from(item)
  }

  private source: T[] = []

  constructor(items?: T[]) {
    if (items) {
      this.source = items
    }
  }

  add(item?: AcceptedTargets<T>): this {
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

  a(item?: AcceptedTargets<T>): this {
    return this.a(item)
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

  e(extractor: ((item: T) => any) | string) {
    return this.extract(extractor)
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

  m(nestedMergeKeys: string[] = []): T {
    return this.merge(nestedMergeKeys)
  }

  clone(add?: AcceptedTargets<T>) {
    return Accumulator.from(this.source).add(add)
  }

  c(add?: AcceptedTargets<T>) {
    return this.clone(add)
  }
}
