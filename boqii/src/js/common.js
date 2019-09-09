//公共的函数(库)：使用频率比较高的函数，封装好了就可以反复调用。jquery

/*
https://blog.csdn.net/qq_40028324/article/details/82454829 生成注释的插件
 * @Description: 封装生成随机颜色函数:可以生成16进制和rgb格式的
 * @Author: 良哥
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-08-08 09:55:51
 * @LastEditors: Please set LastEditors
 */
function randomColor(type) {
    var color = '';//存结果
    if (type == 16) {
        //生成16进制随机颜色
        color += '#';//#
        var html = '0987654321abcdef';
        for (var i = 0; i < 6; i++) {
            var num = parseInt(Math.random() * 16);
            color += html[num];
        }
        // console.log(color);

    } else if (type == 'rgb') {
        //生成rgb格式的颜色
        var r = parseInt(Math.random() * 256);//0-255
        var g = parseInt(Math.random() * 256);//0-255
        var b = parseInt(Math.random() * 256);//0-255
        color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        // console.log(color);
    }
    return color;
}

/*
 * @Description: 封装生成4位随机验证码：72Uk，数字和字母组合的随机验证码
 * @Author: 良哥
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function randomCode() {
    var html = '0987654321zxcvbnmlkjhgfdsaqwertyuiopZXCVBNMLKJHGFDSAQWERTYUIOP';
    //生成四个随机数
    var res = '';
    for (var i = 0; i < 4; i++) {
        var num = parseInt(Math.random() * html.length);//0- html.length-1
        res += html[num];
    }
    return res;
}

/*
 * @Description: 封装获取某个范围内随机数的方法:10-50数字
 * @Author: 良哥
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function ranNum(min, max) {
    //1 * max - min + min
    return parseInt(Math.random() * (max - min + 1)) + min;//0-1
}

/*
* @Description: 封装函数实现通过id查找元素
* @Author: 良哥
* @Date: 2019-07-23 15:21:00
* @LastEditTime: 2019-07-23 16:10:27
* @LastEditors: Please set LastEditors
*/

function getid(id) {
    return document.getElementById(id);
}

/*
* @Description: 封装把参数变成对象
* @Author: 良哥
* @Date: 2019-07-23 15:21:00
* @LastEditTime: 2019-07-23 16:10:27
* @LastEditors: Please set LastEditors
*/

function strToObj(str) {//name=laoxie&age=18&sex=male
    var obj = {};
    var arr = str.split('&');//["name=laoxie", "age=18", "sex=male"]
    arr.forEach(function (item) {
        var arr2 = item.split('=');
        obj[arr2[0]] = arr2[1];
    });
    return obj;
}

/*
 * @Description: 封装把对象变成参数
 * @Author: 良哥
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function objToStr(obj) {
    var str = '';
    for (var key in obj) {
        str += key + '=' + obj[key] + '&';
    }
    return str.slice(0, -1);
}

/*
 * @Description: 封装补零函数
 * @Author: 良哥
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function toDb(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return '' + num;
    }
}

/*
 * @Description: 封装设置和获取样式
 * @Author: 良哥
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function css() {
    if (arguments.length == 2) {
        //获取样式
        if (getComputedStyle(arguments[0], false)) {
            //高级浏览器
            return getComputedStyle(arguments[0], false)[arguments[1]];
            //getComputedStyle(h1, false)['top'];
        } else {
            //IE8-
            return arguments[0].currentStyle[arguments[1]];
        }
    } else if (arguments.length == 3) {
        //设置样式  ele.style.width = '200px'
        arguments[0].style[arguments[1]] = arguments[2];
    }
}


/*
 * @Description: 封装事件绑定函数
 * @Author: 良哥
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function bind(ele, type, fn) {
    if (ele.addEventListener) {
        //主流浏览器
        ele.addEventListener(type, fn, false);//false:冒泡
    } else {
        ele.attachEvent('on' + type, fn);
    }
}

/*
 * @Description: 封装正则验证
 * @Author: 良哥
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

var checkReg = {
    email: function (str) {
        var reg = /^[\w&%$#!\-]+@[\w&%$#!\-]+\.[a-zA-Z]+$/;
        return reg.test(str);
    },
    tel: function (str) {
        var reg = /^1[3-9]\d{9}$/;
        return reg.test(str);
    },
    trim: function (str) {
        var reg = /^\s+|\s+$/;
        return str.replace(reg, '');
    }
}

/*
 * @Description: 封装表单验证
 * @Author: 良哥
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function checkInput(ele, reg, inf, meg) {
    /*
                参数一：ele 要正则验证的表单
                参数二：reg 正则不同
                参数三：inf 提示信息节点不同
                参数四：meg 提示信息不同,对象
    */

    ele.onblur = function () {
        var val = ele.value.trim();
        var index = this.dataset.index;//用自定义属性的值作为开关对象的属性名
        //1.非空验证
        if (val) {
            //2.正则验证
            // var regEmail = /^[\w&%$#!\-]+@[\w&%$#!\-]+\.[a-zA-Z]+$/;
            // var res = regEmail.test(email);
            // eval():把字符串转成js
            // var str = `checkReg.${reg}(val)`;//方法一：借助一个方法eval()
            var res = checkReg[reg](val);//方法二：利用对象属性名可以接收变量的特性实现
            // console.log(eval(str), res);
            // var res = reg(val);//实参
            // console.log(res);
            // var res = checkReg.email(val);
            if (res) {
                //符合规则
                inf.innerHTML = meg.success;
                inf.style.color = '#58bc58';
                ele.istrue = true;
            } else {
                //不符合规则
                inf.innerHTML = meg.failure;
                inf.style.color = 'red';
                ele.istrue = false;
            }
        } else {
            inf.innerHTML = meg.null;
            inf.style.color = 'red';
            ele.istrue = false;
        }
    }
}

