"use strict";window.onload=function(){var t=document.querySelector("#username"),e=document.querySelector("#password"),o=document.querySelector(".btn1"),a=document.querySelector(".btn"),l=/^1[3456789]\d{9}$/,r=/^[0-9a-zA-Z,\.]{1,14}$/;o.onclick=function(){switch(!1){case l.test(t.value):alert("用户名错误");break;case r.test(e.value):alert("密码错误");break;default:o.style.background="rgb(192, 255, 98)",a.onclick=function(){pAjax({url:"../api/login.php",type:"post",data:{username:t.value,password:e.value}}).then(function(e){e=JSON.parse(e),console.log(e),1==e.code?(setCookie("login",t.value),localStorage.setItem("login",t.value),(e=localStorage.getItem("url"))?(location.href=e,localStorage.removeItem("url")):location.href="../index.html"):alert("账号不存在")})}}}};