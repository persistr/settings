const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('assert')
const JSON5 = require('json5')
const Settings = require('./Settings')

Given('empty database', function () {
  this.settings = Settings.create()
})

When(/^I store (.+)=(.+) in the database$/, function (key, value) {
  return this.settings[parseKey(key)] = parseValue(value)
})

Then(/^I can verify that (.+)=(.+) is in the database$/, function (key, value) {
  assert(this.settings[parseKey(key)] != undefined)
  assert.deepEqual(parseValue(value), this.settings[parseKey(key)])
})

Then(/^I can verify that (.+) is NOT in the database$/, function (key) {
  assert.equal(undefined, this.settings[parseKey(key)])
})

//
// Support functions
//

function parseKey(str) {
  if (str[0] === '[') return toArray(str, parseKey)
  const number = Number(str)
  if (!isNaN(number)) return number
  return str
}

function parseValue(str) {
  if (str[0] === '[') return toArray(str, parseValue)
  if (str[0] === '{') return toObject(str)
  if (str === 'true') return true
  if (str === 'false') return false
  const number = Number(str)
  if (!isNaN(number)) return number
  return str
}

function toArray(str, parse) {
  return str.replace(/[\[\]]/g, '').split(',').map(s => parse(s.trim()))
}

function toObject(str) {
  return JSON5.parse(str)
}