/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fnend) {

    clearInterval(obj.timer); //防止定时器叠加
    obj.timer = setInterval(function () {

        var istrue = true;

        //1.获取属性名，获取键名：属性名->初始值
        for (var key in json) { //key:键名   json[key] :键值
            //			console.log(key); //width heigth opacity
            var cur = 0; //存初始值

            if (key == 'opacity') { //初始值
                cur = css(obj, key) * 100; //透明度
            } else {
                cur = parseInt(css(obj, key)); // 300px  300  width heigth borderwidth px为单位的

            }

            //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
            //距离越大，速度越大,下面的公式具备方向
            var speed = (json[key] - cur) / 6; //出现小数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

            //保证上一个属性全部都达到目标值了
            if (cur != json[key]) { //width 200 heigth 400
                istrue = false; //如果没有达到目标值，开关false
            } else {
                istrue = true; //true true
            }

            //3、运动
            if (key == 'opacity') {
                obj.style.opacity = (cur + speed) / 100; //0-1
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //0-100
            } else {
                obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
            }

        }

        //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
        if (istrue) { //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if (fnend) { //可选参数的由来
                fnend();
            }
        }

    }, 30); //obj.timer 每个对象都有自己定时器

}

function ajax(opt) {
    //默认参数
    let defaultData = {
        data: '',
        asyn: true,
        failure: null
    }

    Object.assign(defaultData, opt);//用默认参数

    let xhr = new XMLHttpRequest();
    if (defaultData.type.toLowerCase() == 'get') {
        //get方式
        if (defaultData.data) {
            defaultData.data = objToStr(defaultData.data);
            defaultData.url += '?' + defaultData.data;
        }
        xhr.open('get', defaultData.url, defaultData.asyn);
        xhr.send(null);
    } else if (defaultData.type.toLowerCase() == 'post') {
        //post方式
        xhr.open('post', defaultData.url, defaultData.asyn);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        defaultData.data = objToStr(defaultData.data);
        xhr.send(defaultData.data);
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 304) {
                //成功了
                let data = xhr.responseText;
                defaultData.success(data);//实参
            } else {
                //失败
                if (defaultData.failure) {
                    //写了这个回调
                    defaultData.failure(xhr.status);
                }
            }
        }
    }
}

function getTime(sec) {
    //传秒数，转成：2019-06-25 14:00:00
    var date = new Date(sec * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var mins = date.getMinutes();
    var secs = date.getSeconds();
    return {
        year,
        month,
        day,
        hours,
        mins,
        secs
    }
}

//设置cookie:document.cookie = name=value[;expires=date][;path=路径][;domain=域名]
function setCookie(key, val, iDay) {
    //key键名,val键值,iDay失效时间
    var str = key + '=' + val + ';path=/';
    if (iDay) {
        var date = new Date();
        date.setDate(date.getDate() + iDay);
        str += ';expires=' + date;//如果有这个参数就设置失效时间
    }
    document.cookie = str;
}

//获取cookie
function getCookie(key) {
    //传键名，返回对应键值  name=小鱿鱼; age=20
    var str = document.cookie;
    var arr = str.split('; ');//['name=小鱿鱼','age=20']
    for (var ele of arr) {
        var arr2 = ele.split('=');//['name','小鱿鱼']
        if (key == arr2[0]) {
            return arr2[1];
        }
    }
}

//删除cookie
function removeCookie(key) {
    setCookie(key, '', -1);
}


var cookieObj = {
    setCookie() {

    },
    getcookie() {

    },
    removecookie() {

    }
}