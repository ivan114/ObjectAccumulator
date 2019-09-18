// tslint:disable:no-magic-numbers

import { Accumulator } from '../accumulator'
import { KeyedAccumulator } from '../keyed-accumulator'
import { KeyedType } from '../types'

it('KeyedAccumulator: Single Map, Single Item', () => {
  const a = KeyedAccumulator.from({ a: { x: 1 } })
  expect(a.get('a').extract((item) => item.x)).toEqual(1)
  expect(a.g('a').extract((item) => item.x)).toEqual(1)
})

it('KeyedAccumulator: Multiple Map, Single Item', () => {
  const a = KeyedAccumulator.from([{ a: { x: 1 } }, { a: { x: 2 } }])
  expect(a.get('a').extract((item) => item.x)).toEqual(2)
})

it('KeyedAccumulator: Multiple Map, No Override', () => {
  const a = KeyedAccumulator.from([{ a: { x: 3 } }, { b: { x: 4 } }])
  expect(a.get('a').extract((item) => item.x)).toEqual(3)
  expect(a.get('b').extract((item) => item.x)).toEqual(4)
})

it('KeyedAccumulator: Multiple Map, No Such Item', () => {
  const a = KeyedAccumulator.from([{ a: { x: 3 } }, { b: { x: 2 } }])
  expect(a.get('c').extract((item) => item.x)).toEqual(undefined)
})

it('KeyedAccumulator: Merge', () => {
  const a = KeyedAccumulator.from([
    { a: { x: 3, y: 1 } },
    { b: { x: 2, y: 1 } },
    { a: { y: 4 }, b: { y: 4 } },
  ])
  expect(a.merge()).toEqual({ a: { x: 3, y: 4 }, b: { x: 2, y: 4 } })
})

it('KeyedAccumulator: Clone', () => {
  const a = KeyedAccumulator.from([
    { a: { x: 3, y: 1 } },
    { b: { x: 2, y: 1 } },
    { a: { y: 4 }, b: { y: 4 } },
  ])
  const b = a.clone({ a: { y: 10 }, b: { y: 10 } })
  expect(b.merge()).toEqual({ a: { x: 3, y: 10 }, b: { x: 2, y: 10 } })
})

it('KeyedAccumulator: Nested Accumulator', () => {
  const nestedAccumulator: Array<
    KeyedType<
      Accumulator<{
        x?: number
        y?: number
      }>
    >
  > = [
    { a: Accumulator.from({ x: 3, y: 1 }) },
    { b: Accumulator.from({ x: 2, y: 1 }) },
    { a: Accumulator.from({ y: 4 }), b: Accumulator.from({ y: 4 }) },
  ]
  const a = KeyedAccumulator.from(nestedAccumulator)
  expect(a.get('b').m()).toEqual({ x: 2, y: 4 })
  expect(a.merge()).toEqual({ a: { x: 3, y: 4 }, b: { x: 2, y: 4 } })
  const b = a.clone({
    a: Accumulator.from({ y: 10 }),
    b: Accumulator.from({ y: 10 }),
  })
  expect(b.merge()).toEqual({ a: { x: 3, y: 10 }, b: { x: 2, y: 10 } })
})
