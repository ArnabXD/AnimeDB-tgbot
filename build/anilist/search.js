"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const search = async (key, type = 'ANIME', page = 1) => {
    let graphql = JSON.stringify({
        query: `query ($id: Int, $page: Int, $perPage: Int, $search: String) {
            Page (page: $page, perPage: $perPage) {
              pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
              }
              media (id: $id, search: $search,type:${type}) {
                id
                title {
                  romaji
                  english
                }
              }
            }
          }`,
        variables: { "search": key, "page": page, "perPage": 10 }
    });
    try {
        let response = await node_fetch_1.default('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: graphql
        });
        let data = await response.json();
        return (data.data.Page.pageInfo.total === 0) ? null : data;
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
exports.default = search;
