<?php

require __DIR__ . "/CoordinatesValidator.php";
require __DIR__ . "/AreaChecker.php";

@session_start();

if (!isset($_SESSION["results"])) {
    $_SESSION["results"] = array();
}

if ($_SERVER["request-method"] != "POST") {
    http_response_code(405);
    return;
}

date_default_timezone_set($_POST["timezone"]);

$x = (float)$_POST["x"];
$y = (float)$_POST["y"];
$r = (float)$_POST["r"];

$validator = new Coordinatesvalidator($x, $y, $r);
if ($validator->checkData()) {
    $isInArea = AreaChecker::isInArea($x, $y, $r);
    $coordsStatus = $isInArea
        ? "<span class='success'>Hit</span>"
        : "<span class='fail'>Miss</span>";

    $currentTime = date('Y-m-d H:i:s');
    $benchmarkTime = microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"];

    $newResult = array(
        "x" => $x,
        "y" => $y,
        "r" => $r,
        "coordsStatus" => $coordsStatus,
        "currentTime" => $currentTime,
        "benchmarkTime" => $benchmarkTime
    );
    $_SESSION["results"][] = $newResult;

    echo "<table id='outputTable'>
        <tr>
            <th>x</th>
            <th>y</th>
            <th>r</th>
            <th>Result</th>
            <th>Executed at</th>
            <th>Execution time</th>
        </tr>";

    foreach (array_reverse($_SESSION["results"]) as $tableRow) {
        echo "<tr>";
        echo "<td>" . $tableRow["x"] . "</td>";
        echo "<td>" . $tableRow["y"] . "</td>";
        echo "<td>" . $tableRow["r"] . "</td>";
        echo "<td>" . $tableRow["coordsStatus"] . "</td>";
        echo "<td>" . $tableRow["currentTime"] . "</td>";
        echo "<td>" . $tableRow["benchmarkTime"] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    http_response_code(422);
    return;
}

