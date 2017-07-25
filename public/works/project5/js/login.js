/////获取元素/////
var inp1 = document.querySelector('.login input.inp1');
var inp2 = document.querySelector('.login input.inp2');
var p1 = document.getElementById('p1');
var p1s = document.getElementById('p1s');
var p2 = document.getElementById('p2');
var p2s = document.getElementById('p2s');
/////验证邮箱/////
var reg1 = /^[\w-]{4,18}@\w{2,18}(\.\w+){1,3}$/;
inp1.onblur = function(){
	check(inp1.value,reg1,p1,p1s,'Invalid email');
	return;
}
function checkEmail(){
	return check(inp1.value,reg1,p1,p1s,'Invalid email');
}
/////验证密码/////
var reg2 = /^\w{6,12}$/;
inp2.onblur = function(){
	check(inp2.value,reg2,p2,p2s,'Required');
	return;
}
function checkPwd(){
	return check(inp2.value,reg2,p2,p2s,'Required');
}
/////正则验证的封装函数/////
function check(str,reg,p,ps,error){
	if(!str.match(reg)){
		ps.style.color = '#C74B44';
		ps.innerHTML = error;
		ps.style.fontSize = '14px';
		p.style.border = '1px solid #C74B44';
		return false
	}
	p.style.border = '';
	ps.innerHTML = '√';
	ps.style.color = '#91C945';
	return true;
}
function checkForm(){
	return  checkPwd() && checkEmail();
}