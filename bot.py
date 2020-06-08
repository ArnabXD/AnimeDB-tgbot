import telebot,search

bot = telebot.TeleBot("1153023482:AAHqxLOLkXs6XdDb9-tQ-hOANeJVoHiYFIw")

@bot.message_handler(commands=['start'])
def send_welcome(message):
	bot.reply_to(message, "Welcome to @AnimeDB_Bot")

@bot.message_handler(commands=["search"])
def search_anime(message):
  key = telebot.util.extract_arguments(message.text)
  if not key:
    bot.reply_to(message,"Search Example : `/search Naruto`",parse_mode='Markdown')
  else:
    print(" Searching for ",key)
    result = search.search_anime(key)
    if result==0:
      bot.reply_to(message,"No Anime Found ☹️")
    else:
      print("Result Found 👍")
      poster = result["attributes"]["posterImage"]["medium"]
      synopsis = "<b>📖 Synopsis : </b> "+result['attributes']['synopsis']
      caption = (f"<b>Anime : </b>{result['attributes']['canonicalTitle']}\n"
      f"<b>Average Rating : </b>{result['attributes']['averageRating']}\n"
      f"<b>Status : </b>{result['attributes']['status']}\n"
      f"<b>Age Rating : </b>{result['attributes']['ageRatingGuide']}\n")
      bot.send_photo(message.chat.id,poster,caption,parse_mode='HTML')
      bot.send_message(message.chat.id,synopsis,parse_mode='HTML')

bot.polling()