let handler = async (m, { conn, command }) => {
  let chat = global.db.data.chats[m.chat]

  if (/^banchat$/i.test(command)) {
    if (chat.isBanned) return m.reply('🚫 Este chat ya estaba baneado.')
    chat.isBanned = true
    return m.reply('✅ Chat baneado correctamente. El bot ignorará los mensajes aquí.')
  }

  if (/^unbanchat$/i.test(command)) {
    if (!chat.isBanned) return m.reply('⚠️ Este chat no estaba baneado.')
    chat.isBanned = false
    return m.reply('✅ Chat desbaneado correctamente. El bot vuelve a responder aquí.')
  }
}

handler.command = /^(banchat|unbanchat)$/i
handler.group = true
handler.rowner = true

export default handler

export async function before(m, { isOwner }) {
  let chat = global.db.data.chats[m.chat]

  if (chat?.isBanned) {
    if (isOwner && m.text && /^unbanchat$/i.test(m.text.trim())) {
      return !0
    }
    return !1
  }

  return !0
}