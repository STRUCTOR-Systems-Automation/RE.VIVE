/**
 * POST /api/contact
 * Proxy seguro entre el formulario y el webhook de n8n.
 * - Las credenciales (URL + secret) viven solo en variables de entorno de Vercel,
 *   nunca en el código que el navegador descarga.
 * - Valida campos requeridos en servidor.
 * - Detecta honeypot (campo "website" oculto que solo rellenan bots).
 * - Limita la longitud de los campos para evitar abusos.
 */
export default async function handler(req, res) {
  // Solo aceptamos POST
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  // Vercel parsea automáticamente JSON con Content-Type: application/json
  const body = req.body ?? {};

  // ── Honeypot ──────────────────────────────────────────────────────────────
  // Si el campo oculto "website" viene relleno, es un bot.
  // Devolvemos 200 para no alertarlo, pero no procesamos nada.
  if (body.website) {
    return res.status(200).json({ ok: true });
  }

  // ── Validación básica de campos requeridos ────────────────────────────────
  const required = [
    "nombre", "email", "ubicacion", "edad",
    "objetivo", "experiencia", "expectativas", "whatsapp",
  ];
  for (const field of required) {
    const val = body[field];
    if (val === undefined || val === null || String(val).trim() === "") {
      return res.status(400).json({ error: `Campo requerido: ${field}` });
    }
  }

  // ── Sanitización (longitud máxima por campo) ──────────────────────────────
  const payload = {
    nombre:       String(body.nombre).trim().slice(0, 100),
    email:        String(body.email).trim().slice(0, 200),
    ubicacion:    String(body.ubicacion).trim().slice(0, 100),
    edad:         parseInt(body.edad, 10) || 0,
    objetivo:     String(body.objetivo).trim().slice(0, 500),
    experiencia:  String(body.experiencia || ""),
    expectativas: String(body.expectativas).trim().slice(0, 2000),
    whatsapp:     String(body.whatsapp).trim().slice(0, 30),
    fecha_entrada: new Date().toISOString(),
    estado_lead:  "Nuevo lead",
    origen:       "Formulario web",
  };

  // ── Variables de entorno (configuradas en Vercel Dashboard) ───────────────
  const webhookUrl    = process.env.N8N_WEBHOOK_URL;
  const webhookSecret = process.env.N8N_WEBHOOK_SECRET;

  if (!webhookUrl) {
    console.error("[contact] N8N_WEBHOOK_URL no está configurada");
    return res.status(500).json({ error: "Error de configuración del servidor" });
  }

  // ── Reenvío al webhook de n8n con el header secreto ──────────────────────
  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type":  "application/json",
        "Accept":        "application/json",
        ...(webhookSecret ? { "x-webhook-secret": webhookSecret } : {}),
      },
    });

    if (upstream.ok) {
      return res.status(200).json({ ok: true });
    }

    console.error("[contact] El webhook respondió con:", upstream.status);
    return res.status(500).json({ error: "Error al procesar la solicitud" });

  } catch (err) {
    console.error("[contact] Error de red al llamar al webhook:", err);
    return res.status(500).json({ error: "Error de red" });
  }
}
