const Settings = require('../../index')
const passgen = require('passgen')
const { fs, vol } = require('memfs')
const MemoryStorage = require('memorystorage')
const localStorage = new MemoryStorage(passgen.create(12))
module.exports = {
  create: () => {
    if (process.env.DB === 'file') {
      vol.fromJSON({ './settings.json': '{}' }, '/')
      return Settings.file('/settings.json', { fs })
    }
    else if (process.env.DB === 'localstorage') {
      return Settings.localStorage(passgen.create(12), { localStorage })
    }
    else {
      return Settings.memory()
    }
  }
}
