$(function () {
        //pool.html
        $(".subtit span:even").addClass("orange");
    })
    //var strategyPoolApp = angular.module('strategyPoolApp', []);
    //
    //strategyPoolApp.controller('StrategyListCtrl', function ($scope, $http) {
    //    $http.get('http://www.gpxtrade.com/api/strategy').success(function (data) {
    //        $scope.strategys = data.data;
    //    });
    //index.html 轮播
if (window.chrome) {
    $('.slider li').css('background-size', '100% 100%');
}
$('.slider').unslider({
    speed: 500, //  滚动速度
    delay: 3000, //  动画延迟
    complete: function () {}, //  动画完成的回调函数
    keys: true, //  启动键盘导航
    dots: true, //  显示点导航
    fluid: false //  支持响应式设计
});
// 左右控制js
var unslider = $('.slider').unslider();
$('.unslider-arrow').click(function () {
    var fn = this.className.split(' ')[1];
    unslider.data('unslider')[fn]();
});
//pool.html

////detail.html 
//$(document).ready(function () {
//    $("#part a").click(function (e) {
//        // e.preventDefault();//阻止a链接的跳转行为
//        var numb = $(this).attr("href");
//
//        $(numb).removeClass("hidden").siblings().addClass("hidden"); //显示当前选中的链接及关联的content
//    })
//})