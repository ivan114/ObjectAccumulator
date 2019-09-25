<p align="center">
  <img src="https://p165.p3.n0.cdn.getcloudapp.com/items/8LudRqj6/banner.png?v=7c2ee36a80723a1744085cf1fcc0b4ce" width="850" alt="object-accumulator-banner">
</p>

# object-accumulator

> A Javascript/Typescript object merging tool, focus on performance and easy-to-use. Good alternative to _deepmerge_ (in most case) if you need fast/lazy result.

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
- High Performance (Lazy picking value instead of really merging objects)
- Low Memory Usage (Alway reuse same instance data structure instead of creating new every time)
- Lazy Process and Interactive (Merge when you need the result, not doing unnecessary processing, Accumulator can be manipulated before/after merge)
- Lightweight without external dependencies (~1KB gzipped)

## 🔧 Installation

```sh
yarn add object-accumulator
```

## 🎬 Getting started

Package provide an easy-to-use **Accumulator** object to perform merge.

First, for this example, a list of user objects that needed to be merge is here, for real world usage the amount of object may be a lot more.

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

## 🎭 Examples

Go checkout [examples](./examples) !

## 📜 API

> Document your API here

### `publicMethodOne(value:string): string`

This methods does foo bar moo...

**Example:**

```ts
// example
```

## 🎓 Guides

<details>
<summary>How to do Foo</summary>
Today we're gonna build Foo....
</details>

### 🕵️ Troubleshooting

## 🥂 License

[MIT](./LICENSE.md) as always
