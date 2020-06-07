import telebot

bot = telebot.TeleBot("1153023482:AAHqxLOLkXs6XdDb9-tQ-hOANeJVoHiYFIw")

@bot.message_handler(commands=['start'])
def send_welcome(message):
	bot.reply_to(message, "Welcome to @AnimeDB_Bot")
@bot.message_handler(func=lambda e: e.text.startswith('/echo'))
def msg(message):
    m = message.text.split(None)
#   print(type(m))
    if len(m)==1:
      bot.reply_to(message,"Nothing to echo")
    else:
      msg = ' '.join(m[1:])
      bot.reply_to(message,msg)

bot.polling()
    