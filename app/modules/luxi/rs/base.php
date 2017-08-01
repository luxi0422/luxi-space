<?php
namespace app\modules\luxi\rs;

use ant\action;
use ant\request;
use app\lib\UserException;
use app\modules\luxi\service\Message as MessageService;

class base extends action
{
    function init($path)
    {
        parent::init($path);
        //session_set_cookie_params(86400 * 3, '/','');
    }

    function post()
    {
        $this->ajaxPost();
    }

    function get()
    {
        $this->ajaxGet();
    }

    function put()
    {
        $this->ajaxPut();
    }

    function delete()
    {
        $this->ajaxDelete();
    }

    protected function jsonResponse($code, $data, $msg)
    {
        $data = [
            'code' => $code,
            'data' => $data,
            'msg'  => $msg
        ];

//        header('Access-Control-Allow-Headers: Origin, x-requested-with, Content-Type, Accept,X-Cookie');
//        header('Access-Control-Allow-Credentials: true');
//        header('Access-Control-Allow-Methods: GET,POST,PUT,OPTIONS,DELETE');
//        header('Access-Control-Allow-Origin: *');
        header('Content-type:application/json;charset=utf-8');

        echo json_encode($data);
    }

    protected function jsonResponseSuccess($data)
    {
        $this->jsonResponse(200, $data, '');
    }

    protected function jsonResponseError($code, $msg)
    {
        $this->jsonResponse($code, '', $msg);
    }

    protected function checkLogin()
    {
        session_start();
        if (empty($_SESSION['user'])) {
            //throw new UserException("请先登录", 401);
        }
    }
}