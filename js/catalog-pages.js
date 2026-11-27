(function(){try{
var card=document.querySelector(".catalog-banner + .card");
if(!card)return;
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,t=0;
[].forEach.call(card.querySelectorAll(":scope > .pack"),function(p){p.setAttribute("data-old","1")});
function build(force){
var all=[].slice.call(card.querySelectorAll(":scope > .pack"));
var fresh=all.filter(function(p){return !p.hasAttribute("data-old")});
if(!all.length||(!fresh.length&&!force))return;
var packs=fresh.length?fresh:all;
all.forEach(function(p){if(packs.indexOf(p)<0)p.remove()});
var old=card.querySelector(":scope > .tg-shelf");if(old)old.remove();
var n=Math.ceil(packs.length/2),shelf=document.createElement("div");
shelf.className="tg-shelf"+(n<2?" single":"");
shelf.innerHTML='<div class="tg-pages" tabindex="0" role="group" aria-label="Paquetes del catálogo"></div><div class="tg-hint">Deslizá para ver más paquetes</div><div class="tg-nav"><button type="button" class="tg-prev" aria-label="Página anterior">‹</button><div class="tg-dots"></div><button type="button" class="tg-next" aria-label="Página siguiente">›</button></div>';
var pages=shelf.querySelector(".tg-pages"),dots=shelf.querySelector(".tg-dots"),prev=shelf.querySelector(".tg-prev"),next=shelf.querySelector(".tg-next"),hint=shelf.querySelector(".tg-hint");
card.insertBefore(shelf,packs[0]);
for(var i=0;i<n;i++){
var pg=document.createElement("div");pg.className="tg-page";
packs.slice(i*2,i*2+2).forEach(function(p){pg.appendChild(p)});
pages.appendChild(pg);
var d=document.createElement("button");d.type="button";d.className="tg-dot";d.setAttribute("aria-label","Ir a la página "+(i+1));d.dataset.i=i;dots.appendChild(d);
}
function w(){return pages.clientWidth||1}
function cur(){return Math.round(pages.scrollLeft/w())}
function go(i){pages.scrollTo({left:Math.max(0,Math.min(n-1,i))*w(),behavior:reduce?"auto":"smooth"})}
var raf=0,seen=0;
function upd(){raf=0;var p=pages.scrollLeft/w(),c=Math.round(p);
if(!reduce)[].forEach.call(pages.children,function(pg,i){var d=p-i,a=Math.min(Math.abs(d),1);
if(Math.abs(d)>1.1){pg.style.transform="";pg.style.opacity="";return}
pg.style.transform="perspective(1100px) rotateY("+(d*-14)+"deg) scale("+(1-a*.18)+")";
pg.style.opacity=1-a*.65});
[].forEach.call(dots.children,function(d,i){d.classList.toggle("is-on",i===c)});
prev.disabled=c<=0;next.disabled=c>=n-1;
if(!seen&&c>0){seen=1;hint.classList.add("gone")}
}
pages.addEventListener("scroll",function(){if(!raf)raf=requestAnimationFrame(upd)},{passive:true});
prev.addEventListener("click",function(){go(cur()-1)});
next.addEventListener("click",function(){go(cur()+1)});
dots.addEventListener("click",function(e){var b=e.target.closest(".tg-dot");if(b)go(+b.dataset.i)});
pages.addEventListener("keydown",function(e){if(e.key==="ArrowRight")go(cur()+1);if(e.key==="ArrowLeft")go(cur()-1)});
upd();
}
new MutationObserver(function(){clearTimeout(t);t=setTimeout(function(){build(false)},120)}).observe(card,{childList:true});
setTimeout(function(){build(true)},5000);
setTimeout(function(){if(!card.querySelector(".tg-shelf"))document.documentElement.classList.add("tg-nofix")},5600);
}catch(e){document.documentElement.classList.add("tg-nofix")}})();
