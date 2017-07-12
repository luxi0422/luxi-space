<?php

namespace app\modules\luxi\model;

class Message extends Base
{
    const TABLE_NAME = 'message';

    static function readById($id)
    {
        $id = intval($id);
        return self::db()->selectOne("select * from message where id = ? order by id desc", $id);
    }

    static function read($page, $limit)
    {
        $page  = max(1, $page);
        $limit = max(1, $limit);
        $start = ($page - 1) * $limit;
        return self::db()->select("select * from message order by id desc limit $start,$limit");
    }

    static function count()
    {
        return self::db()->getOne("select count(*) from message");
    }

    static function create($name, $message)
    {
        return self::db()->insertEx("message", [
            'name'       => $name,
            'message'    => $message,
            'gmt_create' => date('Y-m-d H:i:s')
        ]);
    }

    static function delete($id)
    {
        $id = intval($id);
        return self::db()->delete("delete from message where id = ?", $id);
    }
}