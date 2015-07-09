/*jslint browser: true, devel: true */
/*global $*/
(function($){
    //unix时间戳转换
    function time(timestamp) {
        var unixTimestamp = new Date(timestamp * 1000) ;
        var d = new Date(timestamp * 1000);
        var year=d.getFullYear();
        var month=d.getMonth()+1;
        var day=d.getDate();
        var jstimestamp = (d.getFullYear())+"-"+(d.getMonth()+1)+"-"+ (d.getDate());
        return jstimestamp;
    }

    var url = (function(){
        var url = window.document.location.href.toString();
        var u = url.split("?");
        if(typeof(u[1]) == "string"){
            u = u[1].split("&");
            var get;
            for(var i in u){
                var j = u[i].split("=");
                get = j[1];
            }
            return get;
        } else {
            return {};
        }
    })();
    function moveColumnsFormulasToHigh() {
        var formulas = "";
        var columns = "";
        $.each($("#chosen option"), function (i, item) {
            if (i !== 0) {
                columns += ", ";
            }
            columns += $(item).attr('column');
            var thisformula = $(item).attr('formulas');
            if (thisformula !== "") {
                formulas += thisformula + "\n";
            }
        });
        $("#high_columns").val(columns);
        console.log("hhhhh");
        $('#high_formulas').val(formulas);
    }
    var b = all_stocks_map;
    $('#target').keyup(function(){
        var code = $('#target').val();
        $('#hintbox').empty();
        if (code.length < 2) {
            $('#hintbox').css('display','none');
            return;
        } else {
            $.each(b, function (i, e) {
                var key = i;
                if (key.indexOf(code)==0) {
                    $('#hintbox').css('display','block');
                    $('#hintbox').append(
                        $('<li/>')
                            .append($('<span/>').text(key + ': '))
                            .append($('<span/>').text(b[key]))
                            .click(function () {
                                $(this).addClass("yellow");
                                var f=key + ': ' + b[key];
                                $('#target').val(f);
                                
                            })
                    )
                }
            });
        }
    });
     $("#add").click(function () {
        $('#hintbox').css('display', 'none');
        var x = $('#targets option');
        $("#hintbox").children(".yellow").each(function(){
            var exist = false;
            var f=$(this).children("span:first").text();
            var targetval = f.split(': ')[0];
            for(var i=0;i<x.length;i++) {
                if(targetval===$(x[i]).text()){
                    exist =true;
                    break;
                }
            }
            if (exist===false){
                $("#targets").append($('<option>').text(targetval));
            }
        });
        $("#target").val("");
    });
    $("#del1").click(function () {
        $("#targets option:checked").remove();
    });
    $("#empty1").click(function () {
        $("#targets option").remove();
    });

    //修改高级模式


    $("#del2").click(function () {
        $("#chosen option:checked").remove();
    });
    $("#empty2").click(function () {
        $("#chosen option").remove();
    });
    //指标选择

    $("#highmodel").click(function () {
        $("#easymodel").toggleClass("hidden");
        $("#model").toggleClass("hidden");
        moveColumnsFormulasToHigh();
    });

    $("#toEasyModel").click(function () {
        $("#easymodel").toggleClass("hidden");
        $("#model").toggleClass("hidden");
    });
    //遗传参数的显示
    $("#para").click(function(){
         if ($(this).text()=="点击展开遗传参数设置") {
            $(this).text("点击折叠遗传参数设置");
           }
           else
           {
            $(this).text("点击展开遗传参数设置");
        };
        $("#paracontent").toggleClass("hidden");
    });
    $('input[name="quantity"]').on('change', function () {
        var i = $(this).val();
        if (i == 1) {
            $(".single").removeClass("hidden");
            $(".multi").addClass("hidden");
        } else {
            $(".single").addClass("hidden");
            $(".multi").removeClass("hidden");
        }
    });
    var index = [
            ["最高价", ["", "HIGH"]],
            ["最低价", ["", "LOW"]],
            ["成交量", ["", "VOLUME"]],
            ["收盘价", ["", "CLOSE"]],
            ["开盘价", ["", "OPEN"]],
            ["累积分布线", ["ADL=ADL()", "ADL"]],
            ["累计摆动指标", ["ASI=ASI()", "ASI"]],
            ["顺势指标/商品通道指标 ", ["CCI=CCI(14)", "CCI"]],
            ["佳庆资金流量指标", ["CMF=CMF(14)", "CMF"]],
            ["钱德动量摆动指标", ["CMO=CMO(12,6)", "CMO"]],
            ["动态平均", ["DMA_DDD=DMA_DDD()", "DMA_DDD"]],
            ["指数移动平均", ["EMA=EMA(5,CLOSE)", "EMA"]],
            ["ATR_ATR", ["ATR_ATR=ATR_ATR(14)", "ATR_ATR"]],
            ["ATR_TR", ["ATR_TR=ATR_TR(14)", "ATR_TR"]],
            ["BOLL_MID", ["BOLL_MID=BOLL_MID(26,2)", "BOLL_MID"]],
            ["BOLL_UPPER", ["BOLL_UPPER=BOLL_UPPER(26,2)", "BOLL_UPPER"]],
            ["BOLL_LOWER", ["BOLL_LOWER=BOLL_LOWER(26,2)", "BOLL_LOWER"]],
            ["Aroon_Up", ["Aroon_Up=Aroon_Up(10)", "Aroon_Up"]],
            ["Aroon_Down", ["Aroon_Down=Aroon_Down(10)", "Aroon_Down"]],
            ["DMA_AMA", ["DMA_AMA=DMA_AMA()", "DMA_AMA"]],
            ["DMI_PDI", ["DMI_PDI=DMI_PDI()", "DMI_PDI"]],
            ["DMI_MDI", ["DMI_MDI=DMI_MDI()", "DMI_MDI"]],
            ["DMI_ADX", ["DMI_ADX=DMI_ADX()", "DMI_ADX"]],
            ["DMI_ADXR", ["DMI_ADXR=DMI_ADXR()", "DMI_ADXR"]]
                  ]; //content,name,value
    for (var i = 0; i < index.length; i++) {
        $("<li/>", {
            formulas: index[i][1][0],
            column: index[i][1][1],
            text: index[i][0]
        }).appendTo("#indicator");

    }
    $("#indicator li").hover(function(){
        $(this).addClass("hovercolor").siblings().removeClass("hovercolor");
    })
    $("#indicator li").click(function () {
        var text = $(this).text();
        var formulas = $(this).attr("formulas");
        var column = $(this).attr("column");
        if (!$('#chosen').text()){
            $("#chosen")
                .append($("<option/>", {"column": column, "formulas": formulas, "text": text}));
        } else {
            x = $('#chosen option');
            for(var i = 0; i < x.length; i++){
                if (text == $(x[i]).text()) {
                    return;
                }
            }
            $("#chosen")
                .append($("<option/>", {"column": column, "formulas": formulas, "text": text}));
            }
    });



/* send  */
    var data = {
        strategy_name: "",
        strategy_intro: "",
        targets: [],
        interval: "24h",
        start: "2012-01-01",
        end: "2014-01-01",
        initial_stock: 0,
        initial_future:0,
        cash_check: "false",
        strategy_type: "",
        iteration: 30,
        gene_size: 200,
        elite: 20,
        mutate: 0.2,
        cross_over: 0.3,
        formulas: [],
        columns: [],
        result_size:1,
        fitness_type:""
    };
    //$('#t-title').on('change', function () {
    //    data.strategy_name = $(this).val();
    //});
    //$('#t-size').on('change', function () {
    //    data.result_size = $(this).val();
    //});
    //
    //
    //$('input[name="interval"]').on('change', function () {
    //    data.interval = $(this).val();
    //});
    //$('input.aaa').on('click', function () {
    //
    //});
    //$('#begintime').on('change', function () {
    //    data.start = $(this).val();
    //});
    //$('#endtime').on('change', function () {
    //    data.end = $(this).val();
    //});
    //$('#t-cash').on('change', function () {
    //    data.initial_stock = $(this).val();
    //});
    $('#t-size').on('change', function () {
        data.result_size = $(this).val();
    });
    $('input[name="cash_check"]').on('change', function () {
        data.cash_check = $(this).val();
    });
    $("#tragetycont li").hover(function () {
        $(this).addClass("hovercolor").siblings().removeClass("hovercolor");
    });
    $("#tragetycont li").click(function () {
        var chosen = $(this).attr("name");
        $("#tragetymodel").val($(this).text());
        data.strategy_type = chosen;
        console.log("ggg");
    });

    $("#fitnesstype li").hover(function () {
        $(this).addClass("hovercolor").siblings().removeClass("hovercolor");
    });
    $("#fitnesstype li").click(function () {
        var chosen = $(this).attr("name");
        $("#fitness").val($(this).text());
        data.fitness_type =$(this).text();
    });


    $('#iteration').on('change', function () {
        data.iteration = $(this).val();
    });
    $('#population').on('change', function () {
        data.gene_size = $(this).val();
    });
    $('#elite').on('change', function () {
        data.elite = $(this).val();
    });
    $('#mutation').on('change', function () {
        data.mutate = $(this).val();
    });
    $('#crossover').on('change', function () {
        data.cross_over = $(this).val();
    });
    $('#strategy_intro').on('change', function () {
        data.strategy_intro = $(this).val();
    });
    $('#t-size').on('change', function () {
        data.result_size = $(this).val();
    });
    /* 添加其它 */
    function checkSecPage(){
        $(".red").remove();
        var targets = $('#targets').text();
        var cash = $('#t-cash').val();
        if (!cash) {
            $("#t-cash").parent().next().after("<span class='red'>策略金额不能为空</span>");
        }
        else{
            $("#t-cash").siblings().remove();
        }
        if (!targets) {
            $("#targets").parent().append("<p class='red'>标的不能为空</p>");
        }
        else{
            $("#targets").siblings().remove();
        }

        if (!cash||!targets) {
            return 0;
        }
        else{
            return 1;
        }
    }
    $("#next").click(function () {
        $(".red").remove();
        var title = $('#t-title').val();
        var strategy = $('#strategy_intro').val();
        var strategymodel = $('#tragetymodel').val();
        if (!title) {
            $("#t-title").parent().after("<p class='red'>策略名称不能为空</p>");
        }
        else if (title){
            $("#t-title").siblings().remove();
        }
        if (!strategy) {
            $("#strategy_intro").parent().append("<p class='red'>策略简介不能为空</p>");
        }
        else{
            $("#strategy_intro").siblings().remove();
        }
        if (!strategymodel) {
            $("#tragetymodel").parent().after("<span class='red'>策略模块不能为空</span>");
        }
        else{
            $("#tragetymodel").siblings('span').remove();
        }
        if (!title||!strategymodel||!strategy) {
            return;
        }
            else if(!$('#model').hasClass('hidden')){
            $('#load').removeClass('hidden');
            data.columns = $('#high_columns').val().trim().split(',');
            data.columns = $.map(data.columns, function (item) {
                return item.trim();
            });
            data.formulas = $('#high_formulas').val().trim().split('\n');
            data.formulas = $.map(data.formulas, function (item) {
                return item.trim();
            });
            var strategy_current=$('#tragetymodel').val();
            data.strategy_type=$("li:contains("+strategy_current+")").attr('name');
            console.log(data.strategy_type);
            API.strategy_check_params({
                columns:data.columns,
                formulas:data.formulas,
                interval:data.interval,
                strategy_type:data.strategy_type
            }).success(function (data) {
                if (data.status == 1) {
                    $('#toEasyModel').append("<p class='red'>高级模式编辑有误！</p>");
                    $('#load').addClass('hidden');
                    return;
                }
                else{
                    $("#form1").addClass("hidden");
                    $("#form2").removeClass("hidden");
                }
            });
        }
                else if($('#model').hasClass('hidden')){
            $("#form1").addClass("hidden");
            $("#form2").removeClass("hidden");
        }

    });

    $("#pre1").click(function () {
        $('#load').addClass('hidden');
        $("#form2").addClass("hidden");
        $("#form1").removeClass("hidden");
    });
    var submitstrategy=function(){
        $("#submitstrategy").on('click', function () {
            //获取第一页的数据
            data.strategy_name = $('#t-title').val();
            data.strategy_intro=$('#strategy_intro').val();
            data.interval = $('input[name="interval"]').val();
            data.start = $('#begintime').val();
            data.end = $('#endtime').val();
            data.initial_stock = $('#t-cash').val();
            data.result_size = $('#t-size').val();
            data.fitness_type=$('#fitness').val();
            //获取第二页的数据
            checkSecPage();
            var chosen = $('#chosen').text();
            var strategymodel = $("#tragetymodel").val();
            var fitness = $('#fitness').val();
            if (!fitness) {
                $("#fitness").parent().after("<span class='red'>FITNESS不能为空</span>");
            }
            else {
                $("#fitness").siblings().remove();
            }
            if (!chosen) {
                $("#chosen").parent().append("<p class='red'>指标选择不能为空</p>");
            }
            else {
                $("#chosen").siblings().remove();
            }
            if (!strategymodel) {
                $("#tragetymodel").parent().after("<span class='red'>策略模块不能为空</span>");
            }
            else {
                $("#tragetymodel").siblings().remove();
            }
            if (!chosen || !strategymodel || !fitness) {
                return;
            }
            ;
            var typevalue = "stock";
            if (data.product_type == 1) {
                typevalue = "futures";
            }
            data.targets = [];
            $('#targets option').each(function () {
                data.targets.push(typevalue + "/" + $(this).text());

            });
            for (var i = 0; i < data.length; i++) {

            }
            /* 计算f和c */
            if ($("#model").hasClass("hidden")) {
                moveColumnsFormulasToHigh();
            }
            data.columns = $('#high_columns').val().trim().split(',');
            data.columns = $.map(data.columns, function (item) {
                return item.trim();
            });
            data.formulas = $('#high_formulas').val().trim().split('\n');
            data.formulas = $.map(data.formulas, function (item) {
                return item.trim();
            });
            API.strategy_new(data).success(function (data) {
                if (data.status == 1) {
                    alert("您填入的信息有误，请重新新建策略！");
                } else {
                    alert("提交成功！");
                    setTimeout(function () {
                        window.location.href = 'generation.html';
                    }, 1000);
                }
            }).fail(function () {
                    alert("新建失败！");
                }
            );
        });
    };
    submitstrategy();


    if(url){
        API.strategy_params({strategy_id:url}).success(function(data){
            $('#t-title').attr('value',data.data.basic_param.strategy_name);
            $('#strategy_intro').val(data.data.basic_param.strategy_intro);
            console.log(data.data.basic_param.strategy_intro);
            $('#t-cash').attr('value',data.data.running_param.initial_stock);
            $('#begintime').attr('value',time(data.data.running_param.start));
            $('#endtime').attr('value',time(data.data.running_param.end));
            $('#fitness').attr('value',data.data.gene_param.fitness_type);
            var type=$("li[name="+data.data.train_param.type+"]").text();
            $('#tragetymodel').attr('value',type);
            $("input[value="+data.data.running_param.cash_check+"]").attr('checked','checked');
            $("input[value="+data.data.train_param.interval+"]").attr('checked','checked');

            $('#iteration').attr('value',data.data.gene_param.iteration);
            $('#population').attr('value',data.data.gene_param.gene_size);
            $('#elite').attr('value',data.data.gene_param.elite);
            $('#mutation').attr('value',data.data.gene_param.mutate);
            $('#crossover').attr('value',data.data.gene_param.cross_over);
            $('#t-size').attr('value',data.data.gene_param.result_size);
            var targetschosen=data.data.running_param.targets;
            for(var i=0;i<targetschosen.length;i++){
                var numb=targetschosen[i].split('/');
                $('#targets').append("<option>"+numb[1]+"</option>");
                console.log(targetschosen[i]);
            }
            var formulas=data.data.train_param.formulas;
            if(formulas){
                for(var j=0;j<formulas.length;j++){
                    var str="";
                    str=str+formulas[j]+"\n";
                }
                console.log(str);
                $('#high_formulas').val(str);
            }
            var columns=data.data.train_param.columns;
            for(var m=0;m<columns.length;m++){
                var p="";
                p=p+columns[m]+",";
                console.log("COLUMN"+columns[m]);
                var formulas=$('li[column='+columns[m]+']').attr("formulas");
                var text=$('li[column='+columns[m]+']').text();
                console.log(formulas);
                console.log("text:"+text);
                $("#chosen")
                    .append($("<option/>", {"column": columns[m], "formulas": formulas, "text": text}));
            }
            $('#high_columns').val(p);
            console.log(p);
            submitstrategy();
            $("#easymodel").toggleClass("hidden");
            $("#model").toggleClass("hidden");
            moveColumnsFormulasToHigh();
            $('#toEasyModel').addClass('hidden');
        }).fail(function(){
            alert("内部出错");
        });
    }

    var pageIndex = 0;     //页面索引初始值
    var size = 5;     //每页显示条数初始化，修改显示条数
    //生成中
    var refresh_generating=function() {
        //initgenerating(0);
        API.strategy_my({
            type: 'Running',
            offset: 0,
            size: 10,
            sort_column: 'strategy_id',
            sort_dir: 1
        }).success(function (data) {
            $("#pagination0").pagination(data.data.total, {
                callback: PageCallback,  //PageCallback() 为翻页调用次函数。
                prev_text: "« 上一页",
                next_text: "下一页 »",
                items_per_page: size,
                num_edge_entries: 2,       //两侧首尾分页条目数
                num_display_entries: size,    //连续分页主体部分分页条目数
                current_page: 0,   //当前页索引
            });
        });
        function PageCallback(offset, jq) {
            initgenerating(offset);
        }

        function initgenerating(offset) {
            API.strategy_my({
                type: 'Running',
                offset: offset*size,
                size: size,
                sort_column: 'strategy_id',
                sort_dir: 1
            }).success(function (data) {
                var body = $("tbody#generating");
                body.empty();
                $.each(data.data.data, function (i, item) {

                    console.log(item);
                    var name = $("<td/>").append(
                        $("<a/>", {
                            href: "privatedetail.html?id=" + item.strategy_id,
                            text: item.strategy_name,
                        }));
                    var row = $('<tr/>').append(name).attr("id", item.strategy_id);
                    var fitness = item.value.fitness;
                    var perfvalue = item.progress;
                    perfvalue = perfvalue.toFixed(4);
                    $('<td/>').text(fitness).appendTo(row);
                    $('<td/>').text(perfvalue).appendTo(row);
                    var singlebtn = '<div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle hjb" data-toggle="dropdown" aria-expanded="false">                    选项 <span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li><a href="#" class="ac-trade">重新训练</a></li><li><a href="#" class="ac-del">删除</a></li></ul></div>';
                    //row.append($("<td/>").html('<input type="button" id="enter" class="btn btn-default ox" value="接入实盘">')).appendTo(body);
                    row.append($("<td/>").html(singlebtn)).appendTo(body);

                });
                operatedel();
            });
        };
    };
    //已生成
    var refresh_generated=function() {
        console.log('aaa');

        //initgenerated(0);
        API.strategy_my({
            type: 'Finished',
            offset: 0,
            size: 10,
            sort_column: 'strategy_id',
            sort_dir: 1
        }).success(function (data) {
            console.log('hhh');

            $("#pagination").pagination(data.data.total, {
                callback: PageCallback,  //PageCallback() 为翻页调用次函数。
                prev_text: "« 上一页",
                next_text: "下一页 »",
                items_per_page: size,
                num_edge_entries: 2,       //两侧首尾分页条目数
                num_display_entries: size,    //连续分页主体部分分页条目数
                current_page: 0,   //当前页索引
            });
        }).fail(function(data){
            console.log('asdf');
        });
        function PageCallback(offset, jq) {
            initgenerated(offset);
        }

        function initgenerated(offset) {
            API.strategy_my({
                type: 'Finished',
                offset: offset*size,
                size: size,
                sort_column: 'strategy_id',
                sort_dir: 1
            }).success(function (data) {

                var body = $("tbody#generated");
                body.empty();
                $.each(data.data.data, function (i, item) {
                    var name = $("<td/>").append(
                        $("<a/>", {
                            href: "privatedetail.html?id=" + item.strategy_id,
                            text: item.strategy_name,
                        }));
                    var row = $('<tr/>').append(name).attr("id", item.strategy_id);
                    var names = ['Annualized', 'DRatio', 'MaxDrawdown', 'AverageRecovery'];
                    $.each(names, function (j, name) {
                        var perfvalue = parseInt(item.value[name]);
                        perfvalue = perfvalue.toFixed(4);

                        $('<td/>').text(perfvalue).appendTo(row);
                    });
                    console.log('okokokokok')
                    var singlebtn = '<div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle hjb" data-toggle="dropdown" aria-expanded="false">选项<span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li><a href="#" data-toggle="modal" data-target="#modal" class="ac-enter">接入实盘</a></li><li><a href="#" class="ac-trade">重新训练</a></li>  <li><a href="#" class="ac-test" data-toggle="modal" data-target="#modal">重新回测</a></li> <li><a href="#" class="ac-del">删除</a></li></ul></div>';
                    //row.append($("<td/>").html('<input type="button" id="enter" class="btn btn-default ox" value="接入实盘">')).appendTo(body);
                    row.append($("<td/>").html(singlebtn)).appendTo(body);
                });
                operatedel();
                operate();
            });
        };
    };
    //失败
    var refresh_fail=function() {
        //initfail(0);

        API.strategy_my({
            type: 'Fail',
            offset: 0,
            size: 10,
            sort_colum: 'strategy_id',
            sort_dir: 1
        }).success(function (data) {
            $("#pagination1").pagination(data.data.total, {
                callback: PageCallback,  //PageCallback() 为翻页调用次函数。
                prev_text: "« 上一页",
                next_text: "下一页 »",
                items_per_page: size,
                num_edge_entries: 2,       //两侧首尾分页条目数
                num_display_entries: size,    //连续分页主体部分分页条目数
                current_page: 0,   //当前页索引
            });
        });
        function PageCallback(offset, jq) {

            initfail(offset);
        }

        function initfail(offset) {
            API.strategy_my({
                type: 'Fail',
                offset: offset*size,
                size: size,
                sort_colum: 'strategy_id',
                sort_dir: 1
            }).success(function (data) {
                $.each(data.data.data, function (i, item) {
                    var body = $("tbody#fail").empty();
                    console.log(item);
                    var name = $("<td/>").append(
                        $("<a/>", {
                            href: "privatedetail.html?id=" + item.strategy_id,
                            text: item.strategy_name,
                        }));
                    var row = $('<tr/>').append(name).attr("id", item.strategy_id);
                    $('<td/>').text(item.err).appendTo(row);
                    console.log('hello');
                    var singlebtn = '<div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle hjb" data-toggle="dropdown" aria-expanded="false">                    选项 <span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li><a href="#" class="ac-trade">重新训练</a></li><li><a href="#" class="ac-del">删除</a></li></ul></div>';
                    row.append($("<td/>").html(singlebtn)).appendTo(body);
                });
                operatedel();
            });
        };
    };

    refresh_generating();
    $('#g-generating').click(function(){
        refresh_generating();
    });
    $('#g-generated').click(function(){
        refresh_generated();
    });
    $('#g-fail').click(function(){
        refresh_fail();
    });


//操作
//获取点击元素的href的值
    var operatedel=function() {
        $('.ac-del').click(function () {
            var strategy_id = $("button[aria-expanded='true']").parents('tr').attr('id');
            API.strategy_delete({'strategy_id': strategy_id}).success(function () {
                alert("删除成功！");
                refresh_generating();
                refresh_generated();
                //refresh_fail();
            });
        });
        $('.ac-trade').click(function (e) {
            var strategy_id = $("button[aria-expanded='true']").parents('tr').attr('id');
            window.location.href='tool.html?id='+strategy_id;
        });
    };
    var operate=function(){
        $('.ac-enter').click(function (e) {
            $('#myModalLabel').text('接入实盘');
            $("input[value='false']").attr('disabled', 'true');
            $('#submit-online').removeClass('hidden');
            $('#submit-backtest').addClass('hidden');
            var strategy_id = $("button[aria-expanded='true']").parents('tr').attr('id');
            $('#submit-online').click(function () {
                var typevalue = "stock";
                if (data.product_type == 1) {
                    typevalue = "futures";
                    data.targets = [];
                    $('#targets option').each(function () {
                        data.targets.push(typevalue + "/" + $(this).text());
                    });
                }
                if (checkSecPage()) {
                    data.start = $('#begintime').val();
                    data.end = $('#endtime').val();
                    data.initial_stock = $('#t-cash').val();
                    API.strategy_set_online({
                            'strategy_id': strategy_id,
                            'initial_stock': data.initial_stock,
                            'initial_future': 0,
                            'targets': data.targets,
                            'start': data.start,
                            'cash_check': true
                        }).success(function (data) {
                        if (status == 0) {
                            alert('提交修改成功！');
                            window.location = "generation.html";
                            $(this).parents('tr').children().first().children().after("<span class='tinyinfo'>实</span>");
                        }
                        else {
                            alert(data.message);
                        }
                    }).fail(function () {
                            alert("内部错误");
                            window.location="generation.html";
                        });
                };
            });
        });
        $('.ac-test').click(function (e) {
            $('#myModalLabel').text('回测');
            $('input').removeAttr('disabled');
            $('#genepara').addClass('hidden');
            var strategy_id = $("button[aria-expanded='true']").parents('tr').attr('id');
            $('#submit-backtest').removeClass('hidden');
            $('#submit-online').addClass('hidden');
            API.strategy_params({'strategy_id':strategy_id}).success(function(data){
               if(status==0){
                   $('#t-cash').attr('value',data.data.running_param.initial_stock);
                   $("input[value="+data.data.running_param.cash_check+"]").attr('checked','checked');
                   $('#begintime').attr('value',time(data.data.running_param.start));
                   $('#endtime').attr('value',time(data.data.running_param.end));
                   var targetschosen=data.data.running_param.targets;
                   for(var i=0;i<targetschosen.length;i++){
                       var numb=targetschosen[i].split('/');
                       $('#targets').append("<option>"+numb[1]+"</option>");
                       console.log(targetschosen[i]);
                   }
               }
                else if(status==1){
                   alert('请重试');
               }
            }).fail(function(){
                alert('内部错误');
            });


                $('#submit-backtest').click(function () {
                    var typevalue = "stock";
                    if (data.product_type == 1) {
                        typevalue = "futures";
                    }
                    data.targets = [];
                    $('#targets option').each(function () {
                        data.targets.push(typevalue + "/" + $(this).text());

                    });
                    console.log('amy');
                    if (checkSecPage()) {
                        console.log('ammmmmf');
                        data.initial_stock = $('#t-cash').val();
                        API.strategy_backtest({
                            'strategy_id': strategy_id,
                            'initial_stock': data.initial_stock,
                            'initial_future': 0,
                            'targets': data.targets,
                            'start': data.start,
                            'end': data.end,
                            'cash_check': false
                        }).success(function () {
                            alert("回测修改成功！");
                            $('button[data-dismiss="modal"]').trigger('click');
                        }).fail(function () {
                            alert('内部错误');
                        });
                    }
                });

        });
    };

})(jQuery);
