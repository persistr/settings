let handle = (settings) => {
  return {
    get: function(target, key) {
      return target[key]
    },
    set: function(target, key, value) {
      if (value && typeof value === 'object') {
        value = new Proxy(value, handle(settings))
      }
      target[key] = value

      if (settings.type === 'file') {
        clearTimeout(settings.timer)
        settings.timer = setTimeout(() => {
          settings.fs.writeFileSync(settings.path, JSON.stringify(settings.store), 'utf-8')
        }, 300)
      }

      if (settings.type === 'localStorage') {
        clearTimeout(settings.timer)
        settings.timer = setTimeout(() => {
          settings.ls[settings.key] = JSON.stringify(settings.store)
        }, 300)
      }

      return true
    },
    deleteProperty: function (target, key) {
      if (prop in target) {
        target[key] = undefined
        delete target[key]
      }
    }
  }
}

module.exports = {
  memory: () => {
    const settings = { type: 'memory', store: {} }
    return new Proxy(settings.store, handle(settings))
  },

  file: (path, options) => {
    const fs = options?.fs ?? require('fs')
    if (!fs.existsSync(path)) fs.writeFileSync(path, '{}', 'utf-8')
    const settings = { type: 'file', fs, path, store: JSON.parse(fs.readFileSync(path, 'utf-8')) }
    return new Proxy(settings.store, handle(settings))
  },

  localStorage: (key, options) => {
    const ls = options?.localStorage ?? localStorage
    const settings = { type: 'localStorage', ls, key, store: JSON.parse(ls[key] || '{}') }
    return new Proxy(settings.store, handle(settings))
  }
}
