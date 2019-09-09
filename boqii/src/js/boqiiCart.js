/**
 * Created by Administrator on 2017/5/24.
 */

$(function () {
	//渲染到购物车：dom，字符串模板

	let uid = '';
	let gid = '';
	let num = '';
	let type = '';
	let sid = '';
	let kucun = 10;

	//渲染数据：jq的ajax
	function init() {
		$.ajax({
			type: "get",
			url: "../api/Cart.php",
			async: true,
			data: {
				type: type,
				uid: uid,
				gid: gid,
				num: num,
				sid: sid
			},
			dataType: 'json',
			success: function (str) {
				// console.log(str.data);
				str.data.map(item => {
					$.ajax({
						type: "post",
						url: "../api/getgoodsinf.php",
						data: {
							gid: item.gid * 1
						},
						dataType: "json",
						success: function (data) {
							console.log(data);
							let dat = data[0]
							let html = ` <tr class="cart_con" data-id=${item.sid}>
                            <td class="td_1">
                                <input type="checkbox" class="dx">
                            </td>
                            <td id="sp">
                                <a href="###">
                                    <img src="${dat.src}" alt="">
                                    <p class="p_title">${dat.title}</p>
                                    <p class="p2">
                                        <span class="span1"></span>
                                        <br>
                                        <span></span>
                                    </p>
                                </a>
                            </td>
                            <td class="td_price">
                                <span class="price">${dat.price}.00</span>
                            </td>
                            <td class="addcut">
                                <p class="tj">
                                    <span class="cutnum">-</span>
                                    <input type="text" id="buyCount" value="${item.num}">
                                    <span class="addnum">+</span>
                                </p>
                                <p class="xg">限购10件</p>
                            </td>
                            <td class="xj">
                                <span class="xiaoji">${dat.price * item.num}.00</span>
                            </td>
                            <td class="cz">
                                <a href="###" class="del">删除</a>
                            </td>
                        </tr>`;

							$("#td").append(html);
						}
					});
				})
			}
		});
	}

	uid = getCookie('uid');
	if (uid) {
		type = 'getdata';
		init();
	}

	function ajaxs() {
		$.ajax({
			type: "post",
			url: "../api/Cart.php",
			data: {
				type: type,
				uid: uid,
				gid: gid,
				num: num,
				sid: sid
			},
			success: function (str) {

			}
		});
	};

	function total(now, num) { //数量和小计的变化 now-点击的元素
		//数量的变化
		 
		if (num < 1) {
			num = 1;
		} else if (num > kucun) {
			num = kucun;
			confirm('亲~，库存不足，请联系客服~~~');
		}
		// $('#buyCount').val(num);
		$(now).parent().parent().find('#buyCount').val(num);

		//小计 = 数量 * 单价
		let price = $(now).parent().parent().prev().text();
		// console.log(price);
		let all = (num * price).toFixed(2);
		$(now).parent().parent().next().children().html(all);
		allNum();
	};

 //点击加
 $('#td').on('click', '.addnum', function () {
	// console.log('666')
	num = $(this).prev().val() - 0;
	 sid = $(this).parent().parent().parent().data('id'); //商品id
	// console.log(gid)
	num++;
	// console.log(num)
	total($(this), num);
	type = 'numType';
	ajaxs();
});

//点击减
$('#td').on('click', '.cutnum', function () {
    num = $(this).next().val();
	sid = $(this).parent().parent().parent().data('id'); //商品id
	num--;
	// console.log(num)
	total($(this), num);
	type = 'numType';
	ajaxs();
});

 //手动输入
 $('#td').on('input', '#buyCount', function () {
	let num = $(this).val();
	total($(this), num);
	sid = $(this).parent().parent().parent().data('id'); //商品id
	type = 'numType';
	ajaxs();
});

   //删除当行 集合里面找集合
   $('#td').on('click', '.del', function () {
	sid = $(this).parent().parent().data('id'); //商品id
	type = 'del';
	let ok = confirm('您确定要删除我吗?o(╥﹏╥)o');
	if (ok) {
		$(this).parent().parent().remove();
		ajaxs();
	}
	if ($('#td .addnum').size() == 0) {
		//没有数据了
		$('.bottom').css('display', 'none');
	}
	allNum();
});

  //复选框控制总量和总价
  function checkedArr() {
	let arr = []; //存放勾选复选框的下标
	$('.td_1 input').each(function (index, item) {
		if ($(item).prop('checked')) {
			//被勾选了
			arr.push(index);
		}
	});
	return arr;
}

function allNum() {
	let checkedall = checkedArr(); //返回被勾选的下标数组
	let sum = 0; //放商品总数量
	let total = 0; //放总价
	checkedall.forEach(function (item, index) {
		sum += $('#td #buyCount').eq(checkedall[index]).val() * 1; //累加
		total += $('#td .xiaoji').eq(checkedall[index]).text() * 1;
	});
	$('.b_con_p3 .p3_span2').html(num);
	$('.b_con_p4 .p4_span3').html(total.toFixed(2));

	//控制全选按钮
	let len = $('.td_1 input').length; //商品复选框的个数
	let achecknum = $('.td_1 input:checked').length;
	if (len == achecknum) {
		//已经全选
		$('.b_con_p1 input').prop('checked', true);
	} else {
		$('.b_con_p1 input').prop('checked', false);
	}

}


$('#td').on('click', '.td_1 input', function () {
	allNum();
});

 //全选功能
 $('.b_con_p1 input').click(function () {
	let isok = $('.b_con_p1 input').prop('checked');
	$('.td_1 input').prop('checked', isok);
	allNum();
});

 //全删：删除被选行
            // popo();

            function popo() {

                $('#td').on('click', '.dx', function () {
                 sid = $(this).parent().parent().data('id');
                    if ($('#td tr .td_1 .dx').is(':checked')) {                       
                        $('.delChoose').click(function () {
                            let checkall = checkedArr().reverse(); //返回被勾选的下标数组
                            type = 'del';
                            let ok = 1;
                            if (ok) {
                                checkall.forEach(function (item, index) {
                                    $('#td .cart_con').eq(checkall[index]).remove();
                                    // console.log($('#td .cart_con').eq(checkall[index]));

                                });
								ajaxs();
                            }
                            allNum();
                            if ($('#td .addnum').size() == 0) {
                                //没有数据了
                                $('.bottom').css('display', 'none');
                            }
                            allNum();
                        });
                    }
                });
            }
			popo();


			function delall() {
				$('.delChoose').click(function () {						
					$('#td .dx').each(function (index, item) {
						type = 'del';
						if ($(item).prop('checked')==true) {
							 sid = $(item).parent().parent().data('id');
							$(this).parent().parent().remove();
	
							ajaxs();
						}
						
					});
				})
			  }
			  delall();

});