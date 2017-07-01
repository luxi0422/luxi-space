<?php

namespace app\lib;

class StringUtil
{

    public static function jsonSafeFilter($text)
    {
        $text = preg_replace('/\x{2028}|\x{2029}/u', '', $text);
        return $text;
    }
}