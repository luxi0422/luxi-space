<?php

namespace app\modules\luxi\service;

use app\modules\luxi\model\Backup as BackupModel;

class Backup
{
    public static function create($tableName, $pk, $content, $userId)
    {
        $content = json_encode($content);
        return BackupModel::create($tableName, $pk, $content, $userId);
    }

}