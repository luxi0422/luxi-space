/////滚动后出现并固定定位的导航条（已合并入最后的onscroll事件）/////
var navi = $('.header .navi')[0]
var list = $('.list')[0]
/////导航条菜单鼠标悬浮效果/////
$('.header .navi .menu li').hover(function(){
	var width = $(this).width();
	$(this).find('div').stop().animate({'width':width},500);
},function(){
	$(this).find('div').stop().animate({'width':''},500);
})
/////三个按钮滑入滑出变色/////
$('.header .navi .menu .reserv').hover(function(){
	$(this).stop().animate({
		'backgroundColor':'#24242F',
		'color':'#fff'
	},500);
},function(){
	$(this).stop().animate({
		'backgroundColor':'#fff',
		'color':'#24242F'
	},500);
})
$('.section2 .details div').hover(function(){
	$(this).stop().animate({
		'backgroundColor':'#fff',
		'color':'#24242F'
	},500);
},function(){
	$(this).stop().animate({
		'backgroundColor':'transparent',
		'color':'#fff'
	},500);
})
$('.section3 .details div').hover(function(){
	$(this).stop().animate({
		'backgroundColor':'#fff',
		'color':'#24242F'
	},500);
},function(){
	$(this).stop().animate({
		'backgroundColor':'transparent',
		'color':'#fff'
	},500);
})
$('.header .navi .reserve').hover(function(){
	$(this).stop().animate({
		'backgroundColor':'#24242F',
		'color':'#fff'
	},500);
},function(){
	$(this).stop().animate({
		'backgroundColor':'#fff',
		'color':'#24242F'
	},500);
})
/////回到顶端按钮/////
$('.footer .upper .top').click(function(){
	$('html,body').animate({scrollTop:0},1000);
})
/////中屏导航栏下拉菜单/////
$('.mobile span').click(function(){  //点击按钮，出现下拉菜单
	$('.list').css('top','80px');
	$('.list').toggle();
})
$('.list ul li').hover(function(){  //下拉菜单的鼠标悬浮效果
	var width = $(this).find('a').width();
	$(this).find('div').stop().animate({'width':width},500);
},function(){
	$(this).find('div').stop().animate({'width':''},500);
})
//////图片的放大和缩小//////
window.onscroll = function(){
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	if(scrollTop > 1200 && scrollTop < 2100) {
		var m = 2100 - 1200;
		var d = scrollTop - 1200;
		var dx = 10 * (d / m);
		$('.section2').css("backgroundSize",(1920 * ((dx + 100) / 100)) + "px");
	} else if(scrollTop > 2100 && scrollTop < 3083){
		var m = 3083 - 2100;
		var d = scrollTop - 2100;
		var dx = 10 * (d / m);
		$('.section3').css("backgroundSize",(1920 * ((dx + 100) / 100)) + "px");
	} else if(scrollTop > 3083 && scrollTop < 4583) {
		var m = 4583 - 3083;
		var d = scrollTop - 3083;
		d = 1 * d * 0.5 + 500;
		$('.section4').css("backgroundPositionY",d + "px");

	}
	if(scrollTop > 0){
		navi.style.display = "block";
		navi.style.position = "fixed";
		navi.style.top = "0";
		navi.style.backgroundColor = "#fff";
	}else{
		navi.style.display = "";
		list.style.display = "";
	}
	console.log(scrollTop);
}