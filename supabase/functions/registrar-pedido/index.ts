import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const catalogo: Record<string, Record<string, number>> = {
  "FREE FIRE": {
    "110 diamantes": 7200,
    "341 diamantes": 20000,
    "572 diamantes": 33000,
    "1.166 diamantes": 62000,
    "2.398 diamantes": 126000,
    "6.160 diamantes": 310000,
  },
  "BLOOD STRIKE": {
    "105 oros": 6500,
    "320 oros": 19500,
    "540 oros": 32000,
    "645 oros": 38500,
    "1.100 oros": 64000,
    "2.260 oros": 128000,
    "3.120 oros": 180000,
    "5.800 oros": 320000,
    "10.320 oros": 576000,
  },
  "PUBG MOBILE": {
    "60 UC": 7500,
    "325 UC": 35000,
    "385 UC": 43000,
    "660 UC": 73000,
    "1.800 UC": 185000,
    "3.850 UC": 350000,
    "8.100 UC": 697000,
  },
  "ROBLOX": {
    "50 Robux": 4000,
    "100 Robux": 7500,
    "150 Robux": 11500,
    "200 Robux": 15000,
    "400 Robux": 30000,
    "500 Robux": 36000,
    "600 Robux": 43500,
    "800 Robux": 58000,
    "1.000 Robux": 71500,
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const responder = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  if (req.method !== "POST") {
    return responder({ error: "Método no permitido." }, 405);
  }

  try {
    const body = await req.json();

    // Campo señuelo para reducir envíos automáticos simples.
    if (body.website) {
      return responder({ error: "Solicitud no válida." }, 400);
    }

    const nombre = String(body.cliente_nombre ?? "").trim();
    const contacto = String(body.cliente_contacto ?? "").trim();
    const juego = String(body.juego ?? "").trim().toUpperCase();
    const paquete = String(body.paquete ?? "").trim();
    const jugadorId = String(body.jugador_id ?? "").trim();
    const precio = Number(body.precio);

    if (!nombre || nombre.length > 100) {
      return responder({ error: "Ingresá un nombre válido." }, 400);
    }

    if (!contacto || contacto.length > 40) {
      return responder({ error: "Ingresá un contacto válido." }, 400);
    }

    if (!catalogo[juego] || !catalogo[juego][paquete]) {
      return responder({ error: "El paquete seleccionado no existe." }, 400);
    }

    const precioCorrecto = catalogo[juego][paquete];

    if (!Number.isInteger(precio) || precio !== precioCorrecto) {
      return responder({ error: "El precio no coincide con el catálogo." }, 400);
    }

    if (juego === "ROBLOX" && jugadorId) {
      return responder({ error: "Roblox utiliza códigos canjeables; no requiere ID." }, 400);
    }

    if (juego !== "ROBLOX" && (!jugadorId || jugadorId.length > 60)) {
      return responder({ error: "Ingresá un ID de jugador válido." }, 400);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceKey) {
      console.error("Falta la configuración interna de Supabase.");
      return responder({ error: "Servicio temporalmente no disponible." }, 500);
    }

    const db = createClient(supabaseUrl, serviceKey);

    const { data, error } = await db
      .from("pedidos")
      .insert({
        cliente_nombre: nombre,
        cliente_contacto: contacto,
        juego,
        paquete,
        precio: precioCorrecto,
        jugador_id: juego === "ROBLOX" ? null : jugadorId,
        estado: "pendiente",
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Error al registrar pedido:", error.message);
      return responder({ error: "No se pudo registrar el pedido." }, 500);
    }

    return responder({
      ok: true,
      mensaje: "Pedido registrado correctamente.",
      pedido: data,
    }, 201);
  } catch {
    return responder({ error: "Solicitud inválida." }, 400);
  }
});
