/*
 * iosSlider - http://iosscripts.com/iosslider/
 * Kalypso Template Adaptations
 */


function slideChange(args) {
	jQuery('.selectors .item').removeClass('selected');
	var sliderelement = args.currentSlideNumber;
	if(sliderelement == 1){
		jQuery('.quickh3').find('h3').css("color", "black" );
	}else if(sliderelement == 2){
		jQuery('.quickh3').find('h3').css("color", "#ffffff" );
	}else if(sliderelement == 3){
		jQuery('.quickh3').find('h3').css("color", "#ffffff" );
	}else if(sliderelement == 4){
		jQuery('.quickh3').find('h3').css("color", "#e8691a" );
	}else{
		jQuery('.quickh3').find('h3').css("color", "#a84101" );
	}
	
	jQuery('.selectors .item:eq(' + (args.currentSlideNumber-1) + ')').addClass('selected');
}

function slideComplete(args) {
	if(!args.slideChanged) return false;
	captionEffects(args);
}

function captionEffects(args){
	var caption = jQuery(args.sliderObject).find('.caption'),
		thisCaption = jQuery(args.currentSlideObject).find('.caption'),
		anim,
		animMain;
	caption.find('.title_big, .title_small, .more').attr('style', '');
	caption.find('.main_title').css({'margin-left':'', 'opacity':0});
	if(thisCaption.length > 0){
		if(thisCaption.attr('class').indexOf('fromright') <= 0) {
			anim = {left:0, opacity:1};
			animMain = {opacity:1, 'margin-left':0};
		} else {
			anim = {right:0, opacity:1};
			animMain = {opacity:1, 'margin-right':0}
		}
	}
	thisCaption.find('.more').animate(anim, 300, 'easeOutQuint');
	thisCaption.find('.title_big').delay(100).animate(anim, 400, 'easeOutQuint');
	thisCaption.find('.title_small').delay(200).animate(anim, 400, 'easeOutQuint');
	thisCaption.find('.main_title').delay(300).animate(animMain, 400, 'easeOutQuint');
}

function sliderLoaded(args, otherSettings) {
	var theSlider = args.sliderContainerObject;
	if(otherSettings.hideControls) theSlider.addClass('hideControls');
	if(otherSettings.hideCaptions) theSlider.addClass('hideCaptions');
	setTimeout(function() {
		theSlider.css('background-image','none');
	}, 1000);
	
	captionEffects(args);
	slideChange(args);
	
}
;(function($){
	$(window).load(function(e) {
		
		//************* Thumbnail tray slider animation
        var durat = 500,
			eas = 'easeInExpo',
			thumbTray = $('.selectorsBlock.thumbs'),
			thumbSelectors = thumbTray.find('img'),
			thumbTrigger = thumbTray.find('.thumbTrayButton'),
			maxLen = 5,
			thumbsMaxLen = (thumbSelectors.length >= maxLen ? maxLen : thumbSelectors.length),
			thumbsWid = (thumbSelectors.width()*thumbsMaxLen)+((thumbsMaxLen-1)*15),
			thumbIcon = thumbTrigger.find('span'),
			getOut = function(){
				thumbTray.stop().animate({bottom: "-100px"}, durat, eas);
				thumbIcon.removeClass('icon-minus').addClass('icon-plus');
			}

		thumbTray.css({'width':thumbsWid, 'margin-left':-(Math.floor(thumbsWid/2)+15)}).animate({opacity:1}, 300, function(){
			setTimeout(function() {
				getOut();
			}, 1500);
		});

		thumbTrigger.click(function(e){
			e.preventDefault();
			$(this).toggleClass('opened');
			if(thumbTrigger.hasClass('opened')){
				thumbTray.stop().animate({bottom: "-5px"}, durat, eas);
				thumbIcon.removeClass('icon-plus').addClass('icon-minus');
			} else {
				getOut();
			}
		});
		
		thumbTray.mouseleave(function (e) {
			getOut();
			thumbTrigger.toggleClass('opened');
		});
		//************* End Thumbnail tray slider
		
		// Start faded slider tweak

		//function rgb2rgba(rgb, opacity){
			//rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			//console.log(rgb);
			//return "rgba("+parseInt(rgb[1])+","+parseInt(rgb[2])+","+parseInt(rgb[3])+","+opacity+")";
		//}
		function rgb2hex(rgb, isIe) {
			rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
			//rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			function hex(x) {
				return ("0" + parseInt(x).toString(16)).slice(-2);
			}
			return (isIe?"":"#") + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		}
		
		function colorToHex(color) {
		    if (color.substr(0, 1) === '#') {
		        return color;
		    }
		    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
		    
		    var red = parseInt(digits[2]);
		    var green = parseInt(digits[3]);
		    var blue = parseInt(digits[4]);
		    
		    var rgb = blue | (green << 8) | (red << 16);
		    return digits[1] + '#' + rgb.toString(16);
		};

		var fadedSlider = $('.iosSlider.faded'),
			fadedSliderImgs = $('.iosSlider.faded .slider .item > img'),
			fadedSliderImgsHeight = Math.floor($('.iosSlider.faded .slider img').height()/2.5),
			bodyBg = $('body').css('background-color'),
			//rgbaCol = rgb2rgba(bodyBg, 0),
			distance = fadedSlider.height()-fadedSliderImgsHeight;
		/*
		gradientMask = 'background: -moz-linear-gradient(top, '+rgbaCol+' 0%, '+bodyBg+' 100%); ' +
			 'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,'+rgbaCol+'), color-stop(100%,'+bodyBg+')); ' +
			 'background: -webkit-linear-gradient(top,  '+rgbaCol+' 0%,'+bodyBg+' 100%); ' +
			 'background: -o-linear-gradient(top,  '+rgbaCol+' 0%,'+bodyBg+' 100%); ' +
			 'background: -ms-linear-gradient(top,  '+rgbaCol+' 0%,'+bodyBg+' 100%); ' +
			 'background: linear-gradient(to bottom,  '+rgbaCol+' 0%,'+bodyBg+' 100%); ' +
			 'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#00'+rgb2hex(bodyBg, true)+'", endColorstr="#ff'+rgb2hex(bodyBg, true)+'",GradientType=0 );',
		*/
		
		var style = $('<style type="text/css" />').appendTo('head');
		
		fadedSliderImgs.each(function(index, element) {
			var _t = $(this),
				//mask = '<div class="fadeMask" style="height: '+fadedSliderImgsHeight+'px; background:'+bodyBg+'; top:'+distance+'px; '+gradientMask+';"></div>';
				mask = '<div class="fadeMask" style="height: '+fadedSliderImgsHeight+'px; top:'+distance+'px;"></div>';
			$(mask).insertAfter(_t).animate({'opacity':1}, 800, 'easeInExpo');
        });
		
    });
})(jQuery);