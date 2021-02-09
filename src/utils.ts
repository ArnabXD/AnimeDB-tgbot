import { mediaResponse } from './anilist/getMedia';

export const parseMedia = (resp: mediaResponse, type: "ANIME" | "MANGA" = "ANIME"): string => {
    let { Media } = resp.data;
    let synopsis = Media.description && Media.description.replace(/<\/br>/g, '').replace(/<br>/g, '');

    let message =
        `<b>${Media.title.romaji}</b> (${Media.format})\n\n` +
        `${Media.title.english && (Media.title.english !== Media.title.romaji) ? '<b>• English Title :</b> ' + Media.title.english + '\n' : ''}` +
        `<b>• Average Rating :</b> ${Media.averageScore} <a href="https://img.anili.st/media/${Media.id}">&#8205;</a>\n` +
        `<b>• Status :</b> ${Media.status}\n` +
        `<b>• Genres :</b> ${Media.genres.join(", ")}\n` +
        (Media.studios.nodes.length ? `<b>• Studios :</b> ${Media.studios.nodes.map(data => data.name).join(', ')}\n` : '') +
        `\n`

    if (synopsis) {
        synopsis = synopsis.length > (900 - message.length) ? synopsis.substring(0, 900 - message.length) + `... <a href="https://anilist.co/${type.toLowerCase()}/${Media.id}">Read More</a>` : synopsis
        message += `<b>• Synopsis :</b> <i>${synopsis}</i>`;
    }

    return message;
}
