import { GraphQLClient } from 'graphql-request';

export { gql } from 'graphql-request';
export const client = new GraphQLClient('https://graphql.anilist.co');
