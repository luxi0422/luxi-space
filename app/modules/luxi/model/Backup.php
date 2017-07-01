<?php

namespace app\modules\luxi\model;

class Backup extends Base
{
    static function create($tableName, $pk, $content, $userId)
    {
        return self::db()->insertEx("backup", [
            'table_name' => $tableName,
            'content'    => $content,
            'pk'         => $pk,
            'user_id'    => $userId,
            'gmt_create' => date('Y-m-d H:i:s')
        ]);
    }
}