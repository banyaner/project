$(function(){
    var str = window.location.pathname;
    url= str.match(/\/[^/?#]+(?=\?|#|$)/);
    if (url)
    {
        t=url[0].replace("/","");
    $("li a[href='"+t+"']").parent().addClass('currentit');
    $("#leftbar a[href='"+t+"']").addClass('current');
    if(t=="resource.html"){
        $("#leftbar a[href='instruction.html']").addClass('current');
    }
    if(t=="instruction.html"){
        $("li a[href='resource.html']").parent().addClass('currentit');
        $("#leftbar a[href='instruction.html']").addClass('current');
    }
    if(t=="download.html"){
        $("li a[href='resource.html']").parent().addClass('currentit');
        $("#leftbar a[href='download.html']").addClass('current');
    }
    }
    else{
        $("li a[href='index.html']").parent().addClass('currentit');
    }
});