import telebot

bot = telebot.TeleBot("1153023482:AAHqxLOLkXs6XdDb9-tQ-hOANeJVoHiYFIw")

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
	bot.reply_to(message, "Howdy, how are you doing?")
@bot.message_handler(func=lambda e: e.text.startswith('/echo'))
def msg(message):
    m = message.text.split(None)
    if len(m)==1:
      bot.reply_to(message,"Nothing to echo")
    else:
      bot.reply_to(message,m[2] )

bot.polling()
    