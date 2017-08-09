(function () {
  function setCookie(key, val) {
    document.cookie = key + "=" + val;
  }

  //登录
  $(".adminLogin form").submit(function () {
    var username = $(".adminLogin .username").val();
    var password = $(".adminLogin .password").val();
    $.ajax({
      type: "post",
      url: "http://luxi.space/api/login",
      data: {username: username, password: password},
      dataType: "json",
      success: function (obj) {
        if (obj.code != 200) {
          alert(obj.msg);
        } else {
          var date = new Date();
          date.setTime(date.getTime() + 3600 * 1000);
          setCookie("username", "luxi");
          $("form.text").css("display", "block");
          $(".adminLogin").css("display", "none");
          $(".login").css("display", "none");
          $(".delete").css("display", "block");
        }
      }
    });
    return false;
  });

  //读取cookie
  function getCookie(name){
    var arr = document.cookie.split(";");
    for(var i = 0; i<arr.length; i++){
      var temp = arr[i].split("=");
      if(temp[0] == name){
        return temp[1];
      }
    }
  }

  function checkLogin(callback) {
    if(getCookie("username") == "luxi")  {
      callback();
      return true;
    }
    return false;
  }

  window.checkLogin = checkLogin;
})();