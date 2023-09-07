<?php

class AreaChecker
{
    public static function checkArea($x, $y, $r)
    {
        //1st quadrant
        if ($x >= 0 && $y > 0) {
            return ($x * $x + $y * $y) <= ($r * $r);
        }
        //2nd quadrant
        if ($x < 0 && $y > 0) {
            return ($x >= -$r / 2) && ($y <= $r);
        }
        //3rd quadrant
        if ($x < 0 && $y < 0) {
            return ($x >= -$r) && ($y >= -$r) && ($x + $y <= $r);
        }
        return false;
    }
}
