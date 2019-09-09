$(function () {
    //导入底部模块
    $("footer").load("../html/footer");

    // 吸底广告
    $(".buy-tips-close").click(function (e) {
        $(".buy-tips").css("display", "none")
    });


    let name = getCookie('name');
    let phone = getCookie('phone');
    let uid = getCookie('uid');
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
    }

    $(".out").click(function (e) { 
        removeCookie('name');
        removeCookie('uid');   
    });

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
       
    }



    // 点击存url并跳转
    $(".logindex").click(()=>{
        
            localStorage.url = location.href;//获取url存到浏览器
            location.href = '../html/boqiilogin.html';
        
    });

    $(".shop_cart").click(()=>{
        window.open("./boqiiCart.html")
    });


    // 商品列表
    let url = "../api/boqiigoodslist.php";
    let ipage = 1; //第一页的数据
    let num = 20; //每页的条数
    var content = '';
    var type = '';
    var order = '';
    var isok = true;
   
    //列表渲染
    function getlist(response) {
        let res = response.data.map(item => {
            return `<li data-id='${item.gid}' class="lis">
                <a href="###" class="showimg-a">
                    <img src="${item.src}" alt="" class="showimg">
                </a>
                <h3>￥${item.price}</h3>
                <p class="title">${item.title}</p>
                <div class="product_status">
                    <a href="####">
                        已有
                        <i>${item.comment}</i>
                        人评价
                    </a>
                    <span>
                        已售${item.sold}
                    </span>
                </div>
                <div class="operation">
                    <span class="add-cart">
                    <i class="icons icon_cart"></i>
                        加入购物车 
                    </span>
                    <span class="do_attention">
                        <i class="icons icon_fav"></i>
                        关注
                    </span>
                </div>
            </li>`
        }).join('');
        $('.product_list').html(res)
        //总商品数
        $(".product_total").html(`共${response.total}件商品`);
        //当前页码
        $(".product_page_current").html(ipage);
        let total = Math.ceil(response.total / response.num);
        //总页数
        $(".product_page_total").html(total)
        //分页生成渲染
        let spanstr = '';
        for (let i = 0; i < total; i++) {
            spanstr += `<a href="###">${i + 1}</a>`
        }
        $(".page-num").html(spanstr);
        $("#totalPages").html(total)  
        $(".page-num a").eq(ipage - 1).addClass('active');
        if (total <= 1) {
            $(".page-box").css('opacity', '0')
        } else {
            $(".page-box").css('opacity', '1')
        }
    }
    //初始化
    function init() {
        $.ajax({
            type: "post",
            url: url,
            data: {
                page: ipage,
                num: num,
                content: content,
                order: order,
                type: type,
                order: order
            },
            dataType: 'json',
            success: function (response) {
                getlist(response);
            }
        });
    };
    init();
    
   function bgposition() {
       $(".icon_up").css('background-position', '-31px -6px');
       $(".icon_down_up").css('background-position', '-10px -6px');  
       $(".icon_down").css('background-position', '-31px -6px');   
   }
  
    $(".search-btn").click(() => {
        content = $("#search").val();
        type = 'search_sort';
        init();
    })
    //点击页码高亮
    function pagelist() {
        $(".sort_left a").click(function () {
            $(this).addClass('active').siblings().removeClass('active');
        })
    }
    pagelist()

    // 综合排序
    $(".synthesize").click((e) => {
        bgposition();
        type = 'sold';
        ipage = 1;
        init();
    });
    // 销量排序
    $(".sort-sold").click((e) => {
        bgposition();
        $(".icon_up").css('background-position', '-31px -22px');
        type = 'sold';
        ipage = 1;
        init();
    });

    // 价格排序
    function sortorder(){
        bgposition();
        ipage = 1;
        type = 'sort'
        if (isok) {
            order = 'asc';
            $(".icon_down_up").css('background-position', '-10px -38px')

        } else {
            order = 'desc';
            $(".icon_down_up").css('background-position', '-31px -22px')
        }
        $.ajax({
            type: "get",
            url: "../api/boqiigoodslist.php",
            data: {
                order: order,
                type: 'sort'
            },
            dataType: 'json',
            success: function (response) {
                getlist(response);
            }
        });
        isok = !isok;
    }
    $(".sort-order").click((e) => {
        isoder = $(".sort-order span").html() ;
        sortorder()
    });
    // 新品排序
    $(".sort-new").click(() => {
        bgposition();
        $(".sort-new .icon_down").css('background-position', '-31px -22px');
        type = 'new';
        ipage = 1;
        init();
    })

    //评论排序
    $(".sort-comment").click(() => {
        bgposition();
        $(".sort-comment .icon_down").css('background-position', '-31px -22px');
        type = 'comment';
        ipage = 1;
        init();
    })
    //点击翻页

    function pagebtn(){
        type = 'sort';
        $(".pagination").on('click', '.page-num a', function () {
            ipage = $(this).html(); 
            init();
        });

        $(".prev_page").click(function(){ 
            let npage = $(".product_page_current").html();
            if(npage > 1) {
                ipage = --npage    
            }
            init()
        });
        $(".next_page").click(function(){ 
            let npage = $(".product_page_current").html();
            let tpage = $(".product_page_total").html();
            console.log(npage,tpage);
            if(npage < tpage) {
                ipage = ++npage    
            }
            init()
        });
        
        $(".first_page").click(()=>{
            ipage = 1;
            init();
        });

        $(".last-page").click(()=>{
            ipage = $("#totalPages").html();
            init();
        });

        $("#goPages").click(()=>{
            ipage = $(".go_page_text").val();
            init();
        })
    }

    pagebtn();

    $(".product_list").on("click",'.showimg-a', function () {
        
        let str = 'gid=' + $(this).parent().data('id');
        console.log(str);
        window.open('./boqiidetails.html?' + str);
});



// 点击加入购物车
$(".product_list").on('click',".add-cart",function() {
    num = 1;
    let goodsID = $(this).parents('.lis').data('id');
    let name = getCookie('name');
    let uid = getCookie('uid');
    let type = 'addCart';
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

})


