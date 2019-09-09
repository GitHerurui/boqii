<?php
header('Content-type:text/html;charset=utf-8');
include "conn.php";
$type = isset($_REQUEST['type']) ? $_REQUEST['type']:'';
$num = isset($_REQUEST['num']) ? $_REQUEST['num']:'';
$uid = isset($_REQUEST['uid']) ? $_REQUEST['uid']:'';
$gid = isset($_REQUEST['gid']) ? $_REQUEST['gid']:'';
$sid = isset($_REQUEST['sid']) ? $_REQUEST['sid']:'';

if($type == 'addCart') {
    $sql = "SELECT * from cartlist WHERE gid=$gid AND uid='$uid'";
    $res = $conn->query(($sql));
    if($res->num_rows){
        //有就更改数据
        $sql1 = "UPDATE cartlist SET num=(num + $num) WHERE gid=$gid";
        
    }else {
        //如果没有就插入购物车
        $sql1 = "INSERT INTO cartlist(uid,gid,num) VALUES($uid,$gid,$num)";
       
    }
    $res1 = $conn->query($sql1);

    if($res1){
        echo 'yes';
    }else {
        echo 'no';
    }

}else if($type == 'getdata') {
    $sql = "SELECT num,gid,sid from cartlist WHERE uid = $uid";
    $res = $conn->query(($sql));
    $arr = $res->fetch_all(MYSQLI_ASSOC);//得到一个数组
// var_dump($res2);
$data = array(   
    'data'=>$arr,
);
echo json_encode($data,JSON_UNESCAPED_UNICODE);//把对象转成字符串，

}else if ($type == "numType"){
    $sql="UPDATE cartlist SET num = $num WHERE sid=$sid";
    $res = $conn->query($sql);
    if($res) {
        echo 'yes';
    }else{
        echo 'no';
    }

}else if ($type == "del") {
  $sql = "delete from cartlist where sid = $sid";

  $res = $conn->query($sql);
  if($res) {
      echo 'yes';
  }else{
      echo 'no';
  }
} else if($type == "catrnum"){
    $sql =  $sql = "SELECT num from cartlist WHERE uid = $uid";
    $res = $conn->query(($sql));
    $arr = $res->fetch_all(MYSQLI_ASSOC);//得到一个数组
// var_dump($res2);
$data = array(   
    'data'=>$arr,
);
echo json_encode($arr,JSON_UNESCAPED_UNICODE);//把对象转成字符串，
}


?>