<?php

namespace app\modules\luxi\service;

use app\lib\StringUtil;
use app\lib\UserException;
use \app\modules\luxi\model\Message as MessageModel;

class Message
{
    public static function read($page, $limit)
    {
        $list  = MessageModel::read($page, $limit);
        $count = MessageModel::count();
        return [
            'list'  => $list,
            'count' => $count
        ];
    }

    public static function create($name, $message)
    {
        $name = strip_tags($name);
        $name = StringUtil::jsonSafeFilter($name);
        $name = trim($name);

        $len = mb_strlen($name, 'utf-8');
        if ($len < 1 || $len > 20) {
            throw new UserException("姓名长度应该在1 - 20之间", 410);
        }

        $message = strip_tags($message);
        $message = StringUtil::jsonSafeFilter($message);
        $message = trim($message);
        if (empty($message)) {
            throw new UserException("总得说点啥", 410);
        }

        return MessageModel::create($name, $message);
    }

    public static function delete($id)
    {
        $data = MessageModel::readById($id);
        if ($data) {
            $backUpId = Backup::create(MessageModel::TABLE_NAME, $id, $data, 0);
            if ($backUpId) {
                MessageModel::delete($id);
            }
        }
    }
}