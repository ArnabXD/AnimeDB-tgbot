import { client, gql } from "./gqlClient.ts";
export interface Media {
  id: number;
  idMal: number | null;
  title: {
    romaji: string;
    english?: string | null;
    native?: string | null;
  } & Record<string, string | null>;
  genres: string[];
  studios: {
    nodes: {
      name: string;
    }[];
  };
  isAdult?: boolean;
  description: string | null;
  averageScore: number;
  status: string;
  format: string;
  trailer: {
    id: string;
    site: string;
  } | null;
}

export interface MediaResponse {
  Media: Media;
}

export default async function getMedia(
  id: number,
  type: "ANIME" | "MANGA" = "ANIME",
) {
  const query = gql`
    query ($id: Int) { 
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
    }`;

  try {
    return await client.request<MediaResponse>(query, { id });
  } catch (err) {
    console.error(err);
    return null;
  }
}
