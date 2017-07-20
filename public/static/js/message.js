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
$("form").submit(function(){
    var date = new Date();
    var time = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
    var messageInfo = {
        name: $("form input:first-child").val(),
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
getData(pageStart,pageLimit);
$(".wrapper .pages").click(function(){
    pageStart++;
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
            for (var i = (page - 1) * limit; i < response.length; i++) {
                result += '<div class="name">'+data[i].name+'：</div><div class="words">'+data[i].message+'</div><div class="date">'+data[i].gmt_create+'</div>';
            }
            $(".data").append(result);

            if ((page * limit) > data.length) {
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