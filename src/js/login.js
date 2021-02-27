//获取元素
let username = document.querySelector('#username');
let password = document.querySelector('#password');
let btn1 = document.querySelector('.btn1');
let btn = document.querySelector('.btn');
//正则规则
let user = /^1[3456789]\d{9}$/;
let pass = /^[0-9a-zA-Z,\.]{1,14}$/
btn1.onclick = function () {
    //点击时判断输入的内容是否符合正则
    switch (false) {
        case user.test(username.value):
            alert('用户名错误');
            break;
        case pass.test(password.value):
            alert('密码错误');
            break;
        default:
            btn1.style.background = 'rgb(192, 255, 98)';
            

    }
}

btn.onclick = function () {
    // 登录按钮需要稍微按久一点才有效果，快速的点击会没效果，暂时没找到原因
    pAjax({
        url: '../api/login.php',
        type: 'post',
        data: {
            username: username.value,
            password: password.value
        }
    }).then(res => {
        res = JSON.parse(res);
        console.log(res);
        if (res.code == 1) {
            // 登录成功存储登录的状态
            setCookie('login', username.value)
            localStorage.setItem('login', username.value);
            let url = localStorage.getItem('url');

            if (url) {
                location.href = url;
                localStorage.removeItem('url');
                //    open('../index.html')
            } else {
                location.href = '../index.html';
            }
        } else {
            alert('账号不存在')
        }
    })

}