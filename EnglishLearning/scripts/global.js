  //登录和注册 
    $(function(){  
      setTimeout( function() {  
        var logBtn = $('.login'),
            regBtn = $('.register'),
            closeBtn = $('.winOff a');
        console.log(logBtn);

        logBtn.on('click',function(){
          $('.mask').show();
          $('.regWin').hide();
          $('.loginWin').show();
        });

        regBtn.on('click',function(){
          $('.mask').show();
          $('.loginWin').hide();
          $('.regWin').show();
        });

        closeBtn.on('click',function(){
          $('.l-h-box').hide();
          $('.mask').hide();
        });

      },500)
    })