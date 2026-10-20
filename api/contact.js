// Formulario de contacto: función serverless de Vercel (Node).
// Recibe JSON desde /contacto y lo envía por correo mediante Resend.
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  clave de https://resend.com (obligatoria para enviar)
//   CONTACT_TO      destino, por defecto info@coresolutions.com.ec
//   CONTACT_FROM    remitente verificado en Resend, por defecto
//                   "Coresolutions Web <web@coresolutions.com.ec>"
//
// Sin RESEND_API_KEY responde 503 y la página abre el correo del visitante
// como respaldo, así el formulario nunca queda sin salida.

const TO = process.env.CONTACT_TO || 'info@coresolutions.com.ec';
const FROM = process.env.CONTACT_FROM || 'Coresolutions Web <web@coresolutions.com.ec>';
const MAX = { nombre: 120, empresa: 160, correo: 200, interes: 200, mensaje: 4000 };
const hits = new Map(); // límite básico por IP dentro de la misma instancia

function clean(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
}
function esc(s) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
function limited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method' });
  }
  const b = typeof req.body === 'object' && req.body ? req.body : {};
  const d = {
    nombre: clean(b.nombre, MAX.nombre),
    empresa: clean(b.empresa, MAX.empresa),
    correo: clean(b.correo, MAX.correo),
    interes: clean(b.interes, MAX.interes),
    mensaje: clean(b.mensaje, MAX.mensaje),
  };

  // Honeypot y tiempo mínimo de llenado: los robots fallan aquí.
  if (clean(b.web, 50) || (Number(b.t) && Number(b.t) < 2000)) return res.status(200).json({ ok: true });

  if (d.nombre.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.correo)) {
    return res.status(400).json({ ok: false, error: 'invalid' });
  }
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'na';
  if (limited(ip)) return res.status(429).json({ ok: false, error: 'rate' });

  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(503).json({ ok: false, error: 'not_configured' });

  const subject = 'Solicitud de evaluación: ' + (d.empresa || d.nombre);
  const text = `Nombre: ${d.nombre}\nEmpresa: ${d.empresa || '-'}\nCorreo: ${d.correo}\nÁreas de interés: ${d.interes || '-'}\n\n${d.mensaje || '(sin descripción)'}\n\n— Enviado desde coresolutions.com.ec`;
  const html = `<p><b>Nombre:</b> ${esc(d.nombre)}<br><b>Empresa:</b> ${esc(d.empresa || '-')}<br><b>Correo:</b> ${esc(d.correo)}<br><b>Áreas de interés:</b> ${esc(d.interes || '-')}</p><p style="white-space:pre-wrap">${esc(d.mensaje || '(sin descripción)')}</p><p style="color:#888">— Enviado desde coresolutions.com.ec</p>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: [TO], reply_to: d.correo, subject, text, html }),
    });
    if (!r.ok) {
      console.error('resend', r.status, await r.text());
      return res.status(502).json({ ok: false, error: 'provider' });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('contact', e);
    return res.status(502).json({ ok: false, error: 'provider' });
  }
};
