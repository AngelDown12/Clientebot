import { addExif } from '../lib/sticker.js'
let handler = async (m, { conn, text }) => {
  if (!m.quoted) return m.reply(`𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐞 𝐀𝐥 𝐒𝐭𝐢𝐜𝐤𝐞𝐫 🌴`)
  let stiker = false
  try {
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) return m.reply(`𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐞 𝐀𝐥 𝐒𝐭𝐢𝐜𝐤𝐞𝐫 🌴`)
    let img = await m.quoted.download()
    if (!img) return m.reply(`𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐞 𝐀𝐥 𝐒𝐭𝐢𝐜𝐤𝐞𝐫 🌴`)
    stiker = await addExif(img, packname || '', author || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m)
    else return m.reply(`𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐞 𝐀𝐥 𝐒𝐭𝐢𝐜𝐤𝐞𝐫 🌴`)
  }
}
handler.help = ['wm <nombre>|<autor>']
handler.tags = ['sticker']
handler.command = ['take', 'robar', 'wm'] 
export default handler