const { After } = require('@cucumber/cucumber')
After(async function() {
  delete this.settings
})
