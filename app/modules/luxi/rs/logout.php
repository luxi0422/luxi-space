<?php
namespace app\modules\luxi\rs;

use ant\request;
use app\modules\luxi\service\Blog as BlogService;

class logout extends base
{
    function ajaxPost()
    {
        session_start();
        unset($_SESSION['user']);

    }
}