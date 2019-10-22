<p align="center">
  <img src="https://p165.p3.n0.cdn.getcloudapp.com/items/8LudRqj6/banner.png?v=7c2ee36a80723a1744085cf1fcc0b4ce" width="850" alt="object-accumulator-banner">
</p>

# Object Accumulator

> A Javascript/Typescript object merging tool, focus on performance and easy-to-use. Good alternative to _deepmerge_ in most case.

<p align="center">
  <a href="https://ivan114.github.io/ObjectAccumulator/"><img src="https://p165.p3.n0.cdn.getcloudapp.com/items/geuY8AA0/ObjectAccumulatorSiteButton.png?v=dbbf12374cde95fce2f7531c1b143f06" width="250" alt="object-accumulator-site-link-image"></a>
  <a href="https://ivan114.github.io/ObjectAccumulator/docs"><img src="https://p165.p3.n0.cdn.getcloudapp.com/items/7Kux1req/DocsButton.png?v=a238cb797bb3ae7a85460bb13f4a851d" width="154" alt="object-accumulator-docs-link-image"></a>
</p>

[![Build Status](https://github.com/ivan114/ObjectAccumulator/workflows/Node%20CI/badge.svg)](https://github.com/ivan114/ObjectAccumulator/actions)
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
- Unit tested with high coverage (>90%)
- Support major browsers on desktop and mobile including IE 11
- Lightweight and without external dependencies (1.3kB minzipped)

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

Usage: [**Try it** on Repl.it](https://repl.it/repls/TechnologicalInfantilePagerecognition)

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
