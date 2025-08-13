import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let targetUser
    let text

    // Detectar si hay menciones
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        targetUser = m.mentionedJid[0]
        text = args.slice(1).join(' ') // El texto después del @
    } else if (m.quoted) {
        targetUser = m.quoted.sender
        text = args.join(' ')
    } else {
        // Si no hay mención ni reply, usar el autor del mensaje
        targetUser = m.sender
        text = args.join(' ')
    }

    if (!text) return conn.reply(m.chat, `𝐀𝐠𝐫𝐞𝐠𝐚 𝐓𝐞𝐱𝐭𝐨 𝐏𝐚𝐫𝐚 𝐆𝐞𝐧𝐞𝐫𝐚𝐫 𝐄𝐥 𝐒𝐭𝐢𝐜𝐤𝐞𝐫 ☁️`, m)

    const wordCount = text.trim().split(/\s+/).length
    if (wordCount > 30) return m.reply('⚠️ *Máximo 30 palabras*')

    let name = await conn.getName(targetUser)
    let pp = await conn.profilePictureUrl(targetUser, 'image').catch(_ => 'https://qu.ax/ZJKqt.jpg')

    const obj = {
        type: "quote",
        format: "png",
        backgroundColor: "#000000",
        width: 512,
        height: 768,
        scale: 2,
        messages: [{
            entities: [],
            avatar: true,
            from: {
                id: 1,
                name: name,
                photo: {
                    url: pp
                }
            },
            text: text,
            replyMessage: {}
        }]
    }

    const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const buffer = Buffer.from(json.data.result.image, 'base64')
    const stiker = await sticker(buffer, false, '', '')

    if (stiker) return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m)
}

handler.help = ['qc']
handler.tags = ['sticker']
handler.command = /^(qc)$/i

export default handler