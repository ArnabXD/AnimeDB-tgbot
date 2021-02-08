"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMedia = void 0;
const parseMedia = (resp, type = "ANIME") => {
    let { Media } = resp.data;
    let synopsis = Media.description && Media.description.replace(/<\/br>/g, '').replace(/<br>/g, '');
    if (synopsis && synopsis.length > 750) {
        synopsis = synopsis.substr(0, 750) + `... <a href="https://anilist.co/${type.toLowerCase()}/${Media.id}">Read More</a>`;
    }
    let message = `<b>${Media.title.romaji}</b> (${Media.format})\n\n` +
        `${Media.title.english && (Media.title.english !== Media.title.romaji) ? '<b>• English Title :</b> ' + Media.title.english + '\n' : ''}` +
        `<b>• Average Rating :</b> ${Media.averageScore} <a href="https://img.anili.st/media/${Media.id}">&#8205;</a>\n` +
        `<b>• Status :</b> ${Media.status}\n` +
        `<b>• Genres :</b> ${Media.genres.join(", ")}\n` +
        `<b>• Studios :</b> ${Media.studios.nodes.map(data => data.name).join(', ')}\n` +
        `\n` +
        `<b>• Synopsis :</b> <i>${synopsis}</i>`;
    return message;
};
exports.parseMedia = parseMedia;
