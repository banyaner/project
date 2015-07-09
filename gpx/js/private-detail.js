/**
 * Created by bxy on 15/5/23.
 */
$(document).ready(function () {
    'use strict';
    var id = $.getUrlParam('id');

    function loadNetValue(taskid){
        var netvalue = taskMap[taskid].netvalue;
        if(netvalue===undefined || netvalue===undefined) {
            return;
        }
        var data = netvalue,
            equity = [],
            price = [],
            dataLength = data.length,
            i = 0,
            record;
        for (i; i < dataLength; i += 1) {
            record = data[i];
            equity.push([
                new Date(record.time * 1000).getTime(),
                record.value
            ]);
            price.push([
                new Date(record.time * 1000).getTime(),
                record.bench // the volume
            ]);
        }
        // create the chart
        var nvDiv = $("#Detail #net_value");
        $('<div/>', {
            id: "container_equity",
            style: "height:400px; width: 700px"
        }).appendTo(nvDiv.empty());
        var rangeSelector = {
            selected: 3,
            buttons: [
                {
                    type: 'month',
                    count: 1,
                    text: '1月'
                }, {
                    type: 'month',
                    count: 3,
                    text: '1季度'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1年'
                }, {
                    type: 'all',
                    text: '全部'
                }
            ]
        };
        var lang = {
            loading: 'Aguarde...',
            months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            exportButtonTitle: '输出',
            printButtonTitle: '打印',
            rangeSelectorFrom: '从',
            rangeSelectorTo: '到',
            rangeSelectorZoom: "缩放时间",
            downloadPNG: '下载为 PNG',
            downloadJPEG: '下载为 JPEG',
            downloadPDF: '下载为 PDF',
            downloadSVG: '下载为 SVG'
            // resetZoom: "Reset",
            // resetZoomTitle: "Reset,
            // thousandsSep: ".",
            // decimalPoint: ','
        };

        var plotBands = undefined;
        console.warn(taskMap[taskid])
        if(taskMap[taskid].task_type==="train"){
            plotBands = [{
                from: 0,
                to: taskMap[taskid].running_param.end * 1000,
                color: '#FFE4D0',
                //dashStyle: 'shortdash',
                //width: 2,
                label: {
                    text: '训练期',
                    verticalAlign: 'bottom',
                    y: -100

                }
            }];
        }

        $(".performance_detail_progress_bar").addClass("hidden");

        $('#container_equity').highcharts('StockChart', {
            "lang": lang,
            rangeSelector: rangeSelector,
            legend: {
                enabled: true,
                align: 'right',
                layout: 'vertical',
                verticalAlign: 'top',
                y: 100,
                shadow: true
            },
            xAxis: {
                "plotBands": plotBands
            },
            yAxis: [{
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: '账户金额'
                },
                height: '60%',
                lineWidth: 2
            }, {
                labels: {
                    //align: 'right',
                    //x: -3
                },
                opposite: false,
                title: {
                    text: '股价'
                },
                height: '60%',
                lineWidth: 2
            }],
            series: [{
                name: '收益',
                data: equity,
                yAxis: 0,
                tooltip: {
                    valueDecimals: 2
                }
            }, {
                name: '股价',
                data: price,
                yAxis: 1,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        });

    }
    function loadDetail(taskid){
        var detail = $("#Task #Detail");
        detail.fadeIn("fast");
        detail = detail.children("div");
        var info=taskMap[taskid]
        var param = detail.children("#parameter").empty()
        $("<p/>").text("运行参数").appendTo(param);
        $("<p/>").text(JSON.stringify(info.running_param)).appendTo(param);
        if(info.task_type === "train") {
            $("<p/>").text("遗传算法参数").appendTo(param);
            $("<p/>").text(JSON.stringify(info.gene_param)).appendTo(param);
        }

        if(info.netvalue===undefined){
            taskMap[taskid].netvalue = "loading";
            API.strategy_netvalue({task_id:taskid}).success(function(data){
               taskMap[taskid].netvalue = data.data;
                var selected = $("#Task #List .selected").attr("task_id");
                if(selected!==taskid){
                    return;
                }
                loadNetValue(taskid);
            });
        }
        if(info.netvalue!=="loading"){
            loadNetValue(taskid);
        }
    }
    var taskMap = {};
    $("#Task #Detail #Close").click(function(){
        $("table#List tbody tr").removeClass("selected")
        $("#Task #Detail").fadeOut("fast");
    })

    API.strategy_list({
        id: id
    }).success(function (data) {
        console.warn(data);
        if (data.status !== 0) {
            var span = $("#main_progress_bar").children("div").children("span");
            span.text("无法获取数据,请稍后重试");
            span.addClass("error_info");
            return;
        } else {
            $("#main_progress_bar").fadeOut("fast",function(){$(this).siblings().fadeIn("fast")});
        }
        data = data.data;
        var intro = $("#Intro");
        intro.children("#StrategyName").text(data.strategy_name);
        intro.children("#StrategyIntro").text(data.strategy_intro);

        var strategyParam = $("#StrategyParam");
        var training_para = data.training_para;
        strategyParam.children("#type").text(training_para.type);
        strategyParam.children("#interval").text(training_para.interval);
        var columns = training_para.columns.join(", ")
        var formulas = training_para.formulas.map(function(formula){return $("<p/>").text(formula);});
        strategyParam.children("#columns").text(columns);
        strategyParam.children("#formulas").empty().append(formulas);

        var taskThings = [{id:data.performance.task_id,type:"train"}];
        $.each(data.backtest_tasks, function(_,backtest_id){taskThings.push({id:backtest_id ,type:"backtest"})});

        var tasklist = $("table#List tbody");
        var i = 0;


        $.each(taskThings,function(i,thing){
            var row =$("<tr/>",{task_id:thing.id});
            $("<td/>").text(i).appendTo(row);
            $("<td/>").text(thing.type).appendTo(row);
            $("<td/>",{
                text:"载入数据中",
                class:"loading",
            }).appendTo(row);
            tasklist.append(row);
            API.strategy_task_detail({task_id:thing.id}).success(function(data){
                taskMap[thing.id] = data.data;
                var row =$("table#List tbody tr[task_id="+thing.id+"]");
                var run_para = data.data.running_param;
                var start_time = new Date(run_para.start*1000);
                var end_time= new Date(run_para.end*1000);
                row.children(".loading").fadeOut("fast",function(){
                    $("<td/>").text(start_time.toLocaleDateString()).appendTo(row);
                    $("<td/>").text(end_time.toLocaleDateString()).appendTo(row);
                    $("<td/>").text(run_para.initial_stock).appendTo(row);
                    $("<td/>").text(run_para.targets.length).appendTo(row);
                });
                row.click(function(){
                    $(this).addClass("selected").siblings().removeClass("selected");
                    loadDetail($(this).attr("task_id"));
                });
            });
        });

    });
});
