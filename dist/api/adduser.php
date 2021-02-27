<?php
    $name = $_POST['username'];
    $password = $_POST['password'];

    $con = mysqli_connect('localhost','root','123456','meizu');

    
        $addSql = "INSERT INTO `userlist` VALUE(null,'$name','$password')";
        $addRes = mysqli_query($con,$addSql);
        if(!$addRes){
            die('数据库链接失败' . mysqli_error($con));
        }
        $arr = array('code'=>$addRes,'mas'=>'添加成功');
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    


    
?>