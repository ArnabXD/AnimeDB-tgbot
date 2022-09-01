import { gql, GraphQLClient } from "gql";

export { gql };
export const client = new GraphQLClient("https://graphql.anilist.co");
