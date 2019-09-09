<?php
header('Content-type:text/html;charset=utf-8');
include "conn.php";
$phone    = isset($_REQUEST['phone']) ? $_REQUEST['phone']:'';
$username = isset($_REQUEST['username']) ? $_REQUEST['username']:'';
$password = isset($_REQUEST['password']) ? $_REQUEST['password']:'';
$type = isset($_REQUEST['type']) ? $_REQUEST['type']:'';


if($type == 'phone') {
    $sql = "SELECT * FROM userlist WHERE phonenum = '$phone'";

} else if($type == 'user'){
$sql = "SELECT * FROM userlist WHERE username = '$username'";

} else if ($type == 'sus'){
    $sql = "INSERT INTO `userlist` (`username`, `password`, `phonenum`) VALUES ('$username', '$password', '$phone')";

}else if($type == 'login'){
    $sql = "SELECT * FROM userlist WHERE (username = $username) or (phonenum = $username) and password = $password";
    
} else if ($type == 'getuid'){
    $sql = "SELECT uid FROM userlist WHERE (username = $username) or (phonenum = $username)";
}

$res = $conn->query($sql);

$arr = $res->fetch_all(MYSQLI_ASSOC);//得到一个数组

if($type == 'phone' || $type == 'user' || $type == 'login'){
    if($res->num_rows) {

    echo 'no';
    
} else {

    echo 'yes';
}
} else if($type == 'sus'){
    if($res){
        echo 'yes';
    }else {
        echo 'no';
    }
} else if($type == 'getuid'){
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
};
//防止乱码
$conn->set_charset('utf8');

//关闭连接，防止资源浪费
$res->close();
$conn->close();
?>
