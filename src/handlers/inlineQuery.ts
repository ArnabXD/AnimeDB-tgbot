import { Composer, InlineKeyboard } from "grammy";
import { InlineQueryResultArticle } from "grammy/types.ts";
import { getInlineResults } from "../anilist/mod.ts";
import { parseMedia } from "../utils.ts";

const composer = new Composer();

composer.on("inline_query", async (ctx) => {
  const { query } = ctx.inlineQuery;

  if (query.startsWith("<m> ")) {
    const args = query.substring(4);
    if (args.length < 3) {
      return;
    }
    const result = await getInlineResults(args, "MANGA");
    if (!result) {
      return;
    }
    const { media } = result.Page;

    const mangas: InlineQueryResultArticle[] = media.map((item) => {
      const keyboard = new InlineKeyboard().url(
        "AniList",
        `https://anilist.co/manga/${item.id}`,
      );

      if (item.idMal) {
        keyboard.url(
          "MyAnimeList",
          `https://myanimelist.net/manga/${item.idMal}`,
        );
      }
      if (item.trailer?.site === "youtube") {
        keyboard
          .row()
          .url("Watch Trailer", `https://youtu.be/${item.trailer.id}`);
      }

      return {
        type: "article",
        id: item.id.toString(),
        title: item.title.romaji,
        description: "✪ " + item.averageScore / 10,
        thumb_url: item.coverImage.medium,
        input_message_content: {
          message_text: parseMedia(item),
          parse_mode: "HTML",
        },
        reply_markup: keyboard,
      };
    });
    return await ctx.answerInlineQuery(mangas);
  } else {
    const args = query.startsWith("<a> ") ? query.substring(4) : query;
    const result = await getInlineResults(args, "ANIME");
    if (!result) {
      return;
    }
    const { media } = result.Page;

    const animes: InlineQueryResultArticle[] = media.map((item) => {
      const keyboard = new InlineKeyboard().url(
        "AniList",
        `https://anilist.co/anime/${item.id}`,
      );

      if (item.idMal) {
        keyboard.url(
          "MyAnimeList",
          `https://myanimelist.net/anime/${item.idMal}`,
        );
      }
      if (item.trailer?.site === "youtube") {
        keyboard
          .row()
          .url("Watch Trailer", `https://youtu.be/${item.trailer.id}`);
      }

      return {
        type: "article",
        id: item.id.toString(),
        title: item.title.romaji,
        description: "✪ " + item.averageScore / 10,
        thumb_url: item.coverImage.medium,
        input_message_content: {
          message_text: parseMedia(item),
          parse_mode: "HTML",
        },
        reply_markup: keyboard,
      };
    });
    return await ctx.answerInlineQuery(animes);
  }
});

export default composer;
