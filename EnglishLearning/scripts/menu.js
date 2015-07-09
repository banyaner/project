// JavaScript Document
$(function(){
	$('.sty,.sMenu').on('mouseover',function(){
		$('.sMenu').show();
		$('.sty').addClass('styHover');
	});
	$('.sty,.sMenu').on('mouseout',function(){
		$('.sMenu').hide();
		$('.sty').removeClass('styHover');
	});
	$('.mySt,.syMenu').on('mouseover',function(){
		$('.syMenu').show();
		$('.mySt').addClass('myHover');
	});
	$('.mySt,.syMenu').on('mouseout',function(){
		$('.syMenu').hide();
		$('.mySt').removeClass('myHover');
	});
	
	$('.sptit,.spchir').on('mouseenter',function(){
                
                var index = 0;
                if($(this).hasClass('sptit')){
                     index= $('.sptit').index(this);
                    $(this).siblings('.spchir').show();
                    $('.spchir').not($('.spchir')[index]).hide();
                }else{
                    index = $('.spchir').index(this);
                }
                $('.sptit').removeClass('sptHover').eq(index).addClass('sptHover');
            });

            $('.leftPopup').on('mouseleave',function(){
                $('.spchir').hide();
                $('.sptit').removeClass('sptHover');
            });
			
			$('.sptit2,.spchir2').on('mouseenter',function(){
                
                var index = 0;
                if($(this).hasClass('sptit2')){
                     index= $('.sptit2').index(this);
                    $(this).siblings('.spchir2').show();
                    $('.spchir2').not($('.spchir2')[index]).hide();
                }else{
                    index = $('.spchir2').index(this);
                }
                $('.sptit2').removeClass('sptHover2').eq(index).addClass('sptHover2');
            });

            $('.leftPopup').on('mouseleave',function(){
                $('.spchir2').hide();
                $('.sptit2').removeClass('sptHover2');
            });

            var loadHeight = $(window).height() / 5 ;
            $('.leftPopup').css('top', loadHeight+'px');

            showScroll();
            function showScroll(){
                $(window).scroll( function() {
                    var scrollValue=$(window).scrollTop(),
                        winHeight = $(window).height();

                    var totalScroll = scrollValue + (winHeight / 5),
                        reportSroll = 100 + scrollValue;

                    //console.log(scrollValue,winHeight);
                    if(scrollValue>0){
                        $('.leftPopup').show().stop().animate({top:totalScroll},'slow');
                        //$('.reportWin').stop().animate({top:reportSroll},'slow');
                    }
                } );
                $('.leftPopup').click(function(){
                    $("html,body").animate({scrollTop:0},200);
                }); 
            }
			

})
