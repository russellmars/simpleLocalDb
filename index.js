var simpleLocalDb = (function (global) {
  var store = {}

  store.clear = function () {}
  store.getItem = function (key) {}
  store.setItem = function (key, value) {}
  store.removeItem = function (key) {}
  store.serialize = function (value) {
    return JSON.stringify(value)
  }
  store.deserialize = function (value) {
    if (typeof value !== 'string') return undefined
    try {
      return JSON.parse(value)
    } catch (e) {
      return value || undefined
    }
  }

  function isLocalStorageSupported() {
    if (typeof global['localStorage'] === 'object') {
      try {
        localStorage.setItem('localStorage', 1)
        localStorage.removeItem('localStorage')
        return true
      } catch (err) {
        return false
      }
    } else {
      return false
    }
  }

  if (isLocalStorageSupported()) {
    // if localStorage supported
    // override store object
    var storage = global['localStorage']

    store.clear = function () {
      storage.clear()
    }
    store.getItem = function (key) {
      return store.deserialize(storage.getItem(key))
    }
    store.setItem = function (key, value) {
      if (value === null || value === undefined) {
        store.removeItem(key)
      } else {
        storage.setItem(key, store.serialize(value))
      }
    }
    store.removeItem = function (key) {
      storage.removeItem(key)
    }

  } else {
    // if localStorage not supported, use cookie
    // override store object
    function getCookies () {
      var cookie = {}
      if (document.cookie) {
        var cookies = document.cookie.split('; ')
        for (var i = 0, j = cookies.length; i < j; i++) {
          var kvArray = cookies[i].split('=')
          cookie[kvArray[0]] = kvArray[1]
        }
      }
      return cookie
    }

    store.clear = function () {
      var date = new Date()
      date.setTime(date.getTime() - (24 * 60 * 60 * 1000))

      var cookies = getCookies()
      for (var key in cookies) {
        document.cookie = key + '=; path=/; expires=' + date.toGMTString()
      }
    }
    store.getItem = function (key) {
      var value = getCookies()[key]
      if (value) {
        return store.deserialize(decodeURIComponent(value))
      }
      return undefined
    }
    store.setItem = function (key, value, maxAgeDay) {
      var date = new Date()
      date.setTime(date.getTime() + (maxAgeDay ? maxAgeDay : 1) * (24 * 60 * 60 * 1000))

      document.cookie = key + '=' + encodeURIComponent(store.serialize(value)) 
        + '; path=/; expires=' + date.toGMTString()
    }
    store.removeItem = function (key) {
      store.setItem(key, '', -1)
    }
  }

  global.simpleLocalDb = store
  return store
})(window)

if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = simpleLocalDb
}