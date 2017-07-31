//////////////////LOGO下拉菜单///////////////////////////
var logo = document.querySelector('.header .logo');
var lis = document.querySelector('.header .logo ul.list')
logo.onclick = function(){
	lis.style.display='block';
}
lis.onmouseout = function(event){
	var e = event || window.event;
	//console.log(arguments)
	if(e.toElement.parentNode == lis){
		return false;
	}else{
		lis.style.display = 'none';
	}
}
//////////////////////登录表单弹出和隐藏////////////////////////////////
var login = document.querySelector('div.login');
var loginform = document.querySelector('div.login-here');
login.onclick = function(){
	loginform.style.display = 'block';
}
var loginTimer = null;
loginform.onmouseout = function(){	
		loginTimer = setTimeout(function(){
			loginform.style.display = 'none';
		},400);
		return false;
}
loginform.onmouseover = function(){
	if(loginTimer!=null) {
		clearTimeout(loginTimer);
		loginTimer = null;
	}
};
////////////////////////注册表单弹出和隐藏////////////////////////////////
var register = document.querySelector('div.regist');
var registerform = document.querySelector('div.regist-here');
var backbtn = document.querySelectorAll('div.regist-here .back');
register.onclick = function(){
	registerform.style.display = 'block';
}
backbtn[0].onclick = function(event){
	event.stopPropagation();
	registerform.style.display = 'none';
}
//////////////////////////注册表单正则验证////////////////////////////
var inp1 = document.querySelector('.header .register .regist-here .inp1');
var inp2 = document.querySelector('.header .register .regist-here .inp2');
var inp3 = document.querySelector('.header .register .regist-here .inp3');
var inp4 = document.querySelector('.header .register .regist-here .inp4');
var p1 = document.getElementById('p1');
var p2 = document.getElementById('p2');
var p3 = document.getElementById('p3');
var p4 = document.getElementById('p4');
//用户名
var reg1 = /^[a-zA-Z]\w{5,11}$/;
	inp1.onblur = function(){
		check(inp1.value,reg1,p1);
		return;
	}
function checkUser(){
	return check(inp1.value,reg1,p1);
}
//密码
var reg2 = /^\w{6,12}$/;
inp2.onblur = function(){
		check(inp2.value,reg2,p2);
		return;
	}
function checkPwd(){
	return check(inp2.value,reg2,p2);
}
//邮箱

var reg3 = /^[\w-]{4,18}@\w{2,18}(\.\w+){1,3}$/;
inp3.onblur = function(){
		check(inp3.value,reg3,p3);
		return;
	}
function checkEmail(){
	return check(inp3.value,reg3,p3);
}
//电话	
var reg4 = /^1([358][0-9]|4[57]|7[0135678])\d{8}$/;
inp4.onblur = function(){
		check(inp4.value,reg4,p4);
		return;
	}
function checkTel(){
	return check(inp4.value,reg4,p4);
}
//封装函数
function check(str,reg,p){
			if(!str.match(reg)){
				p.style.color = '';
				p.innerHTML = '验证失败';
				return false
			}
			p.style.color = 'green';
			p.innerHTML = '验证成功';
			return true;
		}
function checkForm(){
	return  checkUser() && checkPwd() && checkEmail() && checkTel();
}
///////////////三级菜单/////////////////////
var list=document.getElementsByClassName("option");
		for(var i=0;i<list.length;i++){
			(function(n){
				list[n].onmouseover=function(){
					document.getElementById("ul"+n).style.display="block";
					list[n].style.backgroundColor="gray";
				}
				list[n].onmouseout=function(){
					document.getElementById("ul"+n).style.display="none";
					list[n].style.backgroundColor="";
				}
			})(i)
		}
/////////////////////////轮播图/////////////////////////////////
var imglist = document.querySelectorAll('.mid .ads .imglist a');
var spanlist = document.querySelectorAll('.mid .ads .spanlist span');
var i = 1;
var mytimer = 2000;
var timer = setInterval(show,mytimer);
function show(){
	if(i>4){
		i = 0;
	}
	imgControl(i);
	spanControl(i);
	i++;
}
function imgControl(m){
	for(var j = 0; j < imglist.length; j++){
		imglist[j].className = '';
	}
	imglist[m].className = 'active';
}
function spanControl(m){
	for (var k = 0; k<spanlist.length; k++){
		spanlist[k].className='';
	}
	spanlist[m].className = 'active';
}
var container = document.querySelector('.body .mid .ads')
container.onmouseover = function(){
	clearInterval(timer);
}
container.onmouseout = function(){
	timer = setInterval(show,mytimer);
}
for(var x = 0; x<spanlist.length; x++){
	(function(n){
		spanlist[n].onmouseover = function(){
			imgControl(n);
			spanControl(n);
			i = n+1;
		}
	})(x);
}
//////////////////////////万年历///////////////////////////////////
var h = document.getElementById('hour');
		var m = document.getElementById('minute');
		var s = document.getElementById('second');
		var w = document.getElementById('week');
		var d = document.getElementById('day');
		var stamp = document.getElementById('stamp');
		function t(){
			var date = new Date();			
			h.innerHTML = date.getHours()+' :';		
			m.innerHTML = date.getMinutes()+' :';			
			s.innerHTML = date.getSeconds();			
			w.innerHTML = week();			
			d.innerHTML = date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日';
			stamp.innerHTML = '时间戳：'+date.getTime();
			if(date.getHours()<10){
				h.innerHTML = '0'+date.getHours()+' :';	
			}
			if(date.getMinutes()<10){
				m.innerHTML = '0'+date.getMinutes();
			}
			if(date.getSeconds()<10){
				s.innerHTML = '0'+date.getSeconds();
			} 
			function week(){
				var index = date.getDay();
				var show = null;
				switch(index){
					case 0:
						show = '星期日';
					break;
					case 1:
						show = '星期一';
					break;
					case 2:
						show = '星期二';
					break;
					case 3:
						show = '星期三';
					break;
					case 4:
						show = '星期四';
					break;
					case 5:
						show = '星期五';
					break;
					case 6:
						show = '星期六';
					break;
				}return show;
			}

	}
	setInterval(t,1000);
///////////////////////滚动消失并固定在底部的页脚//////////////////////////
var footer = document.querySelector('.footer-bg');
	footer.style.position = 'fixed';
	footer.style.bottom = 0;
window.onscroll = function(){
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	if(scrollTop > 50){
		footer.style.position = '';
	}else{
		footer.style.position = 'fixed';
		footer.style.bottom = 0;
	}
}
///////////////////////////////回到顶部//////////////////////////////////
var totop = document.querySelector('div.totop');
totop.onclick = function(){
		document.body.scrollTop = document.documentElement.scrollTop = 0;
}