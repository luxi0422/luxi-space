/////导航栏下拉菜单////
$('.navi a:nth-of-type(2)').mouseenter(function(){
	$('.dropdown-bg').slideDown('fast');
});
$('.dropdown-bg').hover(function(){
	$('.dropdown-bg').css('display','block');
},function(){
	$('.dropdown-bg').slideUp('fast');
});
/////选项卡1/////
$('.main .section1 .details .show div').click(function(){
	var index = $(this).index();  //此处的index()返回的是父元素中所有子元素的各自索引，并非选择器选中的元素在父级下同类型元素中的索引
	$(this).addClass('active')
			.siblings('.main .section1 .details .show div')
			.removeClass('active');
	$($('.main .section1 .sidepic .show')[index])
				.fadeIn()
				.siblings('.main .section1 .sidepic .show')
				.fadeOut();
})
/////手机展示界面动画效果/////
$('.main .section2 .wrapper').click(function(){  //点击执行动画
	$('.main .section2 .mobile .animate')
.animate({'margin-top':'-360px'},1000,function(){  //第一列照片向上滑动
	$('.main .section2 .mobile img:nth-child(3)').animate({  //第一列中第三张照片放大至填满整个容器
		'width':'280px',
		'margin-left':'0px',
		'margin-top':'0px',
		'height':'250px'
	},1000,function(){
		$('.main .section2 .mobile .animate').hide(0,function(){  //隐藏第一列照片，同时重置所有被改变的css
			$(this).css('margin-top','');
			$('.main .section2 .mobile img:nth-child(3)').css({
				'width':'',
				'margin-left':'',
				'margin-top':'',
				'height':''
			});
		});
	})
})
$('.main .section2 .mobile .animate2')  //开始执行第二行照片的动画：向左滑动
.animate({'margin-left':'0px'},1000,function(){
	$('.main .section2 .mobile .animate2').animate({
		'margin-left':'-280px'},2000,function(){
			$('.main .section2 .mobile .animate2').animate({
				'margin-left':'-570px'},1000,function(){
					$('.main .section2 .mobile .animate2').css('margin-left','');  //动画执行完毕后重置样式
					//$('.main .section2 .mobile .animate2').hide();
					$('.main .section2 .mobile .animate').show();  //回到第一列照片，即初始状态，遮盖住第二行照片
				})
		})
	})
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
/////点击share按钮出现动画效果/////
setInterval(fade,0);  //share按钮闪烁
function fade(){
	$('.main .section4 .cellcontent .button').animate({'opacity':'.5'},500).animate({'opacity':'1'},500);
}
$('.main .section4 .cellcontent .button').click(function(){
	$('.main .section4 .animatecell').css('display','none');
	$('.main .section4 .cellcontent').css('display','none');  //点击后手机图案部分隐藏
	$('.main .section4 .share .sharephoto img').css('opacity','1');  //背景图透明度取消
	setTimeout(function(){
		$('.main .section4 .share .sharephoto').css('display','none');  //隐藏第一组图片
	},1500);
	$('.main .section4 .share .secondpage').css('display','block');  //显示第二组图片
	$('.main .section4 .share .secondpage .secondimg').css('margin-top','-336px')  //让第二组两张图片重叠
	setTimeout(function(){
		$('.main .section4 .share .secondpage .secondimg').animate({  //第二组第二张图片通过调整margin-top值制造滑下效果
			'margin-top':'-20px'
		},1000);
	},1500)
})
/////锁点击变红/绿/////
$('.main .section5 .lock .unlock').click(function(){
	$(this).css('background','#8dc63f');
	$('.main .section5 .lock .locked').css('background','#DBDDDF');
})
$('.main .section5 .lock .locked').click(function(){
	$(this).css('background','#C74B43');
	$('.main .section5 .lock .unlock').css('background','#DBDDDF');
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
$('.main .section3 .photobox2 .first').click(function(){
	var arr = $('.main .section3 .photobox2 div');
	$(arr[i]).addClass('active')
			.siblings('.main .section3 .photobox2 div')
			.removeClass('active');
	i++;
	if(i>3){
		i=0;
	}
})
$('.main .section3 .photobox2 .second').click(function(){
	var arr = $('.main .section3 .photobox2 div');
	$(arr[i]).addClass('active')
			.siblings('.main .section3 .photobox2 div')
			.removeClass('active');
	i--;
	if(i<0){
		i=3;
	}
})