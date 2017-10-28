/**
 * Vue
 * Created by liujuping on 17/10/26.
 */

function Vue(data) {
  this.el = document.getElementById(data.el.slice(1))
  this.data = data.data
  this.render()
}

Vue.prototype = {
  render() {
    let html = this.el.innerHTML
    html.match(/\{\{.*\}\}/g).forEach((item) => {
      let str = item.slice(2, item.length - 2).trim()
      let params = str.split('.')
      let data = this.data
      params.forEach((item) => {
        data = data[item]
      })
      html = html.replace(item, data)
    })
    this.el.innerHTML = html
  }
}
