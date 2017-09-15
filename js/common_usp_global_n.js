// function sendClickCode(event, target){
// 	console.log(event, target);
// }

/* $.addViewportEvent.js */
/**
 * jQuery plugin : $.addViewportEvent
 * Created by bom-studio(lee sang-hwa) on 2016-06
 *
 * ===================================================================
 *  $(obj).addViewportEvent(param) //param = option

 triggerPosition //鞀ろ伂毽� 靹鸽 臧掛棎 鞓る笇鞝濏姼 靸侂嫧鞚� 鞙勳箻頃橃榾鞚� 瓴届毎(px)
 triggerPositionPercent //鞀ろ伂毽� 靹鸽 臧掛棎 鞓る笇鞝濏姼 靸侂嫧鞚� 鞙勳箻頃橃榾鞚� 瓴届毎(%)

 *
 *  Extend Method :>
 *      destroy() //event 鞝滉卑
 *
 * ===================================================================*/


 
;(function($) {


window.P5_APPS_USP = {
	
	isMobile: $.browser.mobile,
	isPoorBrowser: $.browser.ie && 9 > $.browser.ie,
	parallaxAble: !($.browser.ie && 9 > $.browser.ie) && /* !$.browser.mobile && */ $.support.transition,
	areaWidth: 0,
	areaHeight: 0,
	prevSizeMode: -1,
	sizeMode: 0,
	scrollBarWidth: 0,
	scrollTop: 0,
	motionActive : 0,
	scrollFunctions: [],
	resizeFunctions: [],
	readyFunctions: [],
	loadFunctions: [],
	bxSliderArray : [],
	initialized: false,
	
	
	addViewportEvent : function (param, target) {
			var events = 'scroll.addViewportEvent load.addViewportEvent resize.addViewportEvent';
			param = $.extend({
				parent : window,
				a11y: false,
				triggerPosition:false,
				triggerPositionPercent:false,
				enter : false,
				leave : false,
				progress : false,
				visiblePercent :false,
				visible :false,
				invisible :false,
				fullVisible :false
			}, param || {});
			if(typeof(param.triggerPosition && param.triggerPositionPercent) == 'number') {
				console.warn('px臧掙臣 %臧掛澊 欷戨车 鞝侅毄 霅� 靾� 鞐嗢姷雼堧嫟.');
				return true;
			}
			var methods = $.fn.extend({
				destroy : function(){
					$(param.parent).off(events);
				}
			});
			return target.each(function(idx, obj){
				var isEnter = false;
				var isVisible = false;
				var isActive = false;
				var isFullVisible = false;
				var visiblePercent = 0;
				var parent = param.parent;
				//if(param.triggerPosition)
				$(parent).on(events, function(){
					var returnValue = {
						Height : $(obj).outerHeight(),
						ViewportHeight : $(parent).height(),
						ScrollTop : $(document).scrollTop(),
						OffsetTop : $(obj).offset().top
					};
					var visiblePerTopPercent = ((returnValue.ScrollTop + returnValue.ViewportHeight - returnValue.OffsetTop) / returnValue.Height * 100).toFixed(2);
					var visiblePerBottomPercent = -((returnValue.ScrollTop - returnValue.OffsetTop - returnValue.Height) / returnValue.Height * 100).toFixed(2);
					var viewPortPosition = returnValue.OffsetTop - returnValue.ScrollTop - param.triggerPosition;
					var viewPortPositionPercent = (viewPortPosition / returnValue.ViewportHeight * 100 - param.triggerPositionPercent).toFixed(2);
					isVisible = visiblePerTopPercent >= 0 && visiblePerBottomPercent >=0;

					if(viewPortPositionPercent >= 50) viewPortPositionPercent = 50;
					else if(viewPortPositionPercent <= -50) viewPortPositionPercent = -50;

					if( isVisible && visiblePerTopPercent <=100) visiblePercent=visiblePerTopPercent;
					else if(isVisible && visiblePerBottomPercent<=100) visiblePercent=visiblePerBottomPercent;
					else if (isVisible) visiblePercent = 100;
					else visiblePercent = 0;

					//console.log(viewPortPositionPercent)
					//console.log(viewPortPosition)
					//console.log(visiblePercent)

					if(isVisible) {
						/* Set Property */
						obj.isVisible = isVisible;
						obj.isEnter = isEnter;
						obj.viewPortPositionPercent = viewPortPositionPercent;
						obj.viewPortPosition = viewPortPosition;
						obj.visiblePercent = visiblePercent;
					}
					if(isVisible) {
						/* Set Trigger & Run */
						if (!isEnter && (param.triggerPositionPercent !== false && viewPortPositionPercent <= 0) || (param.triggerPosition && viewPortPosition <= 0)) {
							$(obj).trigger('enter');
							if ($.isFunction(param.enter)) param.enter();
						}
						if (isEnter && (param.triggerPositionPercent !== false && viewPortPositionPercent > 0 ) || (param.triggerPosition && viewPortPosition > 0)) {
							$(obj).trigger('leave');
							if ($.isFunction(param.leave)) param.leave();
						}
						if ($.isFunction(param.progress)) {
							if (param.triggerPositionPercent) param.progress(Number(viewPortPositionPercent), returnValue);
							if (param.triggerPosition) param.progress(Number(viewPortPosition), returnValue);
						}
					}
					if (!isActive && visiblePercent > 0) {
						$(obj).trigger('visible');
						if ($.isFunction(param.visible)) param.visible();
					}
					if (isActive && visiblePercent == 0) {
						$(obj).trigger('invisible');
						if ($.isFunction(param.invisible)) param.invisible();
						$(obj).trigger('leave');
						if ($.isFunction(param.leave)) param.leave();
					}
					if (!isFullVisible && visiblePercent == 100) {
						$(obj).trigger('fullVisible');
						if ($.isFunction(param.fullVisible)) param.fullVisible();
					}
					if ($.isFunction(param.visiblePercent)) param.visiblePercent(Number(visiblePercent), returnValue);

					isActive = visiblePercent != 0;
					isEnter = ( (param.triggerPositionPercent && viewPortPositionPercent <= 0) && isVisible) || ((param.triggerPosition && viewPortPosition <= 0) && isVisible);
					isFullVisible = visiblePercent >= 100;
				});

			});
		},
	
	
	
	/* sections */
	sections: function() {

		var
			$wrap = $('#wrap'),
			$contents = $('.apps-content'),
			$sections = $contents.children('[class^="m_"]'),
			$subNav = $wrap.find('#subnav'),

			$blocks = [],
			$children = null,

			keyvisual = null,
			keyvisualType2 = null,
			controls = [],

			isMobile = P5_APPS_USP.isMobile,
			isPoorBrowser = P5_APPS_USP.isPoorBrowser,

			transformName = $.support.transform,
			supportTransition = $.support.transition,
			supportTransform = $.support.transform,

			parallaxAble = P5_APPS_USP.parallaxAble,
			parallaxAbleTypes = /^(x|y|s|a|c)$/,
			parallaxFloatTypes = /^(s|a)$/,

			i = 0, j = 0, numSections = $sections.length,
			k, kmax,
			numBlocks;
			
			var __scnum = [];

		for (; i < numSections; i++, j++) {
			$blocks[j] = $($sections[i]);
			controls[j] = createControls($blocks[j]);
			if (!controls[j]) {
				for ($children = $blocks[j].children('[class^="m_"]'), k = 0, kmax = $children.length; k < kmax; j++, k++) {
					$blocks[j] = $($children[k]);
					controls[j] = createControls($blocks[j]);
				}
				if (kmax) {
					j--;
				} else {
					controls[j] = getArticleControl($blocks[j]);
				}
			}
		}
		numBlocks = $blocks.length;

		function createControls($section) {

			var className = $section.attr('class') || '',
				$children = $section.children().not('nav'),
				i = 0, numChildren = $children.length;

			if ((/^m_feature/).test(className) && (/article/i).test($section[0].nodeName)) {
				return getArticleControl($section);
			} 
		}

		function getArticleControl($article) {

			var $figures = $article.find('figure'),
				$images = $article.find('figure img'),
				$parallaxs = null,

				imageSources = [],
				parallaxs = [],

				videos = [],
				hasVideo = false,
				videoPlaying = false,
				videoHided = false,

				show = false,
				visible = false,
				invisible = false,
				welcome = true,
				hello = [],

				isKeyvisual = $article.parent().attr('id') == 'kv',
				isParallaxVideo = false,

				$parallaxer = $({p: 0}),
				parallaxAnimateOption = {queue: false, duration: 850, bystep: false, rounding: false, easing: 'easeOutQuint', step: onParallaxAnimate},

				i, j, max;


			for (i = 0, max = $figures.length; i < max; i++) {

				$figures[i] = $($figures[i]);

				$images[i] = $($images[i]);
				imageSources[i] = P5_APPS_USP.getImageSources($images[i]);

			}

			$parallaxs = $article.find('[data-parallax]');
			for (i = 0, max = $parallaxs.length; i < max; i++) {
				$parallaxs[i] = $($parallaxs[i]);
				parallaxs[i] = $parallaxs[i].attr('data-parallax');
				if (parallaxs[i]) {
					parallaxs[i] = parallaxs[i].split('|');
					for (j = 0; j < parallaxs[i].length; j++) {
						parallaxs[i][j] = parallaxs[i][j].split(',');
						if (parallaxAbleTypes.test(parallaxs[i][j][0])) {
							parallaxs[i][j][10] = parallaxs[i][j][0].toLowerCase();
							parallaxs[i][j].shift();
						} else {
							parallaxs[i][j][9] = 'y';
						}
						if (parallaxs[i][j][9] != 'c') {
							parallaxs[i][j][0] = parseFloat(parallaxs[i][j][0]);
							parallaxs[i][j][1] = parallaxs[i][j][0]-parseFloat(parallaxs[i][j][1]);
							if (parallaxs[i][j][2] !== undefined) {
								parallaxs[i][j][5] = parseFloat(parallaxs[i][j][2]);
							}
							if (parallaxs[i][j][3] !== undefined) {
								parallaxs[i][j][6] = parseFloat(parallaxs[i][j][3]);
							}
							parallaxs[i][j][2] = 0;
							parallaxs[i][j][3] = 0;
							parallaxs[i][j][4] = 0;
							if (parallaxs[i][j][9] == 's') {
								parallaxs[i][j][2] = parallaxs[i][j][0];
							}
						}
					}
				}
			}
			
			function onParallaxAnimate(v) {
				for (var properties, value, transform,
						i = 0, j, max = $parallaxs.length; i < max; i++) {
					for (j = 0, properties = {}, transform = '';
							j < parallaxs[i].length; j++) {
						if (parallaxs[i][j][9] == 'c') {
							continue;
						}
						value = parallaxs[i][j][3]+(parallaxs[i][j][4]-parallaxs[i][j][3])*v.p;
						properties[parallaxs[i][j][9]] = parallaxs[i][j][2] = value;
					}
					
					if( P5_APPS_USP.sizeMode == 1 ){
						properties.y = $(window).width()*(properties.y)/1440;	
						properties.x = $(window).width()*(properties.x)/1440;	
					}
					
					$parallaxs[i][0].style[transformName] = [
							'scale(', properties.s !== undefined ? properties.s : 1, ', ', properties.s !== undefined ? properties.s : 1, ')', ' ',
							'translate3d(', properties.x || 0, 'px, ', properties.y || 0, 'px, 0)'
						].join('');
					if (properties.a !== undefined) {
						$parallaxs[i][0].style.opacity = properties.a;
					}
				}
			}
			
			return {
				name: 'article',
				setSizeMode: function(sizeMode) {
					for (var newSrc, i = 0, max = $figures.length; i < max; i++) {
						newSrc = ''+imageSources[i][sizeMode];
						if ($images[i][0] && $images[i][0].src ) {
							//$images[i][0].src = P5_APPS_USP.setMediaBaseURL(newSrc);
							$images[i][0].src = newSrc;
						}
					}
				},

				setParallax: function(visiblePercent) {
					var i, j, max, valueTo, sizeMode;
					if (parallaxAble) {
						
						visiblePercent = Math.max(0, visiblePercent, Math.min(1, visiblePercent));
						sizeMode = P5_APPS_USP.sizeMode;
						$parallaxer._stop();
						
						if( sizeMode == 1 ){
							
							//visiblePercent = visiblePercent * 0.175;
						}
						
						for (i = 0, max = $parallaxs.length; i < max; i++) {
							
							if( 2 > sizeMode && ! $parallaxs[i].data("only") && $parallaxs[i].data("only") != "all" || 1 < sizeMode && $parallaxs[i].data("only") == "mobile" ){
								$parallaxs[i].removeAttr("style");
								return;
							}
							
							for (j = 0; j < parallaxs[i].length; j++) {
								if (parallaxs[i][j][9] == 'c') {
									window[parallaxs[i][j][0]] && window[parallaxs[i][j][0]](visiblePercent);
								} else {
									parallaxs[i][j][3] = parallaxs[i][j][2];
									valueTo = parallaxs[i][j][0]-parallaxs[i][j][1]*visiblePercent;
									if (parallaxs[i][j][5] !== undefined) {
										valueTo = Math.max(parallaxs[i][j][5], valueTo);
									}
									if (parallaxs[i][j][6] !== undefined) {
										valueTo = Math.min(parallaxs[i][j][6], valueTo);
									}
									if (sizeMode == 3 && parallaxs[i][j][9] != 's' && parallaxs[i][j][9] != 'a') {
										valueTo *= 0.75;
									}
									if (!parallaxFloatTypes.test(parallaxs[i][j][9])) {
										valueTo = Math.round(valueTo);
									}
									parallaxs[i][j][4] = valueTo;
									
									if( sizeMode == 1 ){
							
										//valueTo = valueTo * 0.175;
										//valueTo = ($(window).width() * valueTo)/1920;
										//valueTo = 10;
										//console.log(valueTo)
										
									}
									
									
								}
							}
						}
						$parallaxer[0].p = 0;
						$parallaxer._animate({p: 1}, parallaxAnimateOption);

						if (hasVideo && !videoHided && isParallaxVideo && visiblePercent && 1 > visiblePercent) {
							$article.trigger('video-parallax', visiblePercent);
						}

					}
				}
			};
		}

		
		function scroll(scrollTop, maxScrollTop) {

			var sizeMode = P5_APPS_USP.sizeMode,
				areaHeight = P5_APPS_USP.areaHeight,
				blockTop, blockHeight,
				visibleSize, visibleHeight, visiblePercent, visibleBase,
				i = 0, j, jmax;

			for (; i < numBlocks; i++) {
				blockTop = !i ? $blocks[i][0].offsetTop-scrollTop : $blocks[i][0].getBoundingClientRect().top;
				
				if (blockTop>0||$blocks[i].css('display')!='none') {
					
					blockHeight = $blocks[i][0].offsetHeight;
	
					if (!i) {
						visibleSize = 1-((blockHeight+blockTop)/blockHeight);
					} else {
						visibleSize = -(blockTop-areaHeight)/(areaHeight+blockHeight);
					}
					if (parallaxAble) {
						visiblePercent = visibleSize;
						if (visiblePercent >= -0.15 && 1.15 >= visiblePercent) {
							controls[i].setParallax(visiblePercent);
						}
					}
	
					visibleBase = Math.min(blockHeight*0.66, P5_APPS_USP.areaHeight*0.66);
					visibleHeight = Math.min(areaHeight, 0 >= blockTop ? blockHeight+blockTop : Math.min(blockHeight, areaHeight-blockTop));
				}

			}
			
			
		}

		function resize() {
			var i = 0, sizeMode = P5_APPS_USP.sizeMode;

			for (; i < numBlocks; i++) {
				controls[i].setSizeMode(sizeMode);
			}
		}

		return {
			scroll: scroll,
			resize: resize
		};

	},
	
	getImageSources: function($image) {
        var s2 = $image.attr('data-media-pc') || $image.attr('src'),
            s3 = s2,
            s1 = $image.attr('data-media-mo') || s2;

        return [null, s1, s2, s3];
    }, 

	getScrollBarWidth: function() {
		var div = document.createElement('div'), scrollBarWidth;
		div.style.cssText = 'position: absolute; left: -999em; width: 100px; height: 100px; overflow: scroll;';
		document.body.appendChild(div);
		scrollBarWidth = 100-div.clientWidth;
		document.body.removeChild(div);
		div = null;
		return scrollBarWidth;
	},
	
	scroll: (function(e) {
		
		var
			ie = navigator.userAgent.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
			webkit = (/applewebkit/i).test(navigator.userAgent),
			documentElement = document.documentElement,
			scrollCaptured = false,
			lastScrollTop = 0,
			maxScrollTop = 0;
		
		function scrollFix(scrollBy) {
			var newScrollTop = Math.min(getMaxScrollTop(), Math.max(0, getScrollTop()+scrollBy));
			if (newScrollTop != lastScrollTop) {
				scroll(newScrollTop);
				scrollCaptured = true;
				document[webkit ? 'body' : 'documentElement'].scrollTop = newScrollTop;
			}
		}

		function getScrollTop() {
			return documentElement.scrollTop || (document.body ? document.body.scrollTop : 0) || 0;
		}

		function getMaxScrollTop() {
			return Math.max(document.body ? document.body.scrollHeight : 0, documentElement.scrollHeight)-Math.min(documentElement.offsetHeight, documentElement.clientHeight);
		}

		function scroll(_scrollTop) {
			
			var scrollTop = typeof(_scrollTop) == 'number' ? _scrollTop : getScrollTop();
			lastScrollTop = scrollTop;
			if (scrollCaptured) {
				scrollCaptured = false;
				return false;
			}

			P5_APPS_USP.scrollTop = scrollTop;
			maxScrollTop = getMaxScrollTop();

			P5_APPS_USP.scrollTop = scrollTop;
			P5_APPS_USP.sections && P5_APPS_USP.sections.scroll && P5_APPS_USP.sections.scroll(scrollTop, maxScrollTop);

			if (P5_APPS_USP.scrollFunctions.length) {
				$.each(P5_APPS_USP.scrollFunctions, function() {
					this(scrollTop, maxScrollTop);
				});
			}

			if($('.apps-subnav').length > 0){
			 	P5_APPS_USP.apps_subnav.scroll();
			}

			if( $(".m_content-innovative.inno").length > 0 ){
				P5_APPS_USP.passMoving.scroll();
			}

			if($('.apps-kv-slider').length){
				P5_APPS_USP.kv_slider.scroll();
			}

		}

		return scroll;

	})(), 
	
	resize: function(func) {
		if (typeof(func)=='function') {
			this.resizeFunctions.push(func);
			return this;
		}

		var documentElement = document.documentElement,
			width, height, sizeMode;

		width = documentElement.clientWidth;
		if (P5_APPS_USP.isPoorBrowser) {
			width = Math.max(document.getElementById('wrap').offsetWidth, width);
		}
		height = $(window).height();
		
		// ignore Mode
		if (func !== true) {
			if (!$.browser.mobile && width == P5_APPS_USP.areaWidth && height == P5_APPS_USP.areaHeight) {
				return;
			} else if ($.browser.mobile && width == P5_APPS_USP.areaWidth) {
				return;
			}
		}
		
		var scrollBarWidth;
		
		if( $.browser.mobile ){
			scrollBarWidth = 0;	
		} else {
			scrollBarWidth = 17;	
		}

		//sizeMode = width > 1440-scrollBarWidth ? 3 : width > 768-scrollBarWidth ? 2 : 1;
		sizeMode = window.innerWidth > 1440 ? 3 : window.innerWidth > 768 ? 2 : 1;
		
        P5_APPS_USP.prevSizeMode = P5_APPS_USP.sizeMode;
        if (sizeMode != P5_APPS_USP.sizeMode) {
            P5_APPS_USP.sizeMode = sizeMode;
            documentElement.className = documentElement.className.replace(/ *s[1-4][1-4]?/g, '') +' s'+ sizeMode;
        }
        documentElement.className = documentElement.className.replace(/ *s0/, '') + (360 > width ? ' s0' : '');

		P5_APPS_USP.areaWidth = width;
		P5_APPS_USP.areaHeight = height;

		P5_APPS_USP.sections && P5_APPS_USP.sections.resize && P5_APPS_USP.sections.resize();

		if (P5_APPS_USP.resizeFunctions.length) {
			$.each(P5_APPS_USP.resizeFunctions, function() {
				this();
			});
		}

		P5_APPS_USP.scroll();
		P5_APPS_USP.step.resize();
		P5_APPS_USP.apps_subnav.resize();
		P5_APPS_USP.mobile_slider.resize();
		P5_APPS_USP.videoBackground.resize();
		P5_APPS_USP.tabToSlide.resize();
		P5_APPS_USP.appsPopup.resize();
		P5_APPS_USP.mouseWheelAnimate.resize();
		P5_APPS_USP.connectAnimate.resize();

		if( $(".m_content-innovative.inno").length > 0 ){
			P5_APPS_USP.passMoving.resize();
			P5_APPS_USP.passMoving.scroll();
		}

	},
	
	ready: function(func) {
		if (func===undefined) {
			if (this.readyFunctions.length) {
				$.each(this.readyFunctions, function() {
					this();
				});
			}
		} else {
			if (typeof(func)=='function') {
				this.readyFunctions.push(func);
			}
		}
		return this;
	},
	
	load: function(func) {
		if (func===undefined) {
			if (this.loadFunctions.length) {
				$.each(this.loadFunctions, function() {
					this();
				});
			}
		} else {
			if (typeof(func)=='function') {
				this.loadFunctions.push(func);
			}
		}
		return this;
	},

	share :  function(){
		var snsToggle 	= 	$('.apps .apps-share .btn-list-toggle'),
			snsShare 	= 	$('.apps .share-layer li'),
			shareLast 	= 	$('.apps .share-layer li a').filter(':last');

		function popupOpen (url, width, height, name) {
			return window.open(url, name || '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width='+ width +',height='+ height);
		}

		snsToggle.on('click', function(e){
			var $this = $(this);
			var $wrap = $(this).parents('.apps-share');

			if($wrap.hasClass('active')){
				$wrap.removeClass('active');
			} else {
				$wrap.addClass('active');
			}

			$(this).focus();
			e.preventDefault();
			e.stopPropagation();
		});

		$(document).on('click', function(e){
			if($(this).not('.apps-share')){
				$('.apps-share').removeClass('active');
			}
		});

		snsShare.on('click', function(e){
            var $this = $(this),
                url = encodeURIComponent($('meta[property="og:url"]').attr('content') || location.href),
                message = encodeURIComponent($('meta[property="og:description"]').attr('content') || 'FIND YOUR GALAXY'),
                media = encodeURIComponent($('meta[property="og:image"]').attr('content')),
                popupSize = [], 
                popupURL = '';

            if ($this.hasClass('facebook')) {
                popupSize = [560, 525];
                popupURL = 'https://www.facebook.com/sharer/sharer.php?u='+ url;
                sendClickCode('share', 'facebook');
            } else if ($this.hasClass('twitter')) {
                popupSize = [680, 400];
                popupURL = 'https://twitter.com/intent/tweet?text='+ message +'&url='+ url;
                sendClickCode('share', 'twitter');
            } else if ($this.hasClass('googleplus')) {
                popupSize = [510, 510];
                popupURL = 'https://plus.google.com/share?url='+ url;
                sendClickCode('share', 'googleplus');
            } else if ($this.hasClass('linkedin')) {
                popupSize = [550, 500];
                popupURL = 'https://www.linkedin.com/shareArticle?url='+ url;
                sendClickCode('share', 'linkedin');
            } else if($this.hasClass('pinterest')){
                popupSize = [550, 500];
                popupURL = 'https://www.pinterest.com/pin/create/button/?url=' + url + '&description=' + message + '&media=' + media;
                sendClickCode('share', 'pinterest');
            }

            popup = popupOpen(popupURL, popupSize[0], popupSize[1], 'shareWindow');
            popup && popup.focus();

            return false;
	    });
		
		snsShare.on('keydown', function(e){
	        if(e.which == 13){
	            var $this = $(this),
	                url = encodeURIComponent($('meta[property="og:url"]').attr('content') || location.href),
	                message = encodeURIComponent($('meta[property="og:description"]').attr('content') || 'Kickstart your Galaxy by preordering the S8 or S8 +'),
	                media = encodeURIComponent($('meta[property="og:image"]').attr('content')),
	                popupSize, popupURL;

	            if ($this.hasClass('facebook')) {
	                popupSize = [560, 525];
	                popupURL = 'https://www.facebook.com/sharer/sharer.php?u='+ url;
	                sendClickCode('share', 'facebook');
	            } else if ($this.hasClass('twitter')) {
	                popupSize = [680, 400];
	                popupURL = 'https://twitter.com/intent/tweet?text='+ message +'&url='+ url;
	                sendClickCode('share', 'twitter');
	            } else if ($this.hasClass('googleplus')) {
	                popupSize = [510, 510];
	                popupURL = 'https://plus.google.com/share?url='+ url;
	                sendClickCode('share', 'googleplus');
	            } else if ($this.hasClass('linkedin')) {
	                popupSize = [550, 500];
	                popupURL = 'https://www.linkedin.com/shareArticle?url='+ url;
	                sendClickCode('share', 'linkedin');
	            } else if($this.hasClass('pinterest')){
	                popupSize = [550, 500];
	                popupURL = 'https://www.pinterest.com/pin/create/button/?url=' + url + '&description=' + message + '&media=' + media;
	                sendClickCode('share', 'pinterest');
	            }

	            popup = popupOpen(popupURL, popupSize[0], popupSize[1], 'shareWindow');
	            popup && popup.focus();

	            return false;
	        }
	    });	
    },

	goTop : {
		init : function(){
			var _goTopBtn = $("[data-role='go-top']");
			
			$(window).scroll(function(){
				if( $(this).scrollTop() > 100 ){
					_goTopBtn.fadeIn();
				}else{
					_goTopBtn.fadeOut();
				}
			});
			_goTopBtn.find("button").on("click",function(e){
				$("body, html").stop().animate({ scrollTop : 0 },1000);
				e.preventDefault();
			});
		}
	},

	apps_subnav : {
		init:function(){
			this.subnavBar();
		},
		subnavBar:function(){
			var subnav 		= $('.apps-subnav'),
				navList		= $('.apps-subnav').find('li'),
				activeBar 	= $('.apps-subnav').find('.subnav-bar'),
				kvHeight 	= $('.m_content-intro').outerHeight(true),
				activeWidth = $('.apps-subnav').find('li.active').outerWidth(true),
				activeLeft 	= $('.apps-subnav').find('li.active').length ? parseInt($('.apps-subnav').find('li.active').offset().left):0,
				$whyBtn 	= $('.apps-subnav .btn-bixby_why');

			subnav.css('top',kvHeight - subnav.outerHeight(true));

			setTimeout(function(){
				subnav.addClass('show');

				kvHeight = $('.m_content-intro').outerHeight(true);
				activeWidth = $('.apps-subnav').find('li.active').outerWidth(true);
				activeWidth = $('.apps-subnav').find('li.active').outerWidth(true);
				activeLeft 	= $('.apps-subnav').find('li.active').length ? parseInt($('.apps-subnav').find('li.active').offset().left):0;
				activeBar.css('width', activeWidth);
				if(window.innerWidth > 1440){
					activeBar.css('left', activeLeft - ((window.innerWidth - 1440)/2) + 9);	
				} else {
					activeBar.css('left', activeLeft);	
				}
				subnav.css('top',kvHeight - subnav.outerHeight(true));
				$(".bar-bixby_why").css("width",$(".btn-bixby_why").outerWidth());
			}, 1200);
			
			$(".btn-bixby_why").on('mouseenter focusin', function(e){
				$(this).addClass("active");
				activeBar.removeAttr("style");
			});

			$(".btn-bixby_why").on('mouseleave focusout', function(e){
				if( navList.is(".active") ){
					$(this).removeClass("active");
				}
				if( activeWidth == null ){
					activeWidth = 0;
				}
				activeBar.css('width', activeWidth);
				if(window.innerWidth > 1440){
					activeBar.css('left', activeLeft - ((window.innerWidth - 1440)/2) + 9);	
				} else {
					activeBar.css('left', activeLeft);	
				}
			});

			if( window.innerWidth < 769 ){
				$(".apps-subnav.bixby_why").find(".why").addClass("active");
			}else{
				$(".subnav-bar").css("width",0);
				$(".apps-subnav.bixby_why").find(".why").removeClass("active");
			}

			navList.on('mouseenter focusin', function(e){
				var _this 			= $(this),
					currentWidth 	= _this.outerWidth(true),
					currentLeft 	= parseInt(_this.offset().left);

				if($whyBtn.hasClass('active')){
					$whyBtn.addClass('active-pause');
					$whyBtn.removeClass('active');
				}

				if(!$(this).hasClass('active')){
					$('.apps-subnav').find('li.active').addClass('pause');
				}

				$(this).addClass('hover').siblings().removeClass('hover');
				activeBar.css('width', $(this).outerWidth(true));

				if(window.innerWidth > 1440){
					activeBar.css('left', currentLeft - ((window.innerWidth - 1440)/2) + 9);	
				} else {
					activeBar.css('left', currentLeft);	
				}
			});

			navList.on('mouseleave focusout', function(e){
				activeWidth = $('.apps-subnav').find('li.active').outerWidth(true),
				activeLeft 	= $('.apps-subnav').find('li.active').length ? parseInt($('.apps-subnav').find('li.active').offset().left):0;

				if($whyBtn.hasClass('active-pause')){
					$whyBtn.addClass('active');
					$whyBtn.removeClass('active-pause');
				}

				$('.apps-subnav').find('li.active').removeClass('pause');
				$('.apps-subnav').find('li').removeClass('hover');

				if( activeWidth == null ){
					activeWidth = 0;
				}

				activeBar.css('width', activeWidth);

				if(window.innerWidth > 1440){
					activeBar.css('left', activeLeft - ((window.innerWidth - 1440)/2) + 9);	
				} else {
					activeBar.css('left', activeLeft);	
				}
			});

			$whyBtn.on('mouseenter focusin', function(e){
				$('.apps-subnav').find('li.active').addClass('pause');
			});

			$whyBtn.on('mouseleave focusout', function(e){
				$('.apps-subnav').find('li.active').removeClass('pause');
			});
		},
		resize:function(){
			var activeBar 	= $('.apps-subnav').find('.subnav-bar'),
				activeWidth = $('.apps-subnav').find('li.active').outerWidth(true),
				kvHeight 	= $('.m_content-intro').outerHeight(true),
				activeLeft 	= $('.apps-subnav').find('li.active').length ? parseInt($('.apps-subnav').find('li.active').offset().left):0;
			
			$(".bar-bixby_why").css("width",$(".btn-bixby_why").outerWidth());
			if( $(".apps-subnav").is(".bixby_why") ){
				if( window.innerWidth < 769 ){
					$(".apps-subnav.bixby_why").find(".why").addClass("active");
				}else{
					$(".subnav-bar").css("width",0);
					$(".apps-subnav.bixby_why").find(".why").removeClass("active");
				}
			}

			if(!$('.apps_usp').hasClass('fixed')){
				$('.apps-subnav').css('top', kvHeight - $('.apps-subnav').outerHeight(true));
			}
			if($('.apps-subnav').hasClass('show')){
				activeBar.css('width', activeWidth);
				if(window.innerWidth > 1440){
					activeBar.css('left', activeLeft - ((window.innerWidth - 1440)/2) + 9);	
				} else {
					activeBar.css('left', activeLeft);	
				}
			}
		},
		scroll:function(){
			var $wrap 		= $('.apps_usp'),
				kvOffset  	= $('.m_content-intro').length? parseInt($('.m_content-intro').offset().top):0,
				kvHeight  	= $('.m_content-intro').outerHeight(true);

			if($(document).scrollTop() > kvOffset + kvHeight - $('.apps-subnav').outerHeight(true)){
				$wrap.addClass('nav-fixed');
			} else {
				$wrap.removeClass('nav-fixed');
			}
		}
	},
	mobile_slider : {
		slider : $('[data-role="mobile-slider"]'),
		slideShow : 1,
		slickSlider:function(target, slideShow, sliderName, sliderTitle){
			var defaultConfig = {
					slidesToShow:slideShow,
					slidesToScroll:1,	
					infinite:false,
					accessibility:true,
					speed:500,
			        touchMove:true,
			        swipe:true,
			        arrows:false,
			        dots:true,
			        customPaging:function(slider, i){
			        	var pagingTitle = $(slider.$slides[i]).find('[data-role="slide-title"]').length ? $(slider.$slides[i]).find('[data-role="slide-title"]').text().toLowerCase() : 'slide_' + (i + 1);

						return '<button type="button" data-role="none" role="button" tabindex="0" onclick="sendClickCode(\'content_click_count\',\'rolling:index_' + (i + 1) + '\');">' + sliderName.split('.')[0] + ' ' + pagingTitle + '</button>';
					}
				},
				activeIdx = 0,
				swipeFlag = true;

			target.slick(defaultConfig);
			target.on('afterChange', function(event, slick, currentSlide, nextSlide){
	        	var $next 			= $(slick.$slides[currentSlide]),
	        		$target 		= $next.closest('.m_feature').find('[data-role="mobile-slider-target"]').children(),
	        		contentType 	= $next.find('[data-role="tab-content-video"]').length ? "video_" : "image_",
	        		sliderName 		= $next.closest('[data-role="mobile-slider"]').data('slider-name'),
	        		taggingName 	= sliderName != undefined ? sliderName.indexOf('.') > -1 ? sliderName.split('.')[0].toLowerCase() : sliderName.toLowerCase() : "",
					currentSCroll 	= $(window).scrollTop();
				
				currentSCroll 	= $(window).scrollTop();
				$next.addClass('active').siblings().removeClass('active');
				$target.eq(currentSlide).addClass('active').siblings().removeClass('active');

				if(swipeFlag == true){
					sendClickCode('content_click','apps:' + APPS_SERVICE_NAME + ':' + contentType + taggingName + (currentSlide + 1) + '_swipe');
				}
				
				$(document).on('click', '[data-role="mobile-slider"] .slick-dots button', function(){
		        	swipeFlag = false;
					setTimeout(function(){
						swipeFlag = true;
					}, 600);
		        });
				if($.browser.mobile){
		        	$next.closest('[data-role="mobile-slider"]').find('.slick-dots li').find('button').blur();
		        	$next.closest('[data-role="mobile-slider"]').find('.slick-dots li').eq(currentSlide).find('button').focus();
		        	$(window).scrollTop(currentSCroll);
		        }
	        });
		},
		event:function(){
			var slider 			= $('[data-role="mobile-slider"]'),
				deviceCheck 	= $('html').hasClass('mobile') || $('html').hasClass('touch') ? true:false,
				sliderTitle     = [];
				
			if(P5_APPS_USP.sizeMode == 1){
				slider.each(function(){
					var slideCount 	= $(this).data('slide-show') == undefined ? 1 : parseInt($(this).data('slide-show')),
						sliderName 	= $(this).data('slider-name'),
						$target    	= $(this).closest('.m_feature').find('[data-role="mobile-slider-target"]'),
						sliderLen   = $(this).find(".list").length;
					
					if( $(this).find("div").is(".list") ){
						sliderLen = $(this).find(".list").length;
					}else if( $(this).find("div").is(".item_box") ){
						sliderLen = $(this).find(".item_box").length;
					}

					for( var t = 0; t < sliderLen; t++ ){
						if( $(this).find("div").is(".list") ){
							sliderTitle.push($(this).find(".list").eq(t).find("[data-role='slide-title']").text());
						}else if( $(this).find("div").is(".item_box") ){
							sliderTitle.push($(this).find(".item_box").eq(t).find("[data-role='slide-title']").text());
						}
					}

					if(!$(this).hasClass('slick-initialized')){
						P5_APPS_USP.mobile_slider.slickSlider($(this), slideCount, sliderName, sliderTitle);
						sliderTitle = [];
						if($target.length){
							activeIdx = $(this).find('.active').index();
							$(this)[0].slick.slickGoTo(activeIdx);
						}
					}
				});
			} else if(P5_APPS_USP.sizeMode > 1){
				slider.each(function(){
					var slideCount 	= $(this).data('slide-show') == undefined ? 1 : parseInt($(this).data('slide-show')),
						sliderName 	= $(this).data('slider-name'),
						deviceFlag 	= $(this).data('device-flag') != undefined && $(this).data('device-flag') == true ? true:false,
						$target    	= $(this).closest('.m_feature').find('[data-role="mobile-slider-target"]');

					if($(this).hasClass('slick-initialized')){
						if(deviceFlag == false){
							$(this).slick("unslick");
							$(this).find('div, a').removeAttr('tabindex');
							// console.log('unslick');
						} else if(deviceFlag == true && deviceCheck != true){
							$(this).slick("unslick");
							$(this).find('div, a').removeAttr('tabindex');
						}
					} else {
						if(deviceFlag && deviceCheck){
							P5_APPS_USP.mobile_slider.slickSlider($(this), slideCount, sliderName);

							activeIdx = $target.find('.slick-slide.active').index();
							$(this)[0].slick.slickGoTo(activeIdx);
							// console.log('slick')
						} 
					}
				});
			}
		},
		resize:function(){
			this.event();
		},
		init:function(){
			this.event();
		}
	},

	default_slider : {
		slider : $('[data-role="default-slider"]'),
		slideShow : 1,
		slickSlider:function(target, slideShow, sliderName, sliderTitle){
			var defaultConfig = {
					slidesToShow:slideShow,
					slidesToScroll:1,	
					infinite:false,
					accessibility:true,
					speed:500,
			        touchMove:true,
			        swipe:true,
			        arrows:false,
			        dots:true,
			        customPaging:function(slider, i){
			        	var pagingTitle = $(slider.$slides[i]).find('[data-role="slide-title"]').text().toLowerCase(),
			        		pageText 	= pagingTitle.indexOf('.') > -1 ? pagingTitle.split('.')[0] : pagingTitle;
						return '<button type="button" data-role="none" role="button" tabindex="0" onclick="sendClickCode(\'content_click_count\',\'rolling:index_' + (i + 1) + '\');">' + sliderName.split('.')[0] + ' ' + sliderTitle[i] + '</button>';
					}
				},
				activeIdx = 0,
				swipeFlag = true;

			target.slick(defaultConfig);
			target.on('afterChange', function(event, slick, currentSlide, nextSlide){
	        	var $next 			= $(slick.$slides[currentSlide]),
	        		$target 		= $next.closest('.m_feature').find('[data-role="default-slider-target"]').children(),
	        		contentType 	= $next.find('[data-role="tab-content-video"]').length ? "video_" : "image_",
	        		sliderName 		= $next.closest('[data-role="default-slider"]').data('slider-name'),
	        		taggingName 	= sliderName != undefined ? sliderName.indexOf('.') > -1 ? sliderName.split('.')[0].toLowerCase() : sliderName.toLowerCase() : "",
					currentSCroll 	= $(window).scrollTop();
				
				currentSCroll 	= $(window).scrollTop();
				$next.addClass('active').siblings().removeClass('active');
				$target.eq(currentSlide).addClass('active').siblings().removeClass('active');

				if(swipeFlag == true){
					sendClickCode('content_click','apps:' + APPS_SERVICE_NAME + ':' + contentType + taggingName + (currentSlide + 1) + '_swipe');
				}
				
				$(document).on('click', '[data-role="default-slider"] .slick-dots button', function(){
		        	swipeFlag = false;
					setTimeout(function(){
						swipeFlag = true;
					}, 600);
		        });
				if($.browser.mobile){
		        	$next.closest('[data-role="default-slider"]').find('.slick-dots li').find('button').blur();
		        	$next.closest('[data-role="default-slider"]').find('.slick-dots li').eq(currentSlide).find('button').focus();
		        	$(window).scrollTop(currentSCroll);
		        }
	        });
		},
		event:function(){
			var slider 			= $('[data-role="default-slider"]'),
				deviceCheck 	= $('html').hasClass('mobile') || $('html').hasClass('touch') ? true:false,
				sliderTitle     = [];

			slider.each(function(){
				var slideCount 	= $(this).data('slide-show') == undefined ? 1 : parseInt($(this).data('slide-show')),
					sliderName 	= $(this).data('slider-name'),
					$target    	= $(this).closest('.m_feature').find('[data-role="default-slider-target"]'),
					sliderLen   = $(this).find(".list").length;
				
				if( $(this).find("div").is(".list") ){
					sliderLen = $(this).find(".list").length;
				}else if( $(this).find("div").is(".item_box") ){
					sliderLen = $(this).find(".item_box").length;
				}

				for( var t = 0; t < sliderLen; t++ ){
					if( $(this).find("div").is(".list") ){
						sliderTitle.push($(this).find(".list").eq(t).find("[data-role='slide-title']").text());
					}else if( $(this).find("div").is(".item_box") ){
						sliderTitle.push($(this).find(".item_box").eq(t).find("[data-role='slide-title']").text());
					}
				}

				if(!$(this).hasClass('slick-initialized')){
					P5_APPS_USP.default_slider.slickSlider($(this), slideCount, sliderName, sliderTitle);
					sliderTitle = [];
					if($target.length){
						activeIdx = $(this).find('.active').index();
						$(this)[0].slick.slickGoTo(activeIdx);
					}
				}
			});			
		},
		resize:function(){
			
		},
		init:function(){
			this.event();
		}
	},

	kv_slider : {
		slider : $('[data-role="kv-slider"]'),
		slideShow : 1,
		slickSlider:function(target, slideShow, sliderName){
			var defaultConfig = {
				slidesToShow:slideShow,
				slidesToScroll:1,
				infinite:true,
				accessibility:true,
				speed:500,
				touchMove:true,
				swipe:true,
				arrows:false,
				dots:true,
				customPaging:function(slider, i){
					var pagingTitle = $(slider.$slides[i]).find('img').attr('alt').toLowerCase(),
						pageText 	= pagingTitle.indexOf('.') > -1 ? pagingTitle.split('.')[0] : pagingTitle;

					return '<button type="button" data-role="none" tabindex="0" onclick="sendClickCode(\'content_click_count\',\'rolling:index_' + (i + 1) + '\');"><span>slide ' + (i + 1) + '</span></button>';
				}
			},
			activeIdx = 0,
			swipeFlag = true;
			if($('.apps').hasClass('rtl') || $('.apps_usp').hasClass('rtl')){
				defaultConfig.rtl = true;
			}

			target.slick(defaultConfig);

			target.on('afterChange', function(event, slick, currentSlide, nextSlide){
				var $next 			= $(slick.$slides[currentSlide]),
					sliderName 		= $next.closest('[data-role="kv-slider"]').data('slider-name'),
					taggingName 	= sliderName != undefined ? sliderName.indexOf('.') > -1 ? sliderName.split('.')[0].toLowerCase() : sliderName.toLowerCase() : "",
					currentSCroll 	= $(window).scrollTop();

				currentSCroll 	= $(window).scrollTop();
				$next.addClass('active').siblings().removeClass('active');

				if(swipeFlag == true){
					sendClickCode('content_click','apps:' + APPS_SERVICE_NAME + ':' + 'image' + taggingName + (currentSlide + 1) + '_swipe');
				}

				$(document).on('click', '[data-role="kv-slider"] .slick-dots button', function(){
					swipeFlag = false;
					setTimeout(function(){
						swipeFlag = true;
					}, 600);
				});
			});
		},
		motion:function(){
			var $slide = $('.apps-kv-slider');
			var $dotlist = $slide.find('.slick-dots .slick-active');
			var dotLen 	= $slide.find('.slick-dots li').length;
			var $dots = $dotlist.find('button');
			var kvmotion = null;
			var motionCount = 0;
			var slideFlag = true;

			if(!$('.apps-kv-slider').hasClass('auto-end') && !$('.apps-kv-slider').hasClass('auto-play')){
				$('.apps-kv-slider').addClass('auto-play');

				kvmotion = setInterval(function(){
					if(motionCount != dotLen){
						$('.apps-kv-slider .slick-dots .slick-active').find('button span').animate({
							width:'92%'
						}, 3000, function(){
							if(slideFlag){
								$(this).closest('.apps-kv-slider').slick('slickNext');
								motionCount ++;
							}
						});
					} else {
						clearMotion();
						$slide.slick('slickGoTo', 0);
					}
				}, 300);
			} else {
				kvmotion = "";
			}

			function clearMotion(){
				slideFlag = false;
				clearInterval(kvmotion);
				$('.apps-kv-slider').addClass('auto-end');
				$('.apps-kv-slider').removeClass('auto-play');
			}

			$('.apps-kv-slider').on('swipe', function(event, slick, direction) {
				clearMotion();
			});

			$('.apps-kv-slider .slick-dots li').on('click', function(){
				clearMotion();
			});
		},
		event:function(){
			var slider 			= $('[data-role="kv-slider"]');

			slider.each(function(i){
				var slideCount 	= $(this).data('slide-show') == undefined ? 1 : parseInt($(this).data('slide-show')),
					sliderName 	= $(this).data('slider-name');

				if(!$(this).hasClass('slick-initialized')){
					P5_APPS_USP.kv_slider.slickSlider($(this), slideCount, sliderName);
				}
			});

			if($('.apps-kv-slider').length){
				var navHeight = parseInt($('.apps-subnav').outerHeight(true));
				var kvOffset = parseInt($('.apps-kv-slider').offset().top);
				var kvHeight = parseInt($('.apps-kv-slider').outerHeight(true));
			}
		},
		resize:function(){
			
		},
		scroll:function(){
			if($('.apps-kv-slider').length){
				var navHeight = $('.apps-subnav').outerHeight(true);
				var kvOffset = $('.apps-kv-slider').offset().top;
				var kvHeight = $('.apps-kv-slider').outerHeight(true);

				if($(document).scrollTop() >  kvOffset/2 - navHeight && $(document).scrollTop() < kvOffset*2 + kvHeight){
					if(!$('.apps-kv-slider').hasClass('auto-end') && !$('.apps-kv-slider').hasClass('auto-play')){
						setTimeout(function(){
							P5_APPS_USP.kv_slider.motion();
						}, 800);
					}
				}
			}
		},
		init:function(){
			this.event();
		}
	},

	verticalSlider :{
		motion:function(){
			var slider 		= $('[data-role="fade-slide"]'),
				sliderDots 	= slider.find('.item_wrap .item_box a');

			sliderDots.on('click', function(e){
				var _this 		= $(this),
					_parent 	= $(this).closest('.item_box'),
					currentIdx 	= _parent.index(),
					slideImg 	= $(this).closest('.f_container').find('.overlay_inner .slide_img'),
					imgHeight 	= slideImg.find('img:first-child').outerHeight(true);

				_parent.addClass('active').siblings().removeClass('active');
				//slideImg.stop().animate({'margin-top':-(currentIdx * imgHeight)});
				slideImg.eq(currentIdx).stop().fadeIn(function(){
					$(this).addClass('active');
					$(this).removeAttr('style');
				}).siblings().stop().fadeOut(function(){
					$(this).removeClass('active');
					$(this).removeAttr('style');
				});

				e.preventDefault();
			});
		},
		init:function(){
			this.motion();
		},
		resize:function(){
			// var slideImg 	= $('[data-role="vertical-slide"]').find('.overlay_inner .slide_img');

			// slideImg.each(function(){
			// 	var _this  		= $(this),
			// 		currentIdx	= $(this).closest('.f_container').find('.item_wrap .item_box.active').index(),
			// 		imgHeight 	= $(this).find('img:first-child').outerHeight(true);

			// 		_this.css('margin-top',-(currentIdx * imgHeight));
			// });
		}
	},

	tabToSlide : {
		slickSlider:function(target, sliderName, sliderTitle){
			var defaultConfig = {
					slidesToShow:1,
					slidesToScroll:1,	
					infinite:false,
					accessibility:true,
					speed:500,
			        touchMove:true,
			        swipe:true,
			        arrows:false,
			        dots:true,
			        customPaging:function(slider, i){
			        	var pagingTitle = $(slider.$slides[i]).find('[data-role="slide-title"]').text().toLowerCase(),
			        		pageText 	= pagingTitle.indexOf('.') > -1 ? pagingTitle.split('.')[0] : pagingTitle;

						return '<button type="button" data-role="none" role="button" tabindex="0" onclick="sendClickCode(\'content_click_count\',\'rolling:index_' + (i + 1) + '\');">' + sliderName.split('.')[0] + ' ' + sliderTitle[i] + '</button>';
					}
				},
				activeIdx = 0,
				swipeFlag = true;

			target.slick(defaultConfig);

			target.on('afterChange', function(event, slick, currentSlide, nextSlide){
	        	var $next 			= $(slick.$slides[currentSlide]),
	        		$wrap 			= $next.closest('[data-role="tab-to-slide"]'),
	        		$wrapVisible	= $wrap.filter(':visible'),
	        		tabMedia 		= $wrap.find('[data-role="tab-media"]').children().eq(currentSlide),
	        		tabTit 			= $wrap.find('[data-role="tab-title"]').children().eq(currentSlide),
					tabTxt 			= $wrap.find('[data-role="tab-text"]').children().eq(currentSlide),
					contentType 	= $next.find('[data-role="tab-content-video"]').length ? "video_" : "image_",
					sliderName 		= $next.closest('[data-role="tab-slider"]').data('slider-name'),
					taggingName 	= sliderName != undefined ? sliderName.indexOf('.') > -1 ? sliderName.split('.')[0].toLowerCase() : sliderName.toLowerCase() : "",
					currentSCroll 	= $(window).scrollTop();
				
				currentSCroll = $(window).scrollTop();
				$next.addClass('active').siblings().removeClass('active');
				tabMedia.addClass('active').siblings().removeClass('active');
				tabTit.addClass('active').siblings().removeClass('active');
				tabTxt.addClass('active').siblings().removeClass('active');

				$next.closest('[data-role="tab-slider"]').find('figure').each(function(){
					var _href 	= $(this).find('video').attr('id'),
						$id 	= $('[data-role="tab-content-video"]:visible').find('#' + _href);

					if($id.length){
						$id[0].pause();
						if($id[0].currentTime != 0){
							$id[0].currentTime = 0;
						}
						
						$next.closest('[data-role="tab-slider"]').find('.btn-media-play').fadeIn();
						
					}
				});

				if(swipeFlag == true){
					sendClickCode('content_click','apps:' + APPS_SERVICE_NAME + ':' + contentType + taggingName + (currentSlide + 1) + '_swipe');
				}

				if($.browser.mobile){
		        	$next.closest('[data-role="tab-slider"]').find('.slick-dots li').find('button').blur();
		        	$next.closest('[data-role="tab-slider"]').find('.slick-dots li').eq(currentSlide).find('button').focus();
		        	$(window).scrollTop(currentSCroll);
		        }
	        });

	        $(document).on('click', '[data-role="tab-to-slide"] .slick-dots button', function(){
	        	swipeFlag = false;
				setTimeout(function(){
					swipeFlag = true;
				}, 600);
	        });
		},
		slideSetting:function(){
			var slider 	= $('[data-role="tab-to-slide"]').find('[data-role="tab-slider"]'),
				sliderTitle = [];				

			if(P5_APPS_USP.sizeMode == 1){
				slider.each(function(){
					var sliderName 	= $(this).data('slider-name'),
						sliderLen   = $(this).find(".tab_slide_con").length;

					for( var t = 0; t < sliderLen; t++ ){
						sliderTitle.push($(this).find(".tab_slide_con").eq(t).find("a[data-role='slide-title']").text());
					}

					if(!$(this).hasClass('slick-initialized')){
						P5_APPS_USP.tabToSlide.slickSlider($(this), sliderName, sliderTitle);
						sliderTitle = [];
						if($(this).find('.active').length){
							activeIdx = $(this).find('.slick-slide.active').index();
							$(this)[0].slick.slickGoTo(activeIdx);
						}
					}
				});
			} else if(P5_APPS_USP.sizeMode > 1){
				slider.each(function(){
					if($(this).hasClass('slick-initialized')){
						$(this).slick("unslick");
						$(this).find('div, a').removeAttr('tabindex');
						$(this).find('div, a').removeAttr('style');
					}
				});
			}
		},
		tab:function(){
			var target 		= $('[data-role="tab-to-slide"]'),
				tabBtn 		= $('[data-role="tab-slider"]').find('a');

			tabBtn.on('click', function(e){
				var _this 		= $(this),
					_parent 	= $(this).parent(),
					_wrap 		= $(this).closest('[data-role="tab-to-slide"]'),
					currentIdx 	= _parent.index(),
					tabMedia 	= _wrap.find('[data-role="tab-media"]').children(),
					tabVideo 	= $('[data-role="tab-content-video"]'),
					tabTit 		= _wrap.find('[data-role="tab-title"]').children(),
					tabTxt 		= _wrap.find('[data-role="tab-text"]').children();

				_parent.addClass('active').siblings().removeClass('active');

				tabMedia.eq(currentIdx).addClass('active').siblings().removeClass('active');
				tabTit.eq(currentIdx).addClass('active').siblings().removeClass('active');
				tabTxt.eq(currentIdx).addClass('active').siblings().removeClass('active');

				if(tabVideo.length && tabVideo.is(tabMedia)){
					var _id = tabMedia.eq(currentIdx).find('video').attr('id'),
						currentVideo = $('#' + _id)[0];

					tabMedia.filter(tabVideo).each(function(){
						var _this 		= $(this),
							_video 		= $('#' + _this.find('video').attr('id'))[0];

						_video.pause();
						_video.currentTime = 0;

						if(_this.find('.btn-media-play').length && $('html').hasClass('mobile')){
							_this.find('.btn-media-play').show();
						}
					});

					if(tabMedia.find($('#' + _id)).length && _id != undefined && !$('html').hasClass('mobile')){
						setTimeout(function(){
							if(currentVideo.paused){
								currentVideo.play();
							}
						}, 150);
					}
				}
				e.preventDefault();
			});
		},
		videoSetting:function(){
			var target 		= $('[data-role="tab-to-slide"]'),
				tabList 	= target.find('[data-role="tab-slider"]').children(),
				tabVideo 	= $('[data-role="tab-content-video"]');

			if(tabVideo.length){
				tabVideo.each(function(){
					var _this  		= $(this),
						_figure		= _this.find('figure'),
						_data 		= _figure.data('media-video'),
						_altTxt 	= _figure.data('alt-text') != undefined ? _figure.data('alt-text').split('.')[0]:"",
						setIndex	= $(this).index('[data-role="tab-content-video"]'),
						videoSource = '',
						clickCode 	= "sendClickCode('content_click', 'apps:" + APPS_SERVICE_NAME + ":video_" + _altTxt.toLowerCase() + "');",
						sizeTrue	= P5_APPS_USP.sizeMode == 1 ? "mo":"pc",
						sizeFalse	= P5_APPS_USP.sizeMode == 1 ? "pc":"mo",
						sizeClass 	= P5_APPS_USP.sizeMode == 1 ? "mobile-check" : "pc-check";
						videoSource += '<figcaption class="blind">' + _altTxt + '</figcaption>';
						videoSource += '<video preload="metadata" muted="" class="' + sizeClass + '" id="tabMedia' + setIndex + '" webkit-playsinline="true" playsinline="true">';
						videoSource += 	'<source src="' + _data + '_' + sizeTrue + '.mp4" type="video/mp4" data-media-' + sizeTrue + '="' + _data + '_' + sizeTrue + '.mp4" data-media-' + sizeFalse + '="' + _data + '_' + sizeFalse + '.mp4">';
						videoSource += '</video>';
						
						if( $.browser.mobile ){
							videoSource += '<img src="' + _data + '_' + sizeTrue + '.jpg" style="width:100%; height:100%; position:absolute; top:0; left:0;" class="video_poster" alt=""   >';
						}
						videoSource += '<button type="button" class="btn-media-play" onclick="' + clickCode + '"><span class="blind">Play</span></button>';
						
					if(!_figure.children().length){
						_figure.append(videoSource);
					}
				});
			}
		},
		listSetting:function(){
			var target 		= $('[data-role="tab-to-slide"]'),
				tabList 	= target.find('[data-role="tab-slider"]').children();

			if(P5_APPS_USP.sizeMode == 1) {
				tabList.each(function(){
					var _wrap 		= $(this).closest('[data-role="tab-to-slide"]'),
						currentIdx 	= $(this).index(),
						tabMedia 	= _wrap.find('[data-role="tab-media"]').children(),
						tabTit 		= _wrap.find('[data-role="tab-title"]').children(),
						tabTxt 		= _wrap.find('[data-role="tab-text"]').children();

					if(!$(this).children().not('a').length){
						$(this).prepend(tabMedia.eq(currentIdx).clone(true).addClass('clone'));
						$(this).append(tabTit.eq(currentIdx).clone(true).addClass('clone'));
						$(this).append(tabTxt.eq(currentIdx).clone(true).addClass('clone'));
					}
				});
			}
		},
		init:function(){
			this.videoSetting();
			this.listSetting();
			this.slideSetting();
			this.tab();

			$(document).on('click', '.btn-media-play', function(e){
				var _this 	= $(this),
					_wrap 	= $(this).closest('[data-role="tab-content-video"]:visible'),
					_id 	= _wrap.find('video').attr('id'),
					_video 	= _wrap.find('#' + _id),
					_poster = $(this).prev("img");

				//if(_video[0].currentTime == 0){
					if(_video[0].currentTime != 0){
						_video[0].currentTime = 0;
					}
					_video[0].play();	
					$(this).fadeOut();
				//}
				
				var videoLoadCheck = setInterval(function(){
					if( _video[0].currentTime != 0 ){
						_poster.hide();
						clearInterval(videoLoadCheck);
					}
				},300);

				_video[0].addEventListener("ended", function(){
					_video[0].currentTime = 0;
					_video[0].pause();
					//_poster.show();
					_this.fadeIn();
				}, false);

				e.preventDefault();
			});

			var target 		= $('[data-role="tab-to-slide"]'),
				sectionFlag	= [];

			if(target.length){
				target.each(function(i){
					var _this	= $(this);
					var $video = $(this).find('[data-role="tab-content-video"]');
					
					if($video.length){
						P5_APPS_USP.addViewportEvent({ 
							triggerPositionPercent: 20, 
							enter :  function(){ 
								var targetVideo = $video.closest('[data-role="tab-to-slide"]').find('[data-role="tab-content-video"]').filter(':visible');
									currentId 	= $('#' + targetVideo.find('video').attr('id'));

									if(P5_APPS_USP.sizeMode != 1 && !$('html').hasClass('mobile')){
										if(currentId.length){
											if( currentId[0].readyState == 4 ){
												currentId[0].play();
											}
										}
									}
								},
								
							leave : function(e){
								if(P5_APPS_USP.sizeMode != 1 && !$('html').hasClass('mobile')){
									var targetVideo = $video.closest('[data-role="tab-to-slide"]').find('[data-role="tab-content-video"]').filter(':visible');
										currentId 	= $('#' + targetVideo.find('video').attr('id'));
									if(currentId.length){
										if( currentId[0].readyState == 4 ){
											currentId[0].pause();
											currentId[0].muted = true;
											
											if(currentId[0].currentTime != 0){
												currentId[0].currentTime = 0;
											}
										}	
									}
								}
							}
							
						}, _this );
					}
				});
			}
		},
		posterCheck:function(){
			var tablist		= $('[data-role="tab-to-slide"] [data-role="tab-slider"]').children(),
				tabVideo 	= $('[data-role="tab-content-video"] > figure');

			if($('html').hasClass('mobile')){
				tabVideo.each(function(){
					var _this = $(this);

					if(_this.find('.video_poster').not(':visible')){
						_this.find('.video_poster').show(function(){
							$(this).removeAttr('style');
						});
					}
				});
			}
		},
		resize:function(){
			var tablist		= $('[data-role="tab-to-slide"] [data-role="tab-slider"]').children(),
				tabVideo 	= $('[data-role="tab-content-video"] > figure');

			if(P5_APPS_USP.sizeMode == 1) {
				if($('.pc-check').length){
					tabVideo.children().remove();
					this.posterCheck();
					this.videoSetting();
				} 
				this.listSetting();
			} else if(P5_APPS_USP.sizeMode > 1){
				if($('.mobile-check').length){
					tabVideo.children().remove();
					$('[data-role="tab-slider"]').find('.clone').remove();
					this.posterCheck();
					this.videoSetting();
				} else {
					$('[data-role="tab-slider"]').find('.clone').remove();
				}
			}

			if($('html').hasClass('mobile')){
				///$('.video_poster').show();
			}

			this.slideSetting();
			this.tab();
		}
	},

	contentToggle:function(){
		var $button 	= $('[data-role="btn-content-toggle"]');


			$button.each(function(){
				var $wrap 			= $(this).closest('[data-role="toggle-container"]'),
					serviceName 	= $wrap.data('alt-text').indexOf('/') > 0 ? $wrap.data('alt-text').split(',')[0] :  $wrap.data('alt-text').split('/')[0],
					openCode 		= "sendClickCode('view more','apps:" + serviceName + ":see more');";
			});

			$button.on('click', function(e){
				var $wrap 			= $(this).closest('[data-role="toggle-container"]'),
					$content 		= $wrap.find('[data-role="toggle-content"]'),
					serviceName 	= $wrap.data('alt-text').indexOf('/') < 0 ? $wrap.data('alt-text').split(',')[0] :  $wrap.data('alt-text').split('/')[0],
					openTxt 		= $wrap.data('alt-text').indexOf('/') < 0 ? $wrap.data('alt-text').split(',')[1] : $wrap.data('alt-text').split('/')[1],
					closeTxt 		= $wrap.data('alt-text').indexOf('/') < 0 ? $wrap.data('alt-text').split(',')[2] : $wrap.data('alt-text').split('/')[2],
					openTitle 		= $wrap.data('alt-text').indexOf('/') < 0 ? $wrap.data('alt-text').split(',')[3] : $wrap.data('alt-text').split('/')[3],
					closeTitle 		= $wrap.data('alt-text').indexOf('/') < 0 ? $wrap.data('alt-text').split(',')[4] : $wrap.data('alt-text').split('/')[4],
					openCode 		= "sendClickCode('view more','apps:" + serviceName + ":see more');",
					closeCode 		= "sendClickCode('view more','apps:" + serviceName + ":see less');";
				
				if( serviceName == "samsung dex" ){
					openTxt = "MOST APPS WORK ON DeX MODE, SEE BELOW FOR MORE!";
				}

				if($wrap.hasClass('active')){
					$content.stop().slideUp(function(){
						$(this).closest('[data-role="toggle-container"]').find('[data-role="btn-content-toggle"]').focus();
						$(this).closest('[data-role="toggle-container"]').removeClass('active');
						$(this).closest('[data-role="toggle-container"]').find('[data-role="btn-content-toggle"]').text(openTxt);
						$(this).closest('[data-role="toggle-container"]').find('[data-role="btn-content-toggle"]').attr('title', openTitle);
						$(this).closest('[data-role="toggle-container"]').find('[data-role="btn-content-toggle"]').attr('onclick', openCode);
					});
				} else {
					$content.stop().slideDown(function(){
						$(this).closest('[data-role="toggle-container"]').find('[data-role="btn-content-toggle"]').text(closeTxt);
						$(this).closest('[data-role="toggle-container"]').find('[data-role="btn-content-toggle"]').attr('title', closeTitle);
						$(this).closest('[data-role="toggle-container"]').find('[data-role="btn-content-toggle"]').attr('onclick', closeCode);
					});
					$wrap.addClass('active');
				}
				e.preventDefault();
			});
	},

	videoBackground : {
		autoPlay:function(){
			var target 			= $('[data-role="apps-video-type"] .f_container figure[data-media-video]'),
				sectionFlag		= [];

			if(target.length){
				target.each(function(i){
					sectionFlag[i] = true;
					
					var _this	= $(this);
					
					P5_APPS_USP.addViewportEvent({ 
						triggerPositionPercent: 20, 
						enter :  function(){ 
								var _href 		= _this.find('video').attr('id'),
									$id 		= $('#' + _href);

								if(P5_APPS_USP.sizeMode != 1 && sectionFlag[i] == true && !$('html').hasClass('mobile')){
									sectionFlag[i] = false;
									if($id.length){
										if( $id[0].readyState == 4 ){
											$id[0].play();
										}
									}
								}
							},
						leave : function(){
							var _href 		= _this.find('video').attr('id'),
								$id 		= $('#' + _href);

							if(P5_APPS_USP.sizeMode != 1 && !$('html').hasClass('mobile')){
								if($id.length){
									if( $id[0].readyState == 4 ){
										$id[0].pause();
										$id[0].muted = true;
										if($id[0].currentTime != 0){
											$id[0].currentTime = 0;
										}
									}	
								}
							}						
							sectionFlag[i] = true;
						}
						
					}, _this );
				});
			}
		},
		init:function(){
			this.videoSetting();
			this.autoPlay();
			this.clickEvent();
		},
		videoSetting:function(){
			var target 			= $('[data-role="apps-video-type"] .f_container figure[data-media-video]'),
				sectionFlag		= true;

			if(target.length){
				target.each(function(){
					var _this  		= $(this),
						_data 		= _this.data('media-video'),
						_altTxt 	= _this.data('alt-text') != undefined ? _this.data('alt-text').split('.')[0]:"",
						currentIdx	= $(this).index('[data-role="apps-video-type"] .f_container figure[data-media-video]'),
						videoSource = '',
						clickCode 	= "sendClickCode('content_click', 'apps:" + APPS_SERVICE_NAME + ":video_" + _altTxt.toLowerCase() + "');",
						sizeTrue	= P5_APPS_USP.sizeMode == 1 ? "mo":"pc",
						sizeFalse	= P5_APPS_USP.sizeMode == 1 ? "pc":"mo",
						sizeClass 	= P5_APPS_USP.sizeMode == 1 ? "mobile-check" : "pc-check";
						
						videoSource += '<figcaption class="blind">' + _altTxt + '</figcaption>';
						videoSource += '<video preload="metadata" muted="" class="' + sizeClass + '" id="appsVideo' + currentIdx + '" webkit-playsinline="true" playsinline="true">';
						videoSource += 	'<source src="' + _data + '_' + sizeTrue + '.mp4" type="video/mp4" data-media-' + sizeTrue + '="' + _data + '_' + sizeTrue + '.mp4" data-media-' + sizeFalse + '="' + _data + '_' + sizeFalse + '.mp4">';
						// videoSource += 	'<source src="' + _data + '_' + sizeTrue + '.webm" type="video/webm" data-media-' + sizeTrue + '="' + _data + '_' + sizeTrue + '.webm" data-media-' + sizeFalse + '="' + _data + '_' + sizeFalse + '.webm">';
						// videoSource += 	'<source src="' + _data + '_' + sizeTrue + '.ogv" type="video/ogg" data-media-' + sizeTrue + '="' + _data + '_' + sizeTrue + '.ogv" data-media-' + sizeFalse + '="' + _data + '_' + sizeFalse + '.ogv">';
						videoSource += '</video>';
						
						if( $.browser.mobile ){
							videoSource += '<img src="' + _data + '_' + sizeTrue + '.jpg" style="width:100%; position:absolute; top:0; left:0;" class="video_poster" alt=""   >';	
						}
						
						videoSource += '<button type="button" class="btn-video-play" onclick="' +  clickCode + '"><span class="blind">Play</span></button>';
					_this.append(videoSource);
				});
			}
		},
		clickEvent:function(){

			var _videoArray = [];
			$("video").each(function(i,v){
				_videoArray.push($(this).attr("id"));				
			});

			$(document).on('click', '.btn-video-play', function(e){
				var _this 	= $(this),
					_wrap 	= $(this).closest('.f_container'),
					_id 	= _wrap.find('video').attr('id'),
					_video 	= $('#' + _id),
					_poster = $(this).prev("img");

				var newVideoArr = _videoArray.filter(function(item, index, array){
					return item != _id;
				});

				for( var i = 0; i < newVideoArr.length; i++){
					$("#"+ newVideoArr[i])[0].currentTime = 0;
					$("#"+ newVideoArr[i])[0].pause();
				}

				$(".btn-video-play").show();
				_video[0].currentTime = 0;
				_video[0].play();
				_video[0].muted = true;
				
				$(this).fadeOut();
				
				var videoLoadCheck = setInterval(function(){
					if( _video[0].currentTime != 0 ){
						_poster.hide();
						clearInterval(videoLoadCheck);
					}
				},300);
				
				_video[0].addEventListener("ended", function(){
					_video[0].currentTime = 0;
					_video[0].pause();
					//_poster.show();
					_this.fadeIn();
				}, false);

				e.preventDefault();
			});

			$('[data-role="btn-mute-toggle"]').on('click', function(e){
				var _this 	= $(this),
					_wrap 	= $(this).closest('.f_container'),
					_id 	= _wrap.find('video').attr('id'),
					_video 	= $('#' + _id),
					_poster = _wrap.find(".video_poster");

				if(_video.length){
					
					if(! _this.hasClass("active") ){
						_video.parent().find(".btn-video-play").trigger("click");
						_video[0].muted = false;
					} else {
						if(_video[0].currentTime != 0){
							_video[0].pause();
							//_poster.show();
							_video[0].currentTime = 0;
						}
						setTimeout(function(){
							_video[0].muted = false;
							_video[0].play();
							_video.parent().find(".btn-video-play").fadeOut();
							_poster.hide();	
						}, 150);
					}
					
					_this.addClass('active');
					
				}

				e.preventDefault();
			});
		},
		posterCheck:function(){
			var $figure = $('[data-role="apps-video-type"] .f_container figure[data-media-video]');

			if($('html').hasClass('mobile')){
				$figure.each(function(){
					var _this = $(this);

					if(_this.find('.video_poster').not(':visible')){
						_this.find('.video_poster').show(function(){
							$(this).removeAttr('style');
						});
					}
				})
			}
		},
		resize:function(){
			if(window.innerWidth > 768){
				if($('.mobile-check').length){
					$('[data-role="apps-video-type"] .f_container figure[data-media-video]').children().remove();
					this.videoSetting();
				}
				
			} else {
				if($('.pc-check').length){
					$('[data-role="apps-video-type"] .f_container figure[data-media-video]').children().remove();
					this.videoSetting();
				}
			}

			if($('html').hasClass('mobile')){
				//$('.video_poster').show();
			}
			this.autoPlay();
			this.clickEvent();
		}
	},

	appsPopup : {
		elem : {
			targetWrap 	: $('body'),
			inner		: $('.apps-popup_wrap .popup_inner:visible'),
			popupButton : $('[data-role="popup-toggle"]'),
			popupWrap 	: '<div class="apps-popup_wrap"><div class="popup_dimm"></div></div>'
		}, 
		
		init : function(){
			P5_APPS_USP.appsPopup.elem.popupButton.on('click', function(e){
				var currentIdx 		= $(this).index('[data-role="popup-toggle"]'),
					popupContent 	= $('[data-role="popup-content"]'),
					innerHeight;

				$(this).addClass('checked_toggle');
				P5_APPS_USP.appsPopup.elem.targetWrap.append(P5_APPS_USP.appsPopup.elem.popupWrap).addClass('layer_open');
				popupContent.eq(currentIdx).clone().appendTo('.apps-popup_wrap');
				
				P5_APPS_USP.appsPopup.elem.inner 	= $('.apps-popup_wrap .popup_inner:visible');
				innerHeight 					= P5_APPS_USP.appsPopup.elem.inner.height() - P5_APPS_USP.appsPopup.elem.inner.find('.inner_head').outerHeight(true);
				P5_APPS_USP.appsPopup.elem.inner.find('.inner_content').css('height', innerHeight);
				P5_APPS_USP.appsPopup.elem.inner.attr('tabindex', '0').focus();
				P5_APPS_USP.appsPopup.keyCtrl();

				e.preventDefault();
			});
			
			$(document).on('click', '.apps-popup_wrap .popup_dimm , .apps-popup_wrap .btn_popup_close', function(e){
				P5_APPS_USP.appsPopup.close();
				e.preventDefault();
			});
			
		},
		
		close : function(){
			P5_APPS_USP.appsPopup.elem.targetWrap.removeClass('layer_open');
			$('.apps-popup_wrap').remove();
			$('[data-role="popup-toggle"].checked_toggle').focus().removeClass('checked_toggle');
		},
		
		keyCtrl : function(){
			var $firstEl 	= P5_APPS_USP.appsPopup.elem.inner.find('a, button, [tabindex="0"]').filter(':first'),
				$lastEl 	= P5_APPS_USP.appsPopup.elem.inner.find('a, button, [tabindex="0"]').filter(':last');

			$firstEl.on('keydown', function(e){
				if(e.keyCode == '9' && e.shiftKey){
					$lastEl.focus();
					return false;
				}
			});

			$lastEl.on('keydown', function(e){
				if(e.keyCode == '9' && !e.shiftKey){
					$firstEl.focus();
					return false;
				}
			});			
		},
		
		resize : function(){
			var innerHeight = P5_APPS_USP.appsPopup.elem.inner.height() - P5_APPS_USP.appsPopup.elem.inner.find('.inner_head').outerHeight(true);
			P5_APPS_USP.appsPopup.elem.inner.find('.inner_content').css('height', innerHeight);
		}
		
	},

	uspIntroMotion:function(){
		var $target 		= $('.m_content-intro'),
			$logo 			= $target.find('.f_header .logo'),
			$tit 			= $target.find('.f_header .tit'),
			$desc 			= $target.find('.f_header .desc'),
			$disclaimer		= $target.find('.f_header .disclaimer'),
			$content 		= $('[class*="m_content-"]'),
			$subnav 		= $('.apps-subnav'),
			motionSpeed		= 500;


			if( $target.find(".btn_kv").length > 0 ){
				var $btnKv = $target.find(".f_header .btn_kv");
				$btnKv.stop().delay(1300).animate({opacity:1}, motionSpeed, function(){
					$btnKv.removeAttr('style');
				});
			}
			

			if(P5_APPS_USP.sizeMode != 1){
				$target.css('opacity', 1);
				$logo.stop().delay(1000).animate({opacity:1}, motionSpeed);
				$tit.stop().delay(1300).animate({opacity:1}, motionSpeed);
				$desc.stop().delay(1300).animate({opacity:1}, motionSpeed, function(){
					$target.addClass('active');
					$logo.removeAttr('style');
					$tit.removeAttr('style');
					$desc.removeAttr('style');

					$content.stop().animate({
						opacity:1
					}, motionSpeed, function(){
						$('.apps_usp').addClass('show');
						$(this).removeAttr('style');
					});
				});
			} else {
				$target.addClass('active');
				$('.apps_usp').addClass('show');
			};
	},
	
	mouseWheelAnimate : {
		elem : {
			target 				: $("[data-role='mouse-wheel-animate']"),
			header				: $("[data-role='mouse-wheel-animate']").find(".f_header"),
			container			: $("[data-role='mouse-wheel-animate']").find(".f_container"),
			guideLineTop		: "",
			subnavHeight		: $(".apps_usp").find(".apps-subnav").outerHeight(true),
			windowWidth			: window.innerWidth
		},
		
		init : function(){
			if( P5_APPS_USP.mouseWheelAnimate.elem.target.length > 0 ){
				var currentIdx = 0;
				var prevTimeStamp = 0;
				var animateCheckDown = true;
				var animateCheckUp = false;
				var preventCheckDown = true;
				var preventCheckUp = true;
				var animateTimeCheck = true;

				setTimeout(function(){
					P5_APPS_USP.mouseWheelAnimate.elem.guideLineTop = parseInt(P5_APPS_USP.mouseWheelAnimate.elem.container.offset().top) - parseInt(P5_APPS_USP.mouseWheelAnimate.elem.header.css("paddingBottom")) - parseInt(P5_APPS_USP.mouseWheelAnimate.elem.subnavHeight);
				},1000);
				
				function wheelEvent(event,deltaY){
					/* wheel down */
					if( deltaY < 0 ){
						if( $(window).scrollTop() > P5_APPS_USP.mouseWheelAnimate.elem.guideLineTop - 200 || $(window).scrollTop() ==  P5_APPS_USP.mouseWheelAnimate.elem.guideLineTop ){
							if( preventCheckDown ){
								event.preventDefault();
							}
							
							//霛检澑 毵烄稊電� 鞎犽媹氅旍澊靺� 1氩堧 鞁ろ枆
							if( animateCheckDown ){
								$("body, html").stop(true,false).animate({ "scrollTop" : P5_APPS_USP.mouseWheelAnimate.elem.guideLineTop }, 500,function(){
									animateTimeCheck = false;
								});
								animateCheckDown = false;
							}

							if( event.timeStamp - prevTimeStamp > 200 && animateTimeCheck == false ){
								if( currentIdx < $(".screen_img_wrap .img_box").size() - 1 ){
									$(".screen_img_wrap .img_box").removeClass("active").eq(currentIdx+1).addClass("active");	
									$(".screen_desc_box .txt_box").removeClass("active").eq(currentIdx+1).addClass("active");
									currentIdx = currentIdx + 1;
									preventCheckUp = true;
								} else {
									preventCheckUp = true;
									animateCheckUp	= true;
									preventCheckDown = false;
									animateCheckDown = false;
									animateTimeCheck = true;
								}
								preventCheckUp	= true;
							}
						}	
						prevTimeStamp = event.timeStamp;
					} 
					/* wheel up */
					else {
						if( $(window).scrollTop() <  P5_APPS_USP.mouseWheelAnimate.elem.guideLineTop + 200 && $(window).scrollTop() >= P5_APPS_USP.mouseWheelAnimate.elem.target.offset().top - 200 || $(window).scrollTop() == P5_APPS_USP.mouseWheelAnimate.elem.guideLineTop ){

							if( currentIdx == 0 ){
								preventCheckUp = false;
							}

							if( preventCheckUp ){
								event.preventDefault();
							}
							
							if( animateCheckUp ){
								$("body, html").stop(true,false).animate({ "scrollTop" : P5_APPS_USP.mouseWheelAnimate.elem.guideLineTop }, 500,function(){
									animateTimeCheck = false;
								});
								animateCheckUp = false;
							}
							
							if( event.timeStamp - prevTimeStamp > 200 && animateTimeCheck == false ){
								if( currentIdx > 0 ){
									$(".screen_img_wrap .img_box").removeClass("active").eq(currentIdx-1).addClass("active");
									$(".screen_desc_box .txt_box").removeClass("active").eq(currentIdx-1).addClass("active");	
									currentIdx = currentIdx - 1;
									preventCheckDown = true;
								} else {
									preventCheckUp = false;
									animateCheckUp	= false;
									preventCheckDown = true;
									animateCheckDown = true;
									animateTimeCheck = true;
								}
								preventCheckDown = true;
							}
						}
						prevTimeStamp = event.timeStamp;
					}
				}
				
				//mousewheel
				$(window).on("mousewheel.disableScroll" , function(e, delta){
					if( $("html").is(".mobile") == false && $("html").is(".touch") == false && P5_APPS_USP.mouseWheelAnimate.elem.windowWidth > 768 ){
						wheelEvent(e,delta);
					}
				});
			}
		},
		
		resize : function(){
			if( P5_APPS_USP.mouseWheelAnimate.elem.target.length > 0 ){
				P5_APPS_USP.mouseWheelAnimate.elem.subnavHeight = $(".apps_usp").find(".apps-subnav").outerHeight(true);
				P5_APPS_USP.mouseWheelAnimate.elem.windowWidth = window.innerWidth;

				P5_APPS_USP.mouseWheelAnimate.elem.guideLineTop = parseInt(P5_APPS_USP.mouseWheelAnimate.elem.container.offset().top) - parseInt(P5_APPS_USP.mouseWheelAnimate.elem.header.css("paddingBottom")) - parseInt(P5_APPS_USP.mouseWheelAnimate.elem.subnavHeight);
			}
		}
	},

	dreamUrl:function(){
		var $target 		= $('.m_content-pdp').find('.galaxy-dream');
		var $link			= $target.find("a:first"); 
		var apply_country 	= [ ];		// pre-order 鞝滉车 甑皜 旖旊摐 鞛呺牓
		var preOrderHref	= "#test";
		var clickCode 		= "sendClickCode('wishlist','buy-mobile:pre-order|galaxy s8|galaxy s8');";
		var preOrderHtml	= '<a href="'+ preOrderHref +'" onclick="' + clickCode + '" class="btn_link">PRE-ORDER</a>';
		
		if($target.length){
			$link.attr('href', '/' + APPS_SITE_CODE + '/smartphones/galaxy-s8/');
				
			$.each( apply_country , function(idx,val){
				if( val == APPS_SITE_CODE ){
					$target.append(preOrderHtml);
				}
			});
		}
	},

	overviewRedirect:function(){
		var $button = $('.apps-subnav a');

		if($('.apps_usp').hasClass('overview')){
			$button.on('click', function(e){
				var _this 		= $(this);
					_href 		= $(this).attr('href'),
					defaultUrl	= location.href,
					originValue = defaultUrl.split('#')[0],
					checkValue 	= _href.split('#')[1];

				if(checkValue != undefined && checkValue.length > 1){
					e.preventDefault();

					var _local = "index_local.html",
						_index = "index.html";

					if(originValue.indexOf(_index) > -1){
						originValue = originValue.replace(/\index.html/g,'');
						document.location.href = originValue + checkValue;
					} else if(originValue.indexOf(_index) == -1 && originValue.indexOf(_local) > -1){
						originValue = originValue.replace(/\index_local.html/g,'');
						document.location.href = originValue + checkValue;
					} else {
						document.location.href = originValue + checkValue;	
					}
					
				}
			});
		}
	},
	
	videoClick : {

		init : function(){
			var player;

			$(".m_content-new_way .video_area").find(".btn-play").on("click",function(e){
				e.preventDefault();
				//sendClickCode('content_click','apps:usp service:video_why bixby');
				
				$(this).parent("figure").css("display","none");
				$(".m_content-new_way .video_area").find(".video-box").css("display","block");
				
				if( APPS_SITE_CODE != "sec" ){
					$(".f_container .video-box").append('<iframe id="video-bixby_why" src="https://www.youtube.com/embed/zwui9ZwnrUI?ecver=1&autoplay=1" title="An interview video of vice president of Samsung who lead the Bixby project." allowfullscreen></iframe>');
				}else{
					$(".f_container .video-box").append('<iframe src="https://www.youtube.com/embed/0eP612h-OGQ?ecver=1&autoplay=1" title="Bixby - A New Way to Interact with Your Phone 牍勲敂鞓�" id="video-bixby_why" allowfullscreen></iframe>');
				}
			});
		}

	},

	bixbyMoreBtn : {

		init : function(){
			var bixbyWhy = $(".apps_usp.sec .why_bixby"),
				bixbyBtn = bixbyWhy.find(".btn-service-toggle"),
				taggingMore = "sendClickCode('view_more','apps:bixby why:see more')",
				taggingLess = "sendClickCode('view_more','apps:bixby why:see less')";

			bixbyBtn.on("click",function(e){

				if( !$(this).parents(".desc-box").is(".active") ){
					$(this).parents(".desc-box").addClass("active");
					$(this).find(".blind").text("雼灅");
					$(this).attr('onclick', taggingMore);

				}else{
					$(this).parents(".desc-box").removeClass("active");
					$(this).find(".blind").text("鞐措");
					sendClickCode('view_more','apps:bixby why:see less');
					$(this).attr('onclick', taggingLess);
				}
	
			});
		}

	},
	galaxyCheck :function(){
		function isMobileDevice() {
			if(navigator.userAgent.toLowerCase().indexOf('sm-') > -1) {
				return true;
			}
			return false;
		}

		if( isMobileDevice() == true && !$(".apps_usp").is(".health") ){
			$(document.documentElement).addClass('samsung-device');
		}

		if( $(".apps_usp").is(".health") ){
			if( isMobileDevice() == true && navigator.userAgent.toLowerCase().indexOf('mobile') > -1 ){
				$(document.documentElement).addClass('samsung-device');
			}
		}
	},
	connectAnimate : {
		elem : {
			$right : 0,
			$bottom : 0
		},
		init : function(){
			if( $(".connect").length > 0 ){
				if( $(".m_content-motion").length > 0 ){
					var _this = $(".m_content-motion"),
						$hand = _this.find(".move_item");

					if( window.innerWidth <= 1440 && window.innerWidth > 768 ){
						P5_APPS_USP.connectAnimate.elem.$right = - 100 / 14.4 + "vw";
						P5_APPS_USP.connectAnimate.elem.$bottom = - 100 / 14.4 + "vw";
					}else if( window.innerWidth > 1440 ){
						P5_APPS_USP.connectAnimate.elem.$right = - 100 + "px";
						P5_APPS_USP.connectAnimate.elem.$bottom = - 100 + "px";
					}

					$hand.removeAttr("style");
					$hand.css({
						"right" : P5_APPS_USP.connectAnimate.elem.$right,
						"bottom" : P5_APPS_USP.connectAnimate.elem.$bottom
					});

					P5_APPS_USP.addViewportEvent({ 
						triggerPositionPercent: 20, 
						enter :  function(){
							TweenMax.to( $hand, 1, { right: 0, bottom : 0 } );		
						},
							
						leave : function(e){
							TweenMax.to( $hand, 1, { right: P5_APPS_USP.connectAnimate.elem.$right, bottom : P5_APPS_USP.connectAnimate.elem.$bottom } );
						}
						
					}, _this );
				}
			}
		},
		resize : function(){
			var _this = $(".m_content-motion"),
				$hand = _this.find(".move_item");

			if( window.innerWidth <= 1440 && window.innerWidth > 768 ){
				P5_APPS_USP.connectAnimate.elem.$right = - 100 / 14.4 + "vw";
				P5_APPS_USP.connectAnimate.elem.$bottom = - 100 / 14.4 + "vw";
			}else if( window.innerWidth > 1440 ){
				P5_APPS_USP.connectAnimate.elem.$right = - 100 + "px";
				P5_APPS_USP.connectAnimate.elem.$bottom = - 100 + "px";
			}

			$hand.removeAttr("style");
			$hand.css({
				"right" : P5_APPS_USP.connectAnimate.elem.$right,
				"bottom" : P5_APPS_USP.connectAnimate.elem.$bottom
			});
		}
	},

	canvasMotion : {
		init : function(){

			var _this = $(".m_content-best"),
				ico1 = $(".ico_1"),
				ico2 = $(".ico_2"),
				ico3 = $(".ico_3"),
				ico4 = $(".ico_4"),
				ico_animate = $(".obj_animate"),
				setTimeoutVarArray = [],
				reverseDelay = 1000,
				progressItv;

			function progress1(){
				
				ico1.find(".obj_animate.s1").stop().animate({"height" : 0}, 300, "easeInOutSine", function(){
					ico1.find(".obj_animate.s2").stop().animate({"height" : 0}, 300);
				});

				setTimeout(function(){
					ico1.find(".obj_animate.s2").stop().animate({"height" : "100%"}, 300, "easeInOutSine", function(){
						ico1.find(".obj_animate.s1").stop().animate({"height" : "100%"}, 300);
					});
				},1000);

			}

			function progress2(){
				ico2.find(".obj_animate.s1").circleProgress({
					startAngle: -Math.PI / 4 * 1,
					value: 0,
					animationStartValue : 0.5,
					//lineCap: 'round',
					fill: {color: '#fafafa'},
					emptyFill: 'rgba(0, 0, 0, 0)',
					thickness: '40'
					//reverse : true
				});
				
				ico2.find(".obj_animate.s2").circleProgress({
					startAngle: -Math.PI / 4 * 5,
					value: 0,
					animationStartValue : 0.5,
					//lineCap: 'round',
					fill: {color: '#fafafa'},
					emptyFill: 'rgba(0, 0, 0, 0)',
					thickness: '40'
					//reverse : true
				});

				// Let's emulate dynamic value update
				setTimeout(function() { ico2.find(".obj_animate.s1").circleProgress('value', 0.5); }, reverseDelay);
				setTimeout(function() { ico2.find(".obj_animate.s2").circleProgress('value', 0.5); }, reverseDelay);
			}

			function progress3(){
				
				ico3.find(".obj_animate.s1").circleProgress({
					startAngle: -Math.PI / 4 * 3,
					value: 0,
					animationStartValue : 1.0,
					//lineCap: 'round',
					fill: {color: '#fafafa'},
					emptyFill: 'rgba(0, 0, 0, 0)',
					thickness: '55'
				});
				
				ico3.find(".obj_animate.s2").circleProgress({
					startAngle: -Math.PI / 4 * 2,
					value: 0,
					animationStartValue : 1.0,
					//lineCap: 'round',
					fill: {color: '#fafafa'},
					emptyFill: 'rgba(0, 0, 0, 0)',
					thickness: '55'
				});

				ico3.find(".obj_animate.s3").circleProgress({
					startAngle: -Math.PI / 4 * 1,
					value: 0,
					animationStartValue : 1.0,
					//lineCap: 'round',
					fill: {color: '#fafafa'},
					emptyFill: 'rgba(0, 0, 0, 0)',
					thickness: '55'
				});

				ico3.find(".obj_animate.s4").circleProgress({
					startAngle: -Math.PI / 4 * 4,
					value: 0,
					animationStartValue : 1.0,
					//lineCap: 'round',
					fill: {color: '#fafafa'},
					emptyFill: 'rgba(0, 0, 0, 0)',
					thickness: '55'
				});

				// Let's emulate dynamic value update
				setTimeout(function() { ico3.find(".obj_animate.s1").circleProgress('value', 1); }, reverseDelay);
				setTimeout(function() { ico3.find(".obj_animate.s2").circleProgress('value', 1); }, reverseDelay);
				setTimeout(function() { ico3.find(".obj_animate.s3").circleProgress('value', 1); }, reverseDelay);
				setTimeout(function() { ico3.find(".obj_animate.s4").circleProgress('value', 1); }, reverseDelay);
			}

			function progress4(){

				ico4.find(".obj_animate.s1").circleProgress({
					startAngle: -Math.PI / 4 * 4,
					value: 0,
					animationStartValue : 1.0,
					//lineCap: 'round',
					fill: {color: '#fafafa'},
					emptyFill: 'rgba(0, 0, 0, 0)',
					thickness: '35'
				});

				ico4.find(".obj_animate.s2").circleProgress({
					startAngle: -Math.PI / 4 * 3,
					value: 0,
					animationStartValue : 1.0,
					//lineCap: 'round',
					fill: {color: '#fafafa'},
					emptyFill: 'rgba(0, 0, 0, 0)',
					thickness: '30',
					reverse : true
				});

				// Let's emulate dynamic value update
				setTimeout(function() { ico4.find(".obj_animate.s1").circleProgress('value', 1); }, reverseDelay);
				setTimeout(function() { ico4.find(".obj_animate.s2").circleProgress('value', 1); }, reverseDelay);
			}

			function play(){
				
				progress1();
				setTimeoutVarArray.push(setTimeout(function(){
					$(".obj.ico_1").removeClass("show");
					$(".obj.ico_2").addClass("show");
					progress2()
				},2000));
				setTimeoutVarArray.push(setTimeout(function(){
					$(".obj.ico_2").removeClass("show");
					$(".obj.ico_3").addClass("show");
					progress3();
				},4000));
				setTimeoutVarArray.push(setTimeout(function(){
					$(".obj.ico_3").removeClass("show");
					$(".obj.ico_4").addClass("show");
					progress4();
				},6000));

			}
			
			P5_APPS_USP.addViewportEvent({ 
				triggerPositionPercent: 20, 
				enter :  function(){
					
					play();
					progressItv = setInterval(function(){
						$(".obj").removeClass("show");
						$(".obj.ico_1").addClass("show");
						play();
					}, 8000);
					
				},
					
				leave : function(e){
					for(var i = 0; i < setTimeoutVarArray.length; i++){
						window.clearTimeout(setTimeoutVarArray[i]);
					}
					clearInterval(progressItv);
					$(".option_icon").find(">div").removeClass("show");
					$(".obj.ico_1").addClass("show");
				}
				
			}, _this );

		}
	},

	passMoving : {
		elem : {
			userBrowser : $.browser.ie,
			figure : $(".m_content-innovative.inno").find(".f_container > figure"),
			figureLength : $(".m_content-innovative.inno").find(".f_container > figure").length -1,
			thisTop1 :  $(".m_content-innovative.inno").length ? $(".m_content-innovative.inno").offset().top : "",
			thisTop2 :  $(".m_content-innovative.stronger").length ? $(".m_content-innovative.stronger").offset().top : "",
			contHeight : $(".m_content-innovative.stronger").outerHeight(),
			thisHeight : $(".m_content-innovative.inno").find(".f_container > figure").parent(".f_container").outerHeight(true),
			thisMoving : false,
			checkMoving1 : true,
			checkMoving2 : false,
			passSlideSize : "",
			imgSize : "",
			topPos : "",
			P5_APPS_Size : "",
			isNavi : $(".nav-wrap").length,
			unit : "",
			testCheck : 0,
			deltaY : 0,
			bottomHeight : 0
		},

		init : function() {
			P5_APPS_USP.passMoving.elem.P5_APPS_Size = P5_APPS_USP.sizeMode;

			if( $(window).outerWidth() > 1440 ){
				P5_APPS_USP.passMoving.elem.imgSize = 1280;
			}else{
				setTimeout(function(){
					P5_APPS_USP.passMoving.elem.imgSize = P5_APPS_USP.passMoving.elem.figure.eq(0).find("img").outerHeight();
				},100);
			}

			if ( P5_APPS_USP.passMoving.elem.P5_APPS_Size > 1){
				P5_APPS_USP.passMoving.defaultOption();
				setTimeout(function() {
					P5_APPS_USP.passMoving.passScrollMoving(P5_APPS_USP.passMoving.elem.thisTop1,P5_APPS_USP.passMoving.elem.thisTop2,P5_APPS_USP.passMoving.elem.thisHeight,P5_APPS_USP.passMoving.elem.topPos,P5_APPS_USP.passMoving.elem.imgSize);
				},100);

			}else{
				// 氇皵鞚� 頇橁步 JS 齑堦赴頇�
				P5_APPS_USP.passMoving.mobileDefault();
			}
		},

		resize : function(){
			var winW = $(window).outerWidth(true), winH = $(window).outerHeight(true);
			P5_APPS_USP.passMoving.elem.thisHeight = P5_APPS_USP.passMoving.elem.figure.parent(".f_container").outerHeight();
			P5_APPS_USP.passMoving.elem.thisTop1 = Number($(".m_content-innovative.inno").offset().top);
			P5_APPS_USP.passMoving.elem.thisTop2 = Number($(".m_content-innovative.stronger").offset().top);
			P5_APPS_USP.passMoving.elem.contHeight = $(".m_content-innovative.stronger").outerHeight();

			setTimeout(function(){
				P5_APPS_USP.passMoving.elem.imgSize = P5_APPS_USP.passMoving.elem.figure.eq(0).find("img").height();
			}, 100);

			P5_APPS_USP.passMoving.elem.P5_APPS_Size = P5_APPS_USP.sizeMode;

			if( P5_APPS_USP.passMoving.elem.P5_APPS_Size > 1 ){

				if( winW <= 1440 ){
					P5_APPS_USP.passMoving.elem.figure.find("img").css({
						"width" : 1920 / 14.4 + "vw"
					});

				}else if( winW > 1440 ){
					P5_APPS_USP.passMoving.elem.figure.find("img").css({
						"width" : "auto"
					});

					if( P5_APPS_USP.passMoving.elem.userBrowser <= 9 && P5_APPS_USP.passMoving.elem.figure.is(".fixed") ){
						P5_APPS_USP.passMoving.elem.figure.css({
							"top" : 60
						});
					}
					P5_APPS_USP.passMoving.elem.imgSize = 1280;
				}

				P5_APPS_USP.passMoving.defaultOption();
				P5_APPS_USP.passMoving.passScrollMoving(P5_APPS_USP.passMoving.elem.thisTop1,P5_APPS_USP.passMoving.elem.thisTop2,P5_APPS_USP.passMoving.elem.thisHeight,P5_APPS_USP.passMoving.elem.topPos,P5_APPS_USP.passMoving.elem.imgSize);
			}else{
				// 氇皵鞚� 頇橁步 JS 齑堦赴頇�
				P5_APPS_USP.passMoving.mobileDefault();
			}
		},

		scroll : function(){
			//$(window).scrollTop()  = $(this).scrollTop();
			P5_APPS_USP.passMoving.elem.thisTop1 = Number($(".m_content-innovative.inno").offset().top);
			P5_APPS_USP.passMoving.elem.thisTop2 = Number($(".m_content-innovative.stronger").offset().top);
			P5_APPS_USP.passMoving.elem.thisHeight = P5_APPS_USP.passMoving.elem.figure.parent(".f_container").outerHeight();

			if( P5_APPS_USP.passMoving.elem.P5_APPS_Size > 1 ){
				if( P5_APPS_USP.passMoving.elem.testCheck < $(window).scrollTop() ){
					P5_APPS_USP.passMoving.elem.deltaY = -1;
					P5_APPS_USP.passMoving.passScrollMoving(P5_APPS_USP.passMoving.elem.thisTop1,P5_APPS_USP.passMoving.elem.thisTop2,P5_APPS_USP.passMoving.elem.thisHeight,P5_APPS_USP.passMoving.elem.topPos,P5_APPS_USP.passMoving.elem.imgSize,P5_APPS_USP.passMoving.elem.deltaY);
					P5_APPS_USP.passMoving.passSlide(P5_APPS_USP.passMoving.elem.thisTop2,P5_APPS_USP.passMoving.elem.deltaY,0,1);
				} else {
					P5_APPS_USP.passMoving.elem.deltaY = 1;
					P5_APPS_USP.passMoving.passScrollMoving(P5_APPS_USP.passMoving.elem.thisTop1,P5_APPS_USP.passMoving.elem.thisTop2,P5_APPS_USP.passMoving.elem.thisHeight,P5_APPS_USP.passMoving.elem.topPos,P5_APPS_USP.passMoving.elem.imgSize,P5_APPS_USP.passMoving.elem.deltaY);
					P5_APPS_USP.passMoving.passSlide(P5_APPS_USP.passMoving.elem.thisTop2,P5_APPS_USP.passMoving.elem.deltaY,P5_APPS_USP.passMoving.elem.passSlideSize,1);
				}
			}

			P5_APPS_USP.passMoving.elem.testCheck = $(window).scrollTop();
		},

		mobileDefault : function(){
			P5_APPS_USP.passMoving.elem.figure.removeAttr("style");
			P5_APPS_USP.passMoving.elem.figure.find("img").removeAttr("style");
		},

		defaultOption : function(){
			var winW = $(window).outerWidth();
			if( winW <= 1440 ){
				P5_APPS_USP.passMoving.elem.figure.eq(P5_APPS_USP.passMoving.elem.figureLength).css({
					"margin-top" : P5_APPS_USP.passMoving.elem.passSlideSize + "vw"
				});

				P5_APPS_USP.passMoving.elem.figure.find("img").css({
					"width" : 1920 / 14.4 + "vw"
				});

				P5_APPS_USP.passMoving.elem.passSlideSize = 577 / 14.4;

			}else if( winW > 1440 ){
				P5_APPS_USP.passMoving.elem.figure.eq(P5_APPS_USP.passMoving.elem.figureLength).css({
					"margin-top" : 600 + "px"
				});
				P5_APPS_USP.passMoving.elem.passSlideSize = 600;
			}
		},

		passSlide : function(topPosition,scrollY,botSize,opacity){
			if( $(window).outerWidth() > 1440 ){
				P5_APPS_USP.passMoving.elem.unit = "px";
			}else{
				P5_APPS_USP.passMoving.elem.unit = "vw";
			}

			if( P5_APPS_USP.passMoving.elem.userBrowser > 9 || P5_APPS_USP.passMoving.elem.userBrowser == undefined ){

				if( scrollY < 0 && $(window).scrollTop() >= topPosition - 380 ){
					P5_APPS_USP.passMoving.elem.figure.eq(P5_APPS_USP.passMoving.elem.figureLength).addClass("moving");
				}else if( scrollY > 0 && $(window).scrollTop() <= topPosition ){
					P5_APPS_USP.passMoving.elem.figure.eq(P5_APPS_USP.passMoving.elem.figureLength).removeClass("moving");
				}

			}else{
				P5_APPS_USP.passMoving.elem.figure.eq(P5_APPS_USP.passMoving.elem.figureLength).not(':animated').stop().animate({
					"margin-top" : botSize + P5_APPS_USP.passMoving.elem.unit,
					"opacity" : opacity
				},600);
			}
		},

		positionChange : function(){
			if( P5_APPS_USP.passMoving.elem.isNavi > 0 ){
				P5_APPS_USP.passMoving.elem.figure.addClass("fixed1");
			}else{
				P5_APPS_USP.passMoving.elem.figure.addClass("fixed2");
			}
			P5_APPS_USP.passMoving.elem.figure.removeAttr("style");
		},

		passScrollMoving : function(top1,top2,hValue,pos,bottomSize,deltaVal){

			function blockWheel(){
				jQuery(window).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
					e.preventDefault();
					return;
				});

				jQuery(window).on("keydown.disableScroll", function(e) {
					var eventKeyArray = [32, 33, 34, 35, 36, 37, 38, 39, 40];
					for (var i = 0; i < eventKeyArray.length; i++) {
						if (e.keyCode === eventKeyArray [i]) {
							e.preventDefault();
							return;
						}
					}
				});
			}

			function playWheel(){
				jQuery(window).off(".disableScroll");
			}

			var naviHeight;
			if( P5_APPS_USP.passMoving.elem.isNavi > 0 ){
				naviHeight = 62;
			}else{
				naviHeight = 0;
			}

			// 1. 鞀ろ伂搿� 靹轨厴 歆勳瀰 鞝�
			if( $(window).scrollTop() <= top1 - naviHeight ){
				if( P5_APPS_USP.passMoving.elem.isNavi > 0 ){
					P5_APPS_USP.passMoving.elem.figure.removeClass("fixed1");
				}else{
					P5_APPS_USP.passMoving.elem.figure.removeClass("fixed2");
				}

				P5_APPS_USP.passMoving.elem.figure.css({
					"top" : 0
				});

				P5_APPS_USP.passMoving.elem.figure.stop();
				P5_APPS_USP.passMoving.elem.checkMoving1 = true;

			// 2. 鞀ろ伂搿� 鞙勳箻 靹轨厴 歆勳瀰
			}else if( $(window).scrollTop() >= top1 - 70 && $(window).scrollTop() <= top2 + 150 ){

				if( deltaVal < 0 && P5_APPS_USP.passMoving.elem.checkMoving1 ){
					// ie
					if( $.browser.ie || $("html").is(".ie") ){
						blockWheel();

						P5_APPS_USP.passMoving.elem.figure.stop(false,false).animate({
							"top" : $(window).scrollTop() - top1
						},300,function(){

							P5_APPS_USP.passMoving.positionChange();
							setTimeout(function(){
								playWheel();
							}, 100);
						});
						P5_APPS_USP.passMoving.elem.checkMoving1 = false;
					}
					// other
					else {
						P5_APPS_USP.passMoving.positionChange();
						P5_APPS_USP.passMoving.elem.checkMoving1 = false;
					}
				}else if( deltaVal > 0 && P5_APPS_USP.passMoving.elem.checkMoving2 ){
					var numVal = top2  - $(window).scrollTop() + 150;

					if( numVal < 0 ){
						numVal = -(numVal);
					}

					//ie
					if( $.browser.ie || $("html").is(".ie") ){
						blockWheel();
						P5_APPS_USP.passMoving.elem.figure.stop(false,false).animate({
							"top" : P5_APPS_USP.passMoving.elem.bottomHeight - numVal
						},300,function(){
							P5_APPS_USP.passMoving.positionChange();
							setTimeout(function(){
								playWheel();
							}, 100);
						});
						P5_APPS_USP.passMoving.elem.checkMoving2 = false;
					}
					//other
					else {
						P5_APPS_USP.passMoving.positionChange();
						P5_APPS_USP.passMoving.elem.checkMoving2 = false;
					}
				}

				if( P5_APPS_USP.passMoving.elem.userBrowser <= 9 ){
					P5_APPS_USP.passMoving.elem.figure.css({
						"top" : 60,
						"bottom" : "auto"
					});
				}

			// 3. 鞀ろ伂搿� 鞙勳箻 靹轨厴 氩楈柎雮犾嫓
			} else if( $(window).scrollTop() >= top2 + 150 ){

				if( P5_APPS_USP.passMoving.elem.isNavi > 0 ){
					P5_APPS_USP.passMoving.elem.figure.removeClass("fixed1");
				}else{
					P5_APPS_USP.passMoving.elem.figure.removeClass("fixed2");
				}

				P5_APPS_USP.passMoving.elem.figure.css({
					"top" : P5_APPS_USP.passMoving.elem.bottomHeight
				});

				P5_APPS_USP.passMoving.elem.figure.stop();
				P5_APPS_USP.passMoving.elem.bottomHeight = hValue + 150;
				if( P5_APPS_USP.passMoving.elem.userBrowser > 9 || P5_APPS_USP.passMoving.elem.userBrowser == undefined ){
					P5_APPS_USP.passMoving.elem.figure.css({
						top : P5_APPS_USP.passMoving.elem.bottomHeight
					});
				}else if( P5_APPS_USP.passMoving.elem.userBrowser <= 9 ){
					P5_APPS_USP.passMoving.elem.figure.css({
						"top" : "auto",
						"bottom" : - bottomSize
					});
				}

				P5_APPS_USP.passMoving.elem.checkMoving2 = true;
			}
		}
    },

	tab : function(){
		$("[data-role='tab']").each(function(){
			var _tab 		= $(this),
				_tabBtn		= _tab.find("[data-role='tab-btn']");
				_tabContent	= _tab.find("[data-role='tab-content']");

			if(! _tabBtn.hasClass("on") ){
				_tabContent.hide();
				_tab.find(">*:first-child").find("[data-role='tab-btn']").addClass("on").end().find("[data-role='tab-content']").show();
			}

			_tabBtn.on({
				"click" : function(){
					var _this = $(this);
					var _alt = $(this).find('.blind');
					var altText = $(this).data('alt-text').split(',');
					var $Slider = $(this).closest("[data-role='tab']").find('.step_list');

					// mobile
					if( P5_APPS_USP.sizeMode == 1 ){
						if(_this.hasClass("on") ){
							_this.removeClass("on").parent().next().hide();
							_alt.text(altText[0]);
						} else {
							_tabBtn.removeClass("on");
							_tabBtn.find('.blind').text(altText[0]);
							_tabContent.hide();
							_this.addClass("on").parent().next().show();
							_alt.text(altText[1]);

							var targetScrollTop	= $(".nav-wrap").length ? _this.offset().top - $(".nav-wrap").outerHeight(true) : _this.offset().top;
							$("body, html").stop().animate({ scrollTop : targetScrollTop }, 300, "easeInOutSine");
						}
					}

					// pc
					else {
						if(! _this.hasClass("on") ){
							_tabBtn.removeClass("on");
							_tabContent.hide();
							_this.addClass("on").parent().next().show();
						}
					}

					// slide臧€ 臁挫灛頃� 瓴届毎
					if($Slider.length){
						$Slider.filter('.slick-initialized').slick("unslick");
						$Slider.each(function(){
							var $title 	= $(this).children('div:first-child').find('figcaption h4').html(),
								$desc 	= $(this).children('div:first-child').find('figcaption p').html();

							$(this).closest('li').find('.step_desc h4').html($title).end().find('.step_desc p').html($desc);
						});

						//desktop
						if(P5_APPS_USP.sizeMode != 1){
							_this.closest('li').find('.step_list').slick(P5_APPS_USP.step.defaultConfig);
						} else {
							if(_this.hasClass('on')){
								_this.closest('li').find('.step_list').slick(P5_APPS_USP.step.defaultConfig);
							} else {
								if(_this.closest('li').find('.step_list').hasClass('.slick-initialized')){
									_this.closest('li').find('.step_list').slick('unslick');
								}
							}
						}
					}
				}
			});
		});
	},

	step : {
		val : {
			breakPointCheck : "",
			tablistBtn		: $(".m_content-step").find("[data-role='tab-btn']")
		},

		init : function(){
			setTimeout(function(){
				P5_APPS_USP.step.setting();
			}, 1000);

			P5_APPS_USP.step.val.breakPointCheck = P5_APPS_USP.sizeMode;
			//P5_APPS_USP.step.resize();
		},

		defaultConfig:{
			centerMode:true,
			slidesToShow:1,
			slidesToScroll:1,
			infinite:false,
			accessibility:true,
			speed:500,
			dots:true,
			arrows:true,
			adaptiveHeight: true,
			customPaging:function(slider, i){
				return '<button type="button" data-role="none" role="button" tabindex="0" onclick="sendClickCode(\'content_click_count\',\'rolling:index_'+ (i+1) +'\');">step' + (i + 1) + '</button>';
			}
		},
		slickSlider:function(target, sliderName){
			var $slider = $(".f_tab-content [data-role='slide-step']");
			var sizeClass = P5_APPS_USP.sizeMode > 1 ? ".pc-visible" : ".mo-visible";
			var sizeFalse = P5_APPS_USP.sizeMode > 1 ? ".mo-visible" : ".pc-visible";
			var swipeFlag = true;

			if($('.apps').hasClass('rtl') || $('.apps_usp').hasClass('rtl')){
				P5_APPS_USP.step.defaultConfig.rtl = true;
			}
			if($slider.length && !$('.apps.samsungpass').length){
				$slider.slick(P5_APPS_USP.step.defaultConfig);
			} else if ($slider.length && $('.apps.samsungpass').length){
				if(window.innerWidth > 768){
					$slider.each(function(){
						if(!$(this).hasClass('mo-visible') && !$(this).hasClass('slick-initialized')){
							$(this).slick(P5_APPS_USP.step.defaultConfig);
						}
					});
				} else {
					$slider.each(function(){
						if(!$(this).hasClass('pc-visible') && !$(this).hasClass('slick-initialized')){
							$(this).slick(P5_APPS_USP.step.defaultConfig);
						}
					});
				}
			}

			$slider.on('afterChange', function(event, slick, currentSlide, nextSlide){
	        	var $next = $(slick.$slides[currentSlide]),
	        		contentType = $next.find('[data-role="tab-content-video"]').length ? "video_" : "image_",
	        		taggingName 	= sliderName != undefined ? sliderName.indexOf('.') > -1 ? sliderName.split('.')[0].toLowerCase() : sliderName.toLowerCase() : "",
	        		sliderName 		= $next.closest('[data-role="slide-step"]').data('slider-name'),
					stepTit = $next.find('figcaption h4').html(),
					stepDesc = $next.find('figcaption p').html();
				
				if(swipeFlag == true){
					sendClickCode('content_click','apps:' + APPS_SERVICE_NAME + ':' + contentType + taggingName + (currentSlide + 1) + '_swipe');
				}				
				$next.closest('.f_tab-content').find('.step_desc h4').text(stepTit).end().find('.step_desc .desc').html(stepDesc);
	        });

			$(document).on('click', '[data-role="slide-step"] .slick-dots button, [data-role="slide-step"] .slick-arrow', function(){
				swipeFlag = false;
				setTimeout(function(){
					swipeFlag = true;
				}, 600);
			});
		},

		destory : function(array){

		},

		setting : function(){
			P5_APPS_USP.step.slickSlider();
		},

		resize : function(){
			var winWidth 	= window.innerWidth,
				$tab		= $('.f_tab'),
				$slider 	= $("[data-role='slide-step']"),
				sizeClass	= window.innerWidth > 768 ? ".pc-visible" : ".mo-visible",
				sizeFalse 	= window.innerWidth > 768 ? ".mo-visible" : ".pc-visible",
				_typeCheck	= $tab.find(">li > .f_tab-content").is(".howto_type2") ? true : false;

			if($('.apps').hasClass('rtl') || $('.apps_usp').hasClass('rtl')){
				P5_APPS_USP.step.defaultConfig.rtl = true;
			}

			if(winWidth > 768){
				$tab.each(function(){
					var _this = $(this);
					if (_typeCheck == false) {
						if(!_this.find('.f_tab-header.on').length){
							_this.find('li:first-child .f_tab-header').addClass('on');
							if(_this.find('.slick-initialized').length){
								_this.find($slider).slick('unslick');
							}
							_this.find('li:first-child .f_tab-content').show(function(){
								if($('.apps').hasClass('rtl') || $('.apps_usp').hasClass('rtl')){
									P5_APPS_USP.step.defaultConfig.rtl = true;
								}
								if(!$('.apps.samsungpass').length){
									_this.find('li:first-child .step_list').filter(sizeClass).slick(P5_APPS_USP.step.defaultConfig);
								}

							});
						}
					}
				});

				if($('.apps.samsungpass').length){
					$('.f_tab-content:visible').each(function(){
						var _this 		= $(this),
							$slider 	= _this.find('[data-role="slide-step"]'),
							stepTit 	= $slider.filter(sizeClass).find('.slick-slide.slick-current figcaption h4').html(),
							stepDesc 	= $slider.filter(sizeClass).find('.slick-slide.slick-current figcaption p').html();

						if($('.mo-visible.slick-initialized').length){
							$('.mo-visible.slick-initialized').slick("unslick");
						}
						if(!_this.find('.pc-visible').hasClass('slick-initialized')){
							_this.find('.pc-visible').slick(P5_APPS_USP.step.defaultConfig);
						}
						_this.find('.step_desc h4').text(stepTit).end().find('.step_desc .desc').html(stepDesc);
					});
				} 
			} else {
				if($('.apps.samsungpass').length){
					$('.f_tab-content:visible').each(function(){
						var _this 		= $(this),
							$slider 	= _this.find('[data-role="slide-step"]'),
							stepTit 	= $slider.filter(sizeClass).find('.slick-slide.slick-current figcaption h4').html(),
							stepDesc 	= $slider.filter(sizeClass).find('.slick-slide.slick-current figcaption p').html();

						if($('.pc-visible.slick-initialized').length){
							$('.pc-visible.slick-initialized').slick("unslick");
						}
						if(!_this.find('.mo-visible').hasClass('slick-initialized')){
							_this.find('.mo-visible').slick(P5_APPS_USP.step.defaultConfig);
						}
						_this.find('.step_desc h4').text(stepTit).end().find('.step_desc .desc').html(stepDesc);
					});
				}
			}
		}
	},

	serialFade : function(){
		var $target = $('[data-role="serial-fade"]');

		if($target.length){
			P5_APPS_USP.addViewportEvent({ 
				triggerPositionPercent: 20, 
				enter :  function(e){ 
						var $motion = $target.find('.motion');
						
						if(P5_APPS_USP.sizeMode != 1 && !$('html').hasClass('mobile')){
								setTimeout(function(){
									$motion.eq(0).stop(true).animate({opacity:1}, 700);
									setTimeout(function(){
										$motion.eq(1).stop(true).animate({opacity:1}, 700);
									},500);
								}, 300);
							}
					},
				leave : function(e){
					var $motion = $target.find('.motion');
					
					$motion.stop(true).animate({opacity: 0}, 200);
				}
				
			}, $target );
		}
	},

	imageTab: {
		elem:{
			tab 	: $('.apps_image_tab'),
			tabList : $('.apps_image_tab .tab_list'),
			button 	: $('.apps_image_tab .tab_list button'),
			autoMotion : "",
			autoCount : 0
		},
		clearMotion:function(){
			clearInterval(P5_APPS_USP.imageTab.elem.autoMotion);
		},
		tab: function(){
			P5_APPS_USP.imageTab.elem.button.on('click', function(e){
				var $this = $(this);
				var $parent = $(this).closest('.tab_list');

				if(window.innerWidth > 768){
					$parent.addClass('active').siblings().removeClass('active');
					P5_APPS_USP.imageTab.clearMotion();
				}
				e.preventDefault();
			});
		},
		autoTab:function(){
			var $target = $('[data-role="apps-image-tab"]');
			var $list = P5_APPS_USP.imageTab.elem.tabList;
			var autoCount = P5_APPS_USP.imageTab.elem.autoCount;
			var listLen = $list.length ;

			P5_APPS_USP.addViewportEvent({
				triggerPositionPercent: 20,
				'enter' : function(){

					if(window.innerWidth > 768){
						P5_APPS_USP.imageTab.elem.autoMotion = setInterval(function(){
							if(autoCount < listLen){
								$list.eq(autoCount + 1).addClass('active').siblings().removeClass('active');	
								autoCount ++;
							} else {
								$list.eq(0).addClass('active').siblings().removeClass('active');	
								P5_APPS_USP.imageTab.clearMotion();
							}
						}, 1500);
					}
				},
				'leave' : function(){
					if(window.innerWidth > 768){
						autoCount = 0;
						$list.eq(0).addClass('active').siblings().removeClass('active');
						P5_APPS_USP.imageTab.clearMotion();
					}
				}
			}, $target);
		},
		init:function(){
			this.tab();
			this.autoTab();
		}
	},
	
	
	youtubeInsert:function(){
		if (!YT) {
			var YT = {
				loading: 0,
				loaded: 0
			};
		}
		if (!YTConfig) {
			var YTConfig = {
				'host': 'http://www.youtube.com'
			};
		}
		if (!YT.loading) {
			YT.loading = 1;
			(function() {
				var l = [];
				YT.ready = function(f) {
					if (YT.loaded) {
						f();
					} else {
						l.push(f);
					}
				};
				var onYTReady = function() {
					YT.loaded = 1;
					for (var i = 0; i < l.length; i++) {
						try {
							l[i]();
						} catch (e) {}
					}
				};
				YT.setConfig = function(c) {
					for (var k in c) {
						if (c.hasOwnProperty(k)) {
							YTConfig[k] = c[k];
						}
					}
				};
				var a = document.createElement('script');
				a.type = 'text/javascript';
				a.id = 'www-widgetapi-script';
				a.src = 'https://s.ytimg.com/yts/jsbin/www-widgetapi-vfl4fk51J/www-widgetapi.js';
				a.async = true;
				var b = document.getElementsByTagName('script')[0];
				b.parentNode.insertBefore(a, b);
			})();
		}
	},

	youtubeFunc:{
		setting:function(){
			
			// kv utube video
			var APPS_utubeArea = $('[data-role="apps-youtube-visual"]');
			var APPS_utubePlayer;
			var APPS_utubeTitle = $("#utubePlayer").data("title");

			APPS_utubeArea.find(".video-area").html('<div id="yt-player"></div>');

			APPS_utubePlayer = new YT.Player('yt-player', {
				height: '100%',
				width: '100%',
				videoId: APPS_utubeArea.find('.video-area').data('media-url'),
				playerVars : {
					rel	 : 0
				},
				events: {
					onStateChange:onPlayerStateChange,
					onReady:function(){
						$("#yt-player").attr("title", APPS_utubeTitle);

						var utubeArea 	= APPS_utubeArea.find(".video-area");
						var figure		= APPS_utubeArea.find("figure");

						APPS_utubePlayer.playVideo();
						setTimeout(function(){
							figure.css({ "opacity" : 0 });
							figure.hide();
						}, 500);
					}
				}
			});

			// when video ends
			function onPlayerStateChange(event) {
				if(event.data == 0) {
					APPS_utubePlayer.stopVideo();
					var target = $('[data-role="apps-youtube-visual"]').find("figure");
					target.show().css({ "opacity" : 1 });
					//APPS_utubePlayer.seekTo(0, true);     // 鞓侅儊鞚� 鞁滉皠鞚� 0齑堧 鞚措彊鞁滍偍雼�.
					//APPS_utubePlayer.stopVideo();
					APPS_utubeArea.find(".video-area").html('<div id="yt-player"></div>');
				}
			}
		},
		init:function(){
			var APPS_utubeArea = $('[data-role="apps-youtube-visual"]');
			if( APPS_utubeArea.length ){
				APPS_utubeArea.find(".btn-control-play").on("click",function(e){
					e.preventDefault();
					P5_APPS_USP.youtubeFunc.setting();
				});
			}
		}
	},
	

	initialize: function() {
		
		if (this.initialized) {
			return;
		}
		this.initialized = true;
		this.ready();
		var mobileArr = new Array("iphone", "ipod", "blackberry", "android", "samsung", "ios");
		for(var txt in mobileArr){
		    if(navigator.userAgent.toLowerCase().match(mobileArr[txt]) != null){
		    	$('html').addClass('mobile');    
		    } else {
		    	$('html').addClass('desktop');    
		    }
		}		
		this.scrollBarWidth = this.getScrollBarWidth();
		this.sections = this.sections();
		this.galaxyCheck();
		//$(window).resize(this.resize).scroll(this.scroll);
		this.resize(true);
		
		this.share();
		this.tab();
		
		this.step.init();
		this.goTop.init();
		this.apps_subnav.init();
		this.mobile_slider.init();
		this.default_slider.init();
		if($('.apps-kv-slider').length){
			this.kv_slider.init();
		}
		this.verticalSlider.init();
		this.videoBackground.init();
		this.tabToSlide.init();
		this.imageTab.init();
		this.mouseWheelAnimate.init();
		this.appsPopup.init();
		this.contentToggle();
		this.videoClick.init();
		this.uspIntroMotion();
		this.dreamUrl();
		this.overviewRedirect();
		this.bixbyMoreBtn.init();
		this.connectAnimate.init();
		this.canvasMotion.init();
		this.serialFade();
		P5_APPS_USP.youtubeFunc.init();

		if( $(".m_content-innovative.inno").length ){
			this.passMoving.init();
		}
	}	
};

$(document).ready(function(){
	if($('[data-role="apps-youtube-visual"]').length){
		P5_APPS_USP.youtubeInsert();
	}
});

$(window).load(function() {
	setTimeout(function() {
		P5_APPS_USP.initialize();
	}, 0);
});


$(window).resize(function(){
	P5_APPS_USP.resize();
});

$(window).scroll(function(){
	P5_APPS_USP.scroll();
});

})(window.jQuery);





