//Desarrollado por Angel


import fetch from 'node-fetch'

export async function before(m, { conn }) {
//let img = await (await fetch(`https://cdn.russellxz.click/9358a527.jpeg`)).buffer()
let img = catalogo
 global.fake = {
    contextInfo: {
            isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "",
      serverMessageId: 100,
      newsletterName: '',
    },
            externalAdReply: {
                                    showAdAttribution: true,
                                        title: botname,
                                        body: 'Hola',
                                        mediaUrl: null,
                                        description: null,
                                        previewType: "PHOTO",
                                        thumbnailUrl: 'https://cdn.russellxz.click/9358a527.jpeg',
                           sourceUrl: canal,
                           mediaType: 1,
                   renderLargerThumbnail: false
            },
    },
  }

 global.adReply = {
            contextInfo: { 
             forwardingScore: 9999, 
                 isForwarded: false, 
                    externalAdReply: {
                                    showAdAttribution: true,
                                        title: botname,
                                        body: textbot,
                                        mediaUrl: null,
                                        description: null,
                                        previewType: "PHOTO",
                                        thumbnailUrl: img,
                    thumbnail: img,
                           sourceUrl: canal,
                           mediaType: 1,
                   renderLargerThumbnail: true
                                }
                        }
                }

global.rcanal = {
contextInfo: {
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "",
serverMessageId: 100,
newsletterName: '',
},
externalAdReply: { 
showAdAttribution: true,
title: '👤VIP.User Josee47🇷🇺',
body: '',
previewType: "PHOTO",
thumbnailUrl: 'https://cdn.russellxz.click/9358a527.jpeg',
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: false
},},}

}