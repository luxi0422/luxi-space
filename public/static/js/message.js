//ajax从数据库读取留言数据
var $dataDom = $(".data");
var messageTpl = $('#message-tpl').html();
$.getJSON('http://luxi.space/api/message?limit=10',function(data){
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

//点击提交时，向数据库传参
$("form").submit(function(){
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
