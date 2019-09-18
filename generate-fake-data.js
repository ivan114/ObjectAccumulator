// @ts-check
const Faker = require('faker')
const Readline = require('readline')
const fs = require('fs')

/**
 * @param {import("readline").Interface} rInterface
 * @param {string} question
 * @returns {Promise<string>} answer
 */
function questionAsync(rInterface, question) {
  return new Promise((resolve, reject) => {
    /**
     * @param {any} answer
     */
    rInterface.question(question, (answer) => resolve(answer))
  })
}

const readlineInterface = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

/**
 * @returns {Promise<number>} amount
 */
async function askForAmount() {
  const amount = await questionAsync(
    readlineInterface,
    'How many fake user do you want to generate?'
  )
  try {
    const amountNumber = Number(amount)
    if (isNaN(amountNumber) || amountNumber % 1 !== 0) {
      throw new Error('NaN')
    }
    return amountNumber
  } catch (e) {
    console.log('Input amount is not an valid number, try again!')
    return askForAmount()
  }
}

/** @typedef {username: string, lastName: string, firstName: string, email: string} User */
/** @typedef {Array.<Partial.<User>>} ResultArray */

;(async () => {
  const amount = await askForAmount()
  console.log(`You want to generate ${amount} fake user(s)!`)

  let users = []
  for (let count = 0; count < amount; count++) {
    const firstName = Faker.name.firstName()
    const lastName = Faker.name.lastName()

    if (count === 0) {
      users.push({
        firstName,
        lastName,
        username: Faker.internet.userName(firstName, lastName),
        email: Faker.internet.email(firstName, lastName),
        phoneNo: Faker.phone.phoneNumber(),
        country: Faker.address.county(),
      })
      continue
    }

    const user = {}

    if (Math.random() < 0.5) {
      user.firstName = firstName
    }

    if (Math.random() < 0.5) {
      user.lastName = lastName
    }

    if (Math.random() < 0.5) {
      user.username = Faker.internet.userName(firstName, lastName)
    }

    if (Math.random() < 0.5) {
      user.email = Faker.internet.email(firstName, lastName)
    }

    if (Math.random() < 0.5) {
      user.phoneNo = Faker.phone.phoneNumber()
    }

    if (Math.random() < 0.5) {
      user.country = Faker.address.county()
    }

    users.push(user)
  }

  fs.writeFileSync(
    `./public/${amount}-users.json`,
    JSON.stringify(users, null, 2)
  )

  process.exit()
})()
