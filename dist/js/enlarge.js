"use strict";var _createClass=function(){function i(t,s){for(var e=0;e<s.length;e++){var i=s[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,s,e){return s&&i(t.prototype,s),e&&i(t,e),t}}();function _toConsumableArray(t){if(Array.isArray(t)){for(var s=0,e=Array(t.length);s<t.length;s++)e[s]=t[s];return e}return Array.from(t)}function _classCallCheck(t,s){if(!(t instanceof s))throw new TypeError("Cannot call a class as a function")}var Enlarge=function(){function s(t){_classCallCheck(this,s),this.str=t,this.init()}return _createClass(s,[{key:"init",value:function(){var e=this;this.box=document.querySelector(this.str),this.show=this.box.querySelector(".show"),this.img=this.show.querySelector("img"),this.mask=this.show.querySelector(".mask"),this.list=this.box.querySelector(".list"),this.p=this.list.children,this.enlarge=this.box.querySelector(".enlarge"),this.show.onmouseover=function(){e.mask.style.display=e.enlarge.style.display="block",e.setStyle()},this.show.onmouseout=function(){e.mask.style.display=e.enlarge.style.display="none"},this.show.onmousemove=function(t){e.move(t)},[].concat(_toConsumableArray(this.p)).forEach(function(t,s){t.onclick=function(){e.changeImg(t)}})}},{key:"setStyle",value:function(){var t=getStyle(this.enlarge,"backgroundSize");this.bgX=parseInt(t.split(" ")[0]),this.bgY=parseInt(t.split(" ")[1]);var s=this.mask.offsetWidth,t=this.mask.offsetHeight;this.showW=this.show.offsetWidth,this.showH=this.show.offsetHeight;s=this.bgX*s/this.showW,t=this.bgY*t/this.showH;this.enlarge.style.width=s+"px",this.enlarge.style.height=t+"px"}},{key:"move",value:function(t){var s=t.clientX-this.box.offsetLeft-this.mask.offsetWidth/2,t=t.pageY-this.box.offsetTop-this.mask.offsetHeight/2;t<=0&&(t=0),(s=s<=0?0:s)>=this.show.offsetWidth-this.mask.offsetWidth&&(s=this.show.offsetWidth-this.mask.offsetWidth),t>=this.show.offsetHeight-this.mask.offsetHeight&&(t=this.show.offsetHeight-this.mask.offsetHeight),this.mask.style.left=s+"px",this.mask.style.top=t+"px";s=s*this.bgX/this.showW,t=t*this.bgY/this.showH;this.enlarge.style.backgroundPosition=-s+"px  "+-t+"px"}},{key:"changeImg",value:function(t){[].concat(_toConsumableArray(this.p)).forEach(function(t){t.classList.remove("active")}),t.classList.add("active");var s=t.firstElementChild,t=s.getAttribute("midelImg"),s=s.getAttribute("bigImg");this.img.setAttribute("src",t),this.enlarge.style.backgroundImage="url("+s+")"}}]),s}();