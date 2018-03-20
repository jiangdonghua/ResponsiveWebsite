require('./index.scss')
require('.././module')
require('page/common/header/index.js')
require('util/lib/jquery.mousewheel.min.js')
require('util/lib/jquery.touchSwipe.min.js')
require('util/lib/modal.js')
var wowAnimate=require('util/lib/wow.js')
console.log('i am index')

new wowAnimate.WOW({
    offset: 0
}).init();

//当调用 slide 实例方法时立即触发该事件。
$("#home .carousel").on("slide.bs.carousel",function () {
    var _this=$(this);
    _this.find(".carousel-inner .item .wow:not(.animated)").addClass("animated")
});
//当调用 activate 实例方法时立即触发该事件。
$('[data-spy="scroll"]').on("activate.bs.scrollspy", function() {
    $(".navbar-boss").attr("data-nav", $(".navbar-boss .nav li.active a").attr("href"))
});
//兼容移动端
$("section#home .carousel").swipe({
    swipe: function(n, t) {
        t.toString() == "right" && $(".carousel").carousel("prev");
        t.toString() == "left" && $(".carousel").carousel("next")
    }
});
//mousewheel
$(".navbar-boss .navbar-respond li a, a.toscroll").on("click", function(e) {
    var _this = $(this),
        _id = _this.attr("href");
    $("html,body").stop().animate({
        scrollTop: $(_id).offset().top
    });
    e.preventDefault()
});
//触摸滑动
$("body").swipe({
    swipe: function(event, direction) {
        direction.toString() == "up" && nSwitch(!1);
        direction.toString() == "down" && nSwitch(!0)
    }
});
//滚屏
$('body').on('mousewheel', function(event) {
    nSwitch(event.deltaY > 0);
});
//调整浏览器窗口大小
$(window).resize(function() {
    $(".navbar-boss .navbar-respond li.active a").click()
});
//判断滚屏下一页
var nSwitch = function(status) {
    var _active = $(".navbar-boss .navbar-respond li.active"),
        willDom = status ? _active.prev() : _active.next();
    willDom && willDom.find("a").click()
};
//兼容移动
$("section#abouts").swipe({
    swipe: function(event, direction) {
        var i = function(n) {
            var t = ($("#abouts ul.nav-tabs li.active").index() + n) % $("#abouts .nav-tabs li").length;
            $("#abouts .nav-tabs li:eq(" + t + ") a").tab("show")
        };
        direction.toString() == "left" && i(1);
        direction.toString() == "right" && i(-1)
    }
})

