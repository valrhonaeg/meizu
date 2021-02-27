let t = 30;
        let time = $('.countdown')
        //倒计时关闭页面函数
        function fun(){
            t--;
            time.html(t)
            if(t<=0){
                clearInterval(inter)
                // console.log(1);
                window.close()
            }
        }
        var inter = setInterval("fun()",1000)