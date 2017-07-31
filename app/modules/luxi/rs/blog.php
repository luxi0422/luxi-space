<?php
namespace app\modules\luxi\rs;

use ant\request;
use app\modules\luxi\service\Blog as BlogService;

class blog extends base
{
    function get()
    {
        $this->ajaxGet();
    }

    function ajaxGet()
    {
        $page       = request::get('page')->int(true)->val();
        $limit      = request::get('limit')->int(true)->val();
        $categoryId = request::get('category')->int(true)->val();
        $tag        = request::get('tag')->trim()->val();

        if (!empty($tag)) {
            $result = BlogService::read($page, $categoryId, $limit);
        } else {
            $result = BlogService::read($page, $categoryId, $limit);
        }
        $this->jsonResponseSuccess($result);
    }

    function post()
    {
        $this->ajaxPost();
    }

    function ajaxPost()
    {
        $this->checkLogin();
        $subject    = request::post('subject')->trim()->val();
        $content    = request::post('content')->trim()->val();
        $categoryId = request::post('cateogry_id')->int()->val();
        $blogInfo   = BlogService::create($subject, $content, $categoryId);
        $this->jsonResponseSuccess($blogInfo);
    }

    function ajaxPut()
    {
        $this->checkLogin();
        $subject    = request::post('subject')->trim()->val();
        $content    = request::post('content')->trim()->val();
        $categoryId = request::post('cateogry_id')->int()->val();
        $id         = request::post('id')->int()->val();
        $blogInfo   = BlogService::update($id, $subject, $content, $categoryId);
        $this->jsonResponseSuccess($blogInfo);
    }

    function delete()
    {
        $this->ajaxDelete();
    }

    function ajaxDelete()
    {
        $this->checkLogin();
        $id = request::post('id')->int()->val();
        BlogService::delete($id);
        $this->jsonResponseSuccess($id);
    }
}