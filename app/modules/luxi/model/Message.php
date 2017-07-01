<?php

namespace app\modules\luxi\model;

use ant\plugins\db\db;

class Message extends Base
{
    static function test()
    {
        print_r(self::db()->select("select * from message"));
    }
}