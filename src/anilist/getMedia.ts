import fetch from "node-fetch";

export interface Media {
    id: number,
    idMal: number,
    title: {
        romaji: string,
        english: string | null,
        native: string | null
    },
    genres: string[],
    studios: {
        nodes: {
            name: string
        }[]
    },
    description: string,
    averageScore: number,
    status: string
    format: string
    trailer: {
        id: string,
        site: string
    }
}

export interface mediaResponse {
    data: {
        Media: Media
    }
}

const getMedia = async (id: number, type: 'ANIME' | 'MANGA' = 'ANIME'): Promise<mediaResponse | null> => {
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
              description (asHtml:false)
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
        let response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: graphql
        })
        return await response.json();
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

export default getMedia;