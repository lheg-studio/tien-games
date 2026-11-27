(function(){try{
var card=document.querySelector(".catalog-banner + .card");
if(!card)return;
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,t=0;
function build(){
var packs=[].slice.call(card.querySelectorAll(":scope > .pack"));
if(!packs.length)return;
var old=card.querySelector(":scope > .tg-shelf");if(old)old.remove();
var n=Math.ceil(packs.length/2),shelf=document.createElement("div");
shelf.className="tg-shelf"+(n<2?" single":"");
shelf.innerHTML='<div class="tg-pages" tabindex="0" role="group" aria-label="Paquetes del catálogo"></div><div class="tg-hint">Deslizá para pasar de página</div><div class="tg-nav"><button type="button" class="tg-prev" aria-label="Página anterior">‹</button><div class="tg-dots"></div><button type="button" class="tg-next" aria-label="Página siguiente">›</button></div>';
var pages=shelf.querySelector(".tg-pages"),dots=shelf.querySelector(".tg-dots"),prev=shelf.querySelector(".tg-prev"),next=shelf.querySelector(".tg-next"),hint=shelf.querySelector(".tg-hint");
card.insertBefore(shelf,packs[0]);
for(var i=0;i<n;i++){
var pg=document.createElement("div");pg.className="tg-page";
packs.slice(i*2,i*2+2).forEach(function(p){pg.appendChild(p)});
var f=document.createElement("div");f.className="tg-folio";f.textContent="Página "+(i+1)+" de "+n;pg.appendChild(f);
pages.appendChild(pg);
var d=document.createElement("button");d.type="button";d.className="tg-dot";d.setAttribute("aria-label","Ir a la página "+(i+1));d.dataset.i=i;dots.appendChild(d);
}
function w(){return pages.clientWidth||1}
function cur(){return Math.round(pages.scrollLeft/w())}
function go(i){pages.scrollTo({left:Math.max(0,Math.min(n-1,i))*w(),behavior:reduce?"auto":"smooth"})}
var raf=0,seen=0;
function upd(){raf=0;var p=pages.scrollLeft/w(),c=Math.round(p);
if(!reduce)[].forEach.call(pages.children,function(pg,i){var d=p-i,a=Math.abs(d);
if(a>1.1){pg.style.transform="";pg.style.opacity="";return}
pg.style.transform="perspective(1100px) rotateY("+(d*-26)+"deg) scale("+(1-a*.05)+")";
pg.style.opacity=1-Math.min(a,1)*.5});
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
new MutationObserver(function(){clearTimeout(t);t=setTimeout(build,150)}).observe(card,{childList:true});
setTimeout(build,2200);
}catch(e){}})();
