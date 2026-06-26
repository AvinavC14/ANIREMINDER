# 📬 Anime Reminder

A simple Node.js automation script that checks your favorite anime every day using the AniList GraphQL API and sends a **Telegram notification** whenever an episode is airing that day.

## ✨ Features

- 📅 Daily episode reminders
- 🔎 Fetches live airing data from AniList
- 📲 Sends notifications through Telegram
- 📋 Reads anime titles from `animes.json`
- 🤖 Easily automated with GitHub Actions

## 📂 Project Structure

```
ANIREMINDER/
├── .github/workflows/    # GitHub Actions workflow
├── animes.json           # Anime watchlist
├── backend.js            # Main script
├── package.json
└── .env.local            # Environment variables (local only)
```

## 🚀 Setup

1. Clone the repository

```bash
git clone https://github.com/AvinavC14/ANIREMINDER.git
cd ANIREMINDER
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

4. Add the anime you want to track in `animes.json`

```json
[
  "One Piece",
  "Gachiakuta",
  "Dan Da Dan Season 2"
]
```

## ▶️ Run

```bash
node backend.js
```

Or automate it using GitHub Actions (included in this repository).

## ⚙️ How it works

1. Reads anime titles from `animes.json`
2. Queries the AniList GraphQL API
3. Checks whether an episode airs today
4. Sends a Telegram notification if it does

## 🙌 Credits

- AniList GraphQL API
- Telegram Bot API
