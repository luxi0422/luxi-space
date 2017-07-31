<?php

namespace app\modules\luxi\model;

class Blog extends Base
{
    const TABLE_NAME = 'blog';

    static function readById($id)
    {
        $id = intval($id);
        return self::db()->selectOne("select * from " . self::TABLE_NAME . " where id = ? order by id desc", $id);
    }

    static function readByTag($tag)
    {

    }

    static function read($page, $categoryId = 0, $limit = 20)
    {
        $page       = max(1, $page);
        $limit      = max(1, $limit);
        $categoryId = intval($categoryId);
        $start      = ($page - 1) * $limit;

        if ($categoryId) {
            return self::db()->select("select * from " . self::TABLE_NAME . "
             where category_id = ? order by id desc limit $start,$limit", $categoryId);
        } else {
            return self::db()->select("select * from " . self::TABLE_NAME . " order by id desc limit $start,$limit");
        }
    }

    static function count($categoryId = 0)
    {

        $categoryId = intval($categoryId);
        if ($categoryId) {
            return self::db()->getOne("select count(*) from " .
                self::TABLE_NAME . " where category_id = ?",
                $categoryId);
        } else {
            return self::db()->getOne("select count(*) from " . self::TABLE_NAME);
        }
    }

    static function create($subject, $content, $categoryId)
    {
        return self::db()->insertEx(self::TABLE_NAME, [
            'subject'     => $subject,
            'content'     => $content,
            'category_id' => $categoryId,
            'gmt_create'  => date('Y-m-d H:i:s')
        ]);
    }

    static function delete($id)
    {
        $id = intval($id);
        return self::db()->delete("delete from " . self::TABLE_NAME . " where id = ?", $id);
    }

    public static function update($id, $subject, $content, $categoryId)
    {
        return self::db()->updateEx(self::TABLE_NAME, [
            'subject'      => $subject,
            'content'      => $content,
            'category_id'  => $categoryId,
            'gmt_modified' => date('Y-m-d H:i:s')
        ], "id=?", [$id]);
    }

    public static function clearCategory($categoryId)
    {
        $categoryId = intval($categoryId);
        return self::db()->updateEx(self::TABLE_NAME, ["category_id" => 0], 'category_id=?', [$categoryId]);
    }
}