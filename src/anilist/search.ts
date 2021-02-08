import fetch from "node-fetch";

export interface searchResponse {
    data: {
        Page: {
            pageInfo: {
                total: number,
                currentPage: number,
                lastPage: number,
                hasNextPage: boolean,
                perPage: number
            },
            media: {
                id: number,
                title: {
                    romaji: string
                }
            }[]
        }
    }
}

const search = async (key: string, type: 'ANIME' | 'MANGA' = 'ANIME', page: number = 1): Promise<searchResponse | null> => {
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
        let response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: graphql
        })
        let data: searchResponse = await response.json();
        return (data.data.Page.pageInfo.total === 0) ? null : data
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

export default search;