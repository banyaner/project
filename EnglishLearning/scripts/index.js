$(function(){
	var enterInputs = $('li .input'),
		logOpenBtn = $('.fogPsd a'),
		logCloseBtn = $('.logClose'),
		logBox = $('#fogetPsd'),
		mask = $('.mask'),
        regBtn = $('.topReg a');
	enterInputs.on('focus',function(){
        $(this).siblings().hide();
		$(this).removeClass('in_current').addClass('in_show');
	});
    enterInputs.on('blur',function(){
        if($(this).val() == ''){
            $(this).siblings().show();
        }
        $(this).removeClass('in_show').addClass('in_current');
    });
	logCloseBtn.on('click',function(){
		$(this).parent().hide();
		mask.hide();
		return false;
	});
    
	logOpenBtn.bind('click',function(){
		mask.show();
		logBox.show();
		return false;
	});
    regBtn.bind('click',function(){
        mask.show();
        $('#fsMail').show();
        return false;
    });
	var ImgSlide = new Slide({
        box: '.autoIco',
        imgBox: '.icoMain ul',
        lb: '.icoLeft a',
        rb: '.icoRight a',
        width: 320,
        imgs: 'li'
    });

});