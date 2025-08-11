const handler = m => m
handler.all = async function (m) {
  try {
    if (!global.db?.data?.settings) return
    let setting = global.db.data.settings[this.user.jid]
    if (!setting || !setting.autobio) return

    let uptime = clockString(process.uptime() * 1000)
    let bio = `『${global.packname || 'Bot'}』 |「🕒」𝐀𝐜𝐭𝐢𝐯𝐨: ${uptime} |「</>」 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐝: Angel 🌟`

    await this.updateProfileStatus(bio).catch(() => {})
    setting.status = Date.now()
  } catch {}
}

export default handler

function clockString(ms) {
  if (isNaN(ms)) return '-- : -- : -- : --'
  let d = Math.floor(ms / 86400000)
  let h = Math.floor(ms / 3600000) % 24
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [d, h, m, s].map(v => v.toString().padStart(2, '0')).join(' : ')
}