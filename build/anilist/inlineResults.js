"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
;
const getInlineResults = async (key, type = 'ANIME', number = 25) => {
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
                    idMal
                    title {
                        romaji
                        english
                    }
                    isAdult
                    studios {
                        nodes {
                            name
                        }
                    }
                    coverImage {
                        medium
                    }
                    genres
                    description
                    averageScore
                    status
                    format
                    trailer {
                        id
                        site
                    }
                }
            }
        }`,
        variables: { "search": key, "perPage": number }
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
exports.default = getInlineResults;
