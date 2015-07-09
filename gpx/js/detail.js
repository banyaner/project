/*jslint browser: true, devel: true*/
/*global $*/
/*global all_stocks_map*/
/*global API*/


$(document).ready(function () {
        'use strict';
    var id = $.getUrlParam('id');
    API.strategy_list({
        id: id
    }).success(function (data) {
        if (data.status !== 0 || data.data.length === 0) {
            $("#main_progress_bar").append($("<p/>", {
                "class": 'error_info',
                text: '无法获取数据,请稍后重试。'
            }));
            return;
        }
        data = data.data;
        $("span.detailtit").text(data.strategy_name);
        $("div#part4").text(data.strategy_intro);
        var perf_profit = [
            ["Annualized", "年化收益", "投资组合年化收益率与基准年化收益率的差。衡量投资相较基准的优越程度。主动收益 = 投资组合年化收益率 - 基准年化收益率"],
            ["ActivePremium", "主动收益", "投资组合年化收益率与基准年化收益率的差。衡量投资相较基准的优越程度。主动收益 = 投资组合年化收益率 - 基准年化收益率"],
            ["AdjustedSharpeRatio", "调整夏普比率", "调整偏度与峰度的夏普比率"],
            ["AppraisalRatio", "估计比率", "估价比率是詹森阿尔法对风险做出的调整。评估比率除以个别风险；调整詹森阿尔法除以贝塔；替代詹森阿尔法除以系统风险"],
            ["BurkeRatio", "伯克比率", "以回撤作为风险调整的收益率评估指标"],
            ["CalmarRatio", "卡尔马比率", "以最大回撤作为风险调节的收益率指标"],
            ["SterlingRatio", "Sterling比率", "以调整后的最大回撤作为风险调节的收益率指标"],
            ["SharpeRatio", "夏普比率", "风险调整后收益率。经典指标以标准差作为风险指标代理"],
            ["InformationRatio", "信息比率", "经跟踪误差调整过后的主动超额收益"],
            ["Kappa", "Kappa", "广义的下方风险调整收益率指标，数值越高越好。仅适合用来排序，不适合用来解释"],
            ["KellyRatio_Full", "凯莉比率", "超额收益率的期望除以其方差"],
            ["MSquared", "MSquared", "风险调节的收益率指标，可以在不同风险级别的组合间进行比较"],
            ["PainRatio", "痛感比率", "策略超额收益率的痛感指数调整统计量"],
            ["SortinoRatio", "索提诺比率", "夏普比率改进。只使用下半方差作为风险度量"],
            ["TreynorRatio", "特雷诺比率", "风险调整后收益率。以beta作为风险指标代理"],
            ["JensenAlpha2", "詹森阿尔法", "CAPM模型的截距项，是调整系统风险后的超额收益率"]
        ];
        var perf_risk = [
            ["MaxDrawdown", "最大回撤", "产品净值走到最低点时的收益率回撤幅度的最大值"],
            ["AverageDrawdown", "平均回撤", "观测的所有回撤的平均深度"],
            ["AverageLength", "平均长度", "观测的所有回撤的平均长度"],
            ["AverageRecovery", "平均恢复期", "观测的所有回撤的平均恢复长度"],

            ["DownsideDeviation", "下方偏离", "衡量收益率分布在某一最小接受值以下的偏离程度"],
            ["DRatio", "D比率", "比率越低，表现越好"],
            ["BernardoLedoitRatio", "贝尔纳多•勒杜瓦比率", "收益率分布中正负收益率累计总和的比率。简易衡量收益率分布正负偏向的水平"],
            ["PainIndex", "痛感指数", "基于分析期间的回撤指标做出的统计量。一般投资者厌恶策略的回撤"],
            ["ProspectRatio", "前景比率", "基于行为金融的损失厌恶效应，比率对损失做出惩罚"],
            ["SpecificRisk", "个别风险", "回归式中残差项的标准差"],
            ["TotalRisk", "总体风险", "系统风险与个体风险的平方的和"],
            ["TrackingError", "跟踪误差", "基准无法解释的收益率部分"],
            ["UpsideFrequency", "上方频率", "衡量收益率序列中超过最小接受收益率频率的统计量"],
            ["UpsidePotentialRatio", "上升潜力比率", "夏普比率改进。分子只考虑上升部分，分母使用跌势差"],
            ["UpsideRisk", "上方风险", "衡量收益率分布在某一最小接受值以上的偏离程度"]
            //["VaR", "在险值", "针对收益率序列，在险值意味着给定置信水平下，亏损的临界值。亦即，亏损大于VaR的可能性仅有α%，亏损小于VaR的可能性有(1-α)%"]
        ];
        //渲染训练参数
        var tp = data.training_para;
        var table = $("<table/>").addClass("train_para_table");
        var time_names = [
            ['training_start', '训练开始'],
            ['training_end', '训练结束'],
            ['training_end', '回测开始'],
            ['backtest_end', '回测结束']
        ];
        $.each(time_names, function (i, item) {
            var time = new Date(tp[item[0]] * 1000);
            var row = $("<tr/>");
            row.append($('<td/>').text(item[1]));
            row.append($('<td/>').text(time.toLocaleDateString()));
            table.append(row);
        });
        var param_names = [
            ['cash', '初始资金'],
            ['interval', '采样周期']
            //['strategy', '策略'],
            //['user_id', '生成用户']
        ];
        $.each(param_names, function (i, item) {
            var row = $("<tr/>");
            row.append($('<td/>').text(item[1]));
            row.append($('<td/>').text(tp[item[0]]));
            table.append(row);
        });
        var name_translation = {
            'TrendStrategy': '趋势策略',
            'CrossStrategy': '交叉策略',
            'MeanReversionStrategy': '均值回归策略',
            'BoundStrategy': '边界策略',
            'PatternStrategy': '形态策略',
            'SortAndBuyStrategy': '排序买入策略'
        };
        console.warn(tp);
        var row = $("<tr/>");
        row.append($('<td/>').text("策略"));
        row.append($('<td/>').text(name_translation[tp.strategy]));
        table.append(row);
        //targets                                                    
        var targets = $.map(tp.targets, function (item) {
            return all_stocks_map[item.split("/")[1]];
        }).join(", ");
        table.append("<td>标的</td><td>" + targets + "</td>");

        table.appendTo("#part1");
        //backtest_end
        //backtest_start
        //back
        var performances = data.performance;
        $.each(performances, function (j, data) {
            var name_translation = {
                'training': '训练',
                'backtest': '回测'
            };
            $("<li/>", {
                role: "presentation"
            }).append($("<a/>", {
                href: "#performance_part" + j,
                text: name_translation[data.type]
            })).appendTo($("ul#performance_parts"));
            $("#performance_parts li:first-child").children().addClass("On");
            $("#performance_parts a").click(function (e) {
                e.preventDefault(); //阻止a链接的跳转行为
                $(this).addClass("On").parent().siblings().children().removeClass("On");
            });



            function getTable(perf) {
                var table = $('<table/>', {
                    "class": "table table-hover table-bordered"
                });
                var title_row = $('<tr/>');
                var value_row = $('<tr/>');

                var columnI = 0;
                for (var i = 0; i < perf.length; i++) {


                    var nametd = $('<td/>', {
                        text: perf[i][1],
                        class: "perf_name",
                        title: perf[i][2]
                    });
                    nametd.css('width', 100 / 8 + '%');
                    var value = data.data[perf[i][0]];
                    if (value !== undefined) {
                        if (typeof value !== 'string'){
                            value = value.toFixed(4);
                        }
                    }
                    var valuetd = $('<td/>', {
                        text: value
                    });
                    nametd.appendTo(title_row);
                    valuetd.appendTo(value_row);
                    if (perf[i][1] === "贝尔纳多•勒杜瓦比率" && i < 7) {
                        nametd.attr('colspan', 2);
                        valuetd.attr('colspan', 2);
                        columnI++;
                    }
                    columnI++;
                    if (columnI === 8) {
                        columnI = 0;
                        if (i !== 0) {
                            table.append(title_row);
                            table.append(value_row);
                        }
                        title_row = $('<tr/>');
                        value_row = $('<tr/>');
                    }
                }
                if (columnI !== 0) {
                    table.append(title_row);
                    table.append(value_row);
                }

                return table;
            }

            var div_cls = "partstyle";
            if (j !== 0) {
                div_cls += " hidden";
            }
            var div = $("<div/>", {
                "class": div_cls,
                "id": "performance_part" + j
            });
            var table = getTable(perf_profit);
            $('<p/>').text("收益指数").appendTo(div);
            table.appendTo(div);
            table = getTable(perf_risk);
            $('<p/>').text("风险指数").appendTo(div);
            table.appendTo(div);
            div.appendTo($("div#performance_pages"));
            $("td.perf_name").tipsy({
                gravity: 's'
            });

        });

        $("#performance_parts a").click(function (e) {
            e.preventDefault(); //阻止a链接的跳转行为
            var numb = $(this).attr("href");
            $(numb).removeClass("hidden").siblings().addClass("hidden"); //显示当前选中的链接及关联的content
        });
        var training_end = data.training_para.training_end;

        $("#main_progress_bar").addClass("hidden").siblings().removeClass("hidden");
        API.strategy_trades({
            id: id
        }).success(function (result) {
            if (result.status === 1) {
                //console.warn("失败，再说");
                return;
            }
            $("div#trace_progress_bar").addClass("hidden").siblings().removeClass("hidden");

            $.each(result.data, function (i, item) {
                var row = $("<tr/>");
                var time = new Date(item.data.time * 1000);
                var target = item.data.target.targetname;
                row.append($("<td/>").text(time.toLocaleDateString()));
                row.append($("<td/>").text(target));
                var amount_td = $("<td/>").text(item.data.amount);
                if (item.data.amount < 0) {
                    amount_td.css('color', 'red');
                } else {
                    amount_td.css('color', 'green');
                }
                row.append(amount_td);
                $("table#trace").append(row);
            });

        });
        API.strategy_netvalue({
            id: id
        }).success(function (result) {
            var data = result.data,
                equity = [],
                position = [],
                price = [],
                drawback = [],
                dataLength = data.length,
                i = 0,
                record;

            for (i; i < dataLength; i += 1) {
                record = data[i].data;
                equity.push([
                new Date(record.time * 1000).getTime(),
                record.equity
            ]);
                position.push([
                new Date(record.time * 1000).getTime(),
                record.position // the volume
            ]);

                price.push([
                new Date(record.time * 1000).getTime(),
                record.bench // the volume
            ]);

                drawback.push([
                    new Date(record.time * 1000).getTime(),
                    -record.drawback // the volume
                ]);
            }

            var max_equity = 0;
            var max_bench = 0;
            var min_equity = equity[0][1] * 10000;
            var min_bench = price[0][1] * 10000;
            for (var ii = 0; ii < equity.length; ii++) {
                if (equity[ii][1] - min_equity < 0) {
                    min_equity = equity[ii][1];
                }
                if (equity[ii][1] - max_equity > 0) {
                    max_equity = equity[ii][1];
                }
                if (price[ii][1] - min_bench < 0) {
                    min_bench = price[ii][1];
                }
                if (price[ii][1] - max_bench > 0) {
                    max_bench = price[ii][1];
                }
            }
            console.warn(min_equity, min_bench, max_equity, max_bench);
            console.warn(equity[0][1], price[0][1]);
            var basic_equity = 1;
            if (equity[0][1] > 1) {
                basic_equity = equity[0][1];
            }
            var min_ = [min_equity / basic_equity, min_bench / price[0][1]];
            var max_ = [max_equity / basic_equity, max_bench / price[0][1]];


            min_ = Math.min(min_[0], min_[1]);
            max_ = Math.max(max_[0], max_[1]);

            // create the chart
            $('<div/>', {
                id: "container_equity",
                style: "height:400px; width: 900px"
            }).appendTo($('div#part2'));
            $('<div/>', {
                id: "container_drawback",
                style: "height: 400px; width:900px"
            }).appendTo($('div#part3'));
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
            var plotBands = [{
                from: 0,
                to: training_end * 1000,
                color: '#FFE4D0',
                //dashStyle: 'shortdash',
                //width: 2,
                label: {
                    text: '训练期',
                    verticalAlign: 'bottom',
                    y: -100

                }
                }];

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
                    min: equity[0][1] * min_,
                    max: equity[0][1] * max_,
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
                    min: price[0][1] * min_,
                    max: price[0][1] * max_,
                    height: '60%',
                    lineWidth: 2
            }, {
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    floor: 0,
                    title: {
                        text: '持仓'
                    },
                    top: '65%',
                    height: '35%',
                    offset: 0,
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
            }, {
                    name: '持股',
                    data: position,
                    yAxis: 2,
                    tooltip: {
                        valueDecimals: 2
                    }
            }]
            });
            $('#container_drawback').highcharts('StockChart', {
                "lang": lang,
                rangeSelector: rangeSelector,
                xAxis: {
                    "plotLines": plotBands
                },
                yAxis: [{
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: '金额'
                    },
                    ceiling: 0,
                    lineWidth: 2
                }],
                series: [{
                    type: "area",
                    name: '回撤',
                    data: drawback,
                    yAxis: 0,
                    tooltip: {
                        valueDecimals: 2
                    }
            }]
            });
        });
    });
    //get row
    $("#part li:first-child").children().addClass("On");
    $("#part a").click(function (e) {
        e.preventDefault(); //阻止a链接的跳转行为
        $(this).addClass("On").parent().siblings().children().removeClass("On");
        var numb = $(this).attr("href");
        $(numb).removeClass("hidden").siblings().addClass("hidden"); //显示当前选中的链接及关联的content
    });
});
