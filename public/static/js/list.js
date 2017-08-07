//导航栏滚动改变
window.onscroll = function(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if(scrollTop > 80 && screen.width > 768 && $(window).width() > 768){
        $(".main .sidebar").show(500);
        $(".main .deco").animate({"marginTop":"-120px"},0);
    }else if(scrollTop <= 80 && screen.width > 768 && $(window).width() > 768){
        $(".main .sidebar")[0].style.display = "";
        $(".main .deco").animate({"marginTop":"0"},0);
    }else{  //小屏的时候全都不显示
        $(".main .deco")[0].style.display = "";
    }
};

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
