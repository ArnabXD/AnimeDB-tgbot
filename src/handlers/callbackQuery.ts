import { Composer, InlineKeyboard } from "grammy";
import { getMedia } from "../anilist/mod.ts";
import { parseMedia } from "../utils.ts";

const composer = new Composer();

interface CallbackData {
  user: number;
  type: "ANIME" | "MANGA";
  id: number;
  action: string;
}

composer.on("callback_query", async (ctx) => {
  if (!ctx.callbackQuery?.data) {
    return;
  }
  const data = JSON.parse(ctx.callbackQuery.data) as CallbackData;
  const { user, id, type, action } = data;

  if (ctx.from?.id !== user) {
    return ctx.answerCallbackQuery({
      text: "Stay away please or send your own query",
      show_alert: true,
    });
  }

  if (action) {
    switch (action) {
      case "delete":
        return ctx.deleteMessage();
      case "media": {
        const result = await getMedia(Number(id), type);
        if (!result) {
          await ctx.deleteMessage();
          return ctx.reply("Sometihng Went Wrong");
        }
        const { Media } = result;
        const { trailer } = Media;

        const message = parseMedia(Media, type);
        const keyboard = new InlineKeyboard()
          .url("AniList", `https://anilist.co/${type?.toLowerCase()}/${id}`)
          .url(
            "MyAnimeList",
            `https://myanimelist.net/${type?.toLowerCase()}/${Media.idMal}`,
          )
          .row();
        if (trailer?.site === "youtube") {
          keyboard.url("Watch Trailer", `https://youtu.be/${trailer.id}`);
        }
        try {
          return await ctx.editMessageMedia(
            {
              type: "photo",
              media: `https://img.anili.st/media/${id}`,
              caption: message,
              parse_mode: "HTML",
            },
            {
              reply_markup: keyboard,
            },
          );
        } catch (err) {
          console.log(err);
          return ctx.answerCallbackQuery({
            text: "Something Went Wrong , Please Report this to @Arnab431",
            show_alert: true,
          });
        }
      }
      default:
        return ctx.answerCallbackQuery({ text: "Unhandled Action" });
    }
  }
});

export default composer;
