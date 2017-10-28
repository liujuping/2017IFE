/**
 * Vue
 * Created by liujuping on 17/10/26.
 */

function Vue(data) {
  this.init(data)
  this.created()
}

Vue.prototype = {
  // 初始化数据
  init(data) {
    this.el = document.getElementById(data.el.slice(1))
    this.originHtml = this.el.innerHTML
    this.data = data.data
    this.matchData = this.getMatchData()
    this.created = data.created
    this.bindDataWatch()
    this.render()
  },
  getMatchData() {
    let matchData = []
    this.originHtml.match(/\{\{.*\}\}/g).forEach((item) => {
      let str = item.slice(2, item.length - 2).trim()
      let params = str.split('.')
      matchData.push({
        replaceStr: item,
        params: params
      })
    })
    return matchData
  },
  bindDataWatch() {
    this.observe = new Observer(this.data)
    let bindParams = []
    this.matchData.forEach((d) => {
      if (bindParams.indexOf(d.params[0]) === -1) {
        bindParams.push(d.params[0])
        this.observe.$watch(d.params[0], this.render.bind(this))
      }
    })
  },
  render() {
    console.debug('*****  render  ******')
    let html = this.originHtml
    this.matchData.forEach((d) => {
      let data = this.data
      d.params.forEach((item) => {
        data = data[item]
      })
      html = html.replace(d.replaceStr, data)
    })
    this.el.innerHTML = html
  }
}
