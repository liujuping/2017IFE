/**
 * 发布订阅类
 * Created by liujuping on 17/10/26.
 */

function Event() {
  this.events = {}
}

Event.prototype = {
  listen: function (key, fn) {
    if (!this.events[key]) {
      this.events[key] = []
    }
    this.events[key].push(fn)
  },
  trigger: function () {
    let key = Array.prototype.shift.call(arguments),
     fns = this.events[key]
    if (fns && fns.length > 0) {
      for (let i = 0; i < fns.length, fn = fns[i]; i++) {
        fn.apply(this, arguments)
      }
    }
  }
}

function Observer(data) {
  this.data = data
  this.walk(data)
  this.event = new Event()
}

// 遍历对象
Observer.prototype.walk = function (obj) {
  for (let key in obj) {
    // 过滤掉继承属性
    if(obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        new Observer(obj[key])
      }

      this.convert(key, obj[key])
    }
  }
}

Observer.prototype.convert = function (key, val) {
  var self = this
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log('你访问了' + key);
      return val
    },
    set: function (newVal) {
      console.log('你设置了' + key);
      console.log('新的' + key + ' = ' + newVal)
      self.event.trigger(key, newVal, val)
      if (newVal === val) return;
      if (typeof newVal === 'object') {
        new Observer(newVal)
      }
      val = newVal
    }
  })
}

Observer.prototype.$watch = function (key, callback) {
  this.event.listen(key, callback)
}