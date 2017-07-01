
$("header .nav ul li a").hover(
    function(){
        $(this).stop().animate({
            "font-size":"30px"
        },500);
    },
    function(){
        $(this).stop().animate({
            "font-size":"20px"
        },500);
    }
);