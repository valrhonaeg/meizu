function setCookie(key, value, expires) {
    var time = new Date()
    var t1 = time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires
    time.setTime(t1)
    document.cookie = `${key}=${value};expires=${expires ? time : ''}`
}


function getCookie(key) {
    var arr = document.cookie.split('; ')
    var value = ''
    if (arr[0]) {
        arr.forEach( item => {
            var tmp = item.split('=');
            if(tmp[0] === key){
                value = tmp[1]
            }
        })
    }
    return value
}

function delCookie(key){
    setCookie(key,'suibian',-10)
}