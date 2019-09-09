$(function () {
    /* 图形验证码 */
    let imgCodeText = "";
    /* 密码 */
    let passwordAText = "";
    let passwordBText = "";
    /* 用户名 */
    let usernameText = "";
    /* 手机号码 */
    let phoneText = "";
    let type = '';

    let username = $("#m_nickname");
    let phone = $("#mobile");
    let passwordA = $("#m_password");
    let passwordB = $("#m_repassword");
    let imgCode = $('#m_verify');
    let sendMsgBtn = $("#dhuoqu");
    let msgCode = $("#jym_code");
    let url = "../api/reglogin.php";

    let isok1 = false;
    let isok2 = false;
    let isok3 = false;
    let isok4 = false;
    let isok5 = false;
    let isok6 = false;

    /* 验证码处理 */
    (new Captcha({
        fontSize: 30
    })).draw(document.querySelector('#captcha'), r => {
        console.log(r, '验证码1');
        imgCodeText = r;
        /* 自动触发标签失去焦点的事件 */
        imgCode.trigger("blur");
    });


    /* 正则表达式 */
    let regPhone = /^1[3-9]\d{9}$/; /* 1开头 第二位3-9 后面全都是数字   11位 */
    let regPassword = /^[a-zA-Z0-9]{6,16}$/;

    phone.blur(function (e) {
        let text = $.trim($(this).val());
        type = 'phone';
        phoneText = text;
        if (text.length == 0) {
            $("#mobile_tip").addClass('err').css('display', 'block').html('请输入手机号码!')
        } else if (!regPhone.test(text)) {
            $("#mobile_tip").addClass('err').css('display', 'block').html('请输入正确的手机号码!')
        } else {

            $.ajax({
                type: "post",
                url: url,
                data: {
                    phone: phoneText,
                    type: type
                },
                success: function (res) {
                    // console.log(res);
                    if (res == 'yes') {
                        $("#mobile_tip").removeClass('err').addClass('suc').css('display', 'block').html('');
                        isok1 = true;
                    } else {
                        $("#mobile_tip").addClass('err').css('display', 'block').html('该手机号已注册！');
                        
                    }

                }
            });

        }
    });

    username.blur(function (e) {
        let text = $.trim($(this).val());
        type = 'user';
        usernameText = text;
        if (text.length == 0) {
            $("#m_nickname_tip").addClass('err').css('display', 'block').html('请输入昵称')
        } else if (text.length < 2) {
            $("#m_nickname_tip").addClass('err').css('display', 'block').html('用户昵称不能小于2位!')
        } else {

            $.ajax({
                type: "post",
                url: url,
                data: {
                    username: usernameText,
                    type: type
                },
                success: function (res) {
                    // console.log(res);
                    if (res == 'yes') {
                        $("#m_nickname_tip").removeClass('err').addClass('suc').css('display', 'block').html('');
                        isok4 = true;
                    } else {
                        $("#m_nickname_tip").addClass('err').css('display', 'block').html('该昵称已存在！')
                    }

                }
            });

        }
    });

    passwordA.blur(function (e) {
        let text = $.trim($(this).val());
        passwordAText = text;
        if (text.length == 0) {
            $("#m_password_tip").addClass('err').css('display', 'block').html('请输入密码!')
        } else if (!regPassword.test(text)) {
            $("#m_password_tip").addClass('err').css('display', 'block').html('请输入正确的密码格式!')
        } else {
            $("#m_password_tip").removeClass('err').addClass('suc').css('display', 'block').html('');
            isok2 = true;
        }
    })
    passwordB.blur(function (e) {
        let text = $.trim($(this).val());
        passwordBText = text;
        if (text.length == 0) {
            $("#m_repassword_tip").addClass('err').css('display', 'block').html('请输入密码!')
        } else if (passwordBText != passwordAText) {
            $("#m_repassword_tip").addClass('err').css('display', 'block').html('密码不匹配!')
        } else {
            $("#m_repassword_tip").removeClass('err').addClass('suc').css('display', 'block').html('');
            isok3 = true;
        }
    });
    imgCode.blur(function (e) {
        let text = $.trim($(this).val());        
        if (text.length == 0) {
            $("#m_verify_tip").addClass('err').css('display', 'block');
        } else if (imgCodeText.toLowerCase() != text.toLowerCase()) {
            $("#m_verify_tip").addClass('err').css('display', 'block');
        } else {
            $("#m_verify_tip").removeClass('err').addClass('suc').css('display', 'block');
            isok5 = true;
        }
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

    sendMsgBtn.click(function() {
        msgCodeText = parseInt(Math.random() * 1000000);
        /* 检查手机号码是否正确 */
        console.log(msgCodeText);
        var text = $.trim(phone.val());
        if (text.length != 0 && regPhone.test(text)) {

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
                error: function(XmlHttpRequest, textStatus, errorThrown) {
                    alert("操作失败!");
                },
                success: function(result) {
                    console.log(result) //console变量在ie低版本下不能用
                        // alert(result.showapi_res_code)
                }
            });

            var count = 60;
            var timer = setInterval(function() {
                count--;
                if (count <= 0) {
                    sendMsgBtn.html("发送短信验证码");
                    clearInterval(timer);
                } else {
                    sendMsgBtn.html("重试 " + count + "s");
                }
            }, 1000);
        } else {
            alert("手机号码不正确");
        }

        /* 开启倒计时：当前的标签不可点击 */
    });


    msgCode.blur(function (e) {
        let text = $.trim($(this).val());      
        if (text.length == 0) {
            $("#jym_code_tip").addClass('err').css('display', 'block');
        } else if (msgCodeText != text) {
            $("#jym_code_tip").addClass('err').css('display', 'block');
        } else {
            $("#jym_code_tip").removeClass('err').addClass('suc').css('display', 'block');
            isok6 = true;
        }
    });

    $("#m_register").click(function (e) { 
        type = 'sus';
        let isCheck = $("#m_checkbox").is(":checked");
        if (!isCheck) {
            alert("请阅读并同意用户协议");
            return;
        }
console.log(isok1,isok2,isok3,isok4,isok5,isok6);
        if(isok1 &&
            isok2 &&
            isok3 &&
            isok4 &&
            isok5 &&
            isok6) {
                $.ajax({
                    type: "post",
                    url: url,
                    data: {
                        type:type,
                        phone:phoneText,
                        username:usernameText,
                        password:passwordAText
                    },
                    success: function (res) {
                        console.log(res);
                        if(res == 'yes'){
                            alert('注册失败！')
                        }else {                           
                           alert('恭喜您注册成功！')
                            window.location.href = "./boqiilogin.html"
                        }
                    }
                });
            }


    });


})