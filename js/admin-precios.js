(function(){
var list=document.getElementById("productsList");
if(!list)return;
function enhance(){
[].forEach.call(list.querySelectorAll("article.order"),function(a){
if(a.dataset.pr)return;
var b=a.querySelector("[data-edit-product]");if(!b)return;
a.dataset.pr="1";
var id=b.dataset.editProduct;
var w=document.createElement("div");
w.style.cssText="display:flex;gap:8px;margin:10px 0 4px";
w.innerHTML='<input type="number" min="1" step="1" inputmode="numeric" placeholder="Nuevo precio" style="flex:1;margin:0"><button type="button" style="width:auto;margin:0;padding:0 16px">Cambiar</button>';
var m=document.createElement("p");m.className="small";
a.appendChild(w);a.appendChild(m);
w.querySelector("button").onclick=async function(){
var db=window.tgSupabase,n=Number(w.querySelector("input").value);
if(!db||!Number.isSafeInteger(n)||n<=0){m.textContent="Ingresá un precio válido.";m.className="small error";return}
this.disabled=true;m.textContent="Guardando...";m.className="small muted";
var r=await db.from("productos").update({precio:n}).eq("id",id);
this.disabled=false;
if(r.error){m.textContent="No se pudo cambiar. Revisá los permisos.";m.className="small error";return}
document.getElementById("refreshProducts").click();
};
});
}
new MutationObserver(enhance).observe(list,{childList:true});
enhance();
})();
