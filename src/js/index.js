

//轮播图设置
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

//判断登录
let goCar= document.querySelector('#goCar')
goCar.onclick = function () {
    let login = localStorage.getItem('login')
    if (!login) {
        alert('没有登录请到登录页面进行登录');
        localStorage.setItem('url', location.href);
        open('./html/login.html')
        // location.href = './html/login.html';
        // self.location='./html/login.html';

        return
    }else{
        // location.href = './html/car.html'
        open('./html/car.html')
    }
}

$('.ck').on('click',function(){
    open('./html/list.html')
})


// 回到顶部按钮
$(document).scroll(function(){
    let scrollY = $(document).scrollTop();
    if(scrollY >= 1000){
        $('.toTop').fadeIn();
    }else{
        $('.toTop').fadeOut();
    }
});
$('.toTop').on('click',function(){
    $('html').animate({
        scrollTop:0
    },2000)
})