(() => {
  const supabase = window.tgSupabase;
  const whatsapp = "595993420918";

  const games = {
    "free-fire": "FREE FIRE",
    "blood-strike": "BLOOD STRIKE",
    "pubg-mobile": "PUBG MOBILE",
    "roblox": "ROBLOX"
  };

  const gameKey = document.body.dataset.game;
  const gameName = games[gameKey];

  if (!supabase || !gameName) {
    console.error("Error al iniciar TIEN GAMES.");
    return;
  }

  const style = document.createElement("style");
  style.textContent = `
    .tg-order-overlay {
      position:fixed;inset:0;z-index:99999;display:none;
      align-items:center;justify-content:center;padding:18px;
      background:rgba(0,0,0,.84);backdrop-filter:blur(8px);
    }
    .tg-order-box {
      width:100%;max-width:430px;max-height:90vh;overflow:auto;
      box-sizing:border-box;background:#101326;color:white;
      border:1px solid #30385b;border-radius:20px;padding:24px;
      font-family:inherit;
    }
    .tg-order-box h2 {margin-top:0}
    .tg-order-box p {color:#bdc5dc;line-height:1.5}
    .tg-order-box label {display:block;margin:14px 0 6px}
    .tg-order-box input {
      width:100%;box-sizing:border-box;padding:13px;
      border-radius:10px;border:1px solid #414968;
      background:#080b19;color:white;font:inherit;
    }
    .tg-order-box button,.tg-order-box .tg-wa {
      display:block;width:100%;box-sizing:border-box;
      padding:13px;margin-top:14px;border:0;border-radius:10px;
      background:#247bff;color:white;text-align:center;
      font-weight:700;font:inherit;text-decoration:none;cursor:pointer;
    }
    .tg-order-box .tg-cancel {background:#252b43}
    .tg-order-box button:disabled {opacity:.55}
    .tg-order-error {color:#ff9292!important}
    .tg-order-success {color:#83e5ae!important}
    .tg-honeypot {
      position:absolute!important;left:-10000px!important;
      width:1px!important;height:1px!important;
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement("div");
  overlay.className = "tg-order-overlay";
  overlay.innerHTML = `
    <section class="tg-order-box" role="dialog"
      aria-modal="true" aria-labelledby="tg-order-title">
      <h2 id="tg-order-title">Registrar pedido</h2>
      <p id="tg-order-package"></p>
      <form id="tg-order-form">
        <label for="tg-name">Nombre del cliente</label>
        <input id="tg-name" maxlength="100" required
          autocomplete="name" placeholder="Nombre">

        <label for="tg-contact">WhatsApp o contacto</label>
        <input id="tg-contact" maxlength="40" required
          autocomplete="tel" placeholder="Número de contacto">

        <div id="tg-player-wrap">
          <label for="tg-player">ID de jugador</label>
          <input id="tg-player" maxlength="60"
            placeholder="Ingresá tu ID de jugador">
        </div>

        <div class="tg-honeypot" aria-hidden="true">
          <label for="tg-website">No completar</label>
          <input id="tg-website" tabindex="-1" autocomplete="off">
        </div>

        <p id="tg-order-message" aria-live="polite"></p>
        <button id="tg-submit" type="submit">Registrar pedido</button>
        <button class="tg-cancel" id="tg-cancel" type="button">
          Cancelar
        </button>
      </form>
    </section>
  `;
  document.body.appendChild(overlay);

  const form = overlay.querySelector("#tg-order-form");
  const message = overlay.querySelector("#tg-order-message");
  const submit = overlay.querySelector("#tg-submit");
  const player = overlay.querySelector("#tg-player");
  const playerWrap = overlay.querySelector("#tg-player-wrap");

  let selected = null;
  let fallbackUrl = "";

  function closeModal() {
    overlay.style.display = "none";
    form.reset();
    message.textContent = "";
    message.className = "";
    submit.disabled = false;
    submit.textContent = "Registrar pedido";
  }

  overlay.querySelector("#tg-cancel").addEventListener("click", closeModal);

  overlay.addEventListener("click", event => {
    if (event.target === overlay) closeModal();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && overlay.style.display === "flex") {
      closeModal();
    }
  });

  document.addEventListener("click", event => {
    const link = event.target.closest(".pack a");
    if (!link) return;

    event.preventDefault();

    const pack = link.closest(".pack");
    const packageName = pack.querySelector("span")?.textContent.trim();
    const priceText = pack.querySelector("b")?.textContent.trim();
    const price = Number(priceText?.replace(/\D/g, ""));

    if (!packageName || !Number.isInteger(price) || price <= 0) {
      alert("No se pudo identificar el paquete.");
      return;
    }

    selected = { packageName, price };
    fallbackUrl = link.href;

    overlay.querySelector("#tg-order-package").textContent =
      `${gameName} · ${packageName} · ${priceText}`;

    playerWrap.style.display = gameKey === "roblox" ? "none" : "block";
    player.required = gameKey !== "roblox";

    overlay.style.display = "flex";
    overlay.querySelector("#tg-name").focus();
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!selected) return;

    submit.disabled = true;
    submit.textContent = "Registrando...";
    message.textContent = "Conectando con TIEN GAMES...";

    const payload = {
      cliente_nombre: overlay.querySelector("#tg-name").value.trim(),
      cliente_contacto: overlay.querySelector("#tg-contact").value.trim(),
      juego: gameName,
      paquete: selected.packageName,
      precio: selected.price,
      jugador_id: gameKey === "roblox" ? "" : player.value.trim(),
      website: overlay.querySelector("#tg-website").value
    };

    try {
      const { data, error } = await supabase.functions.invoke(
        "registrar-pedido",
        { body: payload }
      );

      if (error || !data?.ok || !data?.pedido?.id) {
        throw new Error(data?.error || "No se pudo registrar el pedido.");
      }

      const orderId = data.pedido.id;
      const text = [
        "Hola TIEN GAMES, registré un pedido.",
        `Referencia: ${orderId}`,
        `Juego: ${gameName}`,
        `Paquete: ${selected.packageName}`,
        `Precio: ${selected.price.toLocaleString("es-PY")} Gs.`,
        `Cliente: ${payload.cliente_nombre}`,
        `Contacto: ${payload.cliente_contacto}`,
        payload.jugador_id ? `ID de jugador: ${payload.jugador_id}` : ""
      ].filter(Boolean).join("\n");

      const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;

      form.innerHTML = `
        <p class="tg-order-success">Pedido registrado correctamente.</p>
        <p>Referencia del pedido:</p>
        <p style="overflow-wrap:anywhere;font-size:.85rem">${orderId}</p>
        <a class="tg-wa" href="${waUrl}" target="_blank"
          rel="noopener">Continuar por WhatsApp</a>
        <button class="tg-cancel" id="tg-finish" type="button">Cerrar</button>
      `;

      form.querySelector("#tg-finish").addEventListener("click", () => window.location.reload());

    } catch (error) {
      console.error("Error de pedido:", error);
      message.textContent =
        error.message || "Error de conexión. Intentá nuevamente.";
      message.className = "tg-order-error";
      submit.disabled = false;
      submit.textContent = "Reintentar";

      if (!form.querySelector(".tg-fallback")) {
        const link = document.createElement("a");
        link.className = "tg-wa tg-fallback";
        link.href = fallbackUrl;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = "Consultar por WhatsApp sin registrar";
        form.appendChild(link);
      }
    }
  });
})();
