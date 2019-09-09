<?php
//防止乱码
header('Content-type:text/html;charset=utf-8');
include "conn.php";

$gid = isset($_REQUEST['gid']) ? $_REQUEST['gid']:'' ;

//写查询语句
$sql = "select * from goodslist where gid = $gid";

$res = $conn->query($sql);
$arr = $res->fetch_all(MYSQLI_ASSOC);//得到一个数组
// var_dump(($arr));
echo json_encode($arr,JSON_UNESCAPED_UNICODE);//把
//防止乱码
$conn->set_charset('utf8');

//关闭连接，防止资源浪费
$res->close();
$conn->close();
?>