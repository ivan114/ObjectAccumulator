<p align="center">
  <img src="https://p165.p3.n0.cdn.getcloudapp.com/items/8LudRqj6/banner.png?v=7c2ee36a80723a1744085cf1fcc0b4ce" width="850" alt="object-accumulator-banner">
</p>

# object-accumulator

> A Javascript/Typescript object merging tool, focus on performance and easy-to-use. Good alternative to _deepmerge_ in most case.

[![Build Status](https://travis-ci.org/ivan114/object-accumulator.svg?branch=master)](https://travis-ci.org/ivan114/object-accumulator)
[![NPM version](https://img.shields.io/npm/v/object-accumulator.svg)](https://www.npmjs.com/package/object-accumulator)
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

Usage:

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

## 📜 API

### 🕵️ Troubleshooting

## 🥂 License

[MIT](./LICENSE.md) as always
