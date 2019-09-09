$(function () {

    let name = getCookie('name');
    let phone = getCookie('phone');
    if(name) {
        let nae = '欢迎你,'+ name
        $(".logindex").html(nae);
        $(".out").show();
    }else if(phone){
        let nae = '欢迎你,'+ phone
        $(".logindex").html(nae);
        $(".out").show();
    }else {
        $(".out").hide();
    };
    $(".out").click(function (e) { 
        removeCookie('name');
        removeCookie('uid');   
    });

    // 点击存url并跳转
    $(".logindex").click(()=>{  
            localStorage.url = location.href;//获取url存到浏览器
            location.href = '../html/boqiilogin.html';
    });
    var arr = [
        "./img/mainimg/img40935d5c0b2a4aeb0.jpg",
        "./img/mainimg/img66215cee3313c01bd.jpg",
        "./img/mainimg/img7231595305e41e14f.jpg",
        "./img/mainimg/img92525cd3a4506f98a.jpg"
    ]

    class BannerManager {
        constructor(data) {
            this.data = data;
            this.i = 0;
        }

        init() {
            this.createHTML();
            this.createnumHTML();
            this.length = this.data.length;
            this.index = 0;
            this.mons();
            this.click();
            this.autoPlayer();

        }
        //生成标签
        createHTML() {
            let html1 = this.data.map((item) => {
                return `<li class="banner-li">
                <img src="${item}" alt="">
            </li>`

            }).join('');

            return $(".banner-img").html(html1)
        }

        createnumHTML() {
            let sp = this.data.map((ele, i) => {

                return i === 0 ? `<span class="lis active">${i + 1}</span>` : `<span class="lis">${i + 1}</span>`
            }).join('');
            return $(".banner-num").html(sp)
        }


        // 图片切换
        autoPlayer() {
            this.timer = setInterval(() => {
                this.next();
            }, 2000)
        }
        next() {
            this.i++
            if (this.i > this.length) {
                this.i = 0
            }
            $(".banner-li").eq(this.i).show().siblings(".banner-li").hide();
            $(".lis").eq(this.i).addClass("active").siblings().removeClass("active");

        };

        click() {
            $(".lis").mouseenter(function () {
                let index = $(this).index();
                $(".banner-li").eq(index).show().siblings(".banner-li").hide();
                $(".lis").eq(index).addClass("active").siblings().removeClass("active");

            });
            $(".lis").mouseenter(() => {
                clearInterval(this.timer);
            });
            $(".lis").mouseleave(() => {
                this.autoPlayer()

            });

        }

        mons() {
            //鼠标移入
            $(".banner-li").mouseover(() => {
                clearInterval(this.timer);
            });
            //鼠标移除
            $(".banner-li").mouseleave(() => {
                this.autoPlayer()

            });
        }

    }
    let banner = new BannerManager(arr);
    banner.init();


    // 狗狗轮播

    carouselimg({
        ele: 'boxb', //最外层id名(必选参数)

        imgdata: ['./img/mainimg/img34715b8f863ff137e.jpg', './img/mainimg/img53465b8f8648c0b2f.jpg', './img/mainimg/img91405b8f86335f8da.jpg'], //图片数据(可选参数)

    });


    //点击轮播


    let lis = $(".dog-img-list li");
    console.log(lis);
    let liw = $(".dog-img-list li").width();
    let num = 0;
    $(".next-b").click(function (e) {
        num++
        let ulleft = num*liw
        if(num > lis.length-1){     
            num = 0;  
            ulleft = num*liw
            $(".dog-img-list").css('left', -ulleft);
           
        }
       
        $(".dog-img-list").stop().animate({'left': -ulleft},500)
        
    });

    $(".pre").click(function (e) { 
        num--
        let ulleft = num*liw
        if(num < 0){     
            num = lis.length-1;
              
            ulleft = num*liw
            $(".dog-img-list").css('left', -ulleft); 
        }
       
        $(".dog-img-list").stop().animate({'left': -ulleft},500)
    });

// 侧栏菜单
    window.onscroll = function () {
        var scrollTop = window.scrollY;
        if (scrollTop > 200) {
            $(".goTop").css("display", "block")
        } else {
            $(".goTop").css("display", "none");
        }
    };


    $(".dog_r_t_c_body a").click(()=>{
       window.open("./html/goodslist.html")
    }) 
   
})
