//轮播图插件开发
function carouselimg(opt) { //用一个参数(在这指的是对象)来接收传过来的值
    /*
        需求：
            * 自动轮播：开启定时器切换图片
            * 点击左右按钮可以切换图片
            * 点击焦点可以切换对应图片
    */

    //设置一个默认参数 -- 可选项
    let dafaultData = {
        iw:360, //宽度默认为500px
        ih:360, //高度默认为300px
        time:2 //图片自动切换的时间默认为2秒
    }

    Object.assign(dafaultData,opt); //用默认参数

   //找节点
   let box = document.getElementById(dafaultData.ele);
//    console.log(box)
   let list = box.getElementsByClassName('imglist')[0];
   let light = box.getElementsByClassName('light')[0];
   let prevBtn = box.getElementsByClassName('prev')[0];
   let nextBtn = box.getElementsByClassName('next')[0];
   let posibtn = box.getElementsByClassName('posibtn')[0];
   let timer = null;
   let num = 0;//可视区图片的下标
   let data = dafaultData.imgdata;
   let time = dafaultData.time * 1000;

   //宽高的设置
   list.style = box.style = `width:${dafaultData.iw}px;height:${dafaultData.ih}px;`;
   posibtn.style.width = light.style.width = dafaultData.iw + 'px';
   //渲染li节点
   let str = data.map(item => {
       return `<li style="width:${dafaultData.iw}px;height:${dafaultData.ih}px;"><img src="${item}" alt=""></li>`;
   }).join('');
   list.children[0].innerHTML = str;
   let imglist = list.getElementsByTagName('li');
   let iw = imglist[0].offsetWidth;

   //全部图片放到右侧，第一张放在可视区
   for (let ele of imglist) {
       ele.style.left = iw + 'px';
   }
   imglist[0].style.left = 0;

   //1.自动轮播：开启定时器切换图片
   timer = setInterval(next, time);//每隔两秒切换一张图片

   function next() {
       //旧图挪走
       startMove(imglist[num], { 'left': -iw });
       //新图进场
       // num++;
       num = ++num > imglist.length - 1 ? 0 : num;
       imglist[num].style.left = iw + 'px';//确保新图在右侧:候场
       startMove(imglist[num], { 'left': 0 });
       liang();
   }

   function prev() {
       //旧图挪走
       startMove(imglist[num], { 'left': iw });
       //新图进场
       // num++;
       num = --num < 0 ? imglist.length - 1 : num;
       imglist[num].style.left = -iw + 'px';//确保新图在右侧:候场
       startMove(imglist[num], { 'left': 0 });
       liang();
   }

   //2.点击左右按钮可以切换图片
   box.onmouseover = () => {//鼠标移入可视区停止播放图片
       clearInterval(timer);
   }

   box.onmouseout = () => {//鼠标移出可视区继续播放图片
       clearInterval(timer);
       timer = setInterval(next, time);
   }

   prevBtn.onclick = () => {
       //上一张
       prev();
   }

   nextBtn.onclick = () => {
       //下一张
       next();
   }

   //3.点击焦点可以切换对应图片
   let html = '';
   for (let i = 0; i < imglist.length; i++) {
       html += `<span>${i + 1}</span>`;
   }
   light.innerHTML = html;
   light.children[0].className = 'active';

   //焦点跟随
   function liang() {
       for (let i = 0; i < imglist.length; i++) {//排他
           light.children[i].className = '';
       }
       light.children[num].className = 'active';
   }

   //利用事件委托给焦点绑定事件
   light.onclick = ev => {
       if (ev.target.tagName.toLowerCase() == 'span') {
           // console.log(ev.target.innerHTML);
           let index = ev.target.innerHTML - 1;
           if (index > num) {
               //新图从右侧进入
               //旧图挪走
               startMove(imglist[num], { 'left': -iw });
               imglist[index].style.left = iw + 'px';
               startMove(imglist[index], { 'left': 0 });
           }
           if (index < num) {
               //新图从左侧进入
               startMove(imglist[num], { 'left': iw });
               imglist[index].style.left = -iw + 'px';
               startMove(imglist[index], { 'left': 0 });
           }
           num = index;
           liang();
       }

   }
}