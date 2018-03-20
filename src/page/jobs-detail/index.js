/**
 * Created by Administrator on 2018/3/20.
 */
require('./index.scss')
require('.././module')
require('page/common/header1/index.js')
require('page/common/footer/index.js')
require('util/lib/jquery.mousewheel.min.js')
require('util/lib/jquery.touchSwipe.min.js')
var wowAnimate=require('util/lib/wow.js')
console.log('i am jobs')

new wowAnimate.WOW({
    offset: 0
}).init();
//toScroll
$('a.toscroll').bind('click', function (e) {
    var $this = $(this), id = $this.attr('href');
    var offset = $(id) && $(id).length ? $(id).offset().top : 0;
    $('html,body').stop().animate({ scrollTop: offset }, 1200);
    e.preventDefault();
})
//scrollTop
$(window).scroll(function () {
    ($(this).scrollTop() >= 200) ? $('.scroll-top').fadeIn(300) : $('.scroll-top').fadeOut(300);
});