(function(){try{
if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
document.addEventListener("click",function(e){
var a=e.target.closest(".game a.button");
if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;
var c=a.closest(".game"),r=c.getBoundingClientRect(),go=a.href;
e.preventDefault();
var o=document.createElement("div");
o.className="tg-grow";
o.style.cssText="--ac:"+getComputedStyle(c).getPropertyValue("--accent")+";top:"+r.top+"px;left:"+r.left+"px;width:"+r.width+"px;height:"+r.height+"px";
o.innerHTML="<strong></strong>";
o.firstChild.textContent=c.querySelector("h3").textContent;
document.body.appendChild(o);
void o.offsetWidth;
o.classList.add("go");
setTimeout(function(){location.href=go},520);
});
window.addEventListener("pageshow",function(){document.querySelectorAll(".tg-grow").forEach(function(x){x.remove()})});
}catch(e){}})();
