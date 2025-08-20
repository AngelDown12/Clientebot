import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

const handler = async (m, { conn, participants }) => {
  if (!m.isGroup || m.key.fromMe) return

  const content = m.text || m.msg?.caption || ''
  if (!/^\.?n(\s|$)/i.test(content.trim())) return

  await conn.sendMessage(m.chat, { react: { text: '📢', key: m.key } })

  const userText = content.trim().replace(/^\.?n\s*/i, '') 
  const finalText = userText || '' 

  try {
    const users = participants.map(u => conn.decodeJid(u.id))
    const q = m.quoted ? m.quoted : m
    const mtype = q.mtype || ''

    const isMedia = ['imageMessage','videoMessage','audioMessage','stickerMessage'].includes(mtype)
    const originalCaption = (q.msg?.caption || q.text || '').trim()
    const finalCaption = finalText || originalCaption || '📢 Notificación'

    // ⚡️ Si es encuesta, la tratamos como texto normal
    if (m.quoted && (mtype === 'pollCreationMessage' || mtype === 'pollUpdateMessage')) {
      await conn.sendMessage(m.chat, {
        text: `${finalCaption}\n\n${'> 👤VIP.User Josee47🇷🇺'}`,
        mentions: users
      }, { quoted: m })
      return
    }

    // 📸 Si es multimedia citada
    if (m.quoted && isMedia) {
      if (mtype === 'audioMessage') {
        try {
          const media = await q.download()
          await conn.sendMessage(m.chat, { 
            audio: media, 
            mimetype: 'audio/ogg; codecs=opus', 
            ptt: true, 
            mentions: users 
          }, { quoted: m })

          if (finalText) {
            await conn.sendMessage(m.chat, { 
              text: `${finalText}\n\n${'> 👤VIP.User Josee47🇷🇺'}`, 
              mentions: users 
            }, { quoted: m })
          }
        } catch {
          await conn.sendMessage(m.chat, { 
            text: `${finalCaption}\n\n${'> 👤VIP.User Josee47🇷🇺'}`, 
            mentions: users 
          }, { quoted: m })
        }
      } else {
        const media = await q.download()
        if (mtype === 'imageMessage') {
          await conn.sendMessage(m.chat, { image: media, caption: `${finalCaption}\n\n${'> 👤VIP.User Josee47🇷🇺'}`, mentions: users }, { quoted: m })
        } else if (mtype === 'videoMessage') {
          await conn.sendMessage(m.chat, { video: media, caption: `${finalCaption}\n\n${'> 👤VIP.User Josee47🇷🇺'}`, mentions: users, mimetype: 'video/mp4' }, { quoted: m })
        } else if (mtype === 'stickerMessage') {
          await conn.sendMessage(m.chat, { sticker: media, mentions: users }, { quoted: m })
        }
      }
    } else {
      // Texto plano o sin citar
      await conn.sendMessage(m.chat, {
        text: `${finalCaption}\n\n${'> 👤VIP.User Josee47🇷🇺'}`,
        mentions: users
      }, { quoted: m })
    }

  } catch (e) {
    const users = participants.map(u => conn.decodeJid(u.id))
    await conn.sendMessage(m.chat, {
      text: `📢 Notificación\n\n${'> 👤VIP.User Josee47🇷🇺'}`,
      mentions: users
    }, { quoted: m })
  }
}

handler.customPrefix = /^\.?n(\s|$)/i
handler.command = new RegExp
handler.group = true
handler.admin = true

export default handler