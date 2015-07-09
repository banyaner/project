/*global API*/
/*global window*/
/*global console*/
/*global $*/
/*global API*/

(function ($) {
    //模态框居中
    $(window).resize(function(){
        $(".modal-dialog").css({
            position: "absolute",
            left: ($(window).width() - $(".modal-dialog").outerWidth())/2,
            top: ($(window).height() - $(".modal-dialog").outerHeight())/2
        });
    });
    var username = $.cookie("username");
    var gpxtoken = $.cookie("gpxtoken");
    if (!username || !gpxtoken) {
        window.location.replace("login.html");
        return;
    }
    $('#display_name').text(username);
    $(".subtit span:even").addClass("orange");

    //var operate=function(){
    //    $('.ac-enter').click(function (e) {
    //        var strategy_id = $("button[aria-expanded='true']").parents('tr').attr('id');
    //        API.strategy_set_online(
    //            {
    //                'strategy_id': strategy_id,
    //                'initial_stock': initial_stock,
    //                'initial_future': 0,
    //                'targets': [],
    //                'start': "2012-01-01",
    //                'end': "2014-01-01",
    //                'cash_check': false
    //            }).success(function () {
    //                $(this).parents('tr').children().first().children().after("<span class='tinyinfo'>实</span>");
    //                alert("接入实盘成功！");
    //                refresh_generated();
    //            });
    //    });
    //    $('.ac-trade').click(function (e) {
    //        var strategy_id = $("button[aria-expanded='true']").parents('tr').attr('id');
    //        API.strategy_delete({'strategy_id':strategy_id}).success(function () {
    //            window.location.href='tool.html';
    //            alert("重新训练！");
    //            refresh_generated();
    //        });
    //    });
    //    $('.ac-test').click(function (e) {
    //        var strategy_id = $("button[aria-expanded='true']").parents('tr').attr('id');
    //        API.strategy_backtest({
    //            'strategy_id':strategy_id,
    //            'initial_stock': initial_stock,
    //            'initial_future': 0,
    //            'targets': [],
    //            'start': "2012-01-01",
    //            'end': "2014-01-01",
    //            'cash_check': false
    //        }).success(function () {
    //            alert("重新回测！");
    //            refresh_generated();
    //        });
    //    });
    //};

    $('#leftbar a').each(function () {
        if ($(this).hasClass('hidden')) {
            $(this).removeClass('hidden');
        }
        else {
            $(this).addClass('hidden');
        }
    });

    $(".nav li:first-child").children().addClass("highlight");
    $(".nav a").click(function (e) {
        e.preventDefault(); //阻止a链接的跳转行为
        $(this).addClass("highlight").parent().siblings().children().removeClass("highlight");
        var numb = $(this).attr("href");
        $(numb).removeClass("hidden").siblings().addClass("hidden"); //显示当前选中的链接及关联的content
    });

    $('tr .operation').hover(function (e) {
        $(e).children().removeClass('hidden');
        console.log("hhhhhhh");
    }, function () {
        $('.operation ul').children().addClass('hidden');
    });

})(jQuery);