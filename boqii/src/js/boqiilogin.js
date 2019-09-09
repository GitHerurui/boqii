$(function () {
    $(".login-list-tab").click(function (e) {

        $(this).addClass('curr').siblings().removeClass('curr');
        let dat = $(this).data('index');
        console.log(dat);
        if (dat == 1) {
            $('.login-by-passwd').css('display', 'block');
            $(".a_login_password").css('display', 'block');
            $('.operate').css('display', 'block');
            $('.login-by-code').css('display', 'none');
            $(".a_login_code").css('display', 'none');
        };
        if (dat == 2) {
            $('.login-by-code').css('display', 'block');
            $(".a_login_code").css('display', 'block');
            $(".a_login_password").css('display', 'none');
            $('.login-by-passwd').css('display', 'none');
        }

    });

    let imgCodeText = "";
    /* 密码 */
    let passwordText = "";
    let usernameText = "";
    let userCodeText = "";
    let msgCodeText = "";
    /* 手机号码 */
    let phoneText = "";
    let type = '';
    let isok1 = false;
    let isok2 = false;

    let loginbtn = $("#a_login_code");
    let username = $("#username");
    let phone = $("#userphone");
    let password = $("#password");
    let imgCode = $('#m_verify');
    let sendMsgBtn = $("#getLoginCode");
    let msgCode = $("#usercode");
    let regPhone = /^1[3-9]\d{9}$/;
    /* 验证码处理 */
    (new Captcha({
        fontSize: 30
    })).draw(document.querySelector('#captcha'), r => {
        console.log(r, '验证码1');
        imgCodeText = r;
        /* 自动触发标签失去焦点的事件 */
        imgCode.trigger("blur");
    });


    function formatterDateTime() {
        var date = new Date()
        var month = date.getMonth() + 1
        var datetime = date.getFullYear() +
            "" // "年"
            +
            (month >= 10 ? month : "0" + month) +
            "" // "月"
            +
            (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate()) +
            "" +
            (date.getHours() < 10 ? "0" + date.getHours() : date
                .getHours()) +
            "" +
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                .getMinutes()) +
            "" +
            (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                .getSeconds());
        return datetime;
    }

    sendMsgBtn.click(function () {
        msgCodeText = parseInt(Math.random() * 1000000);
        /* 检查手机号码是否正确 */
        phoneText = $.trim($("#userphone").val())
        console.log(msgCodeText);
        var text = $.trim(phone.val());
        if (text.length != 0 && regPhone.test(phoneText)) {

            /* 发送网络请求：发短信 */
            $.ajax({
                type: 'post',
                url: 'http://route.showapi.com/28-1',
                dataType: 'json',
                data: {
                    "showapi_timestamp": formatterDateTime(),
                    "showapi_appid": '100963', //这里需要改成自己的appid
                    "showapi_sign": '5327fb0bc71848fe8502aabe2bc6726f', //这里需要改成自己的应用的密钥secret
                    "mobile": text,
                    "content": `{"code":${msgCodeText},"minute":"3","comName":"波奇网"}`,
                    "tNum": "T150606060601",
                    "big_msg": ""
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    alert("操作失败!");
                },
                success: function (result) {
                    console.log(result) //console变量在ie低版本下不能用
                    // alert(result.showapi_res_code)
                }
            });

            var count = 60;
            var timer = setInterval(function () {
                count--;
                if (count <= 0) {
                    sendMsgBtn.html("发送短信验证码");
                    clearInterval(timer);
                } else {
                    sendMsgBtn.html("重试 " + count + "s");
                }
            }, 1000);
        } else {
            $("#login_tip").css("display", "block").html("请输入正确的手机号");
        }

        /* 开启倒计时：当前的标签不可点击 */
    });
    //手机验证登录
    loginbtn.click(function (e) {
        type = 'phone';
        phoneText = $.trim($("#userphone").val())
        text = $.trim(msgCode.val());
        if (phoneText.length == 0) {
            $("#login_tip").css("display", "block").html("请输入手机号");
            
        } else if (text.length == 0) {
            $("#login_tip").css("display", "block").html("请输入短信验证码！");
        } else if (text != msgCodeText) {
            $("#login_tip").css("display", "block").html("验证码有误！");

        } else {
            $("#login_tip").css("display", "none").html("");
            isok2 = true;
        }
        
        if (isok2) {
            $.ajax({

                type: "post",
                url: "../api/reglogin.php",
                data: {
                    type: type,
                    phone: phoneText
                },
                success: function (res) {
                    if (res == 'yes') {
                        $("#login_tip").css("display", "block").html("您的手机号尚未注册！");
                    } else {
                        let oldname = getCookie('name');
                        if(oldname){
                            alert('你已登录');
                            let url = localStorage.url;

                            if(url){
                                location.href = url;
                            }else {
                                window.location.href = "../boqimain.html"
                            }
                        }else {

                            $.ajax({
                                type: "post",
                                url: "../api/reglogin.php",
                                data: {
                                    type:type,
                                    username:usernameText
                                },
                                dataType:'json',
                                success: function (res) {
                                  let uid = res[0].uid*1
                                    setCookie('uid', uid, 7);
                                }
                            });
                            setCookie('name', phoneText, 7);
                            alert("登录成功！")

                            let url = localStorage.url;

                            if(url){
                                location.href = url;
                            }else {
                                window.location.href = "../boqimain.html"
                            }
                        
                        }
                        
                    }
                }
            });
        }



    });

    //账号密码登录
    console.log($("#a_login"));
    $("#a_login").click(function (e) {
        console.log(555);
        type = 'login';
        usernameText = username.val();
        passwordText = password.val();
        text = imgCode.val();
        if (usernameText.length == 0) {
            $("#login_tip").css("display", "block").html("请输入用户名或者手机号！");
        } else if (passwordText.length == 0) {
            $("#login_tip").css("display", "block").html("请输入密码！");
        } else if (text.length == 0) {
            $("#login_tip").css("display", "block").html("请输入验证码！")
        } else if (imgCodeText.toLowerCase() != text.toLowerCase() ) {
            $("#login_tip").css("display", "block").html("验证码不匹配！")
        }else {
            $.ajax({
                type: "post",
                url: "../api/reglogin.php",
                data: {
                    type:type,
                    username:usernameText,
                    password:passwordText
                },
                success: function (res) {
                    console.log(res);

                    if(res == 'yes'){
                        alert('登录失败！密码或用户名不匹配')
                    }else {
                        let oldname = getCookie('name');
                        type = 'getuid';
                        if(oldname){
                            alert('你已登录');
                        }else {
                            $.ajax({
                                type: "post",
                                url: "../api/reglogin.php",
                                data: {
                                    type:type,
                                    username:usernameText
                                },
                                dataType:'json',
                                success: function (res) {
                                  let uid = res[0].uid*1
                                    setCookie('uid', uid, 7);
                                }
                            });


                            setCookie('name', usernameText, 7);
                            alert("登录成功！")
                            let url = localStorage.url;

                            if(url){
                                location.href = url;
                            }else {
                                window.location.href = "../boqimain.html"
                            }
                        
                        }
                    }
                }
            });
        }

    });





})