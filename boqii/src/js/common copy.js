// 1.生成随机颜色
function randomColor(type) {
    var color = ''; //用来保存结果
    if (type == 16) {
        //生成16进制的随机颜色
        color += '#';
        var html = '0123456789abcdef';
        for (var i = 0; i < 6; i++) {
            var num = parseInt(Math.random() * 16);
            color += html[num];
        }
        // console.log(color);
    }

}

// 2.生成一定范围内的随机数
function randomNum(min, max) {
    var a = parseInt(Math.random() * (max - min + 1)) + min;
    return a;

}

// 3.通过id获取元素
function getid(id) {
    return document.getElementById(id);
}

// 4.去掉数组中的重复项，并返回一个新的数组
function norepeat(arr) { //形参：用来接收回调函数的
    var res = []; //存处理好的数据，以后要返回到入口处
    arr.forEach(function (val) { //val指的是arr4里面每一项值
        if (res.indexOf(val) == -1) {
            res.push(val);
        }
    });
    return res;
}

// 5.去掉字符串中的重复项，并返回一个新的字符串
function norepeatStr(str) { //形参：用来接收回调函数的
    var str1 = ''; //存处理好的数据，以后要返回到入口处

    for (var i = 0; i < str.length; i++) {
        if (str1.indexOf(str[i]) == -1) {
            str1 += str[i];
        }
    }
    return str1;
}

// 6.把一堆的敏感词都替换掉
function filterStr(str) {
    var arr = ["fuck", '操', '反清复明', '金三胖', '去死', 'MMP', '妈蛋', '垃圾'];
    // var reg = new RegExp(word,"ig"); //构造函数的方式创建一个正则表达式
    for (var i = 0; i < arr.length; i++) {
        var word = arr[i];
        var reg = new RegExp(word, 'ig'); //构造函数的方式创建一个正则表达式
        str = str.replace(reg, '***');
    }
    return str;
}

// 7.封装把参数变成对象
//name=laoxie&age=18&sex=male ---> obj{name:'laoxie',age:'18',sex:'male'}
function strToObj(str) {
    var obj = {}; //创建一个用来存放最终内容的空对象
    var arr = str.split('&'); //以'&'为中间点进行分割，返回数组 --- ["name=laoxie", "age=18", "sex=male"]
    arr.forEach(function (item) { //遍历数组
        var arr1 = item.split('='); //以'='为中间点进行分割，返回数组 --- ["name", "laoxie"] ["age", "18"] ["sex", "male"]
        obj[arr1[0]] = arr1[1]; //将值存到obj对象里面 --- 属性：属性值
    });
    return obj;
}

// 8.封装把对象变成参数
function objToStr(obj) {
    var str = ''; //创建一个用来存放最终结果的空字符串
    for (var key in obj) {
        //遍历过程把每次把对象属性赋值给key
        // 所以获取对象属性值为：obj[key]
        str += key + '=' + obj[key] + '&';
    }
    return str.slice(0, -1); //返回字符串str中第一个到倒数第二个的内容
}

// 9.统计字母出现的次数

// 10.封装补零函数 --- 比如年月日时分秒： 2019-7-29 11：12 ：09
function toDb(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return '' + num;
    }
}

// 11.
//封装样式（行内，非行内），获取到对应的值，返回会带单位，使用时要用parseIn()提取数字
//传过来的数据长度如果为2则是获取样式，如果为3则是设置样式
//在不同的浏览器获取的方法都是不一样的：
// ** 高级浏览器 --- getComputedStyle(ele,pseudo) （标准）
//  *** ele:要获取样式的元素
//  *** pseudo:伪元素样式字符(可选)，可获取伪元素样式
// ** （IE8-）  --- ele.currentStyle 

