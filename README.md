# AnimeDB-tgbot 
A Telegram Bot ([@AnimeDB_Bot](https://telegram.dog/animedb_bot)) to Search Anime & Manga Details using kitsu.io API

## Deploy Your Own 
### Simple Way
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
### Legacy Way
```
git clone https://github.com/ArnabXD/AnimeDB-tgbot.git
cd AnimeDB-tgbot
virtualenv -p /usr/bin/python3 venv
​.​ ./venv/bin/activate
pip install -r requirements.txt
​#​ <Create .env file , Look the sample below>
python3 -m bot
```
#### .env ( Mandatory )
```
BOT_TOKEN=YOUR BOT TOKEN FROM @BOTFATHER
BOT_USERNAME=YOUR BOT'S USERNAME (WITH @ SYMBOL)
```
