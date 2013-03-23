(function($){
	$.fn.simpleResponsiveSlide=function(options){
		var settings=$.extend({
			nextControl: null,
			prevControl: null,
			pagination: null,
			delay: 100
		},options||{});

		//initialize
		settings.currentPage=0;
		settings.slideList$ = this.children('ul');
		settings.totalPage=settings.slideList$.children('li').length;
		settings.slideList$.children('li').first().clone().appendTo(settings.slideList$);
		settings.slideList$.css('width',(settings.totalPage+1)*100+'%')
		settings.slideList$.children('li').each(function(n){ 
			$(this).data('slideIndex',n);
		}).css('width',100/(settings.totalPage+1)+'%');

		$(settings.pagination).children('a').each(function(n){
			$(this).data('targetIndex',n);
		}).click(function(event){
			$(this).addClass('active');
			slideTo($(this).data('targetIndex'));
		});

		$(settings.nextControl).click(function(){
			settings.currentPage++;
			slideTo(settings.currentPage);
		});
		$(settings.prevControl).click(function(){
			if(settings.currentPage==0){
				settings.currentPage=settings.totalPage;
				settings.slideList$.css('left',settings.currentPage*(-100)+'%');
			}
			settings.currentPage--;
			slideTo(settings.currentPage);
		});

		function slideTo(slideIndex){
			settings.slideList$.animate({
				left: slideIndex*(-100)+'%'
			},settings.delay,function(){
				if(slideIndex>=settings.totalPage){
					$(this).css('left','0');
					settings.currentPage=0;
				}else{
					settings.currentPage=slideIndex;
				}
				$(settings.pagination).children('a').filter('.active').removeClass('active');
				$(settings.pagination).children('a').eq(settings.currentPage).addClass('active');
			});
		}
		return this;
	};
})(jQuery);