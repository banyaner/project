(function ($) {
    $(".subtit span:even").addClass("orange");
    var pageIndex = 0;     //页面索引初始值
    var size = 5;     //每页显示条数初始化，修改显示条数

    //initTable(0);
    API.strategy_list().success(function (json) {
        $("#pagination").pagination(json.data.total, {
            callback: PageCallback,  //PageCallback() 为翻页调用次函数。
            prev_text: "« 上一页",
            next_text: "下一页 »",
            items_per_page: size,
            num_edge_entries: 2,       //两侧首尾分页条目数
            num_display_entries: size,    //连续分页主体部分分页条目数
            current_page: 0,   //当前页索引
        });
    });


    //翻页调用
    function PageCallback(offset, jq) {
        initTable(offset);
    }

    function initTable(offset) {
        API.strategy_list({
            size: size,
            offset: offset*size
        }).success(function (json) {
            $('tbody#strategies').empty();
            $.each(json.data.data, function (_, item) {
                //if(item.status !== "Finished") {
                //    return;
                //}
                var row = $('<tr/>');
                var name = $('<a/>', {
                    href: "./privatedetail.html?id=" + item.strategy_id,
                    text: item.strategy_name
                })
                $('<td/>').append(name).appendTo(row);
                var names = ['Annualized', 'ActivePremium', 'DRatio', 'MaxDrawdown', 'AverageRecovery', 'SharpeRatio'];
                $.each(names, function (j, name) {
                    var perfvalue = item.value[name];
                    if (typeof perfvalue != 'string') {
                        perfvalue = perfvalue.toFixed(4);
                    }
                    $('<td/>').text(perfvalue).appendTo(row);
                });
                row.appendTo($('tbody#strategies'));

            });

        });
    }
})(jQuery)


