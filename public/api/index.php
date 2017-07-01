<?php


include_once("../../ant/entry.php");
define('APP_NAMESPACE_ROOT', 'app\\modules\\luxi');
define('APP_URL_PREFIX', 'api');
define('AUTOLOAD_ROOT', dirname(dirname(__DIR__)) . '/');
define('DEBUG', 1);

try {
    \ant\entry::run();
} catch (\app\lib\UserException $e) {
    (new \app\modules\luxi\rs\error())->show($e);
} catch (\Exception $e) {
    //drop
}
