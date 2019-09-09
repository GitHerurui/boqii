
/*
    需求：实现放大镜功能
        * 渲染数据到页面
        * 经过原图：出现大图可视区和遮罩
        * 在原图区域滑动，遮罩跟着鼠标移动（坐标应该放置在遮罩中间位置、临界值设置）
        * 遮罩运动过程，计算比例系数，让大图跟着运动（最大运动距离 * 比例系数）
        * 移出原图：隐藏大图可视区和遮罩
        * 点击小图切换大图
        * 点击左右按钮可以切换小图位置
    
    插件制作：
        * 为了以后复用和数据的修改，把程序封装好，做成插件，以后方便调用
        * 复用性：把核心代码全部封装
            * id只写在最外层
        * 灵活性：obj对象设置参数
            * 图片不同
            * 放大比例：大图
            * 运动小图步长
            
    
*/

function extend(obj1, obj2) {
    for (var key in obj1) {
        obj2[key] = obj1[key];
    }
}

function magniglass(opt) {
    //默认参数
    var defaultopt = {
        scal: 2,
        speed: 1
    }

    extend(opt, defaultopt);//用默认参数
    //找节点
    var wrap = document.getElementById(defaultopt.ele);
    // console.log(wrap);
    var main = wrap.getElementsByClassName('main')[0];//原图
    var biger = wrap.getElementsByClassName('biger')[0];//大图
    var smaller = wrap.getElementsByClassName('smaller')[0];//大图
    var imgArr = defaultopt.imglist;

    //1.渲染数据到页面
    var bigpic = `<img src="${imgArr[0]}" alt="">`;
    var smallpic = bigpic + `<div class="mask"></div>`;
    biger.innerHTML = bigpic;
    main.innerHTML = smallpic;
    //设置放大的比例倍数
    biger.children[0].style.width = main.children[0].offsetWidth * defaultopt.scal + 'px';
    biger.children[0].style.height = main.children[0].offsetHeight * defaultopt.scal + 'px';

    var html = imgArr.map(function (item) {
        return `<li><img src="${item}" alt=""></li>`;
    }).join('');
    smaller.innerHTML = html;//渲染小图
    smaller.lastElementChild.style.marginRight = 0;

    //设置小图ul宽度
    smaller.style.width = 82 * smaller.children.length + 'px';

    // $('.next').click(function() {
    //     console.log('666');
    // })
    //2.经过原图：出现大图可视区和遮罩
    var mask = wrap.getElementsByClassName('mask')[0];//遮罩
    main.onmouseover = function () {
        mask.style.display = 'block';
        biger.style.display = 'block';
    }

    main.onmouseout = function () {
        mask.style.display = 'none';
        biger.style.display = 'none';
    }

    //3.在原图区域滑动，遮罩跟着鼠标移动（坐标应该放置在遮罩中间位置、临界值设置）
    var movePic = biger.getElementsByTagName('img')[0];
    main.onmousemove = function (ev) {
        // console.log(ev.pageX);
        // console.log(mask.offsetWidth);
        var left = ev.pageX - wrap.offsetLeft - mask.offsetWidth / 2;
        var top = ev.pageY - wrap.offsetTop - mask.offsetHeight / 2;
        if (left <= 0) {//临界值设置
            left = 0;
        } else if (left >= main.offsetWidth - mask.offsetWidth) {
            left = main.offsetWidth - mask.offsetWidth;
        }

        if (top <= 0) {//临界值设置
            top = 0;
        } else if (top >= main.offsetHeight - mask.offsetHeight) {
            top = main.offsetHeight - mask.offsetHeight;
        }

        //方法一：大图运动：最大运动距离 * 水平或垂直的比例系数(适用于矩形)
        var scalx = left / (main.offsetWidth - mask.offsetWidth);
        var scaly = top / (main.offsetHeight - mask.offsetHeight);
        movePic.style.left = (biger.offsetWidth - movePic.offsetWidth) * scalx + 'px';
        movePic.style.top = (biger.offsetHeight - movePic.offsetHeight) * scaly + 'px';

        //遮罩运动
        //方法一：求比例系数，乘以遮罩的left和top(适用于正方形)
        mask.style.left = left + 'px';
        mask.style.top = top + 'px';
        // var scal = (biger.offsetHeight - movePic.offsetHeight) / (main.offsetHeight - mask.offsetHeight);
        // movePic.style.left = left * scal + 'px';
        // movePic.style.top = top * scal + 'px';

    }

    //4.点击小图切换大图:利用事件委托
    smaller.onclick = function (ev) {
        if (ev.target.tagName.toLowerCase() == 'img') {
            console.log(ev.target);
            var src = ev.target.src;
            main.children[0].src = biger.children[0].src = src;

        }
    }

    //5.点击左右按钮可以切换小图位置
    // var now = 0;
    var box = wrap.getElementsByClassName('box')[0];
    var prev = wrap.getElementsByClassName('prev')[0];
    var next = wrap.getElementsByClassName('next')[0];

    var iW = (smaller.children[0].offsetWidth + 10) * defaultopt.speed;//一个li的宽度
    prev.onclick = function () {
        //上一张
        move(iW);
        next.style.background = '#777';
        // now--;
        // console.log(now);
        // smaller.style.left = smaller.offsetLeft + iW + 'px';
    }

    next.onclick = function () {
        //下一张
        // now++;
        // console.log(now);
        move(-iW);
        prev.style.background = '#777';
        // smaller.style.left = smaller.offsetLeft - iW + 'px';
    }

    function move(speed) {//小图的运动
        var left = smaller.offsetLeft + speed;
        if (left <= box.offsetWidth - smaller.offsetWidth + 10) {//临界值
            left = box.offsetWidth - smaller.offsetWidth + 10;
            next.style.background = '#ccc';
            prev.style.background = '#777';
        } else if (left >= 0) {
            left = 0;
            prev.style.background = '#ccc';
            next.style.background = '#777';
        }
        smaller.style.left = left + 'px';
    }
}


