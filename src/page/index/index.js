require('./index.scss')
require('.././module')
require('page/common/header/index.js')
var t=require('util/lib/wow.js')
console.log('i am index')


new t.WOW({
    offset: 0
}).init();
//当调用 slide 实例方法时立即触发该事件。
$("#home .carousel").on("slide.bs.carousel",function () {
    var _this=$(this);
    _this.find(".carousel-inner .item .wow:not(.animated)").addClass("animated")
})