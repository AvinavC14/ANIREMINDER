# 📬 Anime Reminder Script

A Node.js-based automation script that sends you daily SMS reminders about anime episodes airing **today** — powered by the AniList API and Twilio.

---

## ✨ Features

- 📅 Daily SMS alerts at 10 AM IST for anime episodes airing today.
- 🔎 Uses AniList GraphQL API to fetch real-time airing info.
- 📤 Sends SMS via Twilio.
- 🧾 Reads anime names from a simple `animes.json` file (no IDs required).
- ⚡ Efficient: only checks what's needed and notifies on exact day.

---

## 📁 Project Structure
```
ANIREMINDER/
├── .github/           # GitHub Actions workflow 
├── node_modules/      # Dependencies
├── .env.local         # Environment variables (Twilio creds, phone numbers)
├── .gitignore         # Git ignore file
├── animes.json        # List of anime titles to track
├── backend.js         # Main script: fetch + check + send SMS
├── package.json 
└── package-lock.json
```


---

## 📦 Installation

1. **Clone the repo**
```bash
git clone https://github.com/your-username/aniremainder.git
cd aniremainder
```
2. **Install dependencies**

```bash
npm install
```
3. **Create .env.local file**
```bash
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_NUMBER=your_twilio_phone_number
MY_NUMBER=your_verified_phone_number
```

4. **Fill animes.json with anime names**
```bash
[
  "Grand Blue Season 2",
  ""Dan Da Dan Season 2",
  "The Fragrant Flower Blooms with Dignity",
  "Gachiakuta"
]
```
## 🚀 Usage
- Run manually:
```bash
node backend.js
```
**Or run daily using a cron job (e.g., GitHub Actions or OS-based cron):**
- Example GitHub Actions file can be placed in .github/workflows/anime-cron.yml

## 🛠 How It Works
- Loads anime names from animes.json

- Uses AniList GraphQL to get airing schedule

- Compares airing date with current date

- Sends SMS if an episode airs today

## 🔐 Security
- Use .env.local to store your secrets and ensure it's listed in .gitignore.

```bash
.env.local
```
## 🙌 Credits
- AniList GraphQL API

- Twilio
