const axios = require('axios');
require('dotenv').config({path:'.env.local'})
const fs=require('fs');
const { truncate } = require('fs/promises');
//the anime list
const animes=JSON.parse(fs.readFileSync('animes.json','utf-8'))
animes.forEach((anime)=>{
    getAnimeInfo(anime);
}
)
//this function gets the anime information from Anilist api
async function getAnimeInfo(title) {
  const query = `
    query {
      Media(search: "${title}", type: ANIME) {
        title {
          english
        }
        status
        nextAiringEpisode {
          airingAt
          episode
        }
      }
    }
  `;

  const res = await axios.post(
    'https://graphql.anilist.co',
    { query },
    { headers: { 'Content-Type': 'application/json' } }
  );
 
      
  if(!res.data.data.Media.nextAiringEpisode){
    console.log("no airing episode for anime " + title);
    return;
  }
const animeName=res.data.data.Media.title.english ;
const epNo=res.data.data.Media.nextAiringEpisode.episode;
const airingAt=res.data.data.Media.nextAiringEpisode.airingAt*1000 //converts seconds to ms
const airingDate = new Date(airingAt).toDateString(); // Converts to "Tue Jul 16 2025"
const todayDate = new Date().toDateString();
const time=new Date(airingAt).toLocaleTimeString('en-US',{
  timeZone:'Asia/Kolkata',
  hour:'numeric',
  minute:'2-digit',
  hour12:true
})
console.log("Anime "+animeName)
console.log("airingdate : "+airingDate)
console.log("todayDate : "+todayDate)

  if(todayDate===airingDate){
    sendTelegram(animeName, epNo,time);
  }
}

//sending message to me 
async function sendTelegram(animeName, epNo, time) {
  try {
    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: `🎉 Episode ${epNo} of ${animeName} airs today at ${time}!`
      }
    );

    console.log("Telegram message sent!");
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}




