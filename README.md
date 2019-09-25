<p align="center">
  <img src="https://user-images.githubusercontent.com/1223799/50992071-73562500-1516-11e9-99fa-9f73b0f0eee2.png" width="597" alt="object-accumulator">
</p>

# object-accumulator

> A library written in TypeScript

[![Build Status](https://travis-ci.org/ivan114/object-accumulator.svg?branch=master)](https://travis-ci.org/ivan114/object-accumulator)
[![NPM version](https://img.shields.io/npm/v/object-accumulator.svg)](https://www.npmjs.com/package/object-accumulator)
![Downloads](https://img.shields.io/npm/dm/object-accumulator.svg)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

---

## ✨ Features

- Merge objects with volume/performance concern.
- Support high volume (Object.assign merging 100000 items on Safari throw exception :/ )
- High Performance (Lazy picking value instead of really merging objects)
- Low Memory Usage (Alway reuse same instance data structure instead of creating new every time)
- Lazy Process and Interactive (Merge when you need the result, not doing unnecessary processing, Accumulator can be manipulated before/after merge)

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

const mergedEmail = a.extract('email')
// Clementine_Aufderhar83@hotmail.com

const mergedCountry = a.extract('country')
// Japan

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
