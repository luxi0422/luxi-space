<?php
namespace app\modules\luxi\rs;

use ant\action;
use app\modules\luxi\service\Message;

class test extends action
{
    function get()
    {
       Message::test();
    }
}