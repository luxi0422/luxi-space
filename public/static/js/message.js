//ajax从数据库读取留言数据
var $dataDom = $(".data");
var messageTpl = $('#message-tpl').html();
$.getJSON('http://luxi.space/api/message?page=1&limit=20',function(data){
    for(var i =0; i<data.data.list.length; i++) {
        insertMessage(data.data.list[i]);
    }
});

//插入一条新留言时显示在留言列表顶端
function insertMessage(messageInfo, needAnimate) {
    var messageHtml = messageTpl.replace(/\{\{(.+?)\}\}/g,function($0, $1){
        return messageInfo[$1];
    });
    var $messageHtml = $(messageHtml);
    if(needAnimate) {
        $dataDom.prepend($messageHtml);
        $messageHtml.show(500);
    } else {
        $dataDom.append($messageHtml);
        $messageHtml.show();
    }
}

//点击提交
$(".wrapper form").submit(function(){
    var messageInfo = {
        name: $(".wrapper form input:first-child").val(),
        message: $("textarea").val()
    };
    $.post('http://luxi.space/api/message',messageInfo,function(obj){
        if(obj.code != 200) {
            alert(obj.msg);
        } else {
            insertMessage(obj.data, true);
            $("textarea").val("");
        }
    },'json');
    return false;
});

//点击加载更多
    var pageStart=1;
    var pageLimit=20;
    //getData(pageStart,pageLimit);
    $(".wrapper .pages").click(function(){
        pageStart ++;
        getData(pageStart,pageLimit);
    });

    function getData(page,limit) {
        $.ajax({
            type: "get",
            url: "http://luxi.space/api/message?page=" + page + "&limit=" + limit,
            dataType: "json",
            success: function (response) {
                var result = "";
                var data = response.data.list;
                for (var i = 0; i < data.length; i++) {
                    result += '<div class="message"><div class="name">'+data[i].name+'：</div><div class="words">'+data[i].message+'</div><div class="date">'+data[i].gmt_create+'</div></div>';
                }
                $(".data").append(result);

                if ((page * limit) > response.data.count) {
                    $(".wrapper .pages").hide();
                } else {
                    $(".wrapper .pages").show();
                }
            },
            error: function (xhr, type) {
                alert("出错啦");
            }
        });
    }

    //回到顶端
var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
$(".top-z").mouseenter(
    function(){
        $(".top-z").stop().animate({"opacity":"1"});
    }
);
$(".top-z").mouseleave(
     function(){
         $(".top-z").stop().animate({"opacity":"0"});
     }
).click(function(){
    $('html,body').animate({scrollTop:0},1000);
});

//登录样式
$(".login-z").mouseenter(
    function(){
        $(".login-z").stop().animate({"opacity":"1"});
    }
);
$(".login-z").mouseleave(
    function(){
        $(".login-z").stop().animate({"opacity":"0"});
    }
).click(function(){
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
                $(".message div:first-child").css("display","block");
                $(".adminLogin").css("display","none");
            }
        }
    });
    return false;
});

//删除留言
$(".data").delegate(".message .del","click",function(data){
    console.log(this.dataset.message);
    var that = this;
    $.ajax({
        type:"delete",
        url:"http://luxi.space/api/message",
        dataType:"json",
        data:{id:that.dataset.message},
        success:function(){
            console.log(that);
            $(that).parent().remove();
        }
    })
});