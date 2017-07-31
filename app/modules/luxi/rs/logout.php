<?php
namespace app\modules\luxi\rs;

use ant\request;
use app\modules\luxi\service\Blog as BlogService;

class logout extends base
{
    function post(){
        $this->ajaxPost();
    }

    function ajaxPost()
    {
        session_start();
        unset($_SESSION['user']);
        $this->jsonResponseSuccess("退出成功");
    }
}