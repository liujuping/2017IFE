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
      // 每次旋转的角度
      this.rotateY = 360 / this.imgs.length
      // 图片宽度
      this.width = this.getWidth()
      // 在视图窗口的图片序号
      this.rotateIndex = 1
      // 圆心到边长的直线距离
      this.transZ = this.getTransZ(this.rotateY)
      // 透视点的距离（perspective）
      this.imgInstance = this.transZ + 2/7 * this.width
      // 初始化DOM元素
      this.initCarouselDOM()
      // 初始化图片
      this.initImage()
      // 计时器
      this.rotateTimer = null
      // 每次旋转的时间
      this.rotateTime = 2000
      // 开始自动旋转DOM
      this.autoRotateImage()
    }
  },
  // 图片占DOM元素的百分比计算
  getWidth: function() {
    // 以父元素宽度作为一个圆的直径，在圆里画多边形，计算一个多边形的宽度，即宽度百分比
    return Math.sin(this.rotateY / 360 * Math.PI) * this.CarouselDOM.clientWidth / 2
  },
  // 自动旋转图片
  autoRotateImage: function() {
    var self = this
    this.rotateTimer = setTimeout(function () {
      self.rotateImage()
      self.autoRotateImage()
    }, this.rotateTime)
  },
  // 旋转图片的方法，舞台每次旋转rotateY
  rotateImage() {
    this.CarouselStageDOM.style = 'width: ' + this.width + 'px;transform: rotateY(' + this.rotateIndex * this.rotateY +'deg)'
    this.rotateIndex ++
  },
  initCarouselDOM: function () {
    // 给父元素设置perspective和transform-style
    this.CarouselDOM.style = 'perspective: ' + this.imgInstance + 'px;transform-style: preserve-3d;'
  },
  initImage: function () {
    var html = '<div id="carousel-stage" style="width:' + this.width + 'px">',
      rotateY = this.rotateY,
      transZ = this.transZ,
      baseStyle = 'left: '+ this.width * (1 - this.imgSpace) / 2 +'px; width: ' + this.width * this.imgSpace + 'px;">'
    this.imgs.forEach(function (item, index) {
      html +=
        '<div class="carousel-item" style="transform: rotateY(' + (rotateY * index ) + 'deg) translateZ(' + transZ + 'px);' + baseStyle +
          '<img style="width: 100%;" class="carousel-img" src="' + item + '" alt=""> ' +
        '</div>'
    })
    html += '</div>'
    this.CarouselDOM.innerHTML = html
    // 舞台
    this.CarouselStageDOM = document.getElementById('carousel-stage')
  },
  getTransZ(rotateY) {
    // 圆心到边长的直线距离
    var tanValue = Math.tan(rotateY / 360 * Math.PI)
    return (this.width / 2) / tanValue
  }
}