// 获取数据、分页
getData(1, 20);
let box = document.querySelector('#box');
let bbox = document.querySelector('.box');

let flag = true;
async function getData(index, length) {
    let data = await $.ajax({
        url: '../api/goodList.php',
        method: 'get',
        data: {
            index: index,
            length: length
        },
        dataType: 'json',
        success: function (res) {
            // console.log(this);
            console.log(res);
        }
    })
    // data = JSON.parse(data);
    console.log(data);
    if (flag) {
        new Pagination(box, {
            pageInfo: {
                pagenum: index,
                pagesize: length,
                total: data.total,
                totalpage: Math.ceil(data.total / length)
            },
            textInfo: {
                first: '首页',
                prev: '上一页',
                next: '下一页',
                last: '末页'
            },
            change: function (index) {
                flag = false;
                getData(index, 20);
            }
        })
    }
    render(data.list);
    // 模糊查询
    let fs = $('#fuzzy_search');
    fs.on('keyup', function () {
        let fsv = fs.val()
        // console.log(data.list);
        let nei = data.list.filter(function (item) {
            return item.goods_name.indexOf(fsv) != -1 || item.goods_introduce.indexOf(
                fsv) != -1
        })
        render(nei)
    })
}
// 渲染
function render(d) {
    var str = ''
    d.forEach(function (item, index) {
        str += `<div>
    <ol class="breadcrumb">
        <li><a href="#">${item.goods_introduce}</a></li>
    </ol>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class="thumbnail">
                    <img src="${item.goods_logo}" alt="...">
                    <div class="caption">
                        <h3>${item.goods_name}</h3>
                        <div class="price">
                            <i class="glyphicon glyphicon-yen"></i>
                            <span>${item.goods_price}</span>
                        </div>
                        <p>
                            <a href="./car.html" class="btn btn-primary" role="button">查看购物车</a>
                            <a href="../html/xiangqinye.html?id=${item.id}" class="btn btn-default" role="button">查看商品详情</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`
    })
    bbox.innerHTML = str;
}