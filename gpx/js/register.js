(function ($){
    $("#submit").click(function(){
        $("#submit img").removeClass("hidden");
        API.user_reg({
            username : $("#username").val(),
            password : $("#password").val(),
            repassword : $("#repassword").val(),
            email : $("#email").val()
        }).success(function (data) {
            $("#submit img").addClass("hidden");
            if (data.status == 0){
                alert("注册成功");
                window.location.href='login.html';
            } else {
                alert("注册失败");
            }
        })
    })
})(jQuery)

