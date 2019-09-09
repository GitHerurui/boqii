<?php
//防止乱码
header('Content-type:text/html;charset=utf-8');
include "conn.php";
$type = isset($_REQUEST['type']) ? $_REQUEST['type']:'';
$page = isset($_REQUEST['page']) ? $_REQUEST['page']:'1';
$num = isset($_REQUEST['num']) ? $_REQUEST['num']:'20';
$order = isset($_REQUEST['order']) ? $_REQUEST['order']: 'asc';
$min = isset($_REQUEST['min']) ? $_REQUEST['min']:'' ;
$max = isset($_REQUEST['max']) ? $_REQUEST['max']:'' ;
$content = isset($_REQUEST['content']) ? $_REQUEST['content']:'' ;
$gid = isset($_REQUEST['gid']) ? $_REQUEST['gid']:'' ;

//写sql语句
$index = ($page - 1)* $num;

//写查询语句
if($type == '') {
    $sql = "SELECT * FROM goodslist limit $index,$num";
    $sql2 = "SELECT * FROM goodslist";
} else if($type == 'sort') {
    $sql = "SELECT * FROM goodslist ORDER BY price $order limit $index,$num";
    $sql2 = "SELECT * FROM goodslist ORDER BY price $order";
} else if($type == 'sold'){
    $sql = "SELECT * FROM `goodslist` ORDER BY sold DESC limit $index,$num";
    $sql2 = "SELECT * FROM goodslist ORDER BY sold DESC";

} else if($type == 'new') {
    $sql = "SELECT * FROM `goodslist` ORDER BY sold asc limit $index,$num";
    $sql2 = "SELECT * FROM goodslist ORDER BY sold asc";

}  else if($type == 'comment') {
    $sql = "SELECT * FROM `goodslist` ORDER BY comment DESC limit $index,$num";
    $sql2 = "SELECT * FROM goodslist ORDER BY comment DESC";

} else if ($type == 'search_sort') {
    $sql = "SELECT * FROM goodslist WHERE title like '%$content%' limit $page,$num";
    $sql2 = "SELECT * FROM goodslist WHERE title like '%$content%'";
} 

//执行语句
$res = $conn->query($sql);//结果包含很多信息，其中数据部分就是想要的，要特意用方法来提取出来
$res2 = $conn->query($sql2);
//提取数据

$arr = $res->fetch_all(MYSQLI_ASSOC);//得到一个数组
// var_dump($res2);
$data = array(
    'total'=> $res2->num_rows,
    'data'=>$arr,
    'page'=>$page,
    'num'=>$num
);

//把数组转成字符串，传给前端，一个接口文件只能输出一次；

echo json_encode($data,JSON_UNESCAPED_UNICODE);//把对象转成字符串，JSON_UNESCAPED_UNICODE防止转义

//防止乱码
$conn->set_charset('utf8');

//关闭连接，防止资源浪费
$res->close();
$conn->close();
?>