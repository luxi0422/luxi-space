//导航栏悬浮效果
$("header .nav ul li a").hover(
    function () {
        $(this).stop().animate({
            "opacity": ".8"
        }, 500);
    },
    function () {
        $(this).stop().animate({
            "opacity": ".5"
        }, 500);
    }
);

//黄历模块
//日期
var date = new Date();
$(".date .today").html(date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日");
//随机事项
var todoList = ["女装","卖萌","放歌","撸串","开会","出门","请假","考试","会友","甩锅","买彩票" ,"擦桌子","写BUG","做梦","撸猫","回笼觉","分手","减肥","表白","打游戏","买买买"];
var saying = ["\"研究表明，女装有助于提高代码正确率\"", "\"垂死病中惊坐起，今天还没改BUG\"", "\"等忙完这一阵，就可以接着忙下一阵了。\""];
var num = Math.floor(Math.random() * 10000);

//得到一个绑定日期的包含6个随机数的数组
var dateNum = date.getFullYear() + '' + (date.getMonth() + 1) + date.getDate();

function getRandomFromTodoList(dateNum) {
    var resultMap = {}, resultArr = [];
    var len = 6, watchDog = 0;
    var result , tmp = dateNum,x=0;
    while (len > 0) {
        tmp = Math.pow(tmp, 33) % 9973;
        result = tmp % todoList.length;
        if (typeof resultMap[result] == 'undefined') {
            resultMap[result] = 1;
            resultArr.push(result);
            len--;
        } else {
            tmp += ++x;
        }
        if (watchDog++ > 50)
            break;
    }
    return resultArr;
}

//把随机数作为下标，将事项写入页面
var dos = getRandomFromTodoList(dateNum).splice(0,3);
var donts = getRandomFromTodoList(dateNum).splice(3,3);
console.log(dos,donts);
$(".dos li:first-of-type").html(todoList[dos[0]]+"，");
$(".dos li:nth-of-type(2)").html(todoList[dos[1]]+"，");
$(".dos li:last-of-type").html(todoList[dos[2]]);
$(".donts li:first-of-type").html(todoList[donts[0]]+"，");
$(".donts li:nth-of-type(2)").html(todoList[donts[1]]+"，");
$(".donts li:last-of-type").html(todoList[donts[2]]);

var m = num % saying.length;
$(".date p:last-of-type").html(saying[m]);