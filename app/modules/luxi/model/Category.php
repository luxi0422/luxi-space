<?php

namespace app\modules\luxi\model;

class Category extends Base
{
    const TABLE_NAME = 'category';

    static function readById($id)
    {
        $id = intval($id);
        return self::db()->selectOne("select * from " . self::TABLE_NAME . " where id = ? order by id desc", $id);
    }

    static function read()
    {

        return self::db()->select("select * from " . self::TABLE_NAME . " order by order_by asc");
    }

    static function create($name, $orderBy)
    {
        $orderBy = intval($orderBy);
        return self::db()->insertEx(self::TABLE_NAME, [
            'name'       => $name,
            'order_by'   => $orderBy,
            'gmt_create' => date('Y-m-d H:i:s')
        ]);
    }

    static function delete($id)
    {
        $id = intval($id);
        return self::db()->delete("delete from " . self::TABLE_NAME . " where id = ?", $id);
    }

    public static function update($id, $name, $orderBy)
    {
        $orderBy = intval($orderBy);
        return self::db()->updateEx(self::TABLE_NAME, [
            'name'         => $name,
            'order_by'     => $orderBy,
            'gmt_modified' => date('Y-m-d H:i:s')
        ], 'id=?', [$id]);
    }
}