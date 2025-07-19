const axios = require('axios');
const twilio = require('twilio');
require('dotenv').config({path:'.env.local'})
const fs=require('fs');
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
  const animeName=res.data.data.Media.title.english ;
  const epNo=res.data.data.Media.nextAiringEpisode.episode;
      
  if(!res.data.data.Media.nextAiringEpisode){
    console.log("no airing episode for anime " +animeName)
    return;
  }
 const airingAt=res.data.data.Media.nextAiringEpisode.airingAt*1000 //converts seconds to ms
const airingDate = new Date(airingAt).toDateString(); // Converts to "Tue Jul 16 2025"
const todayDate = new Date().toDateString();
console.log("Anime "+animeName)
console.log("airingdate : "+airingDate)
console.log("todayDate : "+todayDate)

  if(todayDate===airingDate){
    sendSMS(animeName, epNo);
  }
}

//sending sms to me 
const client = new twilio(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN);

function sendSMS(animeName, epNo) {
  client.messages
    .create({
      body: `🎉 Episode ${epNo} of ${animeName} airs today!`,
      from: process.env.TWILIO_NUMBER,
      to: process.env.MY_NUMBER
    })
    .then(message => console.log('SMS sent, ID:', message.sid))
    .catch(err => console.error('Failed to send SMS:', err));
}




