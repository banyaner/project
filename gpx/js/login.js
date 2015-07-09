(function ($){

    $("#login").click(function(){
        $("#login img").removeClass("hidden");
        API.user_login({username: $("#username").val(),password: $("#password").val()}).success(function(data){
            if (data.status == 1) {
                alert("用户名或密码错误！");
                $("#login img").addClass("hidden");
            } else if (data.status == 0) {
                //add_cookie("username", data['data']['username'], 10);
                //add_cookie("gpxtoken", data['data']['gpxtoken'], 10);
                window.location.href='generation.html';
            }
        });
    });
    $("#password").on('keyup',function(e){
      if(e.keyCode === 13){
          $("#login").trigger("click");
          $("#login img").removeClass("hidden");
    }
    });

})(jQuery)
