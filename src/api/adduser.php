<?php
    $name = $_POST['username'];
    $password = $_POST['password'];

    $con = mysqli_connect('localhost','root','123456','meizu');

    $sql = "SELECT *  FROM `userlist` WHERE `name` = '$name' AND `password` = '$password'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库链接错误' . mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);
    if(!$row){
        $addSql = "INSERT INTO `userlist` VALUE(null,'$name','$password')";
        $addRes = mysqli_query($con,$addSql);
        if(!$addRes){
            die('数据库链接失败' . mysqli_error($con));
        }
        $arr = array('code'=>$addRes,'mas'=>'添加成功');
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }else{
        $arr1 = array('code'=>'0','mas'=>'添加成功');
        echo json_encode($arr1,JSON_UNESCAPED_UNICODE);
    }
        
    


    
?>