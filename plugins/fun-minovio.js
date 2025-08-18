import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'

let handlerMinovia = async (m, { conn, participants }) => {
  let _pp = './storage/menus/Menu1.jpg'

  let randomUser
  if (m.isGroup) {
    let groupParticipants = participants
      .map(p => p.id)
      .filter(id => id !== m.sender && id !== conn.user.jid)
    if (groupParticipants.length === 0) randomUser = m.sender
    else randomUser = groupParticipants[Math.floor(Math.random() * groupParticipants.length)]
  } else {
    randomUser = m.sender
  }

  let pp = await conn.profilePictureUrl(randomUser, 'image').catch(_ => './src/novios.jpg')
  let name = conn.getName(randomUser)

  let fkon = {
    key: {
      fromMe: false,
      participant: `${m.sender.split`@`[0]}@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {})
    },
    message: {
      contactMessage: {
        displayName: `${name}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${randomUser.split('@')[0]}:${randomUser.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    }
  }

  let str = `𝙀𝙎𝙏𝘼 𝙀𝙎 𝙈𝙄 𝙉𝙊𝙑𝙄𝙊, *¿* 𝙀𝙎 𝙃𝙀𝙍𝙈𝙊𝙎𝙊 𝙑𝙀𝙍𝘿𝘼𝘿 *?* 😍

@${randomUser.replace(/@.+/, '')} 𝙀𝙍𝙀𝙎 𝙀𝙇 𝙈𝙀𝙅𝙊𝙍 𝙉𝙊𝙑𝙄𝙊 𝘿𝙀𝙇 𝙈𝙐𝙉𝘿𝙊, 𝙏𝙀 𝙌𝙐𝙄𝙀𝙍𝙊 𝘽𝙀𝘽𝙀.🫶🏻♥️`.trim()

  conn.sendFile(m.chat, pp, 'perfil.jpg', str, fkon, false, { mentions: [randomUser] })
}

handlerMinovia.help = ['minovio']
handlerMinovia.tags = ['rg']
handlerMinovia.command = /^minovio$/i
export default handlerMinovia