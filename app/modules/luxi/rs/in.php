<?php
namespace app\modules\luxi\rs;

use ant\request;
use app\lib\UserException;
use app\modules\luxi\service\Blog as BlogService;

class in extends base
{
    function ajaxPost()
    {
        $userName         = 'luxi';
        $password         = 'ed761736bc814d775f4ebe2773961328';
        $userPostPassword = request::post("password")->trim()->val();
        $userPostUserName = request::post("username")->trim()->val();
        if ($userName == $userPostUserName && $password == md5($userPostPassword . "kevinJPC@!")) {
            session_start();
            $_SESSION['user'] = 1;
            $this->jsonResponseSuccess("登录成功");
        } else {
            throw new UserException("用户名密码错误", 410);
        }
    }
}