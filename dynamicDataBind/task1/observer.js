/**
 * 最简单的观察者
 * Created by liujuping on 17/10/26.
 */

function Observer(data) {
  this.data = data
  this.walk(data)
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
      if (newVal === val) return;
      val = newVal
    }
  })
}