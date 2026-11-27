(function(){try{
var D={"free-fire":["FREE FIRE","RECARGAS DIGITALES · DIAMANTES","#d94cff"],"blood-strike":["BLOOD STRIKE","RECARGAS DIGITALES · ORO","#ff4545"],"pubg-mobile":["PUBG MOBILE","RECARGAS DIGITALES · UC","#ffd51e"],"roblox":["ROBLOX","TARJETAS DIGITALES · ROBUX","#19cfff"]};
var k=location.pathname.split("/").pop().replace(/\.html$/,""),d=D[k];
if(!d||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
var r=document.documentElement,o=document.createElement("div");
o.className="tg-book";o.style.setProperty("--ac",d[2]);
o.innerHTML='<div class="tg-cover"><div class="tg-spine"></div><div class="tg-face"><small></small><strong></strong><span></span><i></i><button type="button">ABRIR CATÁLOGO</button></div></div>';
o.querySelector("small").textContent="TIEN GAMES · CATÁLOGO OFICIAL";
o.querySelector("strong").textContent=d[0];
o.querySelector("span").textContent=d[1];
r.appendChild(o);r.classList.add("tg-lock");
var done=false;
function end(){if(done)return;done=true;o.remove();r.classList.remove("tg-lock")}
function open(){if(o.classList.contains("open"))return;o.classList.add("open");r.classList.add("tg-opened");setTimeout(end,1300)}
o.addEventListener("click",open);
setTimeout(open,1900);
setTimeout(end,4500);
}catch(e){document.documentElement.classList.remove("tg-lock")}})();