//获取：css(节点名,'样式')；
//设置：css(节点名，'样式','设置的内容')；
function css() { //传过来的长度不确定，不写参数，用arguments来接收
    if (arguments.length == 2) { //css(title,'color')
        //获取样式
        if (getComputedStyle(arguments[0], false)) {
            //高级浏览器
            return getComputedStyle(arguments[0], false)[arguments[1]]; //title.style.color = '';
        } else {
            //IE8-
            return arguments[0].currentStyle[arguments[1]];
        }
    } else if (arguments.length == 3) {
        //设置样式 title.style.color = 'red';
        return arguments[0].style[arguments[1]] = arguments[2];
    }
}

// 12.毫秒数转成年月日时分秒 给你毫秒数(纪元时间)-转成  xx年xx月xx日xx时xx分xx秒
function msToTime(ms) {
    var date = new Date(ms); //设置时间
    var year = date.getFullYear(); //获取年
    var month = date.getMonth(); //获取月
    var day = date.getDate(); //获取日
    var hour = date.getHours(); //获取时
    var min = date.getMinutes(); //获取分
    var sec = date.getSeconds(); //获取秒
    // var week =date.getDay(); //星期

    var rq = ` ${year}年${toDb(month)}月${toDb(day)}日${toDb(hour)}时${toDb(min)}分${toDb(sec)}秒`;
    return rq;
}

// 13.封装绑定事件 --- 用事件监听的方式

// 14.封装正则验证
var checkReg = {
    Id: function (str) { //账号
        var reg = /^[a-zA-Z][\w\-]{5,19}$/;
        return reg.test(str);
    },
    name: function (str) { //昵称
        var reg = /^[\u2E80-\u9FFF]+$/;
        return reg.test(str);
    },
    email: function (str) { //电子邮件
        var reg = /^[a-zA-Z0-9][\w\-\.]{2,29}@[a-zA-Z0-9\-]{2,67}(\.[a-z\u2E80-\u9FFF]{2,6})+$/;
        return reg.test(str);
    },
    identity: function (str) { //身份证
        var reg = /^(\d{17}|\d{14})[\dx]$/;
        return reg.test(str);
    },
    tel: function (str) { //手机号
        var reg = /^1[3-9]\d{9}$/;
        return reg.test(str);
    },
    birthday: function (str) { //生日
        var reg = /^\d{4}([\/\-]?)\d{1,2}\1\d{1,2}$/;
        return reg.test(str);
    },
    paw: function (str) { //密码
        var reg = /^\S{6,20}$/;
        return reg.test(str);
    },
    trim: function (str) { //去除空格(前后？)
        var reg = /^\s+|\s+$/;
        return reg.test('');
    }
}

// 15.封装表单验证
function checkInput(ele, reg, inf, type) {
    /*
                参数一：ele 要正则验证的表单
                参数二：reg 正则不同
                参数三：inf 提示信息节点不同
                参数四：type 提示信息不同,对象
    */
    ele.onblur = function () {
        var val = ele.value.trim();
        var index = this.dataset.index; //用自定义属性的值作为开关对象的属性名

        //1.非空判断
        if (val) {
            var res = checkReg[reg](val); //利用对象属性名可以接收变量
            if (res) {
                //符合规则
                inf.innerHTML = type.success;
                inf.style.color = '#58bc58';
                ele.istrue = true;
            } else {
                //不符合规则
                inf.innerHTML = type.failure;
                inf.style.color = 'red';
                ele.istrue = false;
            }
        } else {
            inf.innerHTML = null;
            inf.style.color = 'red';
            ele.istrue = false;
        }
    }
}


// 16.封装深度拷贝---可以用在数组和对象里面
function cloneDeep(obj) {
    var str = JSON.stringify(obj); //将对象转换成字符串
    return JSON.parse(str); //返回一个对象
}

// 17.数组的去重
function qc(arr) {
    var arr1 = new Set(arr);
    var arr2 = Array.from(arr1);
    return arr2;
}

/*
	18.运动框架封装：startMove()过渡    jq animate()
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