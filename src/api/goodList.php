<?php
    $index = $_GET['index'];
    $length = $_GET['length'];
    $con = mysqli_connect('localhost', 'root', '123456', 'meizu');
    $array = array();
    $totalSql = "SELECT * FROM `goods`";
    $totalRes = mysqli_query($con,$totalSql);

    $arrTotal = array();
    $rowTotal = mysqli_fetch_assoc($totalRes);
    while($rowTotal){
        array_push($arrTotal,$rowTotal);
        $rowTotal = mysqli_fetch_assoc($totalRes);
    }
    $array['total'] = count($arrTotal);
    $start = ($index-1)*$length;

    $sql = "SELECT * FROM `goods` LIMIT $start,$length";
    $res = mysqli_query($con,$sql);
    $arr = array();
    $row = mysqli_fetch_assoc($res);
    while($row){
        array_push($arr,$row);
        $row = mysqli_fetch_assoc($res);
    }
    $array['list'] = $arr;
    $array['listLength'] = count($arr);
    print_r(json_encode($array,JSON_UNESCAPED_UNICODE));


?>