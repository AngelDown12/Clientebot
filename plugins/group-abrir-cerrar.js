let handler = async (m, { conn }) => {
  if (!m.isGroup || !m.sender) return;
  if (!m.text) return;

  const lower = m.text.trim().toLowerCase();

  const isClose = {
    abrir: "not_announcement",
    cerrar: "announcement",
    "grupo abrir": "not_announcement",
    "grupo cerrar": "announcement",
    open: "not_announcement",
    close: "announcement",
    ".abrir": "not_announcement",
    ".cerrar": "announcement",
    ".grupo abrir": "not_announcement",
    ".grupo cerrar": "announcement",
    ".open": "not_announcement",
    ".close": "announcement",
    ".grupo open": "not_announcement",
    ".grupo close": "announcement"
  }[lower];

  if (!isClose) return;

  try {
    // Ejecutar cambio sin validar explícitamente permisos
    await conn.groupSettingUpdate(m.chat, isClose);
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  } catch (e) {
    // Silencioso: no hacer nada si falla
  }
};

handler.customPrefix = /^(?:\.?grupo\s(?:abrir|cerrar|open|close)|\.?(?:abrir|cerrar|open|close))$/i;
handler.command = new RegExp();
handler.admin = true;
handler.botAdmin = true;
handler.group = true;

export default handler;