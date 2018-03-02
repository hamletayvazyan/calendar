<?php

$year = date('o');
$monthNum = date('n');
$Day = date("j");

echo $Day, ' ';

if(isset($_GET['next'])) $monthNum = $_GET['next'];
if(isset($_GET['nextyear']))$year = $_GET['nextyear'];

$StartDay = date("N", mktime(0, 0, 0, $monthNum, 1, $year));
$countDays = date('t',mktime(0, 0, 0, $monthNum, 1, $year));

echo $monthNum, ' ', $year, ' ', $StartDay, ' ', $countDays;