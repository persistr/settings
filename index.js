let handle = (settings) => {
  return {
    get: function(target, key) {
      const value = target[key]
      if (value && typeof value === 'object') {
        return new Proxy(value, handle(settings))
      }
      return target[key]
    },
    set: function(target, key, value) {
      target[key] = value
      save(settings)
      return true
    },
    deleteProperty: function (target, key) {
      if (key in target) delete target[key]
      save(settings)
      return true
    }
  }
}

function save(settings) {
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
