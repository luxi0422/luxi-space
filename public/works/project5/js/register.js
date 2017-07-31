/////验证名/////
var reg1 = /^[a-zA-Z]+|[\u4e00-\u9fa5]+$/;
$('.register form .inp1').blur(function(){
	check($('.register form .inp1').val(),reg1,$('#p1'),$('#p1s'),'Required');
	return;
})
function checkEmail(){
	return check($('.register form .inp1').val(),reg1,$('#p1'),$('#p1s'),'Required');
}
/////验证姓/////
var reg2 = /^[a-zA-Z]+|[\u4e00-\u9fa5]+$/;
$('.register form .inp2').blur(function(){
	check($('.register form .inp2').val(),reg2,$('#p2'),$('#p2s'),'Required');
	return;
})
function checkEmail(){
	return check($('.register form .inp1').val(),reg1,$('#p1'),$('#p1s'),'Required');
}
/////验证邮箱/////
var reg3 = /^[\w-]{4,18}@\w{2,18}(\.\w+){1,3}$/;
$('.register form .inp3').blur(function(){
	check($('.register form .inp3').val(),reg3,$('#p3'),$('#p3s'),'Invalid email');
	return;
})
function checkEmail(){
	return check($('.register form .inp3').val(),reg3,$('#p3'),$('#p3s'),'Invalid email');
}
/////验证密码/////
var reg4 = /^\w{6,12}$/;
$('.register form .inp4').blur(function(){
	check($('.register form .inp4').val(),reg4,$('#p4'),$('#p4s'),'Too short');
	return;
})
function checkPwd(){
	return check($('.register form .inp4').val(),reg4,$('#p4'),$('#p4s'),'Too short');
}
/////验证网站名/////
var reg5 = /^[a-zA-Z]\w+$/;
$('.register form .inp5').blur(function(){
	check($('.register form .inp5').val(),reg5,$('#p5'),$('#p5s'),'Required');
	return;
})
function checkPwd(){
	return check($('.register form .inp5').val(),reg5,$('#p5'),$('#p5s'),'Required');
}
/////正则验证的封装函数/////
function check(str,reg,p,ps,error){
	if(!str.match(reg)){
		ps.css({
			'color':'#C74B44',
			'fontSize':'14px'
		});
		ps.html(error);
		p.css('border','1px solid #C74B44');
		return false
	}
	p.css('border','');
	ps.html('√');
	ps.css('color','#91C945');
	return true;
}
function checkForm(){
	return  checkPwd() && checkEmail();
}
/////如果邮箱栏选择学生，则弹出提示/////
$('.register .pop').on('click',function(){
	$('.register form #p3 .popout').toggle();
})
/////验证码点击事件/////
var box = $('.register .lastspan div');
for(var i=0; i<box.length; i++){
	$(box[i]).click(function(){
		$(this).addClass('active').siblings().removeClass('active')
	})
}