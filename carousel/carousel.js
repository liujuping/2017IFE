/**
 * 轮播图插件
 * @params options {Object} 轮播参数7
 * Created by liujuping on 17/11/4.
 */

function Carousel(options) {
  this.type = options.type
  this.imgs = options.imgs
  this.CarouselDOM = document.getElementById(options.el)
  this.init()
}

Carousel.prototype = {
  init: function() {
    if (this.type === 'img') {
      // 静态设置
      // 图片之间的间隔距离
      this.imgSpace = 0.7
      // 透视点的距离
      this.imgInstance = 1.6

      this.rotateY = 360 / this.imgs.length

      // 图片的宽度百分比
      this.widthPercent = this.getWidthPercent()

      this.rotateIndex = 3
      this.width = this.widthPercent * this.CarouselDOM.clientWidth / 100
      this.initCarouselDOM()
      this.initImage()
      // this.rotateImage()
      this.rotateTimer = null
      this.autoRotateImage()
    }
  },
  getWidthPercent: function() {
    return 50 * Math.sin(this.rotateY / 360 * Math.PI)
  },
  autoRotateImage: function() {
    var self = this
    this.rotateTimer = setTimeout(function () {
      self.rotateImage()
      // self.autoRotateImage()
    }, 2000)
  },
  rotateImage() {
    this.CarouselStageDOM.style = 'width: 100%;transition: transform 1s;transform-style: preserve-3d;transform: rotateY(' + this.rotateIndex * this.rotateY +'deg)'
    this.rotateIndex ++
  },
  initCarouselDOM: function () {
    // 'perspective: ' + this.width * this.imgInstance + 'px;
    this.baseCarouselDOMStyle = 'perspective: ' + this.width * this.imgInstance + 'px;transform-style: preserve-3d;'
    this.CarouselDOM.style = this.baseCarouselDOMStyle
  },
  initImage: function () {
    var html = '<div id="carousel-stage" style="width: 100%;">',
    rotateY = 360 / this.imgs.length,
    transZ = this.getTransZ(rotateY),
    baseStyle = 'position: absolute;left: ' + (100 - this.widthPercent * this.imgSpace) / 2 + '%;top: 10px;display: block;width: ' + this.widthPercent * this.imgSpace + '%;">'
    this.imgs.forEach(function (item, index) {
      html +=
        '<div class="carousel-item" style="transform: rotateY(' + (rotateY * index ) + 'deg) translateZ(' + transZ + 'px);' + baseStyle +
          '<img style="width: 100%;" class="carousel-img" src="' + item + '" alt=""> ' +
        '</div>'
    })
    html += '</div>'
    this.CarouselDOM.innerHTML = html
    this.CarouselStageDOM = document.getElementById('carousel-stage')
  },
  getTransZ(rotateY) {
    var tanValue = Math.tan(rotateY / 360 * Math.PI)
    return (this.width / 2) / tanValue
  }
}