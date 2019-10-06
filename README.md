<p align="center">
  <img src="https://p165.p3.n0.cdn.getcloudapp.com/items/8LudRqj6/banner.png?v=7c2ee36a80723a1744085cf1fcc0b4ce" width="850" alt="object-accumulator-banner">
</p>

# Object Accumulator

> A Javascript/Typescript object merging tool, focus on performance and easy-to-use. Good alternative to _deepmerge_ in most case.

<p align="center">
  <a href="https://ivan114.github.io/ObjectAccumulator/"><img src="https://p165.p3.n0.cdn.getcloudapp.com/items/geuY8AA0/ObjectAccumulatorSiteButton.png?v=dbbf12374cde95fce2f7531c1b143f06" width="250" alt="object-accumulator-site-link-image"></a>
  <a href="https://ivan114.github.io/ObjectAccumulator/docs"><img src="https://p165.p3.n0.cdn.getcloudapp.com/items/7Kux1req/DocsButton.png?v=a238cb797bb3ae7a85460bb13f4a851d" width="154" alt="object-accumulator-docs-link-image"></a>
</p>

[![Build Status](https://travis-ci.org/ivan114/ObjectAccumulator.svg?branch=master)](https://travis-ci.org/ivan114/ObjectAccumulator)
[![NPM version](https://img.shields.io/npm/v/object-accumulator.svg)](https://www.npmjs.com/package/object-accumulator)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/object-accumulator)
![Downloads](https://img.shields.io/npm/dm/object-accumulator.svg)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

---

## ✨ Features

- Merge objects with high volume and good performance concern.
- Support high volume (Object.assign merging 100000 items on Safari throw exception :/ )
- High Performance (Lazy picking value instead of really merging all objects)
- Low Memory Usage (Alway reuse same instance data structure instead of creating new every time)
- Lazy Process and Interactive (Perform merge only when you need the result, not doing unnecessary processing, Accumulator can be manipulated before/after merge)
- Lightweight and without external dependencies (~1KB gzipped)

## 🔧 Installation

```sh
yarn add object-accumulator
```

## 🎬 Getting started

Package provide an easy-to-use **Accumulator** object to perform merge.

First, for this example, a list of user objects that needed to be merge is here, for real world usage the amount of object may be a lot more.

<details>
<summary>
Example User Data:
</summary>

```json
[
  {
    "firstName": "Bobbie",
    "lastName": "Klocko",
    "username": "Bobbie25",
    "email": "Bobbie_Klocko93@hotmail.com",
    "phoneNo": "223-401-4005 x8835",
    "country": "Berkshire"
  },
  {
    "firstName": "Electa",
    "username": "Electa.Bechtelar",
    "phoneNo": "1-090-965-9494 x6833",
    "country": "Bedfordshire"
  },
  {
    "username": "Nicholaus14"
  },
  {
    "firstName": "Reynold",
    "username": "Reynold.Crooks67",
    "phoneNo": "(069) 975-2864"
  },
  {
    "firstName": "Clementine",
    "username": "Clementine_Aufderhar",
    "email": "Clementine_Aufderhar83@hotmail.com"
  },
  {
    "firstName": "Patience",
    "email": "Patience.Cremin@yahoo.com"
  }
]
```

</details>

Usage: [![Try it](https://img.shields.io/badge/style-Try%20it-blue?label=Repi.it&logo=data:image/ico;base64,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I/+Ylpb/4+Hh/+nn5//q6On/v7y4/2dgS/9tZlT/dm9g/19XP/+DfHD+wLy4/5iTif9JPQCCyMTBvbu3sv9jWkT+cGlY/m1mVf9nX0r/vLm1/8zJx/+7t7L/6Obm/+3r6//OzMz/YWBf/z08Ov9dXFz/U1JR/1NSUf9aWVj/TEtJ/0lIRv/FxMP/6ujo/+ro6P/e3Nv/jYh+/2NbRv9ya1v/cGlZ/2JaRP6opJ3+ubWv/2JZQp6fmpPUwr+6/3FqWf5rZFL+cWpa/2JZQ/+opJ7/0M3K/8vIxf/p5+f/7Orq/7a1tf9IR0b/T05N/1NSUf9QT07/UE9O/1JRUP9TUlH/Ojk3/66srP/r6en/5+Xl/9vY1/+vq6b/Zl5J/29oV/90bl7/XlY9/o2Iff7Cvrn/kYqBpIN+cdbDwLv/iIJ2/mVdSf5zbV3/Y1pE/4qFev/KxsP/2NXT/+bk5P/s6ur/tLKy/0VEQ/9QT07/U1JR/1BPTv9QT07/U1JR/1NSUf84NzX/rKqq/+zq6v/m5OT/0c7M/8C9uP93cGL/amJQ/3NsXP9nX0v+dm9g/r+7tv+3tK6jaWNPwrSxqv+no5z+X1c//nNsXP9sZVP/bGVS/7Swq//j4N//5OLi/+3r6//Jx8f/XFta/0JCQP9aWVj/UlFQ/1NSUf9WVVT/T05N/0VEQ/+/vb3/7evr/+bk5P/Fwr7/wL25/4yGfP9lXUj/cWta/25nVv5jW0X+u7ey/9za2aBeVDyml5KI/8C9uP51bl/9aWJP/3RuX/5iWUP/i4Z7/9vZ2P/r6en/5+Xl/+bk5P6amJj+IiEe/k1MS/9TUlH/U1JR/k9OTf8jIiD+h4aG/9/d3f/s6ur/4d7e/6qnoP/Bvrr/npmR/mBYQP9xalr/cGlZ/l9WPv6zr6n/6ObmhWVdSHxzbFr/tbKs/6mlnv1bUjf/cWtb/3FqWv9kXEX/qqeg/+fl5f/o5uf/6efn/9rY2P+UkpL/SEdF/zk4N/84NzX/RENC/4eGhv/U0tL/6efn/+zq6v/Pzcv/ioV5/8nGw/+inpf/XlU8/3JrW/9vaFj8aGBL/6Gdlf7f3NpgdnJjQ2RcRviIg3f/xsK9/ZWQh/9ZTzL/cWpa/29oV/9tZlP/trOu/+jm5v/p5+j/6efn/+Hf3//DwcD/raur/6yqqv/Avr7/4N7e/+nn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)](https://repl.it/repls/TechnologicalInfantilePagerecognition)

```ts
import { Accumulator } from 'object-accumulator'

import { users } from './user'

// Create new instance of Accumulator, list of object here is passed by reference so memory usage is minimum
const a = Accumulator.from(users)

// Objects is not merged immediately, Accumulator allow item(s) to be added afterward
a.add({
  country: 'Japan',
})

// Can extract single targeted value from Accumulator, no need to merge whole object, a lot faster
const mergedEmail = a.extract('email') // Clementine_Aufderhar83@hotmail.com
const mergedCountry = a.extract('country') // Japan

// Merge whole object if it is really needed, not as fast as extract() but still reasonable efficient
const result = a.merge()
// {"firstName":"Patience","lastName":"Klocko","username":"Clementine_Aufderhar","email":"Patience.Cremin@yahoo.com","phoneNo":"(069) 975-2864","country":"Japan"}
```

## 👀 How it works

To achieve these benefits, there are few tricks apply in Accumulator. The main trick is to use different approach to combine objects into one.

### Classic Merging

For classic merging, each instance of merging object will be iterated, therefore when the amount of items is a lot, performance will suffer.

<p align="center">
  Classic Merge
  <img src="https://p165.p3.n0.cdn.getcloudapp.com/items/nOuWde56/MergeAnimation.gif?v=9ef9ef6cf2cda2da2c4ddec459fe3024" width="850" alt="merging-animation">
</p>

### "Merging" in Object Accumulator

Object Accumulator use a major shortcut to achieve fast merging. Instead of looping through and real merging each object in the items. Object Accumulator trace object properties backward to acquire needed values, so in normal scenario, merging can be completed without iterating all items.

<p align="center">
  Smart Merge
  <img src="https://p165.p3.n0.cdn.getcloudapp.com/items/xQuvKoQG/AccumulateAnimation.gif?v=98bab277080032f43a689978a79e9265" width="850" alt="merging-animation">
</p>

## ⌛️ Performance

Compare with other merging solution, Object Accumulator provides excellent performance both in terms of processing time and memory usage. Moreover, if only a part of the merged object is needed, Accumulator::extract can provide even more performance boot. You may test the performance yourself on the Demo page.

<p align="center">
  <img src="https://p165.p3.n0.cdn.getcloudapp.com/items/GGu0Zbxx/ChartOfShallowMerge.png?v=72acca1f54b8e09884e7545f634e30ee" width="850" alt="shallow-merge-chart">
</p>

Accumulator supports deep merge / nested merge, it run even faster for nested objects compare to other merging method.

<p align="center">
  <img src="https://p165.p3.n0.cdn.getcloudapp.com/items/qGuzAnLo/ChartOfDeepMerge.png?v=5ffee62ef1a40a106cce36bc68fb5233" width="850" alt="deep-merge-chart">
</p>

## 📜 API

Reference [here](https://ivan114.github.io/ObjectAccumulator/docs)

## 🥂 License

[MIT](./LICENSE.md) as always
