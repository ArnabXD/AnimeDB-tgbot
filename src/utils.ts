import { Media } from './anilist/getMedia';

export const parseMedia = (
  media: Media,
  type: 'ANIME' | 'MANGA' = 'ANIME'
): string => {
  let synopsis =
    media.description && media.description.replace(/(&nbsp;|<([^>]+)>)/gi, '');

  let message =
    `<b>${media.title.romaji}</b> (${media.format})\n\n` +
    `${
      media.title.english && media.title.english !== media.title.romaji
        ? '<b>• English Title :</b> ' + media.title.english + '\n'
        : ''
    }` +
    `<b>• Average Rating :</b> ${media.averageScore} <a href="https://img.anili.st/media/${media.id}">&#8205;</a>\n` +
    `<b>• Status :</b> ${media.status}\n` +
    `<b>• Genres :</b> ${media.genres.join(', ')}\n` +
    (media.studios.nodes.length
      ? `<b>• Studios :</b> ${media.studios.nodes
          .map((data) => data.name)
          .join(', ')}\n`
      : '') +
    `\n`;

  if (synopsis) {
    synopsis =
      synopsis.length > 900 - message.length
        ? synopsis.substring(0, 900 - message.length) +
          `... <a href="https://anilist.co/${type.toLowerCase()}/${
            media.id
          }">Read More</a>`
        : synopsis;
    message += `<b>• Synopsis :</b> <i>${synopsis}</i>`;
  }

  return message;
};
