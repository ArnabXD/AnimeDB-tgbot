import { client, gql } from './gqlClient';
import { Media as IMedia } from './getMedia';

interface Media extends IMedia {
  coverImage: {
    medium: string;
  };
}

export interface InlineResultsType {
  data: {
    Page: {
      pageInfo: {
        total: number;
        currentPage: number;
        lastPage: number;
        hasNextPage: boolean;
        perPage: number;
      };
      media: Media[];
    };
  };
}

export default async function getInlineResults(
  key: string,
  type: 'ANIME' | 'MANGA' = 'ANIME',
  number = 25
) {
  const query = gql`
    query ($id: Int, $page: Int, $perPage: Int, $search: String) {
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
    }`;
  try {
    const data = await client.request<InlineResultsType>(query, {
      search: key,
      perPage: number
    });
    return data.data.Page.pageInfo.total === 0 ? null : data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
