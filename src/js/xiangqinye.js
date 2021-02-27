//判断是否有登录和根据传过来的id渲染页面
let reg = /id=(\d+)/;
if (!reg.test(location.search)) {
    location.href = '../html/list.html'
}
let id = reg.exec(location.search)[1];

let data = $.ajax({
    url: '../api/getDetail.php',
    data: {
        id
    },
    dataType: 'json',
    success: function (res) {
        // console.log(res);
        //渲染
        renderHtml(res.detail)
        //放大镜
        enlarge()
        //按钮点击变色
        $('.btn-group').on('click', 'button', function () {
            // console.log(1);
            $(this).addClass('act').siblings().removeClass('act')
        })
    }

})
//渲染的函数
function renderHtml(data) {
    let huab3 = data.goods_price / 3;
    let huab6 = data.goods_price / 6;
    let huab12 = data.goods_price / 12;
    str = `
    <ol class="breadcrumb">
    <li><a href="#">${data.goods_introduce}</a></li>
</ol>
<div class="media">
    <div class="media-left box1">
        <div class="show1">
            <img class="media-object" src="${data.goods_logo}" alt="...">
            <div class="mask"></div>
        </div>
        <div class="enlarge"></div>
    </div>
    
    <div class="media-body">
        <h4 class="media-heading">${data.goods_name}</h4>
        <p>${data.goods_detail_2}</p>
        <div class="price">
            <i class="glyphicon glyphicon-yen"></i>
            <span>${data.goods_price}</span>
        </div>
        <p>颜色</p>
        <div class="btn-group" role="group" aria-label="...">
            <button type="button" class="btn btn-default">松深如墨</button>
            <button type="button" class="btn btn-default">十七度灰</button>
            <button type="button" class="btn btn-default">AG梦幻独角兽</button>
            <button type="button" class="btn btn-default">AG星际灰</button>
            <button type="button" class="btn btn-default">AG原野绿</button>
        </div>
        <p>套餐</p>
        <div class="btn-group" role="group" aria-label="...">
            <button type="button" class="btn btn-default">官方标配</button>
            <button type="button" class="btn btn-default">充电组合</button>
            <button type="button" class="btn btn-default">碎屏保套餐</button>
            <button type="button" class="btn btn-default">POP2s套餐</button>
        </div>
        <p>花呗分期</p>
        <div class="btn-group" role="group" aria-label="...">
            <button type="button" class="btn btn-default">￥${huab3.toFixed(2)}×3期</button>
            <button type="button" class="btn btn-default">￥${huab6.toFixed(2)}×6期</button>
            <button type="button" class="btn btn-default">￥${huab12.toFixed(2)}×12期</button>
            
        </div>

        <div class="btn_buy">
            <button class="btn btn-warning btn-lg" id="goCar">立即购买</button>
            <button class="btn btn-danger btn-lg" id="addCar">加入购物车</button>
        </div>
    </div>
</div>

<ul class="nav nav-tabs">
    <li role="presentation" class="active"><a href="#">详情</a></li>
</ul>
<div class="goods_detail">
    <img src="${data.goods_detail}" alt="" class="img_detail">
    <img src="${data.goods_detail_1}" alt="" class="img_detail">
</div>
    `
    $('.container').html(str)
}
// $('#goCar2').on('click', function () {
//     let login = getCookie('login');
//     if (!login) {
//         alert('没有登录请到登录页面进行登录');
//         localStorage.setItem('url', location.href);
//         // location.href = '../html/login.html';
//         open('../html/login.html')
//         // return
//     }else{
//         // location.href = '../html/car.html'
//         open('../html/car.html')
//     }
// })

