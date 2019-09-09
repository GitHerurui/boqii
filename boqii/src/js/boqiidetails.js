$(function () {
    // 引入头部和底部
    $("header").load("../html/header");
    $("footer").load("../html/footer");

    $(".shop_cart").click(()=>{
        window.open("./boqiiCart.html")
    })

    // 接收列表页传过来的商品id
    let gid = decodeURI(location.search.slice(1));
    let goodsID = strToObj(gid).gid * 1;

    // 利用商品id从数据库中获取相对应的商品数据做渲染
    var res = new Promise(function (resolve) {
        $.ajax({
            type: "post",
            url: "../api/boqiidetails.php",
            data: {
                gid: goodsID,
                type: 'boqiidetails'
            },
            dataType: "json",
            success: function (res) {
                resolve(res)
            }
        })
    });

    res.then(data => {
        class Detailpage {
            constructor(data) {
                this.data = data[0];
            }

            creatPrice() {
                let html = `	<h3>${this.data.title}</h3>
               <div class="price-b">
                   <ul class="price-lis">
                       <li class="boqj">波奇价：</li>
                       <li class="pr">
                           ￥<em>${this.data.price}</em>
                       </li>
                       <li class="jin">
                           <i>18.63</i>
                           元/斤
                       </li>
                       <li class="dou">
                           波奇豆抵10%
                       </li>
                   </ul>
                   <p>厂商指导价：
                       <del> ¥614.90</del>
                   </p>
               </div>
              `
                $(".price-bx").html(html);
                $(".ysold").html(this.data.sold + '件');
                $(".pl_top a").html('已有' + this.data.comment + '人评论');

            };

            init() {
                this.creatPrice();

            }
        }
        let p = new Detailpage(data);
        p.init();

        console.log(data[0]);
        (function () {

            magniglass({
                ele: 'wrap', //最外层盒子的id(必填)
                imglist: [`${data[0].src}`, "../img/boqiidetails/shoppicpath21548665816_y.jpg", "../img/boqiidetails/shoppicpath31548665816_y.jpg", "../img/boqiidetails/shoppicpath31548665816_y.jpg",
                    "../img/boqiidetails/shoppicpath51548665817_y.jpg"
                ], //图片数据(必填)
                scal: 3, //大图放大倍数(选填，默认是2倍)
                speed: 1 //小图运动的图片个数(选填，默认是一次动一张图)
            });

        })();


    });

    // 选择城市
    $("#cityul span").click(function (e) {
        let val = $(this).html();
        $("#ProCityInfo").html(val);
    });

    // 加减数量
    let num = '';
    console.log($(".numbtn span").eq(1).html());
    $(".numbtn span").eq(0).click(function (e) {
        num = $("#gonum").val();
        if (num > 1) {
            num--
        } else {
            num = 1;
            alert('最少购买一件商品！')
        }
        $("#gonum").val(num);
    });

    $(".numbtn span").eq(1).click(function (e) {
        num = $("#gonum").val();
        if (num < 10) {
            num++
        } else {
            num = 10;
            alert('每个id限购10件！')
        }
        $("#gonum").val(num);
    });

    // 点击加入购物车
    $(".addcart").click(() => {
        num = $("#gonum").val();
        let name = getCookie('name');
        let uid = getCookie('uid');
        let type = 'addCart'
        if(name) {
            $.ajax({
                type: "post",
                url: "../api/Cart.php",
                data: {
                    type:type,
                    num:num,
                    uid:uid,
                    gid:goodsID
                },
                // dataType: "dataType",
                success: function (res) {
                    if(res == 'yes' ){
                        alert('商品添加成功！');
                        window.location.reload();
                    }else {
                        alert('商品添加失败！')
                    }
                }
            });
        }else {
            alert('请先登录！')
        }
    });
    let uid = getCookie('uid');
    if(uid){
        let sl = 0;
        $.ajax({
            type: "post",
            url: "../api/Cart.php",
            data: {
                type:"catrnum",
                uid:uid
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                res.map(item => {
                    sl += (item.num * 1) ;
                    
                })
                $(".bg-cart").html(sl);
            }
        });
       
    };

    
})