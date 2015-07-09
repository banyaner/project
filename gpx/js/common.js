

$(document).ready(function () {
    var username = $.cookie("username");
    var login = $('.topbar a[href="login.html"]');
    if (login){
        var bar = login.parent();
        if (username) {
            bar.empty();
            bar.append($("<a/>",{href:"#",id:"exit",text:"退出"}))
                .append($("<a/>",{href:"generation.html",text:username}));
        } 
        bar.fadeIn();
        //bar.css("display","block");
    }

    $(".topbar #exit").click(function(){
        API.user_logout().success(function(data){
            if (data.status === 0) {
                location.href="index.html";
            }
        });

    });
});
//fix foot
$(window).bind("load",function() {
    var footerHeight = 0,
    footerTop = 0,
    $footer = $(".footer");
    positionFooter();
    function positionFooter() {
        footerHeight = $footer.height();
        footerTop = ($(window).scrollTop() + $(window).height() - footerHeight) + "px";
        if (($(document.body).height() + footerHeight) < $(window).height()) {
            $footer.css('position', "absolute");
            $footer.css('bottom', "0");
        } else {
            $footer.css({position: "static"});
        }
    }
    $(window).scroll(positionFooter).resize(positionFooter);
});
