<?php

require __DIR__ . "/Coordinatesvalidator.php";
require __DIR__ . "/AreaChecker.php";

@session_start();

if (!isset($_SESSION["results"])) {
    $_SESSION["results"] = array();
}

