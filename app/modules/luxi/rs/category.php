<?php
namespace app\modules\luxi\rs;

use ant\request;
use app\modules\luxi\service\Category as CategoryService;

class category extends base
{
    function get()
    {
        $this->ajaxGet();
    }

    function ajaxGet()
    {
        $result = CategoryService::read();
        $this->jsonResponseSuccess($result);
    }

    function post()
    {
        $this->ajaxPost();
    }

    function ajaxPost()
    {
        $this->checkLogin();
        $name    = request::post('name')->trim()->val();
        $orderBy = request::post('order_by')->int()->val();
        $info    = CategoryService::create($name, $orderBy);
        $this->jsonResponseSuccess($info);
    }

    function ajaxPut()
    {
        $this->checkLogin();
        $name    = request::post('name')->trim()->val();
        $orderBy = request::post('order_by')->int()->val();
        $id      = request::post('id')->int()->val();
        $info    = CategoryService::update($id, $name, $orderBy);
        $this->jsonResponseSuccess($info);
    }

    function delete()
    {
        $this->ajaxDelete();
    }

    function ajaxDelete()
    {
        $this->checkLogin();
        $id = request::post('id')->int()->val();
        CategoryService::delete($id);
        $this->jsonResponseSuccess($id);
    }
}