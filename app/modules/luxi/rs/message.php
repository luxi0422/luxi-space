<?php
namespace app\modules\luxi\rs;

use ant\request;
use app\modules\luxi\service\Message as MessageService;

class message extends base
{
    function get()
    {
        $this->ajaxGet();
    }

    function ajaxGet()
    {
        $page   = request::get('page')->int(true)->val();
        $limit  = request::get('limit')->int(true)->val();
        $result = MessageService::read($page, $limit);
        $this->jsonResponseSuccess($result);
    }

    function post()
    {
        $this->ajaxPost();
    }

    function ajaxPost()
    {
        $name    = request::post('name')->trim()->val();
        $message = request::post('message')->trim()->val();
        $id      = MessageService::create($name, $message);
        $this->jsonResponseSuccess($id);
    }

    function delete()
    {
        $this->ajaxDelete();
    }

    function ajaxDelete()
    {
        $id = request::post('id')->int()->val();
        MessageService::delete($id);
        $this->jsonResponseSuccess($id);
    }
}