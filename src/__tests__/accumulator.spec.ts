// tslint:disable:no-magic-numbers

import { Accumulator } from '../accumulator'

it('Accumulator: Single Item', () => {
  const a = Accumulator.from({ a: 1 })
  expect(a.extract((item) => item.a)).toEqual(1)
})

it('Accumulator: Item Override', () => {
  const a = Accumulator.from([{ a: 1 }, { a: 2 }])
  expect(a.extract((item) => item.a)).toEqual(2)
  expect(a.e((item) => item.a)).toEqual(2)
})

it('Accumulator: Item Override Nested', () => {
  const a = Accumulator.from<{ a: number }>([
    Accumulator.from({ a: 1 }),
    Accumulator.from({ a: 2 }),
  ])
  expect(a.extract((item) => item.a)).toEqual(2)
  expect(a.e((item) => item.a)).toEqual(2)
})

it('Accumulator: Item Fill', () => {
  const a = Accumulator.from([{}, { a: 3 }])
  expect(a.extract((item) => item.a)).toEqual(3)
})

it('Accumulator: Item Ignore Undefined', () => {
  const a = Accumulator.from([{ a: 4 }, { a: undefined }])
  expect(a.extract((item) => item.a)).toEqual(4)
})

it('Accumulator: Mulitple Override', () => {
  const a = Accumulator.from([{ a: 3 }, { a: 4 }, { a: 5 }])
  expect(a.extract((item) => item.a)).toEqual(5)
})

it('Accumulator: Late Multiple Override', () => {
  const a = Accumulator.from({ a: 3 })
  a.add({ a: 4 })
  a.add({ a: 5 })
  expect(a.extract((item) => item.a)).toEqual(5)
})

it('Accumulator: Undefined Item', () => {
  const a = Accumulator.from<{ a: number } | undefined>([
    { a: 3 },
    undefined,
    { a: 5 },
  ])
  expect(a.extract((item) => item!.a)).toEqual(5)
})

it('Accumulator: Mixed Override', () => {
  const a = Accumulator.from([{ a: 1, b: 4, c: 6 }, { a: 2, b: 5 }, { a: 3 }])
  expect(a.extract((item) => item.a)).toEqual(3)
  expect(a.extract((item) => item.b)).toEqual(5)
  expect(a.extract((item) => item.c)).toEqual(6)
})

it('Accumulator: String Extractor', () => {
  const a = Accumulator.from([{ a: 1, b: 4, c: 6 }, { a: 2, b: 5 }, { a: 3 }])
  expect(a.extract('a')).toEqual(3)
  expect(a.extract('b')).toEqual(5)
  expect(a.extract('c')).toEqual(6)
})

it('Accumulator: Merge', () => {
  const a = Accumulator.from([{ a: 1, b: 4, c: 6 }, { a: 2, b: 5 }, { a: 3 }])
  expect(a.merge()).toEqual({ a: 3, b: 5, c: 6 })
})

it('Accumulator: Clone', () => {
  const a = Accumulator.from([{ a: 1, b: 4, c: 6 }, { a: 2, b: 5 }, { a: 3 }])
  const b = a.clone({ a: 10 })
  expect(b.merge()).toEqual({ a: 10, b: 5, c: 6 })
})

it('Accumulator: Nested', () => {
  const a = Accumulator.from(Accumulator.from({ a: 1 }))
  expect(a.e('a')).toEqual(1)
})

it('Accumulator: Deep merge/extract', () => {
  const obj1 = {
    a: {
      x: 1,
      y: 2,
      z: 3,
    },
  }
  const obj2 = {
    a: {
      y: 3,
      z: 4,
    },
  }
  const a = Accumulator.from([obj1, obj2])
  expect(a.extract('a').extract('x')).toEqual(1)
  expect(a.merge()).toMatchObject({
    a: {
      x: 1,
      y: 3,
      z: 4,
    },
  })
})

it('Accumulator: Assisted merge', () => {
  const o1 = {
    a: 1,
    b: 2,
  }
  const o2 = {
    a: 10,
    b: 20,
    c: 30,
  }
  const a = Accumulator.from([o1, o2])
  expect(a.merge(['a', 'b', 'c'])).toMatchObject({
    a: 10,
    b: 20,
    c: 30,
  })
  a.registerKeys(['a', 'b', 'c'])
  expect(a.merge()).toMatchObject({
    a: 10,
    b: 20,
    c: 30,
  })
})
