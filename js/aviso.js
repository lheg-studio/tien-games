(function(){try{
var FECHA=[2026,11,27];
var h=new Date();
if(h.getFullYear()!==FECHA[0]||h.getMonth()+1!==FECHA[1]||h.getDate()!==FECHA[2])return;
try{if(sessionStorage.getItem("tg-aviso")==="1")return}catch(e){}
var s=document.createElement("style");
s.textContent=".tg-aviso{position:relative;z-index:60;display:flex;align-items:center;gap:12px;padding:11px 16px;background:linear-gradient(90deg,#ffd51e,#ffb020);color:#1a1300;font:700 .85rem/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}.tg-aviso b{flex:0 0 auto;font-size:1.1rem}.tg-aviso span{flex:1}.tg-aviso button{flex:0 0 auto;width:30px;height:30px;border:0;border-radius:50%;background:rgba(0,0,0,.14);color:#1a1300;font-size:1.1rem;line-height:1;cursor:pointer}.tg-aviso button:active{transform:scale(.92)}";
document.head.appendChild(s);
var a=document.createElement("div");
a.className="tg-aviso";a.setAttribute("role","status");
a.innerHTML='<b>⚠️</b><span></span><button type="button" aria-label="Cerrar aviso">×</button>';
a.querySelector("span").textContent="Hoy 27 de noviembre estamos actualizando la página. Puedes notar errores visuales, lentitud o fallos del servidor. Gracias por tu paciencia.";
a.querySelector("button").addEventListener("click",function(){a.remove();try{sessionStorage.setItem("tg-aviso","1")}catch(e){}});
function put(){document.body.insertBefore(a,document.body.firstChild)}
if(document.body)put();else document.addEventListener("DOMContentLoaded",put);
}catch(e){}})();
