<?php

namespace app\modules\luxi\model;

use ant\plugins\db\db;

class Base
{
    static function db()
    {
        return db::getInstance('app', 'luxi');
    }
}