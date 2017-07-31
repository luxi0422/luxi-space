<?php

namespace app\modules\luxi\model;

class Backup extends Base
{
    const UPDATE = 2;
    const DELETE = 1;

    static function create($tableName, $pk, $content, $userId, $editType)
    {
        return self::db()->insertEx("backup", [
            'table_name' => $tableName,
            'content'    => $content,
            'pk'         => $pk,
            'user_id'    => $userId,
            'gmt_create' => date('Y-m-d H:i:s'),
            'edit_type'  => $editType
        ]);
    }
}