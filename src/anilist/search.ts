import { gql, client } from './gqlClient';

export interface SearchResponse {
  Page: {
    pageInfo: {
      total: number;
      currentPage: number;
      lastPage: number;
      hasNextPage: boolean;
      perPage: number;
    };
    media: {
      id: number;
      title: {
        romaji: string;
      };
    }[];
  };
}

export default async function search(
  key: string,
  type: 'ANIME' | 'MANGA' = 'ANIME',
  page = 1
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
          title {
            romaji
            english
          }
        }
      }
    }`;

  try {
    const data = await client.request<SearchResponse>(query, {
      search: key,
      page: page,
      perPage: 10
    });
    return data.Page.pageInfo.total === 0 ? null : data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
