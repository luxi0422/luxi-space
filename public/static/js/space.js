//选项卡切换路由
var lifeRouter = {
    path:"/life",
    component:{
        template:"#lifeTemp"
    }
};
var workRouter = {
    path:"/work",
    component:{
        template:"#workTemp"
    }
};
var router = new VueRouter({
    routes:[{path:"/",redirect:"/life"},lifeRouter,workRouter]
});
var vm = new Vue({
    router
}).$mount(".switch");

//导航栏滚动改变
window.onscroll = function(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if(scrollTop > 120 && screen.width > 768 && $(window).width() > 768){
        $(".main .sidebar .sideNav").css("display","block");
    }else if(scrollTop <= 120 && screen.width > 768 && $(window).width() > 768){
        $(".main .sidebar .sideNav").css("display","none");
    }
};

//时钟
function t(){
    var date = new Date();
    $(".main .sideTime .day").html(date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日 "+week());
    $(".main .sideTime .time").html(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
    $(".main .sideTime .stamp").html(date.getTime());
    if(date.getHours()<10){
        $(".main .sideTime .time").html("0"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
    }
    if(date.getMinutes()<10){
        $(".main .sideTime .time").html(date.getHours()+":0"+date.getMinutes()+":"+date.getSeconds());
    }
    if(date.getSeconds()<10){
        $(".main .sideTime .time").html(date.getHours()+":"+date.getMinutes()+":0"+date.getSeconds());
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

var timer = setInterval(t,1000);
function play(){
    if($(".main .sideTime .btn").html() == '停下来'){
        $(".main .sideTime .btn").html('继续');
        clearInterval(timer);
    }else{
        $(".main .sideTime .btn").html('停下来');
        timer = setInterval(t,1000);
    }
}

//分页
$('#pageTool').Paging({pagesize:10,count:100});

//登录样式
$(".login").click(function(){
    $(".adminLogin").toggle();
});
$(".adminLogin div").click(function(){
    $(".adminLogin").css("display","none");
});

//登录
$(".adminLogin form").submit(function(){
    var username = $(".adminLogin .username").val();
    var password = $(".adminLogin .password").val();
    $.ajax({
        type:"post",
        url:"http://luxi.space/api/login",
        data:{username:username,password:password},
        dataType:"json",
        success:function(obj){
            if(obj.code != 200){
                alert(obj.msg);
            }else{
                $("form.text").css("display","block");
                $(".adminLogin").css("display","none");
                $(".login").css("display","none");
                $(".delete").css("display","block");
            }
        }
    });
    return false;
});

// 插入文章
$("form.text").submit(function(){
   var textInfo = {
       subject:$("form.text input.text-title").val(),
       tags:$("form.text input.text-tags").val(),
       content:ue.getContent(),
       category_id:"1"
   };
    $.post('http://luxi.space/api/blog',textInfo,function(obj){
        if(obj.code != 200) {
            alert(obj.msg);
        } else {
            window.location.href="read.html?id="+obj.data.id;
        }
    },'json');
   return false;
});

// 获取列表
var blogDom = $(".tabs .work");
var workTemp = $("#workTemp").html();
$.getJSON("http://luxi.space/api/blog?page=1&limit=10",function(data){
    for(var i = 0; i<data.data.list.length; i++){
        insertBlog(data.data.list[i]);
    }
});

function insertBlog(messageInfo){
    var blogHtml = workTemp.replace(/\{\{(.+?)\}\}/g,function($0,$1){
        return messageInfo[$1];
    });
    blogDom.append($(blogHtml));
    $(blogHtml).show();
}

// 删除按钮
$(".work").delegate(".details .delete","click",function(data){
    var that = this;
    $.ajax({
        type:"delete",
        url:"http://luxi.space/api/blog",
        dataType:"json",
        data:{id:that.dataset.message},
        success:function(){
            $(that).parent().remove();
        }
    })
});

//阅读原文按钮跳转
$("div#test").click(function(){
    console.log("111");
});