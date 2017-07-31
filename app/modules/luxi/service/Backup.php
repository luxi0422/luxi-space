<?php

namespace app\modules\luxi\service;

use app\modules\luxi\model\Backup as BackupModel;

class Backup
{
    public static function create($tableName, $pk, $content, $userId, $editType = 1)
    {
        $content = json_encode($content);
        return BackupModel::create($tableName, $pk, $content, $userId, $editType);
    }

    public static function createByUpdate($tableName, $pk, $content, $userId)
    {
        return self::create($tableName, $pk, $content, $userId, BackupModel::UPDATE);
    }

}