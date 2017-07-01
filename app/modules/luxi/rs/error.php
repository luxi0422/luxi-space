<?php
namespace app\modules\luxi\rs;

use app\lib\UserException;

class error extends base
{
    function show(UserException $exception)
    {
        $this->jsonResponseError($exception->getCode(), $exception->getMessage());
    }
}