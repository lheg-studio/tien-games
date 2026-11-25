const WHATSAPP = ""; // Agrega aquí tu número con código de país, sin + ni espacios.

const games = [
 {
  id:"freefire",name:"FREE FIRE",unit:"Diamantes",symbol:"💎",
  packages:[
   [110,7200],[341,20000],[572,33000],
   [1166,62000],[2398,126000],[6160,310000]
  ]
 },
 {
  id:"bloodstrike",name:"BLOOD STRIKE",unit:"Oros",symbol:"⚡",
  packages:[
   [105,6500],[320,19500],[540,32000],
   [645,38500],[1100,64000],[2260,128000],
   [3120,180000],[5800,320000],[10320,576000]
  ]
 },
 {
  id:"pubg",name:"PUBG MOBILE",unit:"UC",symbol:"🎯",
  packages:[
   [60,7500],[325,35000],[385,43000],
   [660,73000],[1800,185000],
   [3850,350000],[8100,697000]
  ]
 },
 {
  id:"roblox",name:"ROBLOX",unit:"Robux",symbol:"⬛",
  packages:[
   [10,1000],[50,4000],[100,7500],[150,11500],
   [200,15000],[400,30000],[500,36000],
   [600,43500],[800,58000],[1000,71500]
  ]
 }
];

const money = n => "Gs. " + n.toLocaleString("es-PY");

const gamesBox = document.getElementById("games");
const packageBox = document.getElementById("packageList");
const title = document.getElementById("gameTitle");
const search = document.getElementById("search");

let selected = null;

function renderGames(){
 gamesBox.innerHTML = games.map(g=>`
  <article class="game ${selected===g.id?"active":""}" data-id="${g.id}">
   <div class="symbol">${g.symbol}</div>
   <h3>${g.name}</h3>
   <p>${g.packages.length} paquetes disponibles</p>
  </article>
 `).join("");

 document.querySelectorAll(".game").forEach(el=>{
  el.addEventListener("click",()=>selectGame(el.dataset.id));
 });
}

function selectGame(id){
 selected=id;
 const game=games.find(g=>g.id===id);
 title.textContent=game.name;

 packageBox.innerHTML=`
  <div class="package-list">
   ${game.packages.map(([amount,price])=>`
    <article class="package">
     <strong>${amount.toLocaleString("es-PY")} ${game.unit}</strong>
     <div class="price">${money(price)}</div>
     <button onclick="order('${game.name}',${amount},'${game.unit}',${price})">
      SOLICITAR RECARGA
     </button>
    </article>
   `).join("")}
  </div>
 `;

 renderGames();
}

function order(game,amount,unit,price){
 const message=`Hola TIEN GAMES. Quiero solicitar ${amount} ${unit} de ${game}. Precio: ${money(price)}.`;
 if(!WHATSAPP){
  alert("El catálogo está listo. Configura el número de WhatsApp en js/script.js para recibir pedidos.");
  return;
 }
 window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,"_blank");
}

search.addEventListener("input",()=>{
 const q=search.value.toLowerCase().trim();
 document.querySelectorAll(".game").forEach(el=>{
  const g=games.find(x=>x.id===el.dataset.id);
  const matches=g.name.toLowerCase().includes(q)||
   g.packages.some(p=>String(p[0]).includes(q));
  el.style.display=matches?"":"none";
 });
});

renderGames();
