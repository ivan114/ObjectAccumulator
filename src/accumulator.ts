// tslint:disable:no-any

type AcceptedTargets<T> = T | T[] | Accumulator<T> | Array<Accumulator<T>>

interface ExtractionConfig {
  shallow?: boolean
  merge?: boolean
}

function isNonNullObject(value: any) {
  return !!value && typeof value === 'object'
}

/**
 * Accumulator class for doing all merging action
 *
 * @export
 * @class Accumulator
 * @template T
 */
export class Accumulator<T> {
  /**
   * Static builder for creating instance, this method accept various type of item for making new Accumulator.
   * Including single item, array of items, single Accumulator, array of Accumulators.
   * This static method will process these kinds of input into Accumulator
   *
   * @static
   * @template T
   * @param {AcceptedTargets<T>} [item]
   * @returns
   * @memberof Accumulator
   */
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

  /**
   * Alias of Accumulator::from
   *
   * @ignore
   * @static
   * @template T
   * @param {AcceptedTargets<T>} [item]
   * @returns
   * @memberof Accumulator
   */
  static f<T>(item?: AcceptedTargets<T>) {
    return Accumulator.from(item)
  }

  /**
   * Array that stores the objects that needed to be merge/extracted
   *
   * @private
   * @type {T[]}
   * @memberof Accumulator
   */
  private source: T[] = []

  /**
   *
   *
   * @private
   * @memberof Accumulator
   */
  private keySet = new Set<string>()

  /**
   * Creates an instance of Accumulator.
   * @param {T[]} [items]
   * @memberof Accumulator
   */
  constructor(items?: T[]) {
    if (items) {
      this.source = items
      this.registerStart()
    }
  }

  /**
   * add item(s) after instance created
   *
   * @param {AcceptedTargets<T>} [item]
   * @returns {this}
   * @memberof Accumulator
   */
  add(item?: AcceptedTargets<T>): this {
    if (item instanceof Accumulator) {
      this.source.concat(item.source)
    } else if (Array.isArray(item)) {
      ;(item as Array<Accumulator<T> | T>).forEach((i: Accumulator<T> | T) => {
        if (i instanceof Accumulator) {
          this.source.concat(i.source)
        } else {
          this.source.push(i)
        }
      })
    } else if (item !== undefined) {
      this.source.push(item)
    }

    this.registerStart()

    return this
  }

  /**
   *  Alias of Accumulator::add
   *
   * @ignore
   * @param {AcceptedTargets<T>} [item]
   * @returns {this}
   * @memberof Accumulator
   */
  a(item?: AcceptedTargets<T>): this {
    return this.a(item)
  }

  /**
   * Extract single value from Accumulator,
   * can use string key or extractor callback
   *
   * @param {(((item: T) => any) | string)} extractor
   * @param {ExtractionConfig} [config={}]
   * @returns
   * @memberof Accumulator
   */
  extract(
    extractor: ((item: T) => any) | string,
    config: ExtractionConfig = {}
  ) {
    const { shallow } = config
    // use while loop to search backward is faster;
    let searchingIndex = this.source.length - 1
    const ex = (i: T) =>
      typeof extractor === 'string' ? (i as any)[extractor] : extractor(i)
    while (searchingIndex !== -1) {
      const item = this.source[searchingIndex]
      if (item !== undefined) {
        const extractedValue = ex(item)
        // If it is object, use nested Accumulator approach
        if (!shallow && isNonNullObject(extractedValue)) {
          const acc = Accumulator.from(
            this.source.map(ex).filter(isNonNullObject)
          )
          if (config.merge) {
            return acc.merge()
          } else {
            return acc
          }
        }
        if (extractedValue !== undefined) {
          return extractedValue
        }
      }
      searchingIndex--
    }

    return undefined
  }

  /**
   * Alias of Accumulator::extract
   *
   * @ignore
   * @param {(((item: T) => any) | string)} extractor
   * @param {ExtractionConfig} [config={}]
   * @returns
   * @memberof Accumulator
   */
  e(extractor: ((item: T) => any) | string, config: ExtractionConfig = {}) {
    return this.extract(extractor, config)
  }

  /**
   * Merge whole object
   *
   * @param {ExtractionConfig} [config={}]
   * @returns {T}
   * @memberof Accumulator
   */
  merge(config: ExtractionConfig = { merge: true }): T {
    const result = {}
    for (const k of this.keySet) {
      ;(result as any)[k] = this.e(k, config)
    }

    return result as T
  }

  /**
   * Alias of Accumulator::merge
   *
   * @ignore
   * @returns {T}
   * @memberof Accumulator
   */
  m(): T {
    return this.merge()
  }

  /**
   * Clone a new instance of Accumulator with same items inside,
   * optional parameter item can be passed into it for adding into the new Accumulator at the same time
   *
   * @param {AcceptedTargets<T>} [add]
   * @returns
   * @memberof Accumulator
   */
  clone(add?: AcceptedTargets<T>) {
    return Accumulator.from(this.source).add(add)
  }

  /**
   * Alias of Accumulator::clone
   *
   * @ignore
   * @param {AcceptedTargets<T>} [add]
   * @returns
   * @memberof Accumulator
   */
  c(add?: AcceptedTargets<T>) {
    return this.clone(add)
  }

  /**
   * Manually register keys when the index of object may not appear at the beginning of creating Accumulator,
   * by using this function yan can let Accumulator knows there are additional keys when merging
   *
   * @param {string[]} keys
   * @memberof Accumulator
   */
  registerKeys(keys: string[]) {
    keys.forEach((k) => this.keySet.add(k))
  }

  private registerStart() {
    if (this.keySet.size !== 0) {
      return
    }
    if (this.source && this.source.length !== 0) {
      this.registerKeys(Object.keys(this.source[0]))
    }
  }
}
