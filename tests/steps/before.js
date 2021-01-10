const { Before, Given, When, Then } = require('@cucumber/cucumber')
const Settings = require('./Settings')
Before(function() {
  this.settings = Settings.create()
})
