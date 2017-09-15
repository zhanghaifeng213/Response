;(function($) {

window.GALAXY = {

	isMobile: $.browser.mobile,
	isPoorBrowser: $.browser.ie && 9 > $.browser.ie,
	oldIos:($.browser.crios) ? true : ($.browser.android) ? false : Math.ceil($.browser.ios) < 10 && $.browser.ios !== undefined,

	swipeAble: !!(!!$.browser.mobile || window.PointerEvent || window.MSPointerEvent),
	parallaxAble: !($.browser.ie && 9 > $.browser.ie) && !$.browser.mobile && $.support.transition,

	areaWidth: 0,
	areaHeight: 0,

	prevSizeMode: -1,
	sizeMode: 0,

	scrollBarWidth: 0,
	scrollTop: 0,

	mediaBaseURL: window.MEDIA_BASE_URL || './',

	isTestURL: location.href.indexOf('samsung.com') < 0,

	isGalaxy: location.pathname.indexOf('/global/galaxy') === 0 || window.IS_CAMPAIGN === true,

	isGPSI: navigator.userAgent.toLowerCase().replace(/ /g, '').indexOf('googlepagespeedinsights') != -1,

	scrollFunctions: [],
	resizeFunctions: [],
	readyFunctions: [],
	loadFunctions: [],


	path: {
		root: '/global/galaxy/'
	},

	initialized: false,

	dom: {
		header: $('#header').get(0) || $('header').get(0)
	},


	header: function() {


		if (!$(GALAXY.isGalaxy?'#header':GALAXY.dom.header).length) {
			return;
		}

		var
			$header = $(GALAXY.isGalaxy?'#header':GALAXY.dom.header),
			$menuButton = $header.find('p.menu a'),
			isMobile = $.browser.mobile,
			isPoorBrowser = GALAXY.isPoorBrowser,
			transitionName = $.support.transition,
			gnb, subNav;

		gnb = (function() {

			if (!$('#gnb').length) {
				return {scroll: $.noop, resize: $.noop};
			}

			var $wrap = $('#wrap'),
				$box = $('#gnb'),
				//$boxElementsA = $box.find('a'),
				//$bod = $box.find('a.bod'),
				//$eod = $box.find('a.eod'),
				$logo = $box.find('.logo a'),
				// $h2 = $box.find('> .g-heading'),
				// $dotcom = $box.find('p.g-country-site a'),
				$inner = $box.find('div.g-inner'),
				$buttonParent = $menuButton.parent(),
				$tabBox = $box.find('.g-tabs'),
				$tabs = $tabBox.find('ul a'),
				$tabContents = [],
				$contentBox = $box.find('.g-contents'),
				$listBoxs = $contentBox.find('.g-content > div > ul'),
				$listItems = $listBoxs.find('> li'),
				$tabBar = $('<div class="g-tab-bar"></div>').appendTo($tabBox.find('ul')),
				$latestGroup = null,
				$closeButton = $box.find('p.g-close a'),
				$hoverlia = $box.find('#g-products  ul > li > a'),
				$storyplay = $box.find('.g-story .m_content-storyyoutube button'),
				$storyplaythu = $box.find('.g-story .feature-1 .menu li a'),
				$baseContentsArea = $('#wrap > div').not('#gnb'),
				$baseContentsClickable = null,
				$opener = null,
				iScrolls = [],
				iScrollOptions = {mouseWheel: true, scrollbars: true, interactiveScrollbars: true, preventDefaultException: {tagName: /(a|img|span)/i}},
				i = 0, numTabs = $tabs.length,
				tabIndex = 0,
				currentIndex = -1,
				tabBarIndex = 0,
				opened = true,
				tabResetTimer = null,
				clickAble = true,
				enteredList = null,
				listLeaveTimer = null,
				keyDowned = false,
				onOpen,
				iScrollS1 = isMobile,
				defaultTap = 0,
				gnbSearch = $('#gnb a.search').length,
				onClose,
				tileLoaded = false;

			$box
				.bind('mousewheel', function(e) {
					e.stopPropagation();
				})
				.bind('touchmove', function(e) {
					if (!$('#gnb .g-inner').hasClass('searchForm')) {
						e.preventDefault();
					}
				})
				.click(function(e) {
					var target = e.target;
					if (target == this || target == $inner[0]) {
						close();
					}
				});
			$menuButton.keydown(function() {
					keyDowned = true;
				})
				.bind({
				focus: function() {
					$buttonParent.addClass('focus');
				},
				blur: function() {
					$buttonParent.removeClass('focus');
				},
				click: function() {
					open($menuButton, function() {
						$buttonParent.removeClass('on');
					});
					$menuButton.addClass('hide');
					$buttonParent.addClass('on');
					return false;
				}
			});

			//$bod.attr('tabindex', ++tabIndex);
			$logo.attr('tabindex', ++tabIndex);
			// $h2.attr('tabindex', ++tabIndex);
			// for (; i < numTabs; i++) {
			// 	$tabs[i] = $($tabs[i]);
			// 	if ($tabs[i].attr('href').indexOf('#g-') != -1) {
			// 		if (!isMobile) {
			// 			$tabs[i].parent().attr('data-index', i)
			// 				.mouseenter(changeTabBar).mouseleave(readyToResetTabBar).click(tabClick);
			// 		}
			// 		$tabs[i].attr('data-index', i).attr('tabindex', ++tabIndex)
			// 			.focus(changeTabBar).blur(readyToResetTabBar).click(changeTab);
			// 		$tabContents[i] = $($tabs[i].attr('href'));
			// 		$tabContents[i].find('li').mouseenter(listEnter).mouseleave(listLeave)
			// 			.find('a').focus(listEnter).blur(listLeave)
			// 				.each(function() {
			// 					this.setAttribute('tabindex', ++tabIndex);
			// 				});
			// 		iScrolls[i] = new IScroll($tabContents[i][0], iScrollOptions);
			// 	}
			// }
			for (; i < numTabs; i++) {
				$tabs[i] = $($tabs[i]);
				if ($tabs[i].attr('href') != undefined) {
					if (!isMobile) {
						if (i != (numTabs - 1)) {
							$tabs[i].parent().attr('data-index', i)
							.mouseenter(changeTabBar).mouseleave(readyToResetTabBar).click(tabClick);
						} else {
							$tabs[i].parent().attr('data-index', i).mouseenter(changeTabBar).mouseleave(readyToResetTabBar);
						}
					}
					if (i != (numTabs - 1)) {
						$tabs[i].attr('data-index', i).attr('tabindex', ++tabIndex)
						.focus(changeTab).blur(readyToResetTabBar).click(changeTab);
					} else {
						$tabs[i].attr('data-index', i).attr('tabindex', ++tabIndex)
						.focus(changeTabBar).blur(readyToResetTabBar);
					}
					if ($tabs[i].attr('href').indexOf('#g-') != -1) {
						$tabContents[i] = $($tabs[i].attr('href'));
						$tabContents[i].find('li').mouseenter(listEnter).mouseleave(listLeave);
						$tabContents[i].find('a,button').attr('data-index', i).focus(function(e) {
							changeTab.apply(this,[e]);
							listEnter.apply(this,[e]);
						}).blur(listLeave)
								.each(function() {
									this.setAttribute('tabindex', ++tabIndex);
								});
						iScrolls[i] = new IScroll($tabContents[i][0], iScrollOptions);
					}
				}
				if (i == numTabs - 1) {
					$('.g-tabs .last a').attr('tabindex', ++tabIndex);
					$('.g-inner > .search').attr('tabindex', ++tabIndex);
				}
			}

			function listEnter(e) {
				clearTimeout(listLeaveTimer);
				enteredList = e.type == 'focus' ? this.parentNode.parentNode : this.parentNode;
			}

			function listLeave() {
				listLeaveTimer = setTimeout(listLeaveAction, 50);
			}

			function listLeaveAction() {
				return false;
			}

			$contentBox.xlider({
				swipe: isMobile,
				onChange: function(page) {
					changeTab.call($tabs[page][0]);
				},
				endless: true,
				onChangeEnd: function() {
					currentIndex > -1 && iScrolls[currentIndex].refresh();
				}
			});
			/* GNB default select max 1 */
			defaultTap = $('#wrap').attr('data-depth1');
			if ((defaultTap == undefined) || (defaultTap == '') || (defaultTap == NaN)) {
				defaultTap = 0;
			}
			if (gnbSearch > 0) {
				$tabs[defaultTap].click();
			}

			$closeButton.attr('tabindex', ++tabIndex);


			if (!isMobile) {
				$tabBar.mouseenter(cancelResetTabBar).mouseleave(readyToResetTabBar).click(tabClick);
			}
			$closeButton.mousedown(function() {
				this.style.outline = 'none';
			}).keydown(function() {
					keyDowned = true;
				}).click(close);
			$('#gnb .g-inner > .search').on('click', function (e) {
				e.preventDefault();
				if (!$('#gnb .g-inner').hasClass('searchFormrd')) {
					$('#gnb .g-inner').addClass('searchFormrd');
					setTimeout(function () {
						$('#gnb .g-inner').addClass('searchForm');
					}, 500);
					if (!isMobile) {
						$('#gnb .addsearch').focus();
					} else {
						$('#gnb .addsearch').focus().keyup();
					}
					if ($('#gnb .m_content-storyyoutube .f_container div').hasClass('active')) {
						removeStory();
					}
					var addsearchWord = window.ADDSEARCH_KEYWORD || '';
					setTimeout(function() {
						$('#gnb .addsearch, #addsearch-mobile-field').val(addsearchWord).eq(0).keyup();
						$('.desktop #gnb .addsearch').select();
					}, 500);
					$('#gnb .logo a').attr('tabindex', '');
					$('#gnb .search').attr('tabindex', '');
					$('#gnb .g-close a').attr('tabindex', '');
				}
			}).on('mousedown', function () {
				this.style.outline = 'none';
			});
			$('.g-contents .country a').on('mousedown', function () {
				this.style.outline = 'none';
			});
			$('#gnb .g-tabs a').on('mousedown', function () {
				this.style.outline = 'none';
			});
			if (iScrollS1) {
				var $scroller = $('#gnb .g-tabs');
				iScrollS1 = new IScroll($scroller[0], {scrollX: true, scrollY: false, scrollbars: false, interactiveScrollbars: false, preventDefaultException: {tagName: /(a|img|span)/i}});

			}
			$hoverlia.hover(function () {
				$(this).parent().addClass('hovera');
			}, function () {
				$(this).parent().removeClass('hovera');
			});
			$storyplay.on('click', function () {
				var thislist = $(this).attr('data-video');
				playYoutube(thislist, $(this).attr('tabindex'));
				$(this).addClass('play');
			});
			$storyplaythu.on('click', function () {
				var thislist = $(this).attr('data-video');
				playYoutube(thislist, $(this).attr('tabindex'));
				$('#gnb .feature-1 .menu li .selected').removeClass('selected');
				$(this).addClass('selected');
				return false;
			});
			function playYoutube(__list, tabindex) {
				$('#gnb .m_content-storyyoutube .f_container figure').hide();
				$('#gnb .m_content-storyyoutube .f_container div').html('');
				var maxwidth = $('#gnb .m_content-storyyoutube').width();
				var maxheight = $('#gnb .m_content-storyyoutube').height();
				var url = "https://www.youtube.com/embed/"+__list+"?showinfo=0&amp;wmode=transparent&amp;autoplay=1";
				var html = '<iframe tabindex="'+tabindex+'" style="width:'+maxwidth+'px; height:'+maxheight+'px;" class="vod-player" allowfullscreen title="Video player" src="'+url+'" marginwidth="0" marginheight="0" frameborder="0" scrolling="no"></iframe>';
				$('#gnb .m_content-storyyoutube .f_container div').append(html).addClass('active');
				$('#gnb .m_content-storyyoutube button').css({'display' : 'none'});
				$('#gnb .vod-player').focus();
			}

			function open(_$opener, _onClose) {
				if (_$opener) {
					$opener = _$opener;
				}
				$baseContentsClickable = $baseContentsArea.find('a,input,select,textarea,button,video,iframe');
				$baseContentsClickable.each(function() {
					var tabindex = $(this).attr('tabindex');
					if (tabindex!==undefined&&tabindex!==null) {
						$(this).data('prev-tabindex', tabindex);
					}
					$(this).attr('tabindex','-1');
				});
				$wrap.addClass('gnb-open');
				$closeButton.removeClass('hide');
				$box.addClass('show');
				GALAXY.noScroll.on();
				resize();
				$.each(iScrolls, function() {
					this.refresh();
				});
				if (!isMobile) {
					setTimeout(function() {
						if (keyDowned) {
							$logo.focus();
						}
					}, 100);
				}
				onClose = _onClose;
				opened = true;
				loadTiles();
				return false;
			}

			function close(e) {
				if ($('#gnb .g-inner').hasClass('searchForm')) {
					$('#gnb .logo a').attr('tabindex', '1');
					$(this).attr('tabindex',tabIndex);
					$('#gnb .search').attr('tabindex',(tabIndex - 1));
					$('#gnb .g-inner').addClass('searchFormRemove');
					setTimeout(function () {
						$('#gnb .g-inner').removeClass('searchForm searchFormrd searchFormRemove');
					}, 500);
				} else {
					$baseContentsClickable.each(function() {
						var tabindex = $(this).data('prev-tabindex');
						if (tabindex!==undefined&&tabindex!==null) {
							$(this).attr('tabindex',tabindex);
						} else {
							$(this).removeAttr('tabindex');
						}
					});
					$wrap.removeClass('gnb-open');
					$closeButton.addClass('hide');
					$box.removeClass('show');
					if (keyDowned && $opener) {
						$opener.focus();
					}
					keyDowned = false;
					$opener = null;
					onClose && onClose();
					GALAXY.setTransitionEndEvent($box, function() {
						GALAXY.noScroll.off();
						resize();
						$box.hide();
						$closeButton.css('outline', '');
						setTimeout(function() {
							$box.show();
						}, 0);
					});
					onClose = null;
					opened = false;
					removeStory();
					GALAXY.omniture(':menu_close');
				}
				return false;
			}

			function removeStory() {
				$('#gnb .m_content-storyyoutube .f_container figure').show();
				$('#gnb .m_content-storyyoutube .f_container div').html('');
				$('#gnb .m_content-storyyoutube .f_container div.active').removeClass('active');
				$('#gnb .m_content-storyyoutube button').css({'display' : 'block'});
				$('#gnb .feature-1 .menu li .selected').removeClass('selected');
				$('#gnb .feature-1 .menu li:eq(0) a').addClass('selected');
			}

			function changeTab() {
				if ($('#gnb .m_content-storyyoutube .f_container div').hasClass('active')) {
					removeStory();
				}
				var i = 0, index = parseInt(this.getAttribute('data-index')),
					$targets, numTargets;

				if (!clickAble) {
					return false;
				}

				for (; i < numTabs; i++) {
					if ($tabContents[i]) {
						$tabs[i].parent().decideClass('on', i == index);
					}
				}

				$contentBox.xlider('jump', index, !opened);
				setTimeout(function() {
					$tabContents[index].removeClass('ready');
				}, 0);

				currentIndex = index;
				setTabBar(currentIndex);

				$listBoxs.each(function () {
					var winH = $(window).height() - $('#gnb .inner_header').height() - $('#gnb .country').height();
					var thisH = $(this).height();
					if ($(this).parent().parent().attr('id') == 'g-products') {
						thisH = thisH + Math.ceil($(this).css('paddingBottom').replace('px', ''));
					}
					if (winH < thisH) {
						$(this).parent().addClass('overheight');
					} else {
						$(this).parent().removeClass('overheight');
					}
				});

				return false;

			}


			function tabClick() {
				$tabs[tabBarIndex].click();
			}

			function changeTabBar() {
				cancelResetTabBar();
				setTabBar(parseInt(this.getAttribute('data-index')));
			}

			function readyToResetTabBar() {
				tabResetTimer = setTimeout(resetTabBar, 250);
			}

			function cancelResetTabBar() {
				clearTimeout(tabResetTimer);
			}

			function resetTabBar() {
				setTabBar(currentIndex);
			}

			function setTabBar(index, withoutAnimation) {
				$tabBar['__'+ (isPoorBrowser || withoutAnimation === true || !opened ? 'css' : 'animate')](
					{x: $tabs[index][0].offsetLeft, width: $tabs[index][0].offsetWidth},
					{duration: 550, easing: 'easeOutCubic', force3D: true}
				);
				tabBarIndex = index;
			}

			function focusing(isReset) {
				var $group = this.parentNode.children;
					i = 0, numGroup = $group.length;
				for (var i = 0; i < numGroup; i++) {
					$group[i].className = $group[i].className.replace(/ *off */g, '') + (isReset === true || $group[i] == this ? '' : ' off');
				}
			}

			function reset() {
				focusing.call(this, true);
			}

			function scroll(v) {
				var base = GALAXY.sizeMode == 1 ? 40 : 100;
				$header.decideClass('clear', v > base);
			}

			function resize() {
				var cols = (GALAXY.sizeMode>2)?3:GALAXY.sizeMode;

				$listBoxs.each(function () {
					var winH = $(window).height() - $('#gnb .inner_header').height() - $('#gnb .country').height();
					var thisH = $(this).height();
					if ($(this).parent().parent().attr('id') == 'g-products') {
						thisH = thisH + Math.ceil($(this).css('paddingBottom').replace('px', ''));
					}
					if (winH < thisH) {
						$(this).parent().addClass('overheight');
					} else {
						$(this).parent().removeClass('overheight');
					}
				});
				if (gnbSearch > 0) {
					setTabBar(currentIndex, true);
				}
			}

			var checkGnb = location.href.split('/#')[1];
			var gnbhash = ['gnb_products', 'gnb_how-tos', 'gnb_gallery', 'gnb_events', 'gnb_apps'];
			var hash = gnbhash.indexOf(checkGnb);
			if (checkGnb != undefined && hash != -1) {
				$('#gnb .g-tabs li').eq(hash).find('> a').click();
			}

			function loadTiles() {
				if (!tileLoaded) {
					$contentBox.find('img').each(function() {
						var tile = $(this).data('tile');
						if (tile) {
							if ($(this).attr('src').indexOf('gnb-tile')>-1) {
								if (!GALAXY.isPoorBrowser) {
									$(this).css({backgroundImage:'url('+tile+')'});
								} else{
									$(this).css({filter:'progid:DXImageTransform.Microsoft.AlphaImageLoader(src='+tile+',sizingMethod=scale)'});
								}
							} else {
								$(this).attr({src:tile});
							}
						}
					});
					tileLoaded = true;
				}
			}

			return {
				open: open,
				scroll: scroll,
				resize: resize
			}

		})();

		subNav = (function() {

			var
				$wrap = $('#wrap'),
				$header = $('#header'),
				$contents = $('#contents'),
				$firstBox = $('#contents > [class^="m_"]:first'),
				$subNav = $('#subnav'),
				$scroller = $('div.inside'),
				$scrollerDotcom = $subNav.find('div.scrollbox'),
				$links = $subNav.find('.inside ul a'),
				$menuButton = $subNav.find('p.gnb a'),
				$preButtonClone = $subNav.find('p.pre-button').clone(),
				$line = $subNav.find('div.line'),
				$bar = $subNav.find('div.bar'),
				isType1 = !!$subNav.hasClass('nav-type1'),
				single = $subNav.hasClass('single'),

				firstBoxTop = 0,
				firstBoxHeight = 0,
				subNavHeight = 0,

				swapBase = 75,
				maxTop = 0,
				fixed = false,

				current = 0,
				resetTimer = null,

				iScroll = $.browser.android,

				i = 0, numLinks = $links.length;


			if (!GALAXY.isGalaxy) {
				$('#subnav p.gnb').remove();
			}

			if (!$subNav.length) {
				return {display: $.noop, scroll: $.noop, resize: $.noop};
			}
			if ($('html').hasClass('rtl')) {
				iScroll = false;
			}

			if (iScroll) {
				if ( isType1 && !GALAXY.isGalaxy ) {
					var $subnavScroller = $subNav.find('.subnav-menus');
					iScroll = false;
				} else {
					if ($('html').hasClass('chrome')) {
						iScroll = new IScroll($scroller[0], {scrollX: true, scrollY: false, disablePointer:true, disableTouch:false, disableMouse:false, scrollbars: false, interactiveScrollbars: false, preventDefaultException: {tagName: /(a|img|span)/i}});
					} else {
						iScroll = new IScroll($scroller[0], {scrollX: true, scrollY: false, scrollbars: false, interactiveScrollbars: false, preventDefaultException: {tagName: /(a|img|span)/i}});
					}
					$bar.appendTo($scroller.find('ul'));
					iScroll.on('scrollEnd', function (){
						scrollBtn();
					});
				}
			}

			if ( isType1 && $('#wrap').length) {
				$('#wrap').addClass('subnav-type1');
				if ( $('#wrap').hasClass('bright-header') ) {
					$('#wrap').addClass('bright-header-background');
				}
			}

			$wrap.addClass('has-subnav');

			if (!isMobile) {
				$links.mouseenter(linkHover).mouseleave(linkLeave).mousedown(linkDown).focus(linkHover).blur(linkLeave);
			}
			$links.click(function() {
				clearResetTimer();
			});
			for (; i < numLinks; i++) {
				$links[i] = $($links[i]);
				if ($links[i].parent().hasClass('on')) {
					current = i;
				}
			}
			$menuButton.click(function() {
				gnb.open($menuButton, function() {
					$subNav.removeClass('hide');
				});
				$subNav.addClass('hide');
				return false;
			});
			$preButtonClone.appendTo($header);


			function clearResetTimer() {
				clearTimeout(resetTimer);
			}

			function linkHover() {
				clearResetTimer();
				setBar(this.parentNode);
			}

			function linkLeave() {
				clearResetTimer();
				resetTimer = setTimeout(reset, 250);
			}

			function linkDown() {
				setBar(this.parentNode, true);
			}

			function reset() {
				if (single) {
					current = $subNav.find('.on').index();
				}
				setBar($links[current][0]);
			}

			function setBar(target, noAni) {
				var lPoint = target.offsetLeft;
				var lWidth = target.offsetWidth;
				var padSize;
				var $realTarget;

				if ( isType1 ) {
					if ( $scroller.children('ul').width()<GALAXY.areaWidth ) {
						lPoint += $scroller.children('ul').offset().left-$scroller.offset().left;
						if (iScroll) {
							$bar.appendTo($scroller);
						}
					}
					$realTarget = (target.tagName.toLowerCase() == 'a') ? $(target) : $(target).find('>a');
					padSize = parseInt($realTarget.css('paddingLeft'),10);
					if (!GALAXY.isGalaxy) {
						if ( $('html').hasClass('rtl') ) {
							lPoint = $scroller.children('ul').width();
							lPoint -= ( $realTarget.offset().left - $scroller.children('ul').offset().left )
							lPoint -= $realTarget.parent().width() - parseInt($realTarget.css('paddingLeft'));
							lPoint *= -1;
							lWidth = $realTarget.width();
						} else {
							lPoint += padSize;
							lWidth -= padSize*2;
						}
					} else {
						lPoint += padSize;
						lWidth -= padSize*2;
					}
				}

				if ($('html').hasClass('rtl') && !isType1 ) {
					var ulwidth = $scroller.children('ul').width(),
						awidth = target.offsetWidth,
						allwidth = $scroller.width(),
						apad = Math.ceil($scroller.children('ul').css('paddingLeft').replace('px', '')),
						apad02 = Math.ceil($scroller.children('ul').css('paddingRight').replace('px', ''));
					if (apad != undefined) {
						ulwidth = ulwidth + apad;
					}
					if (apad02 != undefined) {
						ulwidth = ulwidth + apad02;
					}
					if ($('html').hasClass('rtl') && (allwidth < ulwidth) && $('html').hasClass('mobile')) {
						var returnRtl = allwidth - ulwidth;
						ulwidth = ulwidth + returnRtl;
					}
					lPoint = -(ulwidth - lPoint) + awidth;
				}
				if (!$subNav.hasClass('hold')) {
					$bar.stop()['_'+ (noAni ? 'css' : 'animate')]({translate3dX: lPoint, width: lWidth},
						{duration: 550, easing: 'easeOutCubic', force3D: true});
				}
			}

			function setScroll(noRefresh) {
				var scrollLeft = $links[current][0].offsetLeft-$scroller[0].offsetWidth/2+$links[current][0].offsetWidth/2;
				if (iScroll) {
					if (noRefresh) {
						iScroll.scrollTo(-scrollLeft, 0, 550);
					} else {
						iScroll.scrollTo(-scrollLeft, 0);
					}
					iScroll.refresh();
				} else {
					if (noRefresh!==true) {
						$scroller.__css({scrollLeft: scrollLeft}, {duration: 550, easing: 'easeOutCubic', force3D: true});
					} else {
						$scroller.stop().__animate({scrollLeft: scrollLeft}, {duration: 550, easing: 'easeOutCubic', force3D: true});
					}
				}
				if ($contents.hasClass('new_')) {
					if (iScroll) {
						scrollBtn();
					} else {
						callSubnav();
						callScrollBox();
					}
				}
			}
			function scrollBtn() {
				if($contents.hasClass('new_')) {
					var boxWidth = $scroller.outerWidth();
					var ulWidth = $scroller.find('> ul').outerWidth();
					if (ulWidth > boxWidth) {
						if (iScroll.x == 0) {
							$('#subnav').addClass('next');
							$('#subnav').removeClass('prev');
						} else if (iScroll.x == iScroll.maxScrollX) {
							$('#subnav').removeClass('next');
							$('#subnav').addClass('prev');
						} else {
							$('#subnav').addClass('prev');
							$('#subnav').addClass('next');
						}
					}

				}
			}

			if ($contents.hasClass('new_')) {
				$('.inside').on('scroll', function () {
					callSubnav();
				});

				$preCheck = $subNav.find('.pre-check .scroll').length ? $subNav.find('.pre-check .scroll') : $subNav.find('.preCheck .scroll');
				$preCheck.on('scroll', function () {
					callScrollBox();
				});
			}
			function dotcomScroll() {
				if ($('html').hasClass('dotcom') && $subNav.find('.scrollbox ul').length) {
					var totalWidth = $subNav.find('.preCheck').width();
					var $preCheck = $subNav.find('.pre-check .pre-button').length ? $subNav.find('.pre-check .pre-button') : $subNav.find('.preCheck .pre-button');

						scrollWidth = $scrollerDotcom.width(),
						scrollulWidth = $scrollerDotcom.find('ul').width() + (2 * parseInt($scrollerDotcom.find('ul').css('paddingLeft')) ),
						// scrollulWidth = $scrollerDotcom.find('ul').width() + (2 * Math.ceil($scrollerDotcom.find('ul').css('paddingLeft').replace('px', ''))),

						btnWidth = $preCheck.width() - 1,
						// btnPad = Math.ceil($preCheck.css('paddingRight').replace('px', ''));
						btnPad = parseInt($preCheck.css('paddingRight'));
					if (btnWidth != 0) {
						btnWidth = btnWidth + btnPad;
					}
					if (totalWidth - (btnWidth) < scrollulWidth) {
						$scrollerDotcom.css('width', totalWidth - (btnWidth + 1));
						callScrollBox();
					} else {
						$scrollerDotcom.attr('style', '');
					}
				}
			}
			function callSubnav() {
				$('#subnav').removeClass('next prev')
				var thisSc = $('.inside').get(0).scrollLeft;
				var thiswidth = $('.inside').width();
				var ulpad = 2 * Math.ceil($('.inside').find('> ul').css('paddingLeft').replace('px', ''));
				var ulwidth = Math.ceil($('.inside').find('> ul').width()) + ulpad;
				if (thisSc == 0) {
					if (thiswidth < ulwidth) {
						$('#subnav').addClass('next');
					}
					$('#subnav').removeClass('prev');
				} else if ((ulwidth - thiswidth ) == thisSc || (ulwidth - thiswidth - 1) == thisSc || (ulwidth - thiswidth + 1) == thisSc) {
					$('#subnav').removeClass('next');
					$('#subnav').addClass('prev');
				} else {
					$('#subnav').addClass('prev');
					$('#subnav').addClass('next');
				}
			}
			function callScrollBox() {
				if ($('html').hasClass('dotcom') && $subNav.find('.scrollbox ul').length) {
					var $preCheck = $preCheck = $subNav.find('.pre-check').length ? $subNav.find('.pre-check') : $subNav.find('.preCheck');

					$preCheck.removeClass('next prev');

					var thisSc = $('#subnav .scrollbox .scroll').get(0).scrollLeft;
					var thiswidth = $('#subnav .scrollbox .scroll').width();
					var ulpad = 2 * Math.ceil($('#subnav .scrollbox .scroll').find('ul').css('paddingLeft').replace('px', ''));
					var ulwidth = Math.ceil($('#subnav .scrollbox .scroll').find('ul').width()) + ulpad;
					if (thisSc == 0) {
						if (thiswidth < ulwidth) {
							$preCheck.addClass('next');
						}
						$('#subnav').removeClass('prev');
					} else if ((ulwidth - thiswidth ) == thisSc || (ulwidth - thiswidth - 1) == thisSc || (ulwidth - thiswidth + 1) == thisSc) {
						$preCheck.removeClass('next');
						$preCheck.addClass('prev');
					} else {
						$preCheck.addClass('prev');
						$preCheck.addClass('next');
					}
				}
			}

			function display() {
				$subNav.addClass('show');
				setScroll();
				resize();
			}

			function reposition() {
				if (!GALAXY.isGalaxy) {
					firstBoxTop = $firstBox.offset().top;
				}
				var top = Math.min(GALAXY.areaHeight, firstBoxTop+firstBoxHeight-GALAXY.scrollTop)-subNavHeight,
					needSwap = swapBase > top,
					needFixed = GALAXY.scrollTop >= firstBoxTop+firstBoxHeight-subNavHeight;

				if (needSwap != fixed) {
					fixed = needSwap;
					$wrap.decideClass('subnav-fixed', fixed);
					if (isMobile) {
						if (fixed) {
							$preButtonClone._stop().css('opacity', 0);
						} else {
							$preButtonClone.css({opacity: 1});
						}
					}
				}
				$subNav.css({
					position: needFixed ? 'fixed' : '',
					left: needFixed ?
							$contents.offset().left : 0,
					top: needFixed ?
							Math.max(top, maxTop)
							: firstBoxHeight-subNavHeight});

				if ($contents.hasClass('new_') && needFixed) {
					$subNav.addClass('newNav');
				} else if (!needFixed){
					$subNav.removeClass('newNav');
				}
			}
			function dotcomSlide(e) {
				if ( GALAXY.sizeMode > 2 ) {return false}

				var openCheck = !$subNav.hasClass('inside-open'),
					$baseContentsArea = $('#wrap'),
					$baseContentsClickable = $baseContentsArea.find('a,input,select,textarea,button,video,iframe').not('#subnav a');

				var strTitle = $(this).data(!openCheck?'open-title':'close-title');

				if ( openCheck ) {

					$(this).attr({'href':'#a', 'title': strTitle})
					$('#contents').get(0) && $('#contents').css('z-index','10');
					$subNav.addClass('inside-open');
					$subNav.find('.subnav-menus')
						// .css('top', $('#subnav .nav-header').height() )
						.stop(true).slideDown();

					// $(document.documentElement).css('overflow-y','');
					if ( fixed ) GALAXY.noScroll.on();

					$baseContentsClickable.each(function() {
						var tabindex = $(this).attr('tabindex');
						if (tabindex!==undefined&&tabindex!==null) {
							$(this).data('prev-tabindex', tabindex);
						}
						$(this).attr('tabindex','-1');
					});

					if ( iScroll ) {
						iScroll.destroy();
						// iScroll.refresh();
					}
				} else {
					$(this).attr({'href':'#a', 'title': strTitle})

					$('#contents').get(0) && $('#contents').css('z-index','');
					$subNav.removeClass('inside-open');
					$subNav.find('.subnav-menus').stop(true).slideUp();

					GALAXY.noScroll.off();
					// $(document.documentElement).css('overflow-y','auto');
					$baseContentsClickable.each(function() {
						var tabindex = $(this).data('prev-tabindex');
						if (tabindex!==undefined&&tabindex!==null) {
							$(this).attr('tabindex',tabindex);
						} else {
							$(this).removeAttr('tabindex');
						}
					});

				}
				newReposition();
				// e.preventDefault();
				return false;
			}

			function newReposition(sizeModeChange) {
				var fixed = (GALAXY.scrollTop >= $firstBox.offset().top);

				if ( GALAXY.isGalaxy ) {
					$wrap.decideClass('subnav-fixed', true);

					var paddingTop = parseInt($subNav.css('paddingTop')) || 21.5,
						offTop = Math.max(paddingTop-GALAXY.scrollTop, maxTop),
						offLeft = $contents.offset().left,
						$menus = $header.find('p.link');

					$header.css({
						left : offLeft,
						top  : offTop
					}).decideClass('header-fixed', true);
					$menus._css({top: offTop});


					if ($.support.transform) {
						$subNav._css({position: 'fixed',top: 0,left: offLeft, translate3dY: !!$('html').hasClass('s34')?offTop:0});

					} else {
						$subNav._css({position: 'fixed',top: 0,left: offLeft, paddingTop: !!$('html').hasClass('s34')?offTop:0});
						// $menus._css({top: offTop});
					}
					if ( sizeModeChange ) {
						if ( GALAXY.sizeMode == 1 ) {
							$scroller.find('ul')
								._css({translate3dX:-$scroller[0].scrollWidth})
								._animate({translate3dX:0},{queue:false, duration:550, easing:'easeOutQuad', complete: function(){
									setBar($links[current][0], true);
								}});
						}
					}
				}
				else {
					var $clickButton,
						$subNavMenus,
						openCheck,
						posTop,
						desktopMode,
						strTitle,
						offLeft;

					$subNavMenus = $subNav.find('.subnav-menus');

					desktopMode  = !!(GALAXY.sizeMode > 2);
					offLeft      = $contents.offset().left;
					openCheck    = !!$subNav.hasClass('inside-open');

					if ( desktopMode ) {
						setBar($links[current][0], true);
					}
					posTop = Math.max($firstBox.offset().top-GALAXY.scrollTop, maxTop);

					if ( sizeModeChange ) {
						$clickButton = $('#subnav.nav-type1 .heading a');
						if ( desktopMode ) {
							$subNav.removeClass('inside-open').removeAttr('style');
							$subNavMenus.removeAttr('style');
							$clickButton.off('.menuSlide').removeAttr('href title');
							GALAXY.noScroll.off();
						} else {
							strTitle = $clickButton.data(openCheck?'close-title':'open-title');
							$clickButton.attr({'href':'#a', 'title': strTitle})
								.off('.menuSlide').on('click.menuSlide', dotcomSlide);
							$subNav.find('.subnav-menus').css('top', $('#subnav .nav-header').height() );
						}
					}

					if (fixed && !desktopMode && openCheck && GALAXY.noScroll.activated == false) {
						GALAXY.noScroll.on();
					}
					if ( fixed ) {
						$subNav.css({
							position   : 'fixed',
							left       : desktopMode?offLeft:0,
							top        : fixed?0:posTop
						});
						if ( openCheck && !desktopMode && $.browser.ie) {
							$subNavMenus.css({'position':'fixed', 'top': $('#subnav .nav-header').height() });
						}
					} else {
						$subNav.attr('style','');
						// $subNavMenus.attr('style','');
						if ( openCheck && !desktopMode && $.browser.ie) {
							$subNavMenus.css({'position':'absolute', 'top': $('#subnav .nav-header').height() });
						}
					}

				}

				$wrap.decideClass('subnav-fixed', fixed);
			}

			function scroll(v) {
				if ( isType1 ) {
					newReposition();
				} else {
					reposition();
				}
				$wrap.decideClass('subnav-passed', GALAXY.sizeMode == 1 && v > 80);
			}

			function resize() {
				var sizeMode = GALAXY.sizeMode;
				var sizeModeChange = (GALAXY.sizeMode != GALAXY.prevSizeMode);
				firstBoxTop = $firstBox.offset().top;
				firstBoxHeight = $firstBox[0].offsetHeight;
				subNavHeight = $subNav[0].offsetHeight;
				swapBase = sizeMode > 2 ? 75 : 0;
				maxTop = sizeMode > 2 ? 0 : sizeMode > 1 ? -29 : -19;
				$line.css('width', '').css('width', $scroller[0].scrollWidth);
				setBar($links[current][0], true);
				if ( isType1 ) {
					newReposition(sizeModeChange);
				} else {
					reposition()
				}
				dotcomScroll();
				if (iScroll) {
					iScroll.refresh();
					setScroll();
				} else {
					if ($contents.hasClass('new_')) {
						callSubnav();
					}
				}
			}

			return {
				display: display,
				scroll: scroll,
				resize: resize,
				reset: reset,
				setScroll: setScroll
			}

		})();

		function resize() {
			GALAXY.noScroll.resize();
			gnb.resize();
			subNav.resize();
		}

		return {
			scroll: function(v) {
				gnb.scroll(v);
				subNav.scroll(v);
			},
			resize: resize,
			onKeyVisualShow: function() {
				subNav.display();
			},
			resetSubNav: function() {
				subNav.setScroll(true);
				subNav.reset();
			}
		}

	},

	sections: function() {

		var
			$wrap = $('#wrap'),
			$contents = $('#contents'),
			$sections = $contents.children('[class^="m_"]'),
			$subNav = $wrap.find('#subnav'),

			$blocks = [],
			$children = null,

			keyvisual = null,
			keyvisualType2 = null,
			controls = [],

			isMobile = GALAXY.isMobile,
			isPoorBrowser = GALAXY.isPoorBrowser,

			transformName = $.support.transform,
			supportTransition = $.support.transition,
			supportTransform = $.support.transform,

			parallaxAble = GALAXY.parallaxAble,
			parallaxAbleTypes = /^(x|y|s|a|c)$/,
			parallaxFloatTypes = /^(s|a)$/,

			i = 0, j = 0, numSections = $sections.length,
			k, kmax,
			numBlocks;


		if ($.browser.ie && $.support.canvas) {
			!$(document.documentElement).hasClass('s1') && $sections.not('#kv, .m_spec_list').find('span[class*="ico_obj-"]').each(function() {
				GALAXY.imageResizeViaCanvas(this.children[0], this.children[0].offsetWidth, this.children[0].offsetHeight);
			});
			!$(document.documentElement).hasClass('s1') && !$(document.documentElement).hasClass('s2') && $sections.filter('.m_spec_list').find('span[class*="ico_obj-"]').each(function() {
				GALAXY.imageResizeViaCanvas(this.children[0], 200, 200);
			});
		}

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

		$contents.find('a[data-layer-toggle]').each(GALAXY.setLayerToggler);

		$.browser.ie && $('[class*="logo_galaxy-"] img').each(function() {
			var ieFix = this.getAttribute('data-ie-fix');
			if (ieFix != 'no') {
				this.src = this.src.replace('.png', (ieFix || '_ie') +'.png');
			}
		});


		keyvisual = (function() {

			var $visual = $sections.filter('#kv, #kv-type2'),
				$article = $visual.find('article'),
				$title = $article.find('[class*="f_header-"] .kv-title'),
				$text = $article.find('[class*="f_header-"] .kv-text'),
				$figure = $article.find('figure'),
				$image = $figure.find('img'),
				$video = $figure.find('video'),
				$preButton = $article.find('div.f_btn_pre'),

				imageDisplayed = false,
				tryToVideoPlay = false,

				minWidthBound = 0.75,
				sizeMode, areaWidth, areaHeight,
				show = false,
				type, setImage;


			if (!$visual.length) {
				GALAXY.header && GALAXY.header.onKeyVisualShow();
				return {resize: $.noop};
			} else if (!$visual.find('img').length) {
				GALAXY.header && GALAXY.header.onKeyVisualShow();
				return {resize: $.noop};
			}


			type = $visual.attr('id').match('kv-type([0-9])');
			type = type ? parseInt(type[1]) : 1;

			if (!isPoorBrowser) {
				// $title.css({opacity: 0});
				// $text.css({opacity: 0});
				// $figure.css({opacity: 0});
				// $preButton.css({opacity: 0});
				$article.bind({'video-play-kv': videoPlay, 'video-pause-kv': videoPause});
			}
			$title.show();
			$text.show();
			$preButton.show();


			function videoPlay() {
				tryToVideoPlay = true;
				if (imageDisplayed) {
					$article.trigger('video-play');
				}
			}

			function videoPause() {
				tryToVideoPlay = false;
				$article.trigger('video-pause');
			}

			function onImageShow() {
				imageDisplayed = true;
				tryToVideoPlay && videoPlay();
			}

			function getMobileImageHeight() {
				for (var i = 0; i < $image.length; i++) {
					if ($image[i].offsetHeight) {
						return $image[i].offsetHeight;
					}
				}
			}

			setImage = {

				1: function() {

					var imageWidth = areaHeight/9*16,
						visualTop = '',
						visualWidth = Math.min(areaWidth, 1920),
						visualHeight = areaHeight;

					if (sizeMode > 2) {
						if (visualWidth > imageWidth) {
							imageWidth = visualWidth;
						}
						if (imageWidth*minWidthBound > visualWidth) {
							imageWidth = visualWidth/(minWidthBound*10)*10;
							visualHeight = Math.round(imageWidth/16*9);
						}
						if (imageWidth/16*9 > visualHeight) {
							visualTop = (visualHeight-imageWidth/16*9)/2;
						}
					} else {
						imageWidth = visualWidth = areaWidth;
						$figure.css('width', areaWidth);
						visualTop = (areaHeight-getMobileImageHeight())/2;
						visualHeight = areaHeight;
					}

					$visual.css({height: visualHeight});
					$figure.css({top: visualTop, width: imageWidth, marginLeft: Math.min(0, (visualWidth-imageWidth)/2)});
					$video.css('height', imageWidth*0.5625);

					setImage.after(500, 1500, $text.length ? 3000 : 2000, 1500);

				},

				2: function() {
					setImage.after(1000, 500, 2000);
				},

				after: function(delayForTitle, delayForText, delayForPreButton) {
					if (!show) {
						if ($title.get(0)) {
							$title.parent().show();
						} else {
							$text.parent().show();
						}
						if ($article.hasClass('invisible')) {
							//if (!isPoorBrowser) {
								// $title.css({opacity: 1});
								// $text.css({opacity: 1});
								// $preButton.css({opacity: 1});
								// $figure.css({opacity: 1});
							//}
							onImageShow();
						} else {
							if (!isPoorBrowser) {
								if (GALAXY.sizeMode>1) {
									//setTimeout(function() {
										// $title._animate({opacity: 1}, {queue: false, duration: 1500, delay: delayForTitle, easing: 'easeInOutQuad'});
										// $text._animate({opacity: 1}, {queue: false, duration: 1250, delay: delayForText, easing: 'easeInOutQuad', complete: onImageShow});
										// $preButton._animate({opacity: 1}, {queue: false, duration: 750, delay: delayForPreButton, easing: 'easeInOutQuad'});
										// $figure._animate({opacity: 1}, {queue: false, duration: 1300, easing: 'easeInOutQuad'});
									//}, 500);
								} else {
									// $title.css({opacity: 1});
									// $text.css({opacity: 1});
									// $preButton.css({opacity: 1});
									// $figure.css({opacity: 1});
									onImageShow();
								}
							}
						}
						show = true;
					}
					GALAXY.header && GALAXY.header.onKeyVisualShow();
				}

			}

			return {
				scroll: function(v) {
				},
				resize: function(_sizeMode) {
					sizeMode = _sizeMode;
					areaWidth = Math.min(GALAXY.areaWidth, 1920);
					areaHeight = GALAXY.areaHeight;
					$image.get(0) && GALAXY.loadImage($image, setImage[type]);
					var gallerySubnav = location.href.match(/gallery/);
					if ((gallerySubnav != null) && ($('#subnav').length)) {
						GALAXY.header.onKeyVisualShow();
					}
				}
			};

		})();

		function createControls($section) {

			var className = $section.attr('class') || '',
				$children = $section.children().not('nav'),
				i = 0, numChildren = $children.length;

			if ((/^m_feature/).test(className) && (/article/i).test($section[0].nodeName)) {
				return getArticleControl($section);
			} else if (numChildren == 1) {
				if (className.indexOf('m_product_gallery') != -1) {
					return getProductGalleryControl($section);
				}  else if (className.indexOf('m_content-new-gallery') != -1) {
					return getNewProductGallery($section);
				} else if (className.indexOf('m_content-colorset') != -1) {
					return getProductColorsetControl($children);
				} else if (className.indexOf('m_content-video') != -1) {
					return getVideoControl($children);
				} else {
					return getArticleControl($children);
				}
			} else if (className) {
				if (className.indexOf('m_spec_list') != -1) {
					return getSpecListControl($section);
				} else if (className.indexOf('m_content-slider') != -1) {
					return getSliderControl($section);
				} else if (className.indexOf('m_content-tab') != -1) {
					return getTabControl($section);
				}
			}

		}

		function getAccArticleControl($article) {

			if (i==0) {
				src = GALAXY.setMediaBaseURL($items[i][j].find('img').attr('data-image'));

				imageSizeMode = (hasListImage.indexOf(GALAXY.sizeMode+',') != -1) ? GALAXY.sizeMode : hasListImage.split(',')[0];
				src = src.replace(regSizeModeImageName, '_s'+ imageSizeMode +'.png');
				$items[i][j].find('img').attr('src', src);
			} else {
				$items[i][j].find('img').addClass(readyClassName);
			}

		}

		function getVideoControl($article) {

			var $figureContainer = $article.find('.f_container'),
				$playButton  = $figureContainer.find('a'),
				control = getArticleControl($article),
				added = false,
				videoId = '',
				videoParam = '';

			control.name = 'video';

			$playButton.click(function() {
				if (!added) {
					videoId = $playButton.attr('href').split('?v=')[1];
					videoParam = $playButton.attr('data-video-param');
					if (supportTransition) {
						GALAXY.setTransitionEndEvent($playButton.find('img.play'), addVideo);
						$article.parent().addClass('video-added');
					} else {
						addVideo();
					}
					added = true;
				}
				return false;
			});

			function addVideo() {
				$('<iframe frameborder="0" allowfullscreen="1" title="YouTube video player" src="'+ GALAXY.getYoutubePlayerLink(videoId, true, videoParam) +'"></iframe>')
					.appendTo($article).focus();
			}

			return control;

		}

		function getProductColorsetControl($article) {

			var $buttons = $article.find('nav a'),
				$images = $article.find('.f_container figure'),
				$fakeSlider = null,
				$fakeSliderItems = null,
				control = getArticleControl($article),
				prevColor = 0,
				nowColor = 0,
				i = 0, numColors = $buttons.length;


			if (!$images.get(0)||$images.length<2) {
				return getArticleControl($article);
			}

			control.name = 'colorset';

			if (GALAXY.swipeAble) {
				$fakeSlider = $('<div class="fake-slider" />');
				$fakeSliderItems = [];
			}
			for (; i < numColors; i++) {
				$buttons[i] = $($buttons[i]).attr('data-index', i)
					.bind('click', changeColor);
				$images[i] = $($images[i]).show();
				if (i && !isPoorBrowser) {
					$($images[i]).css('opacity', 0);
				}
				if ($fakeSlider) {
					$fakeSliderItems[i] = $('<div class="fake-slider-item" />').appendTo($fakeSlider);
				}
			}
			$images[0].css('zIndex', 1);

			if ($fakeSlider) {
				$fakeSlider.appendTo($article);
				$fakeSlider.xlider({
					endless: true,
					swipe: true,
					onMove: function(v) {
						var percent = Math.abs(v)/$fakeSlider[0].offsetWidth;
						$images[nowColor]._css({opacity: 1-percent});
						$images[0 > v ? nowColor == numColors-1 ? 0 : nowColor+1 : !nowColor ? numColors-1 : nowColor-1]
							.css('opacity', percent);
					},
					onChange: function(page) {
						setButtons(page);
					},
					onChangeEnd: function(page) {
						$images[nowColor]._css('translate3dX', 0);
						changed(page);
						onColorChanged();
					}
				});
			}

			function changeColor() {
				var index = parseInt(this.getAttribute('data-index'));
				if (nowColor != index) {
					setButtons(index);
					changed(index);

					$images[index].stop().css({zIndex: 1, opacity: 0, 'display': 'block'})
						.animate({opacity: 1}, 500, 'easeInOutSine', function () {
							onColorChanged();
						});
					$images[prevColor].stop().animate({'opacity': 0}, 500);
				}
				return false;
			}

			function setButtons(index) {
				$buttons[nowColor].removeClass('on');
				$buttons[index].addClass('on');
			}

			function changed(index) {
				prevColor = nowColor;
				nowColor = index;
			}

			function onChanging(v) {
				$images[prevColor].css('opacity', 1-v.opacity);
			}

			function onColorChanged() {
				$images[prevColor].css('zIndex', 0);
			}

			return control;

		}

		function getSpecListControl($section) {

			var
				$mask = $section.find('div.m_inner'),
				$list = $mask.find('> ul'),
				$moreButton = $section.find('div.m_more a'),
				$moreButtonText = $moreButton.find('em'),
				control = getArticleControl($section),
				opened = false;


			control.name = 'spec';

			$moreButton.click(more);
			$moreButtonText.html('Learn more');
			if (GALAXY.hashMenu == 'spec') {
				setTimeout(more, 1000);
			}


			function more() {
				if (!opened) {
					GALAXY.setHash('spec');
					GALAXY.setSmoothScrollTop($section[0].offsetTop + ($subNav.length ? -$subNav[0].offsetHeight : 0), 750);
					$mask._animate({height: $list[0].offsetHeight}, {queue: false, duration: 750, easing: 'easeInOutQuint', complete: onMore});
					opened = true;
				} else {
					less();
				}
				return false;
			}

			function onMore() {
				$mask.addClass('on').css('height', '');
				$moreButtonText.html('Close');
			}

			function less() {
				var $checker, lessHeight;
				if (opened) {
					GALAXY.setHash('');
					$checker = $mask.clone().removeClass('on').appendTo($mask.parent());
					lessHeight = $checker[0].offsetHeight;
					$checker.remove();
					$mask.__animate({height: lessHeight}, {queue: false, duration: 750, easing: 'easeInOutQuart', complete: onLess});
					opened = false;
				}
			}

			function onLess() {
				$mask.removeClass('on').css('height', '');
				$moreButtonText.html('Learn more');
			}

			return control;

		}

		function getProductGalleryControl($section) {

			var
				$body = $(document.body),

				$sliders = $section.find('div.m_list'),
				$sliderItems = [],
				$nav = $section.find('nav'),
				$prev = $nav.find('a[class$=prev]'),
				$next = $nav.find('a[class$=next]'),
				$colors = $nav.find('div.c_paging-type2 a'),
				$items = [],
				$opener = null,
				hashname = $section.attr('data-hash-name'),
				layerId = $section.attr('data-layer-id'),
				$layer = $((layerId===undefined||layerId==='') ? '#layer-gallery' : '#'+layerId),
				$layerColorName = $layer.find('.c_txt_ly-type1 em'),
				$layerList = $layer.find('ul.ly_gallery_list'),
				$layerPrev = $layer.find('button[class$=prev]'),
				$layerNext = $layer.find('button[class$=next]'),
				$layerPagingBox = $layer.find('div.m_paging_type1'),
				$layerClose = $layer.find('button.c_btn_close-type1'),
				$baseContentsArea = $('#wrap'),
				$baseContentsClickable = null,

				$perspectiveImagesForRubbishIE,
				lastSettedPerspectiveImageName = 'ie...',

				layerAdded = false,
				layerSetted = false,
				layerPagingClick = false,

				hasListImage = $section.attr('data-has-list-image'),
				lastSizeMode = -1,
				regSizeModeImageName = /(_s[1-4])?\.png/,

				colorNames = [],

				nowPage = 0,
				nowLayerPage = 0,
				prevLayerPage = null,
				nowColor = 0,
				clickAble = true,
				isSincing = false,

				numSliderItems = $sliders.length,
				numPages = $sliders.first().find('> ul').length,
				numItems = $sliders.first().find('li').length,

				control = getArticleControl($section),

				readyClassName = 'product-gallery-ready-for-load',
				src = '',
				imageSizeMode = '',

				i = 0, j;

			if ((hashname === undefined) || (hashname === '')) {
				hashname = 'gallery';
			}


			if (hasListImage) {
				hasListImage += ',';
			}

			$colors.bind('click touchend', changeColor);

			for (; i < numSliderItems; i++) {
				$sliderItems[i] = $($sliders[i]);
				$colors[i] = $($colors[i]).attr('data-index', i);
				$items[i] = $sliderItems[i].find('li');
				for (j = 0; j < numItems; j++) {
					$items[i][j] = $($items[i][j]);
					$items[i][j].find('a').attr('data-index', j).click(showLayer);
					if (!isMobile && !isPoorBrowser) {
						$items[i][j].find('a').bind({mouseenter: itemHover, mouseleave: itemLeave, focus: itemHover, blur: itemLeave});
					}
					if (i==0) {
						src = GALAXY.setMediaBaseURL($items[i][j].find('img').attr('data-image'));
						if (hasListImage) {
							imageSizeMode = (hasListImage.indexOf(GALAXY.sizeMode+',') != -1) ? GALAXY.sizeMode : hasListImage.split(',')[0];
							src = src.replace(regSizeModeImageName, '_s'+ imageSizeMode +'.png');
						}
						$items[i][j].find('img').attr('src', src);
					} else {
						$items[i][j].find('img').addClass(readyClassName);
					}
				}
				colorNames[i] = $colors[i].text();
			}

			$section.bind('welcome', function() {
				$('.'+readyClassName).each(function() {
					src = GALAXY.setMediaBaseURL($(this).attr('data-image'));
					if (hasListImage) {
						imageSizeMode = (hasListImage.indexOf(GALAXY.sizeMode+',') != -1) ? GALAXY.sizeMode : hasListImage.split(',')[0];
						src = src.replace(regSizeModeImageName, '_s'+ imageSizeMode +'.png');
					}
					$(this).attr('src', src).removeClass(readyClassName);
				});
			});

			$sliders.xlider({
				swipe: GALAXY.swipeAble,
				onChange: function(page) {
					isSliding = true;
					if (!isSincing) {
						setButtons(page);
					}
				},
				onChangeEnd: function() {
					if (!isSincing) {
						isSliding = false;
					}
				}
			});
			$prev.click(function() {
				for (var i = 0; i < numSliderItems; i++) {
					isSincing = i != nowColor;
					$sliderItems[i].xlider('prev', i != nowColor);
				}
				isSincing = false;
				return false;
			});
			$next.click(function() {
				for (var i = 0; i < numSliderItems; i++) {
					isSincing = i != nowColor;
					$sliderItems[i].xlider('next', i != nowColor);
				}
				isSincing = false;
				return false;
			});

			control.setSizeMode = function(sizeMode) {
				if (lastSizeMode != sizeMode) {
					hasListImage && setSizeModeImages(sizeMode);
					lastSizeMode = sizeMode;
				}
				resizeLayer();
			}
			control.name = 'product-gallery';

			setButtons(0);
			colorChanged();

			if (GALAXY.hashMenu == hashname) {
				$sliderItems[nowColor].find('a').eq(0).click();
			}


			function setSizeModeImages(sizeMode) {
				var imageSizeMode = (hasListImage.indexOf(sizeMode+',') != -1) ? sizeMode : hasListImage.split(',')[0];
				$section.find('div.m_list img').each(function() {
					var src = this.src.replace(regSizeModeImageName, '_s'+ imageSizeMode +'.png');
					if (this.src!=src) {
						this.src = src;
					}
				});
			}

			function itemHover() {
				!isSliding && itemFocusing(parseInt(this.getAttribute('data-index')));
			}

			function itemLeave() {
				!isSliding && itemFocusing(-1);
			}

			function itemFocusing(index) {
				var sizeMode = GALAXY.sizeMode;
				for (i = 0, $currentItems = $items[nowColor]; i < numItems; i++) {
					$currentItems[i]._stop()._animate({opacity: (index == -1 || i == index) ? 1 : 0.5}, {queue: false, duration: 350, easing: 'easeOutQuad'});
				}
			}

			function showLayer() {
				var index = parseInt(this.getAttribute('data-index'));
				if (!layerAdded) {
					$baseContentsClickable = $baseContentsArea.find('a,input,select,textarea,button,video,iframe');
					$baseContentsClickable.each(function() {
						var tabindex = $(this).attr('tabindex');
						if (tabindex!==undefined&&tabindex!==null) {
							$(this).data('prev-tabindex', tabindex);
						}
						$(this).attr('tabindex','-1');
					});
					$opener = $(this);
					setLayerContent();
					$layerColorName.html(colorNames[nowColor]);
					$layerList.xlider('change', index, true);
					if (!isPoorBrowser) {
						$layerList[0].children[index].style.opacity = 1;
					}
					$layer.addClass('show');
					GALAXY.setHash(hashname);
					GALAXY.noScroll.on();
					layerAdded = true;
					resizeLayer();
				}
				return false;
			}

			function setLayerContent() {

				var $images = $sliderItems[nowColor].find('img'),
					$imageButtons = $sliderItems[nowColor].find('a'),
					$layerImages, i;

				if (!layerSetted) {
					for (i = 0; i < numItems; i++) {
						$('<li><span><img alt=""></span></li>').appendTo($layerList);
						$('<a href="#"><span>'+ $images[i].alt +'</span></a>').appendTo($layerPagingBox);
					}
					for ($layerImages = $layerList.find('img'), i = 0; i < numItems; i++) {
						$layerImages[i].alt = $images[i].alt;
					}
					$layerClose.bind('click touchend', hideLayer);
					$layerPagingBox.find('a').click(function() {
						layerPagingClick = true;
					}).each(function(i) {
						var omni = $imageButtons.eq(i).attr('data-omni');
						if (omni&&omni.length>0) {
							$(this).attr({'data-omni':omni}).click(GALAXY.tracking);
						}
					});
					$layerList.xlider({
						endless: true,
						swipe: GALAXY.swipeAble,
						onMove: !isPoorBrowser ? onLayerSliderMove : null,
						arrows: [$layerPrev, $layerNext],
						paging: $layerPagingBox,
						onChange: function(page) {
							prevLayerPage = nowLayerPage;
							nowLayerPage = page;
						},
						onChangeEnd: function(page) {
							prevLayerPage = null;
							layerPagingClick = false;
						}
					});
					$layer.bind('touchmove', GALAXY.preventDefault);
					layerSetted = true;
				}

				for ($layerImages = $layerList.find('img'), i = 0; i < numItems; i++) {
					$layerImages[i].src = $images[i].src.replace(regSizeModeImageName, '.png');
					$layerImages[i].alt = $images[i].alt; // 20161130 update.
				}
				if (hasListImage && $.browser.ie) {
					$perspectiveImagesForRubbishIE = $layerList.find('img[src*="-perspective"]');
				}

			}

			function checkPerspectiveImageSize() {
				var imageName;
				if ($perspectiveImagesForRubbishIE) {
					imageName = $layerList[0].offsetHeight > 650 ? '' : '_m';
					if (imageName != lastSettedPerspectiveImageName) {
						$perspectiveImagesForRubbishIE.each(function() {
							this.src = this.src.replace(/(_m)?\.png/i, imageName +'.png');
						});
						lastSettedPerspectiveImageName = imageName;
					}
				}
			}

			function onLayerSliderMove(now) {

				if (layerPagingClick) {
					return;
				}

				return;

				var children = $layerList[0].children,
					minWidth = $layerList[0].offsetWidth/3,
					maxWidth = minWidth*2,
					currentIndex = prevLayerPage !== null ? prevLayerPage : nowLayerPage,
					percent, i = 0;

				for (; i < numItems; i++) {
					if (i == currentIndex) {
						percent = 1-Math.min(1, Math.abs(now)/minWidth);
						children[i].style.opacity = percent;
					} else if ((now > 0 && (i == currentIndex-1 || i == numItems-1)) ||
						(0 > now && (i == currentIndex+1 || i == 0))) {
						percent = Math.max(0, Math.min(1, (Math.abs(now)-maxWidth)/minWidth));
						children[i].style.opacity = percent;
					}
				}

			}

			function resizeLayer() {
				if (layerAdded) {
					$layerList.css('marginTop', ($layerList[0].parentNode.offsetHeight-$layerList[0].offsetHeight)/2);
					checkPerspectiveImageSize();
				}
			}

			function hideLayer() {
				$layer.removeClass('show');
				$baseContentsClickable.each(function() {
					var tabindex = $(this).data('prev-tabindex');
					if (tabindex!==undefined&&tabindex!==null) {
						$(this).attr('tabindex',tabindex);
					} else {
						$(this).removeAttr('tabindex');
					}
				});
				$opener && $opener.focus();
				$opener = null;
				GALAXY.setHash('');
				GALAXY.setTransitionEndEvent($layer, function() {
					GALAXY.noScroll.off();
				});
				layerAdded = false;
				lastSettedPerspectiveImageName = '...';
				return false;
			}

			function changeColor() {
				var index;
				if (clickAble) {
					index = parseInt(this.getAttribute('data-index'));
					if (index != nowColor) {
						clickAble = false;
						if (!isPoorBrowser) {
							$sliderItems[nowColor]._animate({opacity: 0}, {queue: false, duration: 500, easing: 'easeInOutQuad'});
							$sliderItems[index].addClass('over')
								.css({zIndex: 1, opacity: 0}).show()
								._animate({opacity: 1}, {queue: false, duration: 500, easing: 'easeInOutQuad', complete: colorChanged});
						}
						nowColor = index;
						for (i = 0; i < numSliderItems; i++) {
							$($colors[i]).decideClass('on', i == nowColor);
						}
						if (isPoorBrowser) {
							$sliderItems[index].css({zIndex: 1}).show();
							colorChanged();
						}
					}
				}
				return false;
			}

			function colorChanged() {
				clickAble = true;
				for (i = 0; i < numSliderItems; i++) {
					$sliderItems[i].removeClass('over').css({zIndex: 0});
					if (i != nowColor) {
						$sliderItems[i].hide();
					}
				}
			}

			function setButtons(_nowPage) {
				var i;
				nowPage = _nowPage;
				$prev.decideClass('hide', !nowPage);
				$next.decideClass('hide', nowPage == numPages-1);

				if (!nowPage) {
					$prev.attr('tabindex', -1).css('zIndex', -1);
					$prev.on('click', function () {
						$next.focus();
					});
				}else {
					$prev.attr('tabindex', 0).css('zIndex', 2);
				}
				if (nowPage == numPages-1) {
					$next.attr('tabindex', -1).css('zIndex', -1);
				}else {
					$next.attr('tabindex', 0).css('zIndex', 2);
					$next.on('click', function () {
						$prev.focus();
					});
				}
				isSincing = true;
				for (i = 0; i < numSliderItems; i++) {
					i != nowColor && $sliderItems[i].xlider('change', nowPage, true);
				}
				isSincing = false;
			}

			return control;

		}

		function getNewProductGallery($section) {

			var control,
				$article              = $section.find('>article'),
				_prevSizeMode         = -1,
				_readyClassName       = 'ready-product-gallery',
				_hasListImage         = $section.data('has-list-image') || '4,',
				_regSizeModeImageName = /(_s[1-4])?\.png/,
				_isView               = false,
				_welcome              = true,
				_isRtl                = $('html').hasClass('rtl')?-1:1,
				_rtlMove              = $('html').hasClass('rtl')?'right':'left',
				_hashname             = $section.data('hashname') || 0,
				_layerIdArr           = $section.data('layer-id') || '',
				_titleAnimation       = $section.data('title-animation') || 'none',

				$document     = $(document),
				$container    = $section.find('.m_product-container'),
				$titles       = $section.find('.c_product_tit'),
				$btnColors    = $section.find('.c_paging-type'),
				$btnProducts  = $section.find('.m_gallery-title a'),
				$btnArrowPrev = $section.find('.m_btn_type1-prev, .m_btn_type2-prev'),
				$btnArrowNext = $section.find('.m_btn_type1-next, .m_btn_type2-next'),
				$products     = $container.find('.m_product-gallery'),
				$itemLists    = $products.find('.m_product-color'),

				_titleWidth   = 0,
				_prodLens     = $itemLists.eq(0).find('.m_list').length,
				_itemLens     = $itemLists.eq(0).find('.m_list>li').length,
				_touch        = { x:0, y:0, t:0 },
				_isTouch      = undefined,
				_clickAble    = true,
				_itemWidth    = 0,
				_offset       = 0,
				_offsetDelta  = 0,
				_productIndex = Math.max($section.data('product-index') || $itemLists.find('.m_list.on').index(), 0),
				_colorIndex   = 0,
				_itemsIndex   = 0,
				_startIndex   = 0,
				_animated     = false,
				_transitionEndEventName = 'transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd msTransitionEnd',

				_isLayerShow      = false,
				_resizeLayer  	  = null,
				_layerCloseName   = '.c_btn_close-type1',
				_thumboxOverCheck = false,
				$layer            = null,
				$layers           = [],
				$layerClose       = $('<a>'),
				$baseContentsArea      = $('#wrap'),
				$baseContentsClickable = null,
				$opener                = null,

				$perspectiveImagesForRubbishIE,
				lastSettedPerspectiveImageName = 'ie...',

				isTransform = $.support.transform,
				isFirstLoaded = false,

				_$layerList,
				_$layerImageArea,
				_$layerImage,
				_$layerZoom,
				_$layerZoomImgs,
				_$layerZoomCursor = null,

				_zoomDelta     = {x:0,y:0},
				_zoomMoveDelta = {x:0,y:0},
				_zoomSetTime, _zoomSetTime2,
				_zoomIsview    = false,

				var___End = null;


			;(function() {
				// hashname
				var i = 0,
					tmpArr = _hashname != '' ? _hashname.split(','):[],
					hashLens = tmpArr.length;

				for (i=_prodLens-hashLens; i>0; i--) {
					tmpArr.push('gallery'+i);
				}
				_hashname = tmpArr;

				// Layer
				tmpArr = (_layerIdArr !='')?_layerIdArr.split(','):[];
				var layerLens = tmpArr.length;

					for (i=_prodLens-layerLens; i>0; i--) {
						tmpArr.push('layer-gallery'+i);
					}
					_layerIdArr = tmpArr;
				$.each(_layerIdArr, function(i) {
					if ( $('#'+_layerIdArr[i]).get(0) ) {
						$layers.push( $('#'+_layerIdArr[i]) );
					} else {
						$layers.push( new makeLayerLayout(_layerIdArr[i], $btnProducts.eq(i).text()) );
					}
					$layerClose = $layerClose.add( $layers[i].find(_layerCloseName) );
				});
			})();

			welcomeBefore();

			function containerNoScroll() {
				$section.find('.f_container').scrollLeft(0);
			}
			function init() {
				if ( isTransform ) {
					$container._css({translate3dX:-4000*_isRtl,force3D:true});
				} else {
					$container.css('margin-' + _rtlMove,-4000*_isRtl);
				}

				var tempProductIndex = _productIndex;
				_productIndex = -1;

				titleChange( tempProductIndex );

				// Image Load
				$section.on('welcome', welcomeFn);

				// Event Bind
				$btnColors.on('click', function() {
					var thisIndex = $(this).index();
					colorsChange(thisIndex);
					return false;
				});
				$btnProducts.on('click', productChange);
				$btnArrowPrev.on('click', prevAction).hide()
							.on('focus', containerNoScroll);

				$btnArrowNext.on('click', nextAction).hide()
							.on('focus', containerNoScroll);

				$container.on('mousedown touchstart', dragStart);
				$section.on('mousemove.viewport', viewportMove);
				////.on('mouseleave', viewportLeave);

				$itemLists.find('a').on({ 'focus click': itemClick });

				control = getArticleControl($section);
				control.setSizeMode  = setResize;
				control.setVisible   = setVisible;
				control.setInvisible = setInVisible;
				control.name         = 'new-product-gallery';

				$.each(_hashname, function(i) {
					if (GALAXY.hashMenu == _hashname[i]) {
						$('html,body').scrollTop( $section.offset().top-($(window).height()-$section.height())/2 );
						var openerTarget = $itemLists.eq(0).find('>.m_list').eq(i).find('a')[0];
						// _productIndex = i;

						openLayer(openerTarget);
					}
				});

				$itemLists.find('a').attr({'title': $container.data('link-title')});

				var $targetItem = $itemLists.find('li:first img');
				GALAXY.loadImage($targetItem, function() {
					_isRtl      = $('html').hasClass('rtl')?-1:1;
					_rtlMove    = $('html').hasClass('rtl')?'right':'left';
					_itemWidth  = $targetItem.width();
					_titleWidth = $titles.width();

					$itemLists.css(_rtlMove,-_itemWidth/2);
					animation();
				});

				setResize( -1 );
			}
			var viewportPosition = null;
			function viewportMove(e) {
				var marginSize = $section.offset().left;
				var thisPosition = (e.pageX-marginSize);
				var viewGuideLine = $section.width()/3;
				var isTrue = ( $('html').hasClass('rtl') ) ? false : true;

				if ( thisPosition <= viewGuideLine ) {
					$btnArrowPrev.decideClass('view',isTrue);
					$btnArrowNext.decideClass('view',!isTrue);
				} else if ( thisPosition >= viewGuideLine*2 ) {
					$btnArrowPrev.decideClass('view',!isTrue);
					$btnArrowNext.decideClass('view',isTrue);
				} else {
					$btnArrowPrev.removeClass('view');
					$btnArrowNext.removeClass('view');
				}
			}
			function setResize(sizeMode) {
				if (_prevSizeMode != sizeMode || sizeMode === -1) {
					_prevSizeMode = sizeMode;
					_hasListImage && $section.find('div.m_list img').each( imageLoad );
					setTimeout(function() {
						_itemWidth = $itemLists.eq(_colorIndex).find('li img').width();
						$itemLists.css(_rtlMove,-_itemWidth/2);
					},100);
					if ( $btnProducts.length ) {
						var $selectMenu = $btnProducts.eq( _productIndex ),
							$selectLine = $('.m_gallery-title span.line');
						$selectLine.css({'width': $selectMenu.outerWidth(), 'left': $selectMenu.position().left});
					}
					animation();
				}

				if ( _isLayerShow ) {
					clearTimeout( _resizeLayer );
					_resizeLayer = setTimeout(resizeLayer,300);
				}
			}
			function setVisible(_visible) {
				$article.addClass('show');
				if ( _visible && !_isView) {
					_isView = true;
					$article.addClass('visible');

					if ( isTransform ) {
						$container._animate({translate3dX:0}, {duration: 1650, easing: 'easeOutBack', force3D: true});
					} else {
						var containerMargin = _rtlMove=='right' ? 'marginRight': 'marginLeft';
						$container.animate({containerMargin: 0}, 1650, 'easeOutBack');
					}
				} else if ( !_visible ) {
					$article.removeClass('visible');
				}
			}
			function setInVisible(_invisible) {
				if ( _invisible ) {
					if ( !_isView ) {
						if ( isTransform ) {
							$container._css({translate3dX:-4000*_isRtl,force3D:true});
						} else {
							$container.css('margin-'+_rtlMove,-4000);
						}
					}
				} else {
					if (_welcome) {
						$section.trigger('welcome');
						_welcome = false;
					}
				}
			}
			function welcomeBefore() {
				var $this,
					color, colorTitle, colorOmni;

				$.each(_hashname, function(i) {
					if (GALAXY.hashMenu == _hashname[i]) {
						_productIndex = i;
					}
				});
				$itemLists.each(function(i) {
					$this = $(this);
					color = $this.data('color'),
					colorTitle = $this.data('color-title');
					colorOmni  = $this.data('color-omni');
					colorType  = $this.data('color-omni-type') || 'microsite';

					if ( $this.find('li').length ) {
						$btnColors && $btnColors.append('<a href="#" title="'+colorTitle+'" class="cl'+(i+1)+'" data-omni="'+colorOmni+'" data-omni-type="'+colorType+'"><span>'+color+'</span></a>');
						if ( !isFirstLoaded ) {
							isFirstLoaded = true;
							$this.show().addClass('on').find('img').each( imageLoad );
						} else {
							$this.hide().removeClass('on').find('img').addClass( _readyClassName );
						}
					} else {
						$this.remove();
					}
				});
				$itemLists = $products.find('.m_product-color');
				$btnColors = $btnColors.find('a');
				$btnColors.eq(0).addClass('on');
			}
			function imageLoad(sizeMode) {
				var imageSizeMode, src, _sizeMode;
				_sizeMode = sizeMode || GALAXY.sizeMode;
				src = GALAXY.setMediaBaseURL($(this).attr('data-image'));
				if ( _hasListImage ) {
					imageSizeMode = (_hasListImage.indexOf(_sizeMode+',') != -1) ? _sizeMode : _hasListImage.split(',')[0];
					src = src.replace(_regSizeModeImageName, '_s'+ imageSizeMode +'.png');
				}
				$(this).attr('src', src).removeClass(_readyClassName);
			}
			function welcomeFn() {
				$('.'+_readyClassName).each(imageLoad);
			}
			function colorsChange(thisIndex) {
				var prevIndex = _colorIndex,
					$this;

				if ( thisIndex != _colorIndex ) {
					_colorIndex = thisIndex;

					var itemLens = $itemLists.eq(thisIndex).find('li').length;
					var isLensChange = (itemLens != _itemLens);
					_itemLens = itemLens;
					var prodLens = 0;
					// $itemLists.eq(thisIndex)

					$itemLists.each(function(i) {
						$this = $(this);
						if (i==_colorIndex) {
							$this.show().stop().animate({'opacity':1}, 650, 'easeInOutQuad', function(){
								$(this).addClass('on');
							});

							$this.find('.m_list').each(function(i) {
								if ( !$(this).children().length ) {
									$btnProducts.eq(i).hide();
								} else {
									$btnProducts.eq(i).show();
									prodLens++;
								}
							});

						} else {
							$this.stop().animate({'opacity':0}, 650, 'easeInOutQuad', function(){
								$(this).hide().removeClass('on');
							});
						}
						$btnColors.removeClass('on').eq( thisIndex ).addClass('on');
					});

					if ( isLensChange ) {
						selectAction( _itemsIndex%(_itemLens/prodLens) );
					}


					// if ( isTransform ) {
					// 	$section.removeClass('color'+(prevIndex+1)).addClass('color'+(_colorIndex+1));
					// } else {
					// 	$section.append('<div class="background color'+(_colorIndex+1)+'"></div>');
					// 	$section.find('.background')._animate({opacity:1}, {duration: 1250, easing: 'easeInOutQuad', complete: function() {
					// 		var backGroundColor = $(this).css('background-color');
					// 		$section.css('background-color', backGroundColor);
					// 		$(this).remove();
					// 	}});
					// }
				}
			}
			function productChange(e) {
				var thisIndex = $(this).index();
				if ( thisIndex != _productIndex ) {
					var prevIndex = _itemsIndex;

					// _productIndex = thisIndex;
					_itemsIndex = (_itemLens/_prodLens)*thisIndex;

					titleChange(thisIndex);
					animation();
				}
				return false;
			}
			function prevAction() {
				selectAction(_itemsIndex-1);
				return false;
			}
			function nextAction() {
				selectAction(_itemsIndex+1);
				return false;
			}
			function selectAction(index) {
					var prevIndex = _itemsIndex;
					_itemsIndex = index;
					_itemsIndex = Math.min( Math.max(_itemsIndex,0) ,_itemLens-1 );
					animation();

					var $item    = $itemLists.eq(_colorIndex).find('.m_list li').eq(_itemsIndex);
					productIndex = $item.closest('.m_list').index();
					titleChange(productIndex);
			}
			function dragStart(e) {
				if ( !_animated ) {
					if (e.type == 'mousedown' && !!e.originalEvent.button ) {
						return false;
					}
					_animated = true;
					var touches = GALAXY.getEventPoint(e);
					_touch 		= {x : touches[0], y : touches[1], t : +new Date };
					_isTouch	= undefined;
					_clickAble  = true;
					_offsetDelta = 0;
					_startIndex = _itemsIndex;

					$container.on('mousemove.galleryMove touchmove.galleryMove', dragMove);
					$document.on('mouseup.galleryEnd touchend.galleryEnd', dragEnd);
				}
				if (!GALAXY.isMobile) {
					e.preventDefault();
				}
			}
			function dragMove(e) {
				var touches = GALAXY.getEventPoint(e);
				var delta = {
					x : (touches[0] - _touch.x)*_isRtl,
					y : (touches[1] - _touch.y)*_isRtl,
					t : +new Date - _touch.t,
				}

				if ( _isTouch === undefined && delta.t > 25 && Math.abs(delta.x)>4) {
					_isTouch = !!( Math.abs(delta.x)+10 > Math.abs(delta.y) );
					_clickAble = false;
				}

				if ( _isTouch === true ) {
					_offsetDelta = _offset + delta.x;

					selectItem( _offsetDelta );

					if ( isTransform ) {
						$products._css({translate3dX: _offsetDelta*_isRtl, force3D: true});
					} else {
						$products.css('margin-'+_rtlMove, _offsetDelta);
					}

					e.preventDefault();
				} else {
					_animated = false;
				}
			}
			function dragEnd(e) {
				var touches,delta,speedDalta,moveX,moveStep,$items;

				if ( _isTouch === true ) {
					_clickAble = true;

					touches    = GALAXY.getEventPoint(e);
					delta      = {x: touches[0]-_touch.x, t: +new Date - _touch.t};
					speedDalta = delta.x/delta.t;

					if ( _startIndex == _itemsIndex && Math.abs(delta.x) < _itemWidth ) {
						var isRtl = $('html').hasClass('rtl') ? delta.x < 0 : delta.x > 0;
						if (isRtl) {
							prevAction();
						} else {
							nextAction();
						}
					} else {
						if ( Math.abs(speedDalta) > 1 ) {
							$items = getItems();
							$items.removeClass('cur');
							_offsetDelta = _offsetDelta + ((speedDalta*_itemWidth*0.4)*_isRtl);
							moveX    = _offsetDelta*_isRtl;

							moveStep = function(v) {
								selectItem( v.translate3dX*_isRtl );
								if ( Math.ceil(v.translate3dX) == Math.ceil(moveX) ) {
									_offset = _offsetDelta;
									selectItem( _offset );
									animation(450);
								}
							}
							if ( _isRtl == -1 ) {
								moveX = Math.min(Math.max(moveX,0),((_itemLens-1)*-_itemWidth*_isRtl));
							} else {
								moveX = Math.max(Math.min(moveX,0),((_itemLens-1)*-_itemWidth*_isRtl));
							}
							$products._animate({translate3dX:moveX}, {duration:1000, easing:'easeOutCubic', force3D:true, step:moveStep});
						} else {
							animation();
						}
					}
				}
				$container.off('.galleryMove');
				$document.off('.galleryEnd');
			}
			function titleChange(productIndex) {
				// if ( $btnProducts.length && $titles.length && (productIndex != _productIndex) ) {
				if ( $btnProducts.length && $titles.length ) {
					var $selectMenu = $btnProducts.eq(productIndex),
						$selectLine = $('.m_gallery-title span.line'),
						direction = !!(productIndex>_productIndex);

					if ( _titleAnimation == 'fade' ) {
						$titles.eq(0).stop().css('opacity',0).text( $.trim($btnProducts.eq(_productIndex).text()) ).animate({'opacity':1}, 1250, 'easeInOutQuad');
						$titles.not('eq(0)').hide();
					} else if ( _titleAnimation == 'slide' ) {
						_titleWidth = _titleWidth || $titles.width();
						$titles.eq( _productIndex ).stop().animate({'left': (direction?-_titleWidth:_titleWidth)},400,'easeInOutQuad').addClass('on');
						$titles.eq( productIndex ).css('left', (direction?_titleWidth:-_titleWidth)).stop().animate({'left':0},400,'easeInOutQuad').removeClass('on');
					}

					_productIndex = productIndex;
					$btnProducts.removeClass('on').eq(_productIndex).addClass('on');
					$selectLine.css({'width': $selectMenu.outerWidth(), 'left': $selectMenu.position().left});
				} else {
					_productIndex = Math.max(0, _productIndex);
				}
			}
			function selectItem( offset ) {
				var $items = $itemLists.eq( _colorIndex ).find('li');
				var productIndex, tempIndex = -1;

				_itemsIndex = Math.floor(( offset + _itemWidth/2) /  _itemWidth) * -1;
				_itemsIndex = Math.min( Math.max(_itemsIndex, 0), _itemLens-1 );

				$items.removeClass('cur').eq(_itemsIndex).addClass('cur');

				productIndex = $items.eq(_itemsIndex).closest('.m_list').index();
				titleChange(productIndex);
			}
			function animation( aniDuration ) {
				_animated = true;

				_offset = _itemWidth * _itemsIndex * -1;

				var d = aniDuration || 750;

				var completeFn = function() {
					_animated = false;
					_isTouch  = undefined;

					if ( _itemsIndex == 0 ) {
						$btnArrowPrev.removeClass('view');
						GALAXY.setTransitionEndEvent($btnArrowPrev, function() {
							$btnArrowPrev.hide();
						});
					} else {
						$btnArrowPrev.show().unbind(_transitionEndEventName);
					}

					if ( _itemsIndex == _itemLens-1 ) {
						$btnArrowNext.removeClass('view');
						GALAXY.setTransitionEndEvent($btnArrowNext, function() {
							$btnArrowNext.hide();
						});
					} else {
						$btnArrowNext.show().unbind(_transitionEndEventName);
					}

					// _productIndex = $itemLists.eq(_colorIndex).find('li.cur').closest('.m_list').index();
				}

				if ( isTransform ) {
					$products._animate({translate3dX:_offset*_isRtl}, {duration: aniDuration, easing: 'easeInOutQuad', force3D: true, complete: completeFn});
				} else {
					var containerMargin = _rtlMove=='right'?'marginRight':'marginLeft';
					$products.animate({containerMargin: _offset}, aniDuration, completeFn);
				}
				$itemLists.each(function() {
					$(this).find('li').removeClass('cur').eq( _itemsIndex ).addClass('cur');
				});
			}
			function itemClick(e) {
				var that = $(this)[0], prevIndex;
				if ( _clickAble && _isTouch === undefined ) {
				 	prevIndex = _itemsIndex;
					_itemsIndex = $(this).closest('.m_product-color').find('a').index( this );

					productIndex = $(this).closest('.m_list').index();
					titleChange(productIndex);
					animation();

					if ( e.type == 'click' ) {
						openLayer(that);
					}
				}

				containerNoScroll();
				return false;
			}
			function openLayer( target ) {
				if ( !_isLayerShow ) {
					_isLayerShow = true;
					$layer = $layers[_productIndex];
					$layer.show();
					$baseContentsClickable = $baseContentsArea.find('a,input,select,textarea,button,video,iframe');
					$baseContentsClickable.each(function() {
						var tabindex = $(this).attr('tabindex');
						if (tabindex!==undefined&&tabindex!==null) {
							$(this).data('prev-tabindex', tabindex);
						}
						$(this).attr('tabindex','-1');
					});

					makeLayerContent($layer);

					if ( GALAXY.isMobile ) {
						$('#wrap').hide();
						$("meta[name=viewport]").attr('content', 'width=device-width, initial-scale=1, maximum-scale=1.5, user-scalable=1');
					}

					$opener = $(target);
					$layer.addClass('show');
					$layerClose.one('click touchend', closeLayer);
					if ( !GALAXY.isMobile ) {
						$layer.off('.layerTouchMove').on('touchmove.layerTouchMove', GALAXY.preventDefault);
					}
					GALAXY.setHash( _hashname[_productIndex] );
					GALAXY.noScroll.on();
					resizeLayer();
				}
			}
			function resizeLayer() {
				if ( _isLayerShow ) {

					var layerMaxHeight,
						layerHeight,
						layerSizeMode = null,
						layerMaxSize  = [0,560,900,754,1034],
						$layerContents = $layer.find('.m_ly_inner');

					if ( $layer.data('max-height') != null ) {
						var tmpArr = $layer.data('max-height').split(',');
						tmpArr.push('0');
						tmpArr = tmpArr.reverse();
						layerMaxHeight = parseInt( tmpArr[GALAXY.sizeMode] );
					} else {
						layerMaxHeight = layerMaxSize[GALAXY.sizeMode];
					}

					layerSizeMode  = ($(window).height() < layerMaxHeight);
					layerMaxHeight = GALAXY.sizeMode == 1 ? Math.min($(window).height(), layerMaxHeight) : layerMaxHeight;
					if ( GALAXY.isPoorBrowser ) {
						$layerContents.css({
							marginTop : (layerSizeMode) ? 0: -layerMaxHeight/2,
							height : layerMaxHeight
						});
					} else {
						$layerContents.css({height : layerMaxHeight});
					}
					$layer.decideClass('min', layerSizeMode);

					thumboxOut( true );
					zoomSetup();
				}
			}
			function closeLayer() {
				_zoomIsview = false;

				if ( GALAXY.isMobile ) {
					$('#wrap').show();
					$("meta[name=viewport]").attr('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
				}

				if ( !_itemWidth ) {
					_prevSizeMode = -1;
					setResize(GALAXY.sizeMode);
				}

				$layer.find('.m_ly_gallery').decideClass('zoom-on', false);
				$layer.removeClass('show');
				$baseContentsClickable.each(function() {
					var tabindex = $(this).data('prev-tabindex');
					if (tabindex!==undefined&&tabindex!==null) {
						$(this).attr('tabindex',tabindex);
					} else {
						$(this).removeAttr('tabindex');
					}
				});

				$opener && $opener.focus();
				$opener = null;
				GALAXY.setHash('');
				GALAXY.setTransitionEndEvent($layer, function() {
					GALAXY.noScroll.off();
					$layer.hide();
				});
				_isLayerShow = false;

				return false;
			}
			function getItems() {
				return $itemLists.eq(_colorIndex).find('li');
			}
			function getItemList() {
				return $itemLists.eq(_colorIndex).find('.m_list').eq(_productIndex);
			}
			function getItemIndex(thisIndex) {
				return (thisIndex||0)%(_itemLens/_prodLens);
			}
			function thumboxOver() {
				if (!$(this).hasClass('cur')) {
					var $this = $(this),
						$imgs = $this.find('>img'),
						$liner = $layer.find('.m_ly_thumnail>span.line'),
						paddingVal = 6;

						_thumboxOverCheck = true;
						$liner.stop(true);

						$liner.css({
							width  : $imgs.width() + paddingVal,
							height : $imgs.height(),
							top    : $this.position().top + parseInt($this.css('paddingTop'),10) -2,
							left   : $this.position().left + ( parseInt($this.css('paddingLeft'),10) ) - paddingVal/2 -2
						});
				}
			}
			function thumboxOut(timer) {
				if ( $layer.find('.m_ly_thumnail li>a.cur').length ) {
					_thumboxOverCheck = false;
					var setTimer = (timer === true) ? 0 : 350;
					setTimeout(function() {
						if( !_thumboxOverCheck ) {
						var $layerThumbBx = $layer.find('.m_ly_thumnail'),
							$this         = $layerThumbBx.find('li>a.cur'),
							$imgs         = $this.find('>img'),
							$liner        = $layerThumbBx.find('>span.line'),
							paddingVal    = 6;

							$liner.show().css({
								width  : $imgs.width() + paddingVal,
								height : $imgs.height(),
								top    : $this.position().top + parseInt($this.css('paddingTop'),10) -2 ,
								left   : $this.position().left + ( parseInt($this.css('paddingLeft'),10) ) - paddingVal/2 -2
							});
						}
					}, setTimer);
				}
			}

			function thumboxClick() {
				var $this          = $(this),
					$layerThumbBx  = $layer.find('.m_ly_thumnail li>a'),
					$lyGalleryList = $layer.find('.m_ly_gallery li'),
					thisIndex      = $layer.find('.m_ly_thumnail a').index(this);

				if( !$lyGalleryList.eq(thisIndex).hasClass('cur') ) {
					$lyGalleryList.show().each(function(i) {
						$(this).decideClass('cur',(i==thisIndex));
						$layerThumbBx.eq(i).decideClass('cur',(i==thisIndex));
					});
					zoomSetup();
				}
				thumboxOut(true);
				return false;
			}

			function zoomToggle() {
				_zoomIsview = !_zoomIsview;
				$layer.find('.m_ly_gallery').decideClass('zoom-on', _zoomIsview);
				zoomSetup();
				return false;
			}
			function zoomDestroy(isVriable) {
				if ( _$layerList ) {
					_zoomDelta     = {x:0,y:0};
					_zoomMoveDelta = {x:0,y:0};

					_$layerZoom._css({'translate3dX':0,'translate3dY':0});
					_$layerZoomImgs._css({'translate3dX':0,'translate3dY':0})

					_$layerZoom.off('.zmEvt');
					$(document).off('.zmEvt');

					if ( isVriable ) {
						_zoomIsview      = false;
						_$layerZoom      = null;
						_$layerZoomImgs  = null;
						clearTimeout( _zoomSetTime );
						$layer.find('a.zoom').hide().removeClass('ani');
						$layer.find('.m_ly_gallery').decideClass('zoom-on', false);
					}
				}
			}
			function zoomSetup() {
				_$layerList      = $layer.find('.m_ly_gallery li.cur');
				_$layerImageArea = _$layerList.find('a.zoom-area');
				_$layerImage     = _$layerImageArea.find('>img');
				_$layerZoom      = _$layerList.find('a.zoom');
				_$layerZoomImgs  = _$layerZoom.find('img');

				setTimeout(function() {
					_$layerImageArea.width( _$layerImage.width() );
				}, 250);

				zoomDestroy();

				_$layerImageArea.off('.zoomControll')
					.removeAttr('href')
					.on('click.zoomControll', zoomToggle);

				if ( _zoomIsview && GALAXY.sizeMode > 2 && !GALAXY.isMobile) {
					_$layerZoom.show();
					_$layerZoom.on('touchstart.zmEvt mousedown.zmEvt', zoomDragStart);
					$(document).on('keydown.zmEvt', zoomKeymoveOn);
					_$layerZoom.on('click.zmEvt', GALAXY.preventDefault);
					_$layerZoom.addClass('ani');
					clearTimeout( _zoomSetTime );
					_zoomSetTime = setTimeout(function() {
						_$layerZoom.removeClass('ani');
					},2400);
				} else {
					zoomDestroy(true);
				}
			}
			function zoomDragStart(e) {
				var $this = $(this);

				$this.removeClass('ani');

				$(document).on('touchmove.zmEvt mousemove.zmEvt', zoomDragMove);
				$(document).on('touchend.zmEvt mouseup.zmEvt', zoomDragEnd);

				_$layerZoom.data({'start': GALAXY.getEventPoint(e), 'startTime': +new Date});
				e.preventDefault();
			}
			function zoomDragMove(e) {
				var $this = $(this),
					startPos   = _$layerZoom.data('start'),
					movePos    = GALAXY.getEventPoint(e),
					delta = {
						x : movePos[0] - startPos[0] + _zoomDelta.x,
						y : movePos[1] - startPos[1] + _zoomDelta.y,
						t : +new Date - _$layerZoom.data('startTime'),
					};
					zoomMove(delta);

				e.preventDefault();
			}
			function zoomMove(delta, isEnd) {
				var thisIndex, patSide1, patSide2, maxW, maxH, marSize1, marSize2;

				thisIndex = _$layerList.index();

				patSide1 = parseInt(_$layerImageArea.css('paddingLeft'),10)+ parseInt(_$layerImageArea.css('paddingRight'),10);
				patSide2 = parseInt(_$layerImageArea.css('paddingTop'),10) + parseInt(_$layerImageArea.css('paddingBottom'),10);

				maxW = _$layerImage.width()  - _$layerZoom.outerWidth()  + patSide1;
				maxH = _$layerImage.height() - _$layerZoom.outerHeight() + patSide2;

				maxW *= _isRtl;

				if ( _isRtl == -1 ) {
					_zoomMoveDelta = {
						x: Math.max(Math.min(0, delta.x),maxW),
						y: Math.min(Math.max(0, delta.y),maxH)
					}
				} else {
					_zoomMoveDelta = {
						x: Math.min(Math.max(0, delta.x),maxW),
						y: Math.min(Math.max(0, delta.y),maxH)
					};
				}

				marSize1 = (parseInt(_$layerZoomImgs.css('marginLeft'),10)*2);
				marSize2 = (parseInt(_$layerZoomImgs.css('marginTop'),10)*2);

				_$layerZoomImgs._css({
					'translate3dX': -(_zoomMoveDelta.x/maxW) * (_$layerZoomImgs.width()-_$layerZoom.outerWidth() +marSize1) * _isRtl,
					'translate3dY': -(_zoomMoveDelta.y/maxH) * (_$layerZoomImgs.height()-_$layerZoom.outerHeight() +marSize2)
				});

				_$layerZoom._css({
					'translate3dX': _zoomMoveDelta.x,
					'translate3dY': _zoomMoveDelta.y
				});
				if ( isEnd ) {
					_zoomDelta = _zoomMoveDelta;
				}
			}
			function zoomDragEnd(e) {
				var $this = $(this),
					startPos   = _$layerZoom.data('start'),
					movePos    = GALAXY.getEventPoint(e);

				_zoomDelta = _zoomMoveDelta;

				$(document).off('.touchmove.zmEvt mousemove.zmEvt touchend.zmEvt mouseup.zmEvt');
				e.preventDefault();
			}
			function zoomKeymoveOn(e) {
				var delta = _zoomDelta;
				switch (e.keyCode) {
					case 37:
						delta.x = _zoomDelta.x - _$layerZoom.width()*.15;
						zoomMove(delta);
						break;
					case 38:
						delta.y = _zoomDelta.y - _$layerZoom.width()*.15;
						zoomMove(delta);
						break;
					case 39:
						delta.x = _zoomDelta.x + _$layerZoom.width()*.15;
						zoomMove(delta);
						break;
					case 40:
						delta.y = _zoomDelta.y + _$layerZoom.width()*.15;
						zoomMove(delta);
						break;
				}
			}
			function makeLayerLayout(layerId, title) {
				var Layer = [];
					Layer.push('<!-- layer - product image gallery -->');
					Layer.push('<div id="{LayerId}" class="m_layer-gallery _new"><div class="m_ly_inner">');
					Layer.push('	<span class="layer-title">Product Gallery Layer</span>');
					Layer.push('	<div class="m_ly_header">');
					Layer.push('		<h2 class="c_txt_ly-type1 heading">{title} <em class="color"></em></h2>');
					Layer.push('	</div>');
					Layer.push('	<div class="m_ly_contents">');
					// Layer.push('		{Contents}');
					Layer.push('	</div>');
					Layer.push('	<nav>');
					Layer.push('		<button type="button" class="c_btn_close-type1">Gallery Close</button>');
					Layer.push('	</nav>');
					Layer.push('</div></div>');
					Layer.push('<!-- // layer - product image gallery -->');
				Layer = Layer.join('\r\n');
				Layer = Layer.replace(/\{title\}/, title);
				Layer = Layer.replace(/\{LayerId\}/, layerId);
				$('body').append( Layer );
				return $('#'+layerId);
			}
			function makeLayerContent() {
				if ( !$layer.length ) return false;
				var $images = getItemList().find('img'),
					$imageButtons = getItemList().find('a'),
					$layerZoom,
					$layerZoomImages,
					$layerImages,
					$layerThumImages,
					i,
					lens = $images.length,
					$layerListBx = $layer.find('.m_ly_gallery'),
					$layerThumbBx = $layer.find('.m_ly_thumnail');

				if ( !$layer.find('.m_ly_contents').children().length ) {
					$layerListBx  = $('<div class="m_ly_gallery"><ul></ul></div>');
					$layerThumbBx = $('<div class="m_ly_thumnail"><ul></ul><span class="line"></span></div>');
					$layer.find('.m_ly_contents').append($layerListBx).append($layerThumbBx);

					var tmpHtml, _src, _alt;
					var $layerThumbBxUl = $layerThumbBx.find('ul');
					for (i=0; i<lens; i++) {
						_alt = $images[i].alt;
						_src = $images[i].src;
						tmpHtml  = '\n<li class="item-list'+(i+1)+'">';
						tmpHtml += '\n\t<figure>';
						tmpHtml += '\n\t\t<a href="#" class="zoom-area"><img src="" alt=""></a>';
						tmpHtml += '\n\t\t<a href="#zoom" class="zoom"><span class="zoombox"><img src="" alt="" /><span></span></span></a>';
						tmpHtml += '\n\t</figure>';
						tmpHtml += '\n</li>';

						$(tmpHtml).appendTo( $layerListBx.find('ul') );
						$('<li><a href="#"><img src="" alt=""></a></li>').appendTo( $layerThumbBxUl );
					}
					// $layerThumbBx.append('<span class="zoom-ctrl"><a href="#"><span></span>Zoom Off</a></span>');
				}

				$layerImages      = $layerListBx.find('a.zoom-area>img');
				$layerZoom        = $layerListBx.find('a.zoom');
				$layerZoomImages  = $layerZoom.find('img');
				$layerThumImages  = $layerThumbBx.find('img');

				// Event Binding
				$layerThumbBx.find('li>a').each(function(i) {
					var $this = $(this);
					var omni = $imageButtons.eq(i).attr('data-omni');

					if (omni&&omni.length) {
						$this.attr({'data-omni':omni})
							.off('click.tracking')
							.on('click.tracking',GALAXY.tracking);
					}

					$this.off('.thumb');

					if ( GALAXY.isMobile ) {
						$this.on({'touchstart.thumb': thumboxClick});
						$this.on({'focus.thumb': thumboxOver});
					} else {
						$this.on({'click.thumb': thumboxClick});
						$this.on({'mouseenter.thumb focus.thumb': thumboxOver, 'mouseleave.thumb blur.thumb' : thumboxOut });
					}
				});

				for (i=0; i<lens; i++) {
					$layerImages[i].src     = $images[i].src.replace(_regSizeModeImageName, '.jpg');
					$layerImages[i].alt     = $images[i].alt;
					$layerThumImages[i].src = $images[i].src.replace(_regSizeModeImageName, '_s.png');
					$layerThumImages[i].alt = $images[i].getAttribute('data-thum-alt');
					$layerZoomImages[i].src = $layerZoom.data('large')?$images[i].src.replace(_regSizeModeImageName, '_large.jpg'):$layerImages[i].src;
					$layerZoomImages[i].alt = $images[i].getAttribute('data-thum-alt');

					GALAXY.loadImage( $layerImages.eq(i), function() {
						resizeLayer();
					});
				}

				$layer.find('.m_ly_header>.heading>em.color').text( $btnColors.eq(_colorIndex).text() );

				var idx = getItemIndex(_itemsIndex);

				$layerListBx.find('li').removeClass('cur').eq( idx ).addClass('cur');
				$layerThumbBx.find('li>a').removeClass('cur').eq( idx ).addClass('cur');
			}
			init();
			return control;
		}

		function getSliderControl($section) {
			var $nav = $section.find('> nav'),
				$items = $section.children().not('nav, .fixedCont'),
				$slider = $items.wrapAll('<div style="height: 100%;" />').parent(),
				$prev = $nav.find('a[class*=-prev]'),
				$next = $nav.find('a[class*=-next]'),
				$pagingBox = $nav.find('[class^="m_paging_type"]'),
				$paging = [],
				controls = [],
				pagingOmnitureBase = $pagingBox.attr('data-omni'),
				pagingNameBase = $pagingBox.attr('data-alt'),
				pagingIsNumbering = $pagingBox.hasClass('numbering'),
				lastVisiblePercent = 0,
				lastVisibility = false,
				lastInvisibility = true,
				regThemeArrow = /m_btn_type([0-9]+)/,
				regThemePage = /m_paging_type([0-9]+)/,
				themeArrowDefault = 1,
				themePageDefault = 1,
				nowPage = -1,
				i = 0, numItems = $items.length,
				gaer360Swipe = GALAXY.swipeAble;

			if (regThemeArrow.test($prev.attr('class'))) {
				themeArrowDefault = parseInt($prev.attr('class').match(regThemeArrow)[1]);
			}
			if (regThemePage.test($pagingBox.attr('class'))) {
				themePageDefault = parseInt($pagingBox.attr('class').match(regThemePage)[1]);
			}
			if (pagingNameBase == undefined) {
				pagingNameBase = $section[0].parentNode.className.indexOf('m_content_sub') != -1 ? 'Sub Feature' : 'Feature';
			}
			pagingNameBase = pagingNameBase ? pagingNameBase +' ' : '';

			for (; i < numItems; i++) {
				$items[i] = $($items[i]).bind('tab-changed', setTheme);
				if (!pagingIsNumbering) {
					$paging[i] = $('<a href="#" data-page="'+ i +'"'+ (
						pagingOmnitureBase ? ' data-omni="'+ pagingOmnitureBase.replace('<no>', (i+1)) +'"' : '') +'><span>'+ pagingNameBase + (i+1) +'</span></a>')
						.click(changePage)
						.appendTo($pagingBox);
				}
				controls[i] = createControls($($items[i]));
			}
			if (pagingIsNumbering) {
				$paging = $('<span />').appendTo($pagingBox);
			}
			if ( $section.hasClass('m_content-slider') ) {
				$section.each(function() {
					if ( $(this).hasClass('videos') ) {
						$(this).find('.m_paging_type2 a').each(function() {
							var index = $(this).index();
							$(this).attr('data-omni', ':banner_left:index_' + (index + 1));
						});
					} else if ( $(this).hasClass('banners') ) {
						$(this).find('.m_paging_type2 a').each(function() {
							var index = $(this).index();
							$(this).attr('data-omni', ':banner_right:index_' + (index + 1));
						});
					}
				});
			}
			if ($section.attr('id') == 'quality') gaer360Swipe = false;

			$slider.xlider({
				swipe: gaer360Swipe,
				onChange: setButtons,
				endless: $('.main_contents').find($section),
				onChangeEnd: setVisibles
			});
			$prev.click(function() {
				$slider.xlider('prev');
				return false;
			});
			$next.click(function() {
				$slider.xlider('next');
				return false;
			});
			setButtons(0);


			function changePage() {
				var page = parseInt(this.getAttribute('data-page'));
				$slider.xlider('jump', page);
				return false;
			}

			function setButtons(_nowPage) {
				nowPage = _nowPage;
				if (pagingIsNumbering) {
					$paging.html((nowPage+1) +'/'+ numItems);
				} else{
					for (i = 0; i < numItems; i++) {
						$paging[i].decideClass('on', i == nowPage);
					}
				}
				if ( ! $('.main_contents').find($section) ) {
					$prev.decideClass('hide', !nowPage);
					$next.decideClass('hide', nowPage == numItems-1);
				}
				setTheme();
				$section.trigger('xlider-changed', {page: nowPage});
			}

			function setTheme() {
				if (0 > nowPage) {
					return;
				}
				var $currentItem = controls[nowPage].name == 'tab' ? controls[nowPage].getCurrentItem() : $items[nowPage],
					themeArrow = $currentItem.attr('data-theme-arrow') || themeArrowDefault,
					themePage = $currentItem.attr('data-theme-page') || themePageDefault;
				$prev.attr('class', $prev.attr('class').replace(regThemeArrow, 'm_btn_type'+ themeArrow));
				$next.attr('class', $next.attr('class').replace(regThemeArrow, 'm_btn_type'+ themeArrow));
				$pagingBox.attr('class', $pagingBox.attr('class').replace(regThemePage, 'm_paging_type'+ themePage));
			}

			function setVisibles() {
				setParallax(lastVisiblePercent);
				setVisible(lastVisibility);
				setInvisible(lastInvisibility);
				for (i = 0; i < numItems; i++) {
					i != nowPage && controls[i].resetVideo();
				}
			}

			function setParallax(visiblePercent) {
				lastVisiblePercent = visiblePercent;
				for (var i = 0; i < numItems; i++) {
					controls[i].setParallax(visiblePercent);
				}
			}

			function setVisible(visible) {
				lastVisibility = visible;
				for (var i = 0; i < numItems; i++) {
					controls[i].setVisible(i == nowPage ? visible : false);
				}
			}

			function setInvisible(invisible) {
				lastInvisibility = invisible;
				for (var i = 0; i < numItems; i++) {
					controls[i].setInvisible(2 >Math.abs(nowPage-i) ? invisible : true);
				}
			}

			return {
				name: 'slider',
				resetVideo: function() {
					for (var i = 0; i < numItems; i++) {
						controls[i].resetVideo();
					}
				},
				setSizeMode: function(sizeMode) {
					for (var i = 0; i < numItems; i++) {
						controls[i].setSizeMode(sizeMode);
					}
				},
				setParallax: setParallax,
				setVisible: setVisible,
				setInvisible: setInvisible
			}

		}

		function getTabControl($section) {

			var $nav = $section.find('> nav'),
				$items = $section.children().not($nav),
				$tabs = $nav.find('a'),
				$itemHeaders = [],
				controls = [],
				lastVisibility = false,
				lastInvisibility = true,
				lastZIndex = 0,
				nowIndex = -1,
				isNewTabModule = $nav[0].className.indexOf('c_tab2-') != -1,
				isFirst = true,
				i = 0, numItems = $items.length;


			for (; i < numItems; i++) {
				$items[i] = $($items[i]);
				if (isNewTabModule) {
					$itemHeaders[i] = $items[i].find('[class*="f_header-"]');
				}
				controls[i] = createControls($items[i]);
			}
			$tabs.click(tabChange).eq(0).click();


			function tabChange() {
				var index = $tabs.index(this),
					i = 0;
				if (index != nowIndex) {
					nowIndex = index;
					$items[index].css({left: 0, zIndex: ++lastZIndex});
					if (!isPoorBrowser) {
						$items[index].css({opacity: 0})
							.animate({opacity: 1}, {queue: false, duration: 500, easing: 'easeInOutQuad', complete: setVisibles});
							if (!isFirst&&$.browser.firefox) {
								setVisibles();
							}
					}
					$nav.css('zIndex', lastZIndex+1);
					$tabs.removeClass('on').eq(index).addClass('on');
					$section.trigger('tab-changed');
					resize(GALAXY.sizeMode, !isFirst);
					if (isFirst) {
						$nav.show();
						isFirst = false;
					}
				}
				return false;
			}

			function setVisibles() {
				setVisible(lastVisibility);
				setInvisible(lastInvisibility);
			}

			function setVisible(visible) {
				lastVisibility = visible;
				for (var i = 0; i < numItems; i++) {
					controls[i].setVisible(i == nowIndex ? visible : false);
				}
			}

			function setInvisible(invisible) {
				lastInvisibility = invisible;
				for (var i = 0; i < numItems; i++) {
					controls[i].setInvisible(i == nowIndex ? invisible : true);
				}
			}

			function resize(sizeMode, animate) {
				for (var i = 0; i < numItems; i++) {
					controls[i].setSizeMode(sizeMode);
				}
				if (isNewTabModule) {
					$nav['_'+ (isPoorBrowser || animate !== true ? 'css' : 'animate')]({top: $itemHeaders[nowIndex][0].offsetTop+$itemHeaders[nowIndex][0].offsetHeight},
						{duration: 500, easing: 'easeInOutCubic'});
				}
			}

			return {
				name: 'tab',
				getCurrentItem: function() {
					return $items[nowIndex];
				},
				resetVideo: function() {
					for (var i = 0; i < numItems; i++) {
						controls[i].resetVideo();
					}
				},
				setSizeMode: resize,
				setParallax: function(visiblePercent) {
					for (var i = 0; i < numItems; i++) {
						controls[i].setParallax(visiblePercent);
					}
				},
				setVisible: setVisible,
				setInvisible: setInvisible
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
				imageSources[i] = GALAXY.getImageSources($images[i]);

				videos[i] = GALAXY.setVideoControl($figures[i], $article);
				hasVideo = hasVideo || videos[i];

				isParallaxVideo = isParallaxVideo || $figures[i].attr('data-parallax-video');

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

			hello = $article.data('hello');
			if (!hello) {
				hello = [];
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
					$parallaxs[i][0].style[transformName] = [
							'scale(', properties.s !== undefined ? properties.s : 1, ', ', properties.s !== undefined ? properties.s : 1, ')', ' ',
							'translate3d(', properties.x || 0, 'px, ', properties.y || 0, 'px, 0)'
						].join('');
					if (properties.a !== undefined) {
						$parallaxs[i][0].style.opacity = properties.a;
					}
				}
			}

			function resetVideo() {
				hasVideo && $article.trigger('video-reset');
			}

			return {
				name: 'article',
				resetVideo: resetVideo,
				setSizeMode: function(sizeMode) {
					for (var newSrc, i = 0, max = $figures.length; i < max; i++) {
						newSrc = ''+imageSources[i][sizeMode];
						if ($images[i][0] && $images[i][0].src && ($images[i][0].src.indexOf(newSrc.replace('./','')) == -1)) {
							$images[i][0].src = GALAXY.setMediaBaseURL(newSrc);
						}
						if (hasVideo) {
							$article.trigger('video-change');
							if (3 > sizeMode && !videoHided) {
								$article.trigger('video-hide');
								videoHided = true;
							} else if (sizeMode > 2) {
								if (videoHided) {
									$article.trigger('video-show');
									videoHided = false;
								} else {
									if (GALAXY.prevSizeMode!==sizeMode) {
										$article.trigger(isKeyvisual ? 'video-play-kv' : 'video-play');
									}
								}
							}
						}
					}
				},

				setParallax: function(visiblePercent) {
					var i, j, max, valueTo, sizeMode;
					if (parallaxAble) {
						visiblePercent = Math.max(0, visiblePercent, Math.min(1, visiblePercent));
						sizeMode = GALAXY.sizeMode;
						$parallaxer._stop();
						if (3 > sizeMode) {
							for (i = 0, max = $parallaxs.length; i < max; i++) {
								for (j = 0; j < parallaxs[i].length; j++) {
									parallaxs[i][j][2] = 0;
								}
								$parallaxs[i][0].style[transformName] = $parallaxs[i][0].style.opacity = '';
							}
						} else {
							for (i = 0, max = $parallaxs.length; i < max; i++) {
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
									}
								}
							}
							$parallaxer[0].p = 0;
							$parallaxer._animate({p: 1}, parallaxAnimateOption);
						}


						if ((hasVideo && !videoHided && isParallaxVideo && visiblePercent && 1 > visiblePercent)) {
							$article.trigger('video-parallax', visiblePercent);
						}

					}
				},

				setVisible: function(_visible) {
					if (_visible) {
						if (!show) {
							$article.addClass('show');
							show = true;
						}
						if (!visible) {
							$article.addClass('visible').trigger('visible');
							visible = true;
						}
						if (hasVideo && !videoPlaying && !isParallaxVideo) {
							$article.trigger(isKeyvisual ? 'video-play-kv' : 'video-play');
							videoPlaying = true;
						}
					} else {
						if (visible) {
							$article.removeClass('visible');
							visible = false;
						}
						/*
						if (hasVideo && videoPlaying && !isParallaxVideo) {
							$article.trigger(isKeyvisual ? 'video-pause-kv' : 'video-pause');
							videoPlaying = false;
						}
						*/
					}
				},

				setInvisible: function(_invisible) {
					if (_invisible) {
						if (!invisible) {
							if (hasVideo && videoPlaying && !isParallaxVideo) {
								$article.trigger(isKeyvisual ? 'video-pause-kv' : 'video-pause');
								videoPlaying = false;
							}

							if (hello.length) {
								$.each(hello, function(i) {
									//console.log('linetype : '+this.linetype);
									if (this.linetype === undefined || this.linetype == '') {
										if ($article.hasClass(this.css)) {
											if (typeof(this.off)=='function') {
												this.off(this.$elementTop);
											}
											$article.removeClass(this.css);
										}
									}
									//console.log('hello: off');
								});
							}
							$article.addClass('invisible').trigger('inactive').trigger('invisible');
							resetVideo();
							invisible = true;
							this.updateHelloPosition();
						}
					} else {
						if (invisible) {
							$article.removeClass('invisible').trigger('active');
							invisible = false;
						} else {
							if (welcome) {
								$article.trigger('active');
							}
						}
						if (welcome) {
							$article.trigger('welcome');
							welcome = false;
						}
						this.updateHelloPosition();
					}

					if (!invisible) {
						this.checkHello();
					}



				},

				updateHelloPosition: function() {
					if (hello.length) {
						$.each(hello, function() {
							this.helloTop = this.$elementTop.offset().top;
							this.helloBottom = this.$elementBottom.offset().top + this.$elementBottom.height();
							if (this.$elementReset.length == 1) {
								this.helloReset = this.$elementReset.offset().top;
							}

							this.viewportHeight = $(window).height();
						});
					}
				},

				checkHello: function() {
					if (hello.length) {
						$.each(hello, function(i) {
							var baseLine = ((''+this.baseLine).toLowerCase().indexOf('px')>-1)
												? parseInt(this.baseLine)
												: this.viewportHeight/parseInt(this.baseLine,10);

							/*
							console.log($article);
							console.log('GALAXY.scrollTop: '+GALAXY.scrollTop);
							console.log('this.viewportHeight: '+this.viewportHeight);
							console.log('baseLine: '+baseLine);
							console.log(this);
							console.log(this.helloTop<GALAXY.scrollTop+this.viewportHeight-baseLine);
							console.log(this.helloBottom>GALAXY.scrollTop+baseLine);
							*/

							var subNsvH = $('#subnav').height();
							var $helloSec = this.$elementTop.closest('section[class^="m_"]');
							if ($helloSec.find('> article').length > 1) {
								$helloSec = this.$elementTop.closest('article[class^="m_"]');
							}
							var bottomLine = $helloSec.offset().top + $helloSec.outerHeight();
							

							if (this.linetype === undefined || this.linetype == '') {
								if (this.helloTop<GALAXY.scrollTop+this.viewportHeight-baseLine
									&&this.helloBottom>GALAXY.scrollTop+baseLine) {
									if (!$article.hasClass(this.css)) {
										$article.addClass(this.css);
										//console.log('hello: hello');
										if (typeof(this.on)=='function') {
											this.on(this.$elementTop);
										}
									}
									//console.log('hello: on');
								}
							} else {
								if (this.helloTop<GALAXY.scrollTop+subNsvH) {
									if (!$article.hasClass(this.css)) {
										$article.addClass(this.css);
										if (typeof(this.on)=='function') {
											this.on(this.$elementTop);
										}
									}
								} else if (this.helloReset>GALAXY.scrollTop+this.viewportHeight-baseLine) {
									if ($article.hasClass(this.css)) {
										$article.removeClass(this.css);
										if (typeof(this.off)=='function') {
											this.off(this.$elementTop);
										}
									}
								} else if (bottomLine < GALAXY.scrollTop + $(window).height()) {
									if (!$article.hasClass(this.css)) {
										$article.addClass(this.css);
										if (typeof(this.on)=='function') {
											this.on(this.$elementTop);
										}
									}
								}
							}
						});
					}
				}

			}

		}

		function scroll(scrollTop, maxScrollTop) {

			var sizeMode = GALAXY.sizeMode,
				areaHeight = GALAXY.areaHeight,
				blockTop, blockHeight,
				visibleSize, visibleHeight, visiblePercent, visibleBase,
				i = 0, j, jmax;

			for (; i < numBlocks; i++) {
				blockTop = !i ? $($blocks[i]).offset().top-scrollTop : $blocks[i][0].getBoundingClientRect().top;

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

					visibleBase = Math.min(blockHeight*0.66, GALAXY.areaHeight*0.66);
					visibleHeight = Math.min(areaHeight, 0 >= blockTop ? blockHeight+blockTop : Math.min(blockHeight, areaHeight-blockTop));
					controls[i].setVisible(visibleHeight >= visibleBase);

					if (!i) {
						controls[i].setInvisible(visibleSize > 1);
					} else {
						controls[i].setInvisible(0 > visibleSize || visibleSize > 1);
					}
				}

			}

			keyvisual.scroll && keyvisual.scroll(scrollTop);

		}

		function resize() {

			var i = 0, sizeMode = GALAXY.sizeMode;

			for (; i < numBlocks; i++) {
				controls[i].setSizeMode(sizeMode);
			}

			keyvisual.resize(sizeMode);

		}

		return {
			scroll: scroll,
			resize: resize
		}

	},

	footer: function() {

		if (!$('#footer').length) {
			return;
		}

		var $document = $(document.documentElement),
			$footer = $('#footer'),
			$moreButton = $footer.find('a.c_btn_type3-more'),
			$moreContents = $footer.find('div.f_more_content'),
			$colors = $footer.find('div.f_colors a'),
			supporOpacity = $.support.opacity,
			topButton = null,
			toTopDuration = $.browser.mobile ? 350 : 750,
			moreOpened = false,
			$focusinput = $('.seachArea .addsearch'),
			$btnlink = $('.sitemap h2, .footerMenu h2'),
			$btnlinkArea = $('.sitemap .linkArea > strong, .footerMenu .linkArea > strong'),
			$baseContentsArea = $('#wrap'),
			$baseContentsClickable = null;

		$moreButton.keydown(function(e) {
			if (e.keyCode==13) {
				$(this).data('keydown', 'Y');
			}
		}).click(toggleMore);
		$colors.click(function() {
			var highContrastMode = this.title.toLowerCase().indexOf('high contrast') != -1;
			$document.decideClass('color_yb', highContrastMode);
			$._cookie.set('highContrastMode', highContrastMode ? 1 : 0, 1, '/');
			return false;
		});
		$footer.find('a.c_btn_type3-top').click(toTop);
		$footer.find('.f_social_share a').click(GALAXY.sharing);

		var customizeAddsearch = setInterval(function() {
			var $list = $('#addsearch-results');
			if (window.addsearch&&$list.get(0)) {
				$list.appendTo('.addsearch-body');
				clearInterval(customizeAddsearch);
				addsearch.keydown = addsearch.tabKeydown = function(e){};
			}
		}, 100);

		$focusinput.focus(function () {
			if ($('html').hasClass('s1 mobile')) {
				$(this).blur();
			}
		});

		$btnlink.on('click', function () {
			var $parents = $(this).parents('section');
			if ($('html').hasClass('s1')) {
				if (!$(this).parent().hasClass('view')) {
					if (!$parents.find('.view').hasClass('first')) {
						$parents.find('.view > ul.linkIn').stop().slideUp(500);
					} else {
						$parents.find('.view > div.mobileDev').stop().slideUp(500);
					}
					$parents.find('.view').removeClass('view');
					if (!$(this).parent().hasClass('first')) {
						$(this).parent().addClass('view');
						$parents.find('.view > ul.linkIn').stop().slideDown(500);
					} else {
						$(this).parent().addClass('view');
						$parents.find('.view .mobileDev').stop().slideDown(500);
					}
				} else {
					if (!$(this).parent().hasClass('first')) {
						$parents.find('.view > ul.linkIn').stop().slideUp(500, function () {
							$parents.find('.view').removeClass('view');
						});
					} else {
						$parents.find('.view .mobileDev').stop().slideUp(500, function () {
							$parents.find('.view').removeClass('view');
						});
					}

				}
			}
			return false;
		});
		$btnlinkArea.on('click', function () {
			var $parents = $(this).parents('section');
			if ($('html').hasClass('s1')) {
				if (!$(this).parent().hasClass('viewIn')) {
					$parents.find('.view.first .viewIn > ul').stop().slideUp(500);
					$parents.find('.view.first .viewIn').removeClass('viewIn');
					$(this).parent().addClass('viewIn');
					$parents.find('.view.first .viewIn > ul').stop().slideDown(500);
				} else {
					$parents.find('.view.first .viewIn > ul').stop().slideUp(500, function () {
						$parents.find('.view.first .viewIn').removeClass('viewIn');
					});
				}
			}
			return false;
		});

		topButton = (function() {

			$('#contents').append('<div class="f_backtotop"><span><a href="#contents" tabindex="-1" data-omni=":floating_toptobottom" data-omni-type="microsite"><span>Down</span></a></span></div>');

			var $button = $('div.f_backtotop a'),
				$keyvisual = $('#kv, #kv-type2'),
				hasKeyVisual = !!$keyvisual.length,
				rotateBaseTop = 250,
				rotated = false,
				hidden = false;

			if ($('#wrap').attr('data-no-topbutton')) {
				$('div.f_backtotop').remove();
				return null;
			}

			if (!hasKeyVisual) {
				$button.addClass('rotate').html('<span>Back to</span> top of page');
				$button.addClass('hide');
				rotated = true;
			}

			$button.keydown(function(e) {
				if (e.keyCode==13) {
					$(this).data('keydown', 'Y');
				}
			}).click(function() {
				if ($(this).data('keydown')!='Y') {
					if (!hidden) {
						if (rotated) {
							toTop();
						} else {
							var t = $keyvisual[0].offsetHeight;
							// console.log($keyvisual[0].offsetHeight + $keyvisual.offsetTop);
							if ( $('#wrap').hasClass('subnav-type1') ) {
								t += 25;
							}
							GALAXY.setSmoothScrollTop(t, toTopDuration);
						}
						$(this).blur();
					}
					return false;
				}
				$(this).data('keydown', 'N');
			}).focus(function(e) {
				$(this).blur();
			});

			return {
				scroll: function(v, maxv) {
					var footerHeight = $footer[0].offsetHeight + (moreOpened ? 0 : 30);
					if (v > rotateBaseTop && !rotated) {
						hasKeyVisual ? $button.addClass('rotate').html('<span>Back to</span> top of page') : $button.css({display:'block'}).removeClass('hide');
						rotated = true;
						$button.attr('data-omni',':backtotop');
					} else if (rotateBaseTop >= v && rotated) {
						if (hasKeyVisual) {
							$button.removeClass('rotate').html('<span>Down</span>');
							$button.attr('data-omni',':toptobottom');
						} else {
							$button.addClass('hide');
							setTimeout(function() {
								if ($button.hasClass('hide')) {
									$button.css({display:'none'});
								}
							}, 450);
						}
						rotated = false;
					}
					if (maxv-footerHeight > v && hidden) {
						$button.css({display:'block'}).removeClass('hide');
						hidden = false;
					} else if (v >= maxv-footerHeight && !hidden) {
						$button.addClass('hide');
						setTimeout(function() {
							if ($button.hasClass('hide')) {
								$button.css({display:'none'});
							}
						}, 450);
						hidden = true;
					}
				}
			}

		})();

		function toTop() {
			GALAXY.setSmoothScrollTop(0, toTopDuration);
			return false;
		}


		function toggleMore() {
			if (!moreOpened) {
				$moreButton.removeClass('on').text('Close').attr('data-omni', ':footer_more');
				$moreContents.show();
				if (supporOpacity) {
					$moreContents.stop().hide().slideDown({queue: false, duration: 500, easing: 'easeOutCubic', step: function(v, a) {
						$moreContents.css('opacity', a.now/a.end);
						// GALAXY.setScrollTop(100000);
					}});
					setTimeout(function () {
						GALAXY.setSmoothScrollTop($('#footer-sitemap').offset().top - $('#subnav').height(), 750);
					}, 250);

				} else {
					$moreContents.show();
					GALAXY.setScrollTop(100000);
				}
				if ($(this).data('keydown')=='Y') {
					$baseContentsClickable = $baseContentsArea.find('a,input,select,textarea,button,video,iframe').not('.c_btn_type3-more').not('#terms-and-conditions a');
					$baseContentsClickable.each(function() {
						var tabindex = $(this).attr('tabindex');
						if (tabindex!==undefined&&tabindex!==null) {
							$(this).data('prev-tabindex', tabindex);
						}
						$(this).attr('tabindex','-1');
					});
				}
				moreOpened = true;
				try {
					location.hash = $moreButton.attr('href').split('#')[1];
				} catch(e){}
			} else {
				$moreButton.addClass('on').text('More').attr('data-omni', ':footer_close');
				if (supporOpacity) {
					$moreContents.slideUp({queue: false, duration: 250, easing: 'easeOutCubic', step: function(v, a) {
						$moreContents.css('opacity', a.now/a.start);
					}});
				} else {
					$moreContents.hide();
				}
				if ($(this).data('keydown')=='Y'&&$baseContentsClickable&&$baseContentsClickable.length) {
					$baseContentsClickable.each(function() {
						var tabindex = $(this).data('prev-tabindex');
						if (tabindex!==undefined&&tabindex!==null) {
							$(this).attr('tabindex',tabindex);
						} else {
							$(this).removeAttr('tabindex');
						}
					});
				}
				moreOpened = false;
				GALAXY.setHash('');
			}
			$(this).data('keydown', 'N');
			return false;
		}

		function scroll(v, maxv) {
			topButton && topButton.scroll(v, maxv);
		}

		function resize(v, maxv) {
			if(!$('html').hasClass('s1')){
				$('.mobileDev, .linkArea ul, .linkIn').stop(true).removeAttr('style');
				$('.linkArea').removeClass('viewIn');
				$('.sitemap article').removeClass('view');
				$('.footerMenu article').removeClass('view');
			}
		}

		return {
			scroll: scroll,
			resize: resize
		}

	},

	setVideoControl: function($figure, $article, $cover) {
		var $video = null,
			source = '',
			setVideoimg = $figure.find('.setting-img'),
			isKeyvisual = ($article.attr('class') || '').indexOf('-kv') != -1,
			ready = false,
			tryToPlay = false,
			coverHided = false,
			videoHided = false,
			preferWebm = false,
			justOne = true,
			tweener = null,
			invisible = true,
			duration = 0,
			sizeMode = 0,
			noneplay = $figure.attr('data-none-play'),
			autoplayText = '',
			coverImg = $figure.attr('data-set-img'),
			newVideo = $figure.attr('data-media-v4') || $figure.attr('data-media-v4-mp4'),
			topVideo = $figure.attr('data-top-video'),
			canvasLoop = $figure.attr('data-canvas-loop'),
			isParallaxVideo = $figure.attr('data-parallax-video') || false,
			mobileCheck = GALAXY.isMobile;

		var $coverbg;

		
		if (newVideo != undefined) {
			mobileCheck = false;
		}
		if ((10 > $.browser.ie) || mobileCheck || GALAXY.isPoorNetwork) {
			if ($figure.attr('data-forced-network-speed')!='H') {
				if ($cover == undefined) {
					removeReady();
					return false;
				}
			}
		}
		if ($cover == undefined) {
			$cover = $figure.find('img:not(".setting-img")');
		}


		source = $figure.attr('data-media-video')
				|| $figure.attr('data-media-video-mp4')
				|| $figure.attr('data-media-v4')
				|| $figure.attr('data-media-v4-mp4');
		if (newVideo != undefined) {
			source = newVideo;
			var isCount = 0;
			$(document).on('touchstart', function () {
				if (isCount == 0) {
					isCount = 1;
					if ((newVideo != undefined) && GALAXY.oldIos && GALAXY.isMobile) {
						$('video').each(function () {
							$(this)[0].load();
						});
					} else {
						$('video').each(function () {
							$(this)[0].play();
						});
					}
				}
			});
		}

		if (!source) {
			return false;
		}
		if (noneplay === undefined) {
			autoplayText = ' autoplay'
		}
		if ( isParallaxVideo ) {
			noneplay = 'none';
		}
		//var sourceURL = GALAXY.setMediaBaseURL(source);
		source = $figure.attr('data-media-video') || $figure.attr('data-media-v4');
		var mp4URL = $figure.attr('data-media-video-mp4') || $figure.attr('data-media-v4-mp4') || (source ? source+'.mp4' : '');
		var webmURL = $figure.attr('data-media-video-webm') || $figure.attr('data-media-v4-webm') || (source ? source+'.webm' : '');
		var ogvURL = $figure.attr('data-media-video-ogv') ||$figure.attr('data-media-v4-ogv') || (source ? source+'.ogv' : '');

		source = {
			mp4: (mp4URL!='') ? '<source src="'+ mp4URL +'" type="video/mp4">' : '',
			webm: (webmURL!='') ? '<source src="'+ webmURL +'" type="video/webm">' : '',
			ogv: (ogvURL!='') ? '<source src="'+ ogvURL +'" type="video/ogg">' : ''
		}
		// if ( isParallaxVideo && mobileCheck) {
		// 	source.mp4 = '<source src="'+ sourceURL +'_mobile.mp4" type="video/mp4">'
		// }
		preferWebm = $figure.attr('data-video-prefer-webm');

		if ((newVideo != undefined) && GALAXY.oldIos && GALAXY.isMobile) {
			$canvers = $figure.append('<canvas class="canvas"></canvas>');
		}

		// if ($.browser.android) preferWebm = true;
		var strPreload = $figure.data('parallax-video') ? '' : ' preload="auto" ';

		var videoLoadCheckInterval;
		var videoPlayCheck;
		var videoPlayBack;
		var playOnce = ($figure.data('play-once')===true) ? true : false;
		$video = $([
			'<video '+strPreload+'muted playsinline' , $.browser.firefox ? autoplayText : '', ' ', $figure.attr('data-video-setting'), '>',
				preferWebm ? source.webm : source.mp4,
				preferWebm ? source.mp4 : source.webm,
				source.ogv,
			'</video>'].join(''))
			.bind({
				play: function() {
					if (invisible && newVideo == undefined) {
						$video[0].pause();
						$video[0].currentTime = 0;
					} else {
						if (topVideo == undefined) {
							$video[0].play();
						}
					}
				},
				playing: function() {
					if (justOne && (newVideo != undefined) && !GALAXY.oldIos && GALAXY.isMobile) {
						justOne = false;
						clearInterval(videoPlayCheck);
						videoPlayCheck = setInterval(function() {
							if ($video[0].currentTime > 0.5) {
								clearInterval(videoPlayCheck);
								$video[0].pause();
								$video[0].currentTime = -0.1;
								$($video[0]).closest('figure.android').addClass('android-ready');
								videoPlayBack = setInterval(function() {
									if ($video[0].currentTime == 0 || $video[0].currentTime < 0) {
										clearInterval(videoPlayBack);
										hideBg();
									}
								}, 100);
							}
						}, 100);
					} else if (!GALAXY.isMobile) {
						$video[0].play();
						hideBg();
					}
				},
				canplay: function() {
					if (!ready) {
						ready = true;
						duration = this.duration;
						if (mobileCheck) {
							!isKeyvisual && GALAXY.sizeMode > 2 && hideCover();
						}
						tryToPlay && play();
					}
					if (justOne && (newVideo != undefined) && !GALAXY.oldIos && GALAXY.isMobile) {
						if ($figure.data('dont-play')!==true) {
							$video[0].play();
						}
					} 
					removeReady();
				},
				ended: function() {
					$video.addClass('playend');
				},
				error: function() {
					removeReady();
				}
			})
			.insertBefore($cover);

		// if ( $figure.data('preload-steel') ) {
		// 	videoLoadReady = false;
		// 	videoLoadCheckInterval = setInterval(function() {
		// 		if ($video.prop('readyState')) {
		// 			var buffered = $video.prop('buffered').end(0);
		// 			if ( buffered >= $video[0].duration ) {
		// 				clearInterval( videoLoadCheckInterval );
		// 				videoLoadReady = true;
		// 				changSrc();
		// 				if ( $video.closest('article').hasClass('visible') ) {
		// 					$video[0].pause();
		// 					$video[0].currentTime = 0;
		// 					$video[0].play();
		// 				}
		// 			}
		// 		}
		// 	},500);
		// } else {
		// 	videoLoadReady = true;
		// }
		if (($figure.attr('data-cover') !== undefined) && ($('html').hasClass('sH'))) {
			if ((10 > $.browser.ie) && ($.browser.ie !== undefined)) {
				return false;
			}
			$("<span class='hide-bg'><img src='" + $figure.attr('data-cover') + "' alt=''></span>").appendTo($figure);
			$coverbg = $figure.find('.hide-bg');
			$coverbg.on('click', function () {
				$video[0].play();
			});
		}

		if (!GALAXY.oldIos && GALAXY.isMobile) {
			$video.on('click', function () {
				$video[0].play();
			});
		}
		var canvasVideo;
		setTimeout(function() {
			if ((newVideo != undefined) && GALAXY.oldIos && GALAXY.isMobile) {
				canvasVideo = new CanvasVideoPlayer({
					videoSelector  : $video,
					canvasSelector : $figure.find('canvas'),
					loop           : (canvasLoop == 'loop'),
					// clickAble      : $figure.data('clickAble')
				});
				$figure.find('canvas').data('canvasVideo', canvasVideo);
				if ( !$figure.data('clickAble') ) {
					$figure.append('<div class="canvas-clickable"></div>');
				}
			} else if (newVideo == undefined) {
				if ( !$video.data('loaded') ) {
					$video.data('loaded', true);
					$video[0].load();
				}
			}
		}, 100);
		$article.bind({
			'visible'		: articleVisible,
			'invisible'		: articleInVisible,
			'video-play'	: play,
			'video-pause'	: pause,
			'video-reset'	: reset,
			'video-show'	: show,
			'video-hide'	: hide,
			'video-change'	: changSrc,
			'video-parallax': parallax
		});
		function articleVisible() {
			invisible = false;
			if($figure.data('play-once')===true && $figure.find('video').hasClass('playend')){
				return;
			}else{
				if ((newVideo != undefined) && GALAXY.oldIos && GALAXY.isMobile) {
					coverHided = false;
					videoHided = true;
					if (noneplay != 'none') {
						canvasVideo && canvasVideo.play();
					} 
				} else if ((newVideo != undefined) && !GALAXY.oldIos) {
					coverHided = true;
					videoHided = false;
					if ((noneplay != 'none') && ($(this).find('video').length > 0)) {
						$(this).find('video')[0].play();
					}
				/*else if (newVideo != undefined) {
					coverHided = true;
					videoHided = false;
					if (noneplay != 'none') {
						$(this).find('video')[0].play();
					}
				*/
				}
				else {
					if (newVideo != undefined || GALAXY.sizeMode < 3 ) {
						coverHided = true;
						videoHided = false;
					} else {
						coverHided = false;
						videoHided = false;
					}
				}
			}

		}
		function articleInVisible() {
			invisible = true;
			if ((newVideo != undefined) && $(this).find('video').length > 0 && $('html').hasClass('firefox')) {
				$(this).find('video')[0].pause();
				$(this).find('video')[0].currentTime = 0;
			}
			if ((newVideo != undefined) && GALAXY.oldIos && GALAXY.isMobile) {
				canvasVideo && canvasVideo.stop();
			}
		}

		function removeReady() {
			if(setVideoimg) {
				setVideoimg.remove();
			}
		}

		function play() {
			tryToPlay = true;
			if (ready && !videoHided && (noneplay != 'none')) {
				hideCover();
				videoPlay();
			}
		}

		function videoPlay() {
			if (!$video.hasClass('playend')) {
				$video.css('opacity', '')[0].play();
				coverHided = false;
			}
		}

		function hideCover() {
			if (ready && !coverHided) {
				$cover.css('visibility', 'hidden');
				$video.css('visibility', '');
				coverHided = true;
			}
		}
		function hideBg() {
			if ($figure.find('.hide-bg').length > 0) {
				$coverbg._css({'opacity':'0'});
			}

		}

		function pause() {
			tryToPlay = false;
			ready && $video[0].pause();
		}

		function reset() {
			if (ready) {
				if(!playOnce){
					$video[0].pause();
					$video[0].currentTime = 0;
					$video.removeClass('playend');
				}
			}

		}

		function show() {
			hideCover();
			ready && tryToPlay && videoPlay();
			videoHided = false;
		}

		function hide() {
			if (newVideo == undefined) {
				if (coverHided || GALAXY.sizeMode<3) {
					$video[0].pause();
					$cover.css('visibility', '');
					$video.css('visibility', 'hidden');
					coverHided = false;
					videoHided = true;
				}
			} else {
				videoHided = false;
			}
		}

		function changSrc() {
			if (newVideo != undefined) {
				var getVideoSources = function($figure) {
					var s4 = $figure.attr('data-media-v4'),
						s3 = $figure.attr('data-media-v3') || s4,
						s2 = $figure.attr('data-media-v2') || s3,
						s1 = $figure.attr('data-media-v1') || s2;
					return [null, s1, s2, s3, s4];
				}
				var _sizeMode = GALAXY.sizeMode;
				if (_sizeMode != sizeMode ) {
					sizeMode = _sizeMode;
					if (getVideoSources($figure)[sizeMode] == 'none' || getVideoSources($figure)[sizeMode] == 'NONE') {
						$video[0].pause();
						$cover.css('visibility', '');
						$video.css('visibility', 'hidden');
						coverHided = false;
						videoHided = true;
					} else {
						$video[0].pause();
						$cover.css('visibility', 'hidden');
						$video.css('visibility', '');
						var createSources = '<source src="' + getVideoSources($figure)[sizeMode] + '.mp4" type="video/mp4"><source src="'+ getVideoSources($figure)[sizeMode] +'.webm" type="video/webm"><source src="'+ getVideoSources($figure)[sizeMode] +'.ogv" type="video/ogg">'
						$video.innerHTML = createSources;

						if ($video.get(0) && $video[0].readyState<4 && !$video.data('loaded') ) {
							$video.data('loaded', true);
							$video[0].load();
						}
						coverHided = false;
						videoHided = true;
					}

				}
			}
		}

		var $videoParallaxer = $({currentTime: 0});

		function parallax(e, visiblePercent) {
			if (ready) {
				visiblePercent = Math.max(0, Math.min(1, (visiblePercent*1.25)-0.125));
				if ( $video.length && !!$video[0].duration ) {
					$videoParallaxer._animate(
						{currentTime: visiblePercent*$video[0].duration},
						{queue: false, duration: 850, bystep: false, rounding: false, easing: 'easeOutCubic', step: function(v) {
							if ( newVideo != null && canvasVideo != null ) {
								canvasVideo.video.currentTime = v.currentTime;
							} else {
								$video[0].currentTime = v.currentTime;
							}
							$videoParallaxer[0].currentTime = v.currentTime;
						}}
					);
				}

				// tweener && tweener.kill();
				// tweener = TweenMax.to(parallaxer, 0.5, {
				// 	startAt: {currentTime: $video[0].currentTime},
				// 	currentTime: Math.min(duration-0.05/* ie11 bug */, duration*visiblePercent),
				// 	ease: 'easeOutQuad',
				// 	lazy: true,
				// 	onUpdate: function() {
				// 		$video[0].currentTime = parallaxer.currentTime;
				// 		return;
				// 		var current = Math.round(parallaxer.currentTime*10000)/10000;
				// 		if (prevVideoTime != current) {
				// 			$video[0].currentTime = current;
				// 			prevVideoTime = current;
				// 		}
				// 	}
				// });
			}
		}
		return true;
	},

	setLayerToggler: function() {

		var $button = $(this),
			$layer = $($button.attr('href')),
			$layerTitle = $layer.find('.layer-title'),
			$opener = null,
			opened = false;

		if (!$layer.length) {
			return;
		}

		$button.click(function() {
			$opener = $button;
			show();
			return false;
		});

		$layer.find('button[class*="c_btn_close"]').click(hide);

		function show() {
			if (!opened) {
				$layer.addClass('show');
				GALAXY.noScroll.on();
				$layerTitle.focus();
				opened = true;
			}
		}

		function hide() {
			if (opened) {
				$layer.removeClass('show');
				$opener && $opener.focus();
				$opener = null;
				GALAXY.setTransitionEndEvent($layer, function() {
					GALAXY.noScroll.off();
				});
				opened = false;
			}
		}

	},

	vodPlayer: (function() {

		var $layer, $layerTitle, $iframeBox, $iframe, $closeButton,
			$opener = null,
			opened = false,
			$baseContentsArea = null,
			$baseContentsClickable = null,
			isKeydown = false;


		function show(url, opener, autoplay) {

			var id = url.split('?v=')[1];

			if (!$layer) {
				$layer = $([
					'<div id="layer-youtube" class="m_layer-youtube"><div class="m_ly_inner">',
						'<span class="layer-title" tabindex="0">Movie player Layer</span>',
						'<div class="m_ly_header">',
							'<h3 class="c_txt_ly-type1 heading">Official introduction</h3>',
						'</div>',
						'<div class="m_ly_contents">',
							'<div class="m_video_view"><iframe frameborder="0" allowfullscreen="1" title="YouTube video player" src="about:blank"></iframe></div>',
						'</div>',
						'<nav><button type="button" class="c_btn_close-type1">Youtube Close</button></nav>',
					'</div></div>'
				].join(''));
				$layerTitle = $layer.find('span.layer-title');
				$iframe = $layer.find('iframe');
				$iframeBox = $iframe.parent();
				$closeButton = $layer.find('button[class*="_btn_close"]');
				$closeButton.one('keydown', function() {
					isKeydown = true;
				});
				$closeButton.bind('click touchend', hide);
				$layer.bind('touchmove', GALAXY.preventDefault)
					.appendTo(document.body);
			}
			$baseContentsArea = $('#wrap');
			$baseContentsClickable = $baseContentsArea.find('a,input,select,textarea,button,video,iframe');
			$baseContentsClickable.each(function() {
				var tabindex = $(this).attr('tabindex');
				if (tabindex!==undefined&&tabindex!==null) {
					$(this).data('prev-tabindex', tabindex);
				}
				$(this).attr('tabindex','-1');
			});

			if (!opened) {
				if (opener) {
					$opener = $(opener);
				}
				$iframe.attr('src', GALAXY.getYoutubePlayerLink(id, autoplay)).appendTo($iframeBox);
				$layer.addClass('show');
				$layerTitle.focus();
				GALAXY.noScroll.on();
				opened = true;
			}

		}

		function hide() {
			if (opened) {
				$layer.removeClass('show');
				$baseContentsClickable.each(function() {
					var tabindex = $(this).data('prev-tabindex');
					if (tabindex!==undefined&&tabindex!==null) {
						$(this).attr('tabindex',tabindex);
					} else {
						$(this).removeAttr('tabindex');
					}
				});
				isKeydown && $opener && $opener.focus();
				$opener = null;
				GALAXY.setTransitionEndEvent($layer, function() {
					$iframe.attr('src', 'about:blank').detach();
					GALAXY.noScroll.off();
				});
				opened = false;
			}
			isKeydown = false;
		}

		return {
			show: show,
			hide: hide
		}

	})(),

	getYoutubePlayerLink: function(id, autoplay, option) {
		var options = option || 'rel=0';
		return 'https://www.youtube.com/embed/'+ id +'?enablejsapi=1&version=3&autoplay='+ (autoplay ? 1 : 0) +'&wmode=opaque' + (options&&options!=''?'&'+options:'');
	},

	imageResizeViaCanvas: (function() {

		function canvasResizer(_image, width, height, widthTo, heightTo, callback) {
			var canvas = document.createElement('canvas'),
				context = canvas.getContext('2d'),
				image = new Image();
			image.onload = function() {
				canvas.width = widthTo;
				canvas.height = heightTo;
				context.drawImage(image, 0, 0, widthTo, heightTo);
				this.onload = null;
				this.src = canvas.toDataURL();
				callback(this);
			}
			image.src = _image.src;
		}

		return function(image, widthTo, heightTo) {

			var resizedImage = new Image(),
				nowWidth, nowHeight;

			resizedImage.onload = function() {
				nowWidth = this.width;
				nowHeight = this.height;
				this.onload = null;
				check(this);
			}
			resizedImage.src = image.src;

			function check(_image) {
				resizedImage = _image;
				if (nowWidth/2 > widthTo && nowHeight/2 > heightTo) {
					canvasResizer(resizedImage, nowWidth, nowHeight, nowWidth/2, nowHeight/2, check);
					nowWidth = nowWidth/2;
					nowHeight = nowHeight/2;
				} else if (nowWidth) {
					canvasResizer(resizedImage, nowWidth, nowHeight, widthTo, heightTo, check);
					nowWidth = nowHeight = 0;
				} else {
					image.src = resizedImage.src;
				}
			}

		}

	})(),

	noScroll: (function() {

		var $documentElement,
			$wrap,
			$header,
			$headerButtonBox,
			$gnbBox,
			$gnbCloseButton,
			$subNavGnbBox,
			$topButtonBox,
			scrollBarWidth;

		function assign() {
			$documentElement = $(document.documentElement);
			$wrap = $('#wrap');
			$header = $(GALAXY.isGalaxy?'#header':GALAXY.dom.header);
			$headerButtonBox = $header.find('p.link');
			$gnbBox = $('#gnb');
			$gnbContentsBox = $gnbBox.find('.g-contents');
			$gnbCloseButton = $gnbBox.find('p.g-close a');
			$subNavGnbBox = $('#subnav p.gnb');
			$subNavPreButton = $('#subnav p.pre-button');
			$topButtonBox = $('div.f_backtotop');
			scrollBarWidth = GALAXY.scrollBarWidth;
		}

		return {
			activated: false,
			on: function() {
				var paddingRight = 0;
				!$documentElement && assign();
				GALAXY.scrollFixSkip = true;
				$documentElement.addClass('no-scroll').css('paddingRight', scrollBarWidth);
				if (GALAXY.areaWidth > 1920+scrollBarWidth) {
					paddingRight = scrollBarWidth;
					$gnbBox.css('paddingRight', paddingRight);
					$gnbBox.addClass('wide');
				} else {
					$gnbBox.removeClass('wide');
				}
				// $gnbContentsBox.css('right', scrollBarWidth-paddingRight);
				// $gnbCloseButton.css('marginRight', scrollBarWidth-paddingRight);
				$topButtonBox.css('paddingRight', scrollBarWidth);
				if ($wrap.hasClass('subnav-fixed')) {
					$subNavGnbBox.css('marginRight', scrollBarWidth-paddingRight);
					$subNavPreButton.css('marginRight', scrollBarWidth-paddingRight);
				}

				if ( $('#subnav .subnav-menus').length && GALAXY.areaWidth < 1920+scrollBarWidth && !$('html').hasClass('dotcom') ) {
					$('#subnav .subnav-menus ul').css('margin-right', scrollBarWidth );
					$('#subnav.nav-type1 .heading a').css('margin-right', scrollBarWidth );
					$('.subnav-inner .gnb').css('margin-right', scrollBarWidth );
				}

				GALAXY.noScroll.activated = true;
				GALAXY.noScroll.resize();
			},
			off: function() {
				GALAXY.noScroll.activated = false;
				GALAXY.scrollFixSkip = false;
				$documentElement.removeClass('no-scroll').css('paddingRight', '');
				$gnbBox.css('paddingRight', '');
				$gnbContentsBox.css('right', '');
				$gnbCloseButton.css('marginRight', '');
				$topButtonBox.css('paddingRight', '');
				$subNavGnbBox.css('marginRight', '');
				$subNavPreButton.css('marginRight', '');
				// GALAXY.noScroll.resize();

				if ( $('#subnav .subnav-menus').length && GALAXY.areaWidth < 1920+scrollBarWidth && !$('html').hasClass('dotcom') ) {
					$('#subnav .subnav-menus ul').css('margin-right', '' );
					$('#subnav.nav-type1 .heading a').css('margin-right', '' );
					$('.subnav-inner .gnb').css('margin-right', '' );
				}
			},
			resize: function() {
				!$documentElement && assign();
				if (GALAXY.isPoorBrowser) {
					return;
				}

				var marginRight = Math.round((GALAXY.areaWidth-(($header[0])?$header[0].offsetWidth:0))/2);
				if (GALAXY.noScroll.activated) {
					marginRight += GALAXY.scrollBarWidth;
				}
				$headerButtonBox.css('marginRight', marginRight);
			}
		}

	})(),

	bodyTabKeyControls: (function() {

		var $baseContentsArea, $baseContentsClickable;

		return {
			on: function() {
				$baseContentsClickable.each(function() {
					var tabindex = $(this).data('o-prev-tabindex');
					if (tabindex!==undefined&&tabindex!==null) {
						$(this).attr('tabindex',tabindex);
					} else {
						$(this).removeAttr('tabindex');
					}
					$(this).removeData('o-prev-tabindex');
				});
				$baseContentsArea = $baseContentsClickable = null;
			},
			off: function($base) {
				$baseContentsArea = $base ? $base : $('#wrap');
				$baseContentsClickable = $baseContentsArea.find('a,input,select,textarea,button,video,iframe');
				$baseContentsClickable.each(function() {
					var tabindex = $(this).attr('tabindex');
					var prevTabindex = $(this).data('o-prev-tabindex');
					if (prevTabindex==undefined||prevTabindex==null||prevTabindex=="") {
						if (tabindex!==undefined&&tabindex!==null) {
							$(this).data('o-prev-tabindex', tabindex);
						}
						$(this).attr('tabindex','-1');
					}
				});

			},
		}
	})(),

	setOverflowYEdges: function($target) {

		var pointYAtStart, getPoint = $._event.getpoint;

		$target.bind('touchstart', function(e) {
			pointYAtStart = GALAXY.getEventPoint(e)[1];
		});

		$target.bind('touchmove', function(e) {
			var pointY = GALAXY.getEventPoint(e)[1];
			if (
				( this.scrollTop === 0 && pointY > pointYAtStart ) ||
				( this.scrollTop >= this.scrollHeight-this.offsetHeight && pointYAtStart > pointY )
			) {
				e.preventDefault();
				return false;
			}
			e.stopPropagation();
			return true;
		});

	},

	getImageSources: function($image) {
		var s4 = $image.attr('data-media-s4') || $image.attr('src'),
			s3 = $image.attr('data-media-s3') || s4,
			s2 = $image.attr('data-media-s2') || s3,
			s1 = $image.attr('data-media-s1') || s2;
		return [null, s1, s2, s3, s4];
	},

	setTabFocusTrap: function($box, $toFocus, tabIndex) {
		$('<div tabindex="'+ (tabIndex || 0) +'" />')
			.focus(function() {
				$toFocus.focus();
			})
			.appendTo($box);
	},

	getEventType: $._event.gettype,
	getEventPoint: $._event.getpoint,

	setTransitionEndEvent: (function() {
		var supportTransition = $.support.transition,
			transitionEndName = 'transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd msTransitionEnd';
		return function($target, callback) {
			if (supportTransition) {
				$target.bind(transitionEndName, function(e) {
					if (e.target == this) {
						callback.call(this);
						$target.unbind(transitionEndName);
					}
				});
			} else {
				callback.call($target[0]);
			}
		}
	})(),

	loadImage: function($image, callback) {
		if ($image[0].complete) {
			$image.unbind({load: callback});
			callback.call($image);
		} else {
			if ($image[0].src==$image[0].src) {
				if ($image[0].complete) {
					$image.unbind({load: callback});
					callback.call($image);
				} else {
					$image.unbind({load: callback}).bind({load: callback});
				}
			} else {
				$image.bind({load: callback});
				$image[0].src = $image[0].src;
			}
		}
	},

	setMediaBaseURL: function(mediaBaseURL) {
		return function(src) {
			if ((/^(http|\/)/).test(src) || (''+src).indexOf('.')==0) {
				return src;
			} else if ((''+src).indexOf('/')==0) {
				return src;
			} else {
				return mediaBaseURL+src;
			}
		}
	},

	sharing: function() {
		var
			$body = $(document.body),
			provider = GALAXY.stripTags(this.innerHTML).replace(/ /g, '').toLowerCase(),
			//bodyDataURL = $body.attr('data-url'),
			//url = encodeURIComponent(this.getAttribute('data-share-url') || (!bodyDataURL || bodyDataURL == '-' ? location.href : bodyDataURL)),
			url = encodeURIComponent(location.href),
			message = encodeURIComponent(this.getAttribute('data-share-msg') || $body.attr('data-msg') || ''),
			tags = encodeURIComponent(this.getAttribute('data-share-tags') || $body.attr('data-tags') || 'SamsungMobile'),
			popupSize, popupURL, popup;

		if (provider == 'facebook') {
			popupSize = [560, 525];
			popupURL = 'https://www.facebook.com/sharer/sharer.php?u='+ url;
		} else if (provider == 'twitter') {
			//if ($body.attr('data-url') == '-') {
			//	url = null;
			//}
			popupSize = [680, 400];
			popupURL = 'https://twitter.com/intent/tweet?text='+ message +'&hashtags='+ tags + (url ? '&url='+ url : '');
		} else if (provider == 'googleplus' || provider == 'google+') {
			popupSize = [510, 510];
			popupURL = 'https://plus.google.com/share?url='+ url;
		} else if (provider == 'linkedin') {
			popupSize = [550, 500];
			popupURL = 'https://www.linkedin.com/shareArticle?url='+ url;
		}

		popup = GALAXY.popup(popupURL, popupSize[0], popupSize[1], 'shareWindow');
		popup && popup.focus();

		return false;

	},

	setHash: function(hash) {
		var href = location.href.split('#')[0];
		location.replace(href +'#!/'+ (hash || ''));
	},

	scrollTracking: function() {
		var omniCode = $(this).data('omni-scroll-code');
		var prevOmniCode = GALAXY.___scroll_omniCode;
		GALAXY.___scroll_omniCode = omniCode;
		if (omniCode!=null&&omniCode!=''&&omniCode!=prevOmniCode) {
			GALAXY.omniture('scroll:'+omniCode);
		}
	},

	tracking: function() {
		var omniCode = this.getAttribute('data-omni');
		var omniType = this.getAttribute('data-omni-type');
		if (omniCode!=null&&omniCode!='') {
			GALAXY.omniture(omniCode, omniType);
		}
	},

	omniture: function(name, type) {
		var omniTag,
			isMicrositeAction = (type&&type!='') ? false : true,
			omniPage = window.OMNI_PAGE_NAME || '';
		if (GALAXY.isGalaxy) {

			if (omniPage!=''&&name.indexOf(omniPage)==0) {
				name = name.replace(omniPage+':', '');
			}

			omniTag = [
				'global:', (window.OMNI_CAMPAIGN_NAME || ''),
				name.indexOf(':') !== 0 ? ':'+ omniPage +':'+ name : name
			].join('');
			if (GALAXY.isTestURL) {
				console.log('omniture: "'+ omniTag +'"');
			} else {
				window.omniture_click && omniture_click(omniTag);
			}
		} else {
			/*
			type = (isMicrositeAction) ? 'microsite' : type;
			if (isMicrositeAction) {
				omniTag = [
					(window.OMNI_CAMPAIGN_NAME || 'galaxy2017'),
					name.indexOf(':') !== 0 ? ':'+ (window.OMNI_PAGE_NAME || '') +':'+ name : name
				].join('');
				//omniTag = name.indexOf(':') !== 0 ? (window.OMNI_PAGE_NAME || '') +':'+ name : name.substring(1);
			} else {
				omniTag = name;
			}
			*/
			omniTag = name;

			if (GALAXY.isTestURL) {
				console.log('omniture : "'+ type +'", "'+ omniTag +'"');
			} else {
				window.sendClickCode && sendClickCode(type, omniTag);
			}
		}
	},

	svgFillTween: (function() {
		if (!$.browser.ie) {
			return function(element, color) {
				element.setAttribute('fill', color);
			}
		} else {
			return function(element, color) {
				$('span').css('color', element.getAttribute('fill'))
					._animate({color: color}, {queue: false, duration: 250, easing: 'easeInOutQuad', step: function(v) {
						element.setAttribute('fill', v.color);
					}});
			}
		}
	})(),

	popup: function(url, width, height, name) {
		return window.open(url, name || '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width='+ (width+GALAXY.scrollBarWidth) +',height='+ height);
	},

	stripTags: function(text) {
		return text.replace(/<[^>]+>/g, '');
	},

	addZero: function(value) {
		return 10 > value ? '0'+ value : value;
	},

	preventDefault: function(e) {
		e.preventDefault();
	},

	returnFalse: function() {
		return false;
	},

	getScrollTop: function() {
		return document.documentElement.scrollTop || document.body.scrollTop || 0;
	},

	getScrollHeight: function() {
		return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	},

	getMaxScrollTop: function() {
		return GALAXY.getScrollHeight()-GALAXY.areaHeight;
	},

	setScrollTop: function(v) {
		$(window).scrollTop(v);
	},

	setSmoothScrollTop: function(v, time, callback) {
		$('html, body')._animate({scrollTop: v}, {queue: false, duration: time || 1000, easing: 'easeInOutQuart', complete: callback});
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

		if ((/win/i).test(navigator.appVersion) && ie) {
			$(documentElement)
				.bind('mousewheel', function(e) {
					if (GALAXY.scrollFixSkip === true) {
						return true;
					}
					scrollFix(e.originalEvent.wheelDelta*-1);
					e.preventDefault();
				})
				.bind('keydown', function(e) {
					if (GALAXY.scrollFixSkip) {
						return true;
					}
					var keyCode = e.keyCode, documentHeight = documentElement.clientHeight, newScrollTop;
					if ((/^(32|33|34|38|40)$/).test(keyCode)) {
						scrollFix(keyCode == 32 || keyCode == 34 ? documentHeight : keyCode == 33 ? -documentHeight : keyCode == 38 ? -75 : 75);
						e.preventDefault();
					}
				});
		}

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

			GALAXY.scrollTop = scrollTop;
			maxScrollTop = getMaxScrollTop();

			GALAXY.scrollTop = scrollTop;
			GALAXY.header && GALAXY.header.scroll && GALAXY.header.scroll(scrollTop, maxScrollTop);
			GALAXY.sections && GALAXY.sections.scroll && GALAXY.sections.scroll(scrollTop, maxScrollTop);
			GALAXY.footer && GALAXY.footer.scroll && GALAXY.footer.scroll(scrollTop, maxScrollTop);

			if (GALAXY.scrollFunctions.length) {
				$.each(GALAXY.scrollFunctions, function() {
					this(scrollTop, maxScrollTop);
				});
			}

		}

		return scroll;

	})(),


	hello: function(selector, opt) {
		// opt = {css: 'active className', on: function, off: function, bottom: 'bottom element selector', baseLine: 3 => screenHeight/3}
		var $element = $(selector), arr,
			$article = $element.closest('section[class^="m_"] > article');
			if ($article.length>1) {
				$article = $element.closest('article[class^="m_"]');
			}
		if ($article&&$article.get(0)) {
			arr = $article.data('hello');
			if (!arr) {
				arr = [];
			}
			if (!opt) {
				opt = {};
			}
			opt.css = (!opt.css) ? (arr.length) ? 'hello-'+(arr.length+1) : 'hello' : opt.css;
			opt.$elementTop = $element;

			opt.$elementBottom = (!opt.bottom) ? $element : $(opt.bottom);
			opt.baseLine = (!opt.baseLine) ? 3 : opt.baseLine;
			opt.linetype = opt.linetype;
			opt.$elementReset = $(opt.resetline);
			arr.push(opt);
			$article.data('hello', arr);
		}
		return this;
	},



	resize: function(func) {

		if (typeof(func)=='function') {
			this.resizeFunctions.push(func);
			return this;
		}

		var documentElement = document.documentElement,
			width, height, sizeMode;

		width = documentElement.clientWidth;
		if (GALAXY.isPoorBrowser) {
			width = Math.max(document.getElementById('wrap').offsetWidth, width);
		}
		height = $(window).height();

		// ignore Mode
		if (func !== true) {
			if (!$.browser.mobile && width == GALAXY.areaWidth && height == GALAXY.areaHeight) {
				return;
			} else if ($.browser.mobile && width == GALAXY.areaWidth) {
				return;
			}
		}

		sizeMode = width > 1440 ? 4 : width > 1023 ? 3 : width > 767 ? 2 : 1;
		GALAXY.prevSizeMode = GALAXY.sizeMode;
		if (sizeMode != GALAXY.sizeMode) {
			GALAXY.sizeMode = sizeMode;
			documentElement.className = documentElement.className.replace(/ *s[1-4][1-4]?/g, '') +' s'+ sizeMode +' s'+ (sizeMode > 2 ? 34 : 12);
		}
		documentElement.className = documentElement.className.replace(/ *s0/, '') + (360 > width ? ' s0' : '');

		GALAXY.areaWidth = width;
		GALAXY.areaHeight = height;

		GALAXY.header && GALAXY.header.resize && GALAXY.header.resize();
		GALAXY.sections && GALAXY.sections.resize && GALAXY.sections.resize();
		GALAXY.footer && GALAXY.footer.resize && GALAXY.footer.resize();
		GALAXY.noScroll.resize();

		if (GALAXY.resizeFunctions.length) {
			$.each(GALAXY.resizeFunctions, function() {
				this();
			});
		}

		GALAXY.scroll();

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
		var checkGnb = location.href.split('/#')[1];
		var gnbhash = ['gnb_products', 'gnb_how-tos', 'gnb_gallery', 'gnb_events', 'gnb_apps'];
		var hash = gnbhash.indexOf(checkGnb);
		if (checkGnb != undefined && hash != -1) {
			$('#header p.menu a').click();
		}
		return this;

	},

	initialize: function() {

		if (this.initialized) {
			return;
		}
		this.initialized = true;


		(function() {
			var lt = 3, key = '___GALAXY_SPEED', st = (window.___GALAXY_START_TIME)?___GALAXY_START_TIME:(new Date()).getTime(),
				val = $._cookie.get(key), speed = (val=='L') ? 'L' : (val=='H') ? 'H' : ((new Date()).getTime()-st>lt*1000) ? 'L' : 'H';

			var $footer = GALAXY.isGalaxy ? $('#footer') : $('.m_dotcom_footer'),
				$network = $footer.find('.select-network a.network'),
				$networkOptions = $footer.find('.select-network .option'),
				statusText = $network.text(),
				speedText = '',
				setNetworkSpeed = function(speed) {
					$._cookie.set(key, speed, 1, '/');
					return this;
				};
			GALAXY.isPoorNetwork = $(document.documentElement).addClass('s'+speed).hasClass('sL');
			if (val!='L' && val!='H') setNetworkSpeed(speed);

			$networkOptions.each(function() {
				var val = $(this).data('speed');
				if (val==speed) {
					speedText = ' '+$(this).data('label');
				}
				$(this).on('click', function(e) {
					e.preventDefault();
					setNetworkSpeed(val);
					try {window.scrollTo(0,0);} catch(e) {}
					location.reload();
				});
			});

			statusText += (speedText!=''?speedText:'');

			$network.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();

				var $select = $(this).closest('.select-network');
				if (!$select.hasClass('opened')) {
					$select.addClass('opened');
					$(document).one('click', function(e) {
						if (!$(this).closest('.select-network').get(0)) {
							$select.removeClass('opened');
						}
					});
				} else {
					$select.removeClass('opened');
				}
			}).text( statusText );
			//$network.attr('data-omni-type', 'microsite').attr('data-omni', ':network speed' + speedText);
		})();


		this.ready();

		if (!this.isGalaxy) {
			$(document.documentElement).addClass('dotcom');
			this.path.root = '..';
			this.mediaBaseURL = '.';
		}

		$(document.documentElement)
			.addClass($.browser.mobile ? 'mobile' : 'desktop')
			.decideClass('oldandroid', $.browser.android && 430 > $.browser.android)
			.decideClass('color_yb', $._cookie.get('highContrastMode') == '1');


		this.hashMenu = location.href.split('#!/')[1];
		this.hashMenu && this.isTestURL && console.log('hash menu: "'+ this.hashMenu + '"');

		this.mediaBaseURL = this.mediaBaseURL.replace(/\/$/, '');
		this.setMediaBaseURL = this.setMediaBaseURL(this.mediaBaseURL);

		this.scrollBarWidth = this.getScrollBarWidth();

		/*
		if (!$(document.body).attr('data-url') || (/bit\.ly\/?$/i).test($(document.body).attr('data-url'))) {
			$(document.body).attr('data-url', '-');
		}
		*/

		$('body style').each(function() {
			this.removeAttribute('scoped');
		});


		if (GALAXY.isGPSI) {
			this.resize(true);
			$('body img')
				.not('#kv [class*="f_header-"] img')
				.not('#kv-type2 [class*="f_header-"] img')
				.not('div.gift_header .heading img')
				.not('div.theme-steps div.img img')
				.each(function(i) {
					var $image = $(this),
						source = GALAXY.setMediaBaseURL(GALAXY.getImageSources($image)[GALAXY.sizeMode].replace(/^\./, ''));
					$image.attr('src', GALAXY.path.root+'/common/images/blank.gif');
					$image.css({
						backgroundImage: 'url('+ source +')',
						backgroundRepeat: 'no-repeat',
						backgroundSize: GALAXY.sizeMode > 2 ? 'cover' : '100% auto',
						backgroundPosition: '50% 50%'
					});
				});
			$('#kv,#kv-type2').find('[class*="f_header-"]').find('.kv-title, .kv-text, div').show();
			$('#kv,#kv-type2').css({width: '100%', height: $(window).height()+100})
				.find('div.f_container figure')
					.css({left: 'auto', width: '100%', marginLeft: 'auto'})
					.css($.support.transform, 'none')
				.find('img').css({width: '100%', height: '100%'});
			$('#kv,#kv-type2').find('div.f_container figure').each(function() {
				this.style.marginLeft = Math.min(0, (this.parentNode.offsetWidth-this.offsetWidth)/2) +'px';
			});
			if ($('#kv').hasClass('m_content-slider')||$('#kv-type2').hasClass('m_content-slider')) {
				$('#kv,#kv-type2').children().not('nav').not(':first').hide();
			}
			return;
		}

		this.header = this.header();
		this.sections = this.sections();
		this.footer = this.footer();

		if (GALAXY.isGalaxy) {
			$('a[data-omni], button[data-omni]')
				.unbind('click', GALAXY.tracking)
				.bind('click', GALAXY.tracking);
		} else {
			$('#contents a[data-omni], #contents button[data-omni], .m_dotcom_footer a[data-omni]')
				.unbind('click', GALAXY.tracking)
				.bind('click', GALAXY.tracking);
		}

		$(window).resize(this.resize)
				.scroll(this.scroll);

		if (!GALAXY.isGalaxy&&$('html').attr('lang')=='ja') {
			$('body').on('scroll', function() {
				if (GALAXY.sizeMode<3) {
					GALAXY.scroll();
				}
			});
		}

		this.resize(true);

		setTimeout(function() {
			window.initBuyNowButtons && window.initBuyNowButtons();
			$(document.documentElement).addClass('load');
			GALAXY.load();

			setTimeout(function() {
				var hash = location.hash, $section, pattern = /#[A-Z0-9-_]+$/i;
				pattern.test(hash) && ($section = $(hash)).length && GALAXY.setScrollTop($section.offset().top, 750);
			}, 100);
		}, 100);
	}
};

$(window).load(function() {
	setTimeout(function() {
		GALAXY.initialize();
	}, 0);
});

})(window.jQuery);
