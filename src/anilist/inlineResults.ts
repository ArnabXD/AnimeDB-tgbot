import fetch from 'node-fetch';
import { Media as MediaI } from './getMedia';

interface Media extends MediaI {
    coverImage: {
        medium: string
    }
}

export interface inlineResultsType {
    data: {
        Page: {
            pageInfo: {
                total: number,
                currentPage: number,
                lastPage: number,
                hasNextPage: boolean,
                perPage: number
            },
            media: Media[]
        }
    }
};

const getInlineResults = async (key: string, type: 'ANIME' | 'MANGA' = 'ANIME', number: number = 25) => {
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
                    description (asHtml:false)
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
        let response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: graphql
        })
        let data: inlineResultsType = await response.json();
        return (data.data.Page.pageInfo.total === 0) ? null : data
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

export default getInlineResults;