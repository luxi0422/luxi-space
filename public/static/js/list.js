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
$(".top").mouseenter(
    function(){
        $(".top").stop().fadeOut(500);
        $(".top-z").stop().css("display","block");
    }
);
$(".top-z").mouseleave(
    function(){
        $(".top").stop().fadeIn(500);
        $(".top-z").stop().css("display","none");
    }
).click(function(){
    $('html,body').animate({scrollTop:0},1000);
});

//登录
$(".login").mouseenter(
    function(){
        $(".login").stop().fadeOut(500);
        $(".login-z").stop().css("display","block");
    }
);
$(".login-z").mouseleave(
    function(){
        $(".login").stop().fadeIn(500);
        $(".login-z").stop().css("display","none");
    }
).click(function(){
    $(".adminLogin").toggle();
});
$(".adminLogin div").click(function(){
    $(".adminLogin").css("display","none");
});