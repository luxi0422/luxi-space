/////导航栏下拉菜单////
$('.navi a:nth-of-type(2)').mouseenter(function(){
	$('.dropdown-bg').slideDown('fast');
});
$('.dropdown-bg').hover(function(){
	$('.dropdown-bg').css('display','block');
},function(){
	$('.dropdown-bg').slideUp('fast');
});
/////按钮点击特效/////
$('.main .section1 .dribbble .connect').animate({  //盒子出现时，从下滑上
	'top':'60%'
},500);
$('.main .section1 .dribbble .connect div').click(function(){
	$('.main .section1 .dribbble .connect').hide();  //点击按钮，盒子消失
	$('.main .section1 .dribbble .right div:first-child').animate({  //图标依次浮上
		'margin-top':'0'
	},500);
	$('.main .section1 .dribbble .right div:nth-child(2)').delay(500).animate({
		'margin-top':'0'
	},500);
	$('.main .section1 .dribbble .right div:nth-child(3)').delay(1000).animate({
		'margin-top':'0'
	},500);
	$('.main .section1 .dribbble .right div:nth-child(4)').delay(1500).animate({
		'margin-top':'0'
	},500);
	$('.main .section1 .dribbble .right div:nth-child(5)').delay(2000).animate({
		'margin-top':'0'
	},500);
	$('.main .section1 .dribbble .right div:nth-child(6)').delay(2500).animate({
		'margin-top':'0'
	},500);
	$('.main .section1 .dribbble .screen').animate({  //背景透明度取消
		'opacity':'1'
	},0)
})
/////选项卡2/////
$($('.main .section3 .photobox .desktop img')[0])
				.animate({'top':'0'},500)
$($('.main .section3 .photobox .ceilphone img')[0])
				.animate({'top':'70px'},500)
$('.main .section3 .styles div').click(function(){
	var index = $(this).index();
	$(this).addClass('active')
			.siblings('.main .section3 .styles div')
			.removeClass('active');
	$($('.main .section3 .photobox .group')[index])
				.addClass('activephoto')
				.siblings('.main .section3 .photobox .group')
				.removeClass('activephoto');
	$($('.main .section3 .photobox .desktop img')[index])
				.animate({'top':'0'},500);
	$('.main .section3 .photobox .desktop img').css('top','350px');
	$($('.main .section3 .photobox .ceilphone img')[index])
				.animate({'top':'70px'},700);
	$('.main .section3 .photobox .ceilphone img').css('top','340px');
})
/////小屏时导航栏点击出现手风琴效果下拉菜单/////
$('.formid .iconfont').click(function(){
	$('.formid .list').toggle();
	$('.formid .list span').html('﹀');
})
$('.formid .list a:first-of-type').click(function(){
	$('.formid .list ul').toggle();
})
/////小屏时点击按钮轮播/////
var i = 0; 
$('.main .section3 .photobox2 .first').click(function(){  //左侧按钮
	var arr = $('.main .section3 .photobox2 div');
	$(arr[i]).addClass('active')
			.siblings('.main .section3 .photobox2 div')
			.removeClass('active');
	i++;
	if(i>3){
		i=0;
	}
})
$('.main .section3 .photobox2 .second').click(function(){  //右侧按钮
	var arr = $('.main .section3 .photobox2 div');
	$(arr[i]).addClass('active')
			.siblings('.main .section3 .photobox2 div')
			.removeClass('active');
	i--;
	if(i<0){
		i=3;
	}
})
/////字体和字体族点击改变/////
$('.main .section4 .choosestyle .family>div').click(function(){
	$('.main .section4 .choosestyle ul').toggle();
});  //点击时弹出下拉字体族菜单

//字体大小点击改变//
(function(){
	var mouseDown = false;
	var b = $('.size .b');
	var offset = 110;
	var p = $('.section4>p');
	$('.size .line').mousedown(function(){
		mouseDown = true;
	})
var dx = 0;
	$('.size .line').mousemove(function(e){
dx = e.offsetX + offset;
		if(mouseDown && dx < 225 && dx > 133){
			b.css("left",e.offsetX + offset + "px");
			p.css("fontSize",12 + Math.ceil(e.offsetX / 3));
		}
	});
	$('body').mouseup(function(){
		mouseDown = false;
	});

/////字体族点击改变/////
	var list=$('.main .section4 .choosestyle ul li');
	list.each(function(){
		console.log(this)
		$(this).click(function(){  //点击li时将字体改成li对应的字体族
			p.css('fontFamily',$(this).css("fontFamily"));
			$('.main .section4 .choosestyle ul').toggle();
			$('.main .section4 .choosestyle .family>div').html($(this).html());
		});
	});
})();