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

//登录样式
$(".login").click(function(){
    $(".adminLogin").toggle();
});
$(".adminLogin div").click(function(){
    $(".adminLogin").css("display","none");
});

//登录
$(".adminLogin form").submit(function(){
    var username = $(".adminLogin input[name=username]").val();
    var password = $(".adminLogin input[name=password]").val();
    $.ajax({
        type:"post",
        url:"http://luxi.space/api/login",
        data:{username:username,password:password},
        dataType:"json",
        success:function(obj){
            if(obj.code != 200){
                alert(obj.msg);
            }else{
                $(".adminLogin").css("display","none");
                $("form.text").css("display","block");
                $(".login").css("display","none");
            }
        }
    });
    return false;
});

// 新文章点击发表后跳转到详情页并显示
$.ajax({
    url:"http://luxi.space/api/blog",
    type:"get",
    dataType:"json",
    data:{"id":window.location.href.match(/id=(\d+)/)[1]},
    success:function(obj){
        console.log(obj);
        $(".main .content-wrap .article-title").html(obj.data.subject);
        $(".main .content-wrap .article-tags").html("标签："+obj.data.tags);
        $(".main .content-wrap .article-content").html(obj.data.content);
    }
});

//编辑功能-在文本编辑框中获取文章标题标签内容
$("form.text .text-wrapper .editBtn").click(function(){
    var that = this;
    $.ajax({
        type:"get",
        url:"http://luxi.space/api/blog",
        data:{"id":window.location.href.match(/id=(\d+)/)[1]},
        dataType:"json",
        success:function(obj){
            console.log(obj);
            if(obj.code != 200){
                alert(obj.msg);
            }else{
                $("form.text .text-title").val(obj.data.subject);
                $("form.text .text-tags").val(obj.data.tags);
                ue.setContent(obj.data.content);
            }
        }
    });
});

// 编辑功能-提交改动
$("form.text").submit(function(){
    var editInfo = {
        id:window.location.href.match(/id=(\d+)/)[1],
        subject:$("form.text input.text-title").val(),
        tags:$("form.text input.text-tags").val(),
        content:ue.getContent(),
        category_id:"1"
    };
    $.ajax({
        type:"put",
        url:"http://luxi.space/api/blog",
        data:editInfo,
        dataType:"json",
        success:function(obj){
            if(obj.code != 200) {
                alert(obj.msg);
            } else{
                $(".main .article-title").html(obj.data.subject);
                $(".main .article-tags").html(obj.data.tags);
                $(".main .article-content").html(obj.data.content);
            }
        }
    });
    return false;
});