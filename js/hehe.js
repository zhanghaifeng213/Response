;(function(){
	var $nav=$(".wrap").find(".head .nav"),
		$navLi=$nav.find(".daohang li"),
		$navLiLength=$navLi.length,
		$navTop=$nav.offset().top,
		$navBar=$nav.find(".navBar");
	$(window).scroll(function(){
		if($(window).scrollTop()>$navTop){
			$nav.css({"position":"fixed","top":0});	
		}else{
			$nav.css({"position":"absolute","top":"auto"});
		}
	});
	console.log($navLi.eq($navLiLength-1).offset().left);
	function navInit(){
		$navBar.css({"left":$navLi.eq($navLiLength-1).offset().left,"width":$navLi.eq($navLiLength-1).innerWidth()});
	}
	navInit();
	$navLi.hover(function(){
		$navBar.css({"left":$(this).offset().left,"width":$(this).innerWidth()});
		$(this).addClass("active").siblings().removeClass("active");
	},function(){
		$navLi.eq($navLiLength-1).addClass("active").siblings().removeClass("active");
		navInit();
	});
	$(window).resize(function() {
  		navInit();
	});
})();
