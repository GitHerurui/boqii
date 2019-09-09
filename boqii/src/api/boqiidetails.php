<?php
include "conn.php";

$gid = $gid = isset($_REQUEST['gid']) ? $_REQUEST['gid']:'' ;
$type =isset($_REQUEST['type']) ? $_REQUEST['type']:'' ;

if($type = 'boqiidetails'){
    $sql = $sql = "SELECT * FROM `goodslist` WHERE gid = $gid";

    $res = $conn->query($sql);
    $arr = $res->fetch_all(MYSQLI_ASSOC);

    echo json_encode($arr,JSON_UNESCAPED_UNICODE);//把对象转成字符串，

    $conn->set_charset('utf8');

//关闭连接，防止资源浪费
$res->close();
$conn->close();
}