//事件委托
$('.container').on('click', function (e) {
    if (e.target.id == 'goCar') {
        location.href = '../html/car.html'
    }
    if (e.target.id == 'addCar') {
        //加入购物车时判断是否有登录
        let login = getCookie('login');
        if (!login) {
            alert('没有登录请到登录页面进行登录');
            localStorage.setItem('url', location.href);
            location.href = '../html/login.html';
            return
        } else {
            alert('添加成功')
        }
        $.ajax({
            url: '../api/addCar.php',
            type: 'post',
            data: {
                'goods_id': id,
                'userName': login
            },
            dataType: 'json',
            success: function (res1) {
                console.log(res1);
            }
        })
    }
})
//放大镜的函数
function enlarge() {
    $('.show1').hover(function () {
        $('.mask').show()
        $('.enlarge').show()
        setStyle()
        let src = $('.media-object').attr('src')
        // console.log(src);
        $('.enlarge').css('backgroundImage', `url(${src})`)
    }, function () {
        $('.mask').hide()
        $('.enlarge').hide()
    })
    $('.show1').on('mousemove', function (e) {
        move(e)
        // console.log(e.clientX);
    })
}

function setStyle() {

    // 放大镜盒子的大小
    /* 
        show盒子的大小      放大镜背景图的大小
        -------------  == -------------------
        mask盒子的大小      放大镜盒子的大小

        放大镜盒子的大小 = 放大镜背景图的大小 * mask盒子的大小 / show盒子的大小

        放大镜的 的width = 背景图的宽度 * mask 宽度/ show宽度
        放大镜的 的height = 背景图的高度 * mask 高度/ show高度
    */

    let mask = document.querySelector('.mask')
    let enlarge1 = document.querySelector('.enlarge')
    let show = document.querySelector('.show1')

    let style = getStyle(enlarge1, 'backgroundSize');
    bgX = parseInt(style.split(' ')[0])
    bgY = parseInt(style.split(' ')[1]);

    let maskW = mask.offsetWidth;
    let maskH = mask.offsetHeight;

    showW = show.offsetWidth;
    showH = show.offsetHeight;

    let enlargeW = bgX * maskW / showW;
    let enlargeH = bgY * maskH / showH;

    enlarge1.style.width = enlargeW + 'px';
    enlarge1.style.height = enlargeH + 'px';
}


function move(e) {
    let box1 = document.querySelector('.box1')
    let mask = document.querySelector('.mask')
    let show = document.querySelector('.show1')
    let enlarge1 = document.querySelector('.enlarge')
    let style = getStyle(enlarge1, 'backgroundSize');
    bgX = parseInt(style.split(' ')[0])
    bgY = parseInt(style.split(' ')[1]);
    let left = e.clientX - box1.offsetLeft - mask.offsetWidth / 2;
    let top = e.pageY - box1.offsetTop - mask.offsetHeight / 2;
    // console.log(left, top);
    if (left <= 0) {
        left = 0;
    }
    if (top <= 0) {
        top = 0;
    }
    if (left >= show.offsetWidth - mask.offsetWidth) {
        left = show.offsetWidth - mask.offsetWidth
    }
    if (top >= show.offsetHeight - mask.offsetHeight) {
        top = show.offsetHeight - mask.offsetHeight
    }
    mask.style.left = left + 'px';
    mask.style.top = top + 'px';

    // 背景图移动
    /* 
        mask盒子left值     背景图移动的距离
        -------------- == ----------------
        show盒子的宽度      背景图的宽度
        背景图移动的时候正值往右移动，负值往左移动
        计算的背景图需要取负值

        背景图移动的距离 = mask盒子移动距离 * 背景图的大小 / show盒子的宽度

        background-position:`${-x}px  ${-y}px`
    */

    let x = left * bgX / show.offsetWidth;
    let y = top * bgY / show.offsetHeight

    enlarge1.style.backgroundPosition = `${-x}px ${-y}px`

}


function getStyle(ele, attr) {
    var style
    if (window.getComputedStyle) {
        style = window.getComputedStyle(ele)[attr]
    } else {
        style = ele.currentStyle[attr];
    }
    return style;
}