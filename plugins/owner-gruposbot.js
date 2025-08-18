const handler = async (m, { conn }) => {
  try {
    let txt = '';
    // Filtra solo los grupos en los que el bot está actualmente
    const groups = Object.entries(conn.chats)
      .filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)
      .filter(([jid, chat]) => {
        const participants = (chat.metadata?.participants || []);
        return participants.some(p => conn.decodeJid(p.id) === conn.user.jid);
      });

    const totalGroups = groups.length;

    for (let i = 0; i < groups.length; i++) {
      const [jid, chat] = groups[i];

      // Metadata del grupo
      const groupMetadata = chat.metadata || (await conn.groupMetadata(jid).catch(() => null)) || {};
      const participants = groupMetadata.participants || [];

      // Buscar al bot en participantes
      const bot = participants.find(u => conn.decodeJid(u.id) === conn.user.jid) || {};
      const isBotAdmin = bot?.admin || false;
      const totalParticipants = participants.length;

      // Construir el mensaje por grupo
      txt += `*◉ Grupo ${i + 1}*
*➤ Nombre:* ${await conn.getName(jid)}
*➤ ID:* ${jid}
*➤ Admin:* ${isBotAdmin ? '✔ Sí' : '❌ No'}
*➤ Total de Participantes:* ${totalParticipants}
*➤ Link:* ${isBotAdmin ? await conn.groupInviteCode(jid).then(code => `https://chat.whatsapp.com/${code}`).catch(() => '--- (Error) ---') : '--- (No admin) ---'}\n\n`;
    }

    m.reply(`*Lista de grupos en los que está el Bot* 🤖\n\n*—◉ Total de grupos:* ${totalGroups}\n\n${txt}`.trim());
  } catch (e) {
    console.error(e);
    m.reply('Ocurrió un error al obtener la lista de grupos.');
  }
};

handler.help = ['groups', 'grouplist'];
handler.tags = ['owner'];
handler.command = /^(grupos|grouplist|listadegrupo|gruposlista|listagrupos|listgroup)$/i;
handler.rowner = true;
handler.private = false;

export default handler;