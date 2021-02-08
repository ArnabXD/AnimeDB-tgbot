"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const getMedia = async (id, type = 'ANIME') => {
    let graphql = JSON.stringify({
        query: `query ($id: Int) { 
            Media (id: $id, type: ${type}) {
              id
              idMal
              title {
                romaji
                english
                native
              }
              genres
              studios {
                  nodes{
                      name
                  }
              }
              description
              averageScore
              status
              format
              trailer {
                  id
                  site
              }
            }
          }`,
        variables: { "id": id }
    });
    try {
        let response = await node_fetch_1.default('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: graphql
        });
        return await response.json();
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
exports.default = getMedia;
