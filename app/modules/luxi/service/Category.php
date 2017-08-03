<?php

namespace app\modules\luxi\service;

use app\lib\StringUtil;
use app\lib\UserException;
use \app\modules\luxi\model\Category as CategoryModel;

class Category
{
    public static function readById($id)
    {
        $id = intval($id);
        if (empty($id)) {
            throw new UserException("必须选择一个分类");
        }

        return CategoryModel::readById($id);
    }

    public static function read()
    {
        $list  = CategoryModel::read();
        $count = count($list);
        return [
            'list'  => $list,
            'count' => $count
        ];
    }

    public static function filter($name, $orderBy)
    {
        $name = strip_tags($name);
        $name = StringUtil::jsonSafeFilter($name);
        $name = trim($name);

        $len = mb_strlen($name, 'utf-8');
        if ($len < 1 || $len > 20) {
            throw new UserException("分类名长度应该在1 - 20之间", 410);
        }
        $orderBy = intval($orderBy);

        return [$name, $orderBy];
    }

    public static function create($name, $orderBy)
    {
        list($name, $orderBy) = self::filter($name, $orderBy);
        $id = CategoryModel::create($name, $orderBy);
        return CategoryModel::readById($id);
    }

    public static function update($id, $name, $orderBy)
    {
        $id = intval($id);
        if (empty($id)) {
            throw new UserException("分类ID不能为空", 410);
        }
        $categoryInfo = CategoryModel::readById($id);
        if (empty($categoryInfo)) {
            throw new UserException("分类不存在", 410);
        }

        $backUpId = Backup::createByUpdate(CategoryModel::TABLE_NAME, $id, $categoryInfo, 0);
        if ($backUpId) {
            list($name, $orderBy) = self::filter($name, $orderBy);
            CategoryModel::update($id, $name, $orderBy);
        }

        return CategoryModel::readById($id);
    }

    public static function delete($id)
    {
        $data = CategoryModel::readById($id);
        if ($data) {
            $backUpId = Backup::create(CategoryModel::TABLE_NAME, $id, $data, 0);
            if ($backUpId) {
                CategoryModel::delete($id);
                Blog::clearCategory($id);
            }
        }
    }
}