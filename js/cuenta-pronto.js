(function(){try{
var s=document.createElement("style");
s.textContent=".tg-soon{position:fixed;left:50%;bottom:90px;z-index:100000;transform:translateX(-50%);display:flex;align-items:center;gap:10px;padding:13px 20px;border-radius:99px;background:#0d1230;border:1px solid #19d9ff;color:#fff;font:800 .88rem system-ui,-apple-system,Segoe UI,Roboto,sans-serif;box-shadow:0 8px 28px rgba(0,150,255,.35);animation:tg-soon-in .45s cubic-bezier(.2,1.4,.4,1) both;overflow:hidden;white-space:nowrap}.tg-soon i{font-style:normal;color:#19d9ff;letter-spacing:2px;font-size:.72rem}.tg-soon::after{content:'';position:absolute;top:0;bottom:0;left:-60%;width:40%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.25),transparent);transform:skewX(-20deg);animation:tg-soon-shine 1.2s .3s ease both}.tg-soon.out{animation:tg-soon-out .3s ease both}@keyframes tg-soon-in{from{opacity:0;transform:translateX(-50%) translateY(20px) scale(.6)}}@keyframes tg-soon-out{to{opacity:0;transform:translateX(-50%) translateY(10px) scale(.9)}}@keyframes tg-soon-shine{to{left:140%}}";
document.head.appendChild(s);
var t=0;
document.addEventListener("click",function(e){
var a=e.target.closest('a[href$="cuenta.html"]');
if(!a)return;
e.preventDefault();
var old=document.querySelector(".tg-soon");if(old)old.remove();
clearTimeout(t);
var d=document.createElement("div");
d.className="tg-soon";d.setAttribute("role","status");
d.innerHTML="<span>Mi cuenta</span><i>PRÓXIMAMENTE</i>";
document.body.appendChild(d);
t=setTimeout(function(){d.classList.add("out");setTimeout(function(){d.remove()},320)},2200);
});
}catch(e){}})();
