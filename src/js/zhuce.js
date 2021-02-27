let username = $('#username');
let password = $('#password');
// console.log(username.val());
let user = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
let pass = /^[0-9a-zA-Z,\.]{1,14}$/

$('#btn').on('click', function (e) {
    switch (false) {
        case user.test(username.val()):

            alert('用户名错误');
            break;
        case pass.test(password.val()):
            alert('密码错误');
            break;
        default:

            alert('可以注册');
            $('#btn').css('background', 'rgb(192, 255, 98)')


    }

});

$('#btn2').on('click', function () {
    // pAjax({
    //     url: '../api/adduser.php',
    //     type: 'post',
    //     data: {
    //         'username': username.val(),
    //         'password': password.val()
    //     }
    // }).then(function (res) {
    //     // console.log(res);
    //     alert('注册成功')
    //     self.location = './login.html';
    // })

    $.ajax({
        url: '../api/adduser.php',
        type: 'post',
        data: {
            'username': username.val(),
            'password': password.val()
        },
        dataType: 'json',
        async: false,
        success: function (res) {
            console.log(res);
            alert('注册成功')
            // self.location = './login.html';
            open('../html/login.html')
            // location.href = '../html/login.html'
        }
    })

})