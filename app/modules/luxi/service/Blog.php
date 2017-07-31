<?php

namespace app\modules\luxi\service;

use app\lib\StringUtil;
use app\lib\UserException;
use \app\modules\luxi\model\Blog as BlogModel;

class Blog
{
    public static function read($page, $categoryId, $limit)
    {
        $list  = BlogModel::read($page, $categoryId, $limit);
        $count = BlogModel::count();
        return [
            'list'  => $list,
            'count' => $count
        ];
    }

    public static function filter($subject, $content, $categoryId)
    {
        $subject = strip_tags($subject);
        $subject = StringUtil::jsonSafeFilter($subject);
        $subject = trim($subject);

        $len = mb_strlen($subject, 'utf-8');
        if ($len < 1 || $len > 40) {
            throw new UserException("标题长度应该在1 - 40之间", 410);
        }

        $content = strip_tags($content);
        $content = StringUtil::jsonSafeFilter($content);
        $content = trim($content);
        if (empty($content)) {
            throw new UserException("总得说点啥", 410);
        }

        $len = mb_strlen($content, 'utf-8');
        if ($len < 1 || $len > 655350) {
            throw new UserException("留言内容长度在1-655350", 410);
        }

        $categoryInfo = Category::readById($categoryId);
        if (empty($categoryInfo)) {
            throw new UserException("你选的分类不存在", 404);
        }
        return [$subject, $content, $categoryId];
    }

    public static function create($subject, $content, $categoryId)
    {
        list($subject, $content, $categoryId) = self::filter($subject, $content, $categoryId);
        $id = BlogModel::create($subject, $content, $categoryId);
        return BlogModel::readById($id);
    }

    public static function update($id, $subject, $content, $categoryId)
    {
        $id = intval($id);
        if (empty($id)) {
            throw new UserException("文章ID不能为空", 410);
        }

        $blogInfo = BlogModel::readById($id);
        if (empty($blogInfo)) {
            throw new UserException("文章不存在", 410);
        }

        $backUpId = Backup::createByUpdate(BlogModel::TABLE_NAME, $id, $blogInfo, 0);
        if ($backUpId) {
            list($subject, $content, $categoryId) = self::filter($subject, $content, $categoryId);
            BlogModel::update($id, $subject, $content, $categoryId);
        }

        return BlogModel::readById($id);
    }

    public static function delete($id)
    {
        $data = BlogModel::readById($id);
        if ($data) {
            $backUpId = Backup::create(BlogModel::TABLE_NAME, $id, $data, 0);
            if ($backUpId) {
                BlogModel::delete($id);
            }
        }
    }

    public static function clearCategory($categoryId)
    {
        return BlogModel::clearCategory($categoryId);
    }
}