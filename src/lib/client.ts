import { gql, GraphQLClient } from "graphql-request";
import type { AllPostsData, PostData } from "./schema";

export const getClient = async () => {
  const client = new GraphQLClient("https://gql.hashnode.com");

  if (import.meta.env.FIXIE_URL) {
    const { HttpsProxyAgent } = await import("https-proxy-agent");
    const agent = new HttpsProxyAgent(import.meta.env.FIXIE_URL);

    const client = new GraphQLClient("https://gql.hashnode.com", {
      fetch: async (input: RequestInfo | URL, options = {}) => {
        (options as any).agent = agent;
        return fetch(input, options);
      },
    });

    return client;
  }

  return client;
};

const myHashnodeURL = "chechecakes.hashnode.dev";

// Ubah getAllPosts dan getPost untuk menggunakan await getClient()
export const getAllPosts = async () => {
  const client = await getClient();

  const allPosts = await client.request<AllPostsData>(
    gql`
      query allPosts {
        publication(host: "${myHashnodeURL}") {
          id
          title
          posts(first: 20) {
            pageInfo{
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                author{
                  name
                  profilePicture
                }
                title
                subtitle
                brief
                slug
                coverImage {
                  url
                }
                tags {
                  name
                  slug
                }
                publishedAt
                readTimeInMinutes
              }
            }
          }
        }
      }
    `
  );

  return allPosts;
};

export const getPost = async (slug: string) => {
  const client = await getClient();

  const data = await client.request<PostData>(
    gql`
      query postDetails($slug: String!) {
        publication(host: "${myHashnodeURL}") {
          id
          post(slug: $slug) {
            id
            author{
              name
              profilePicture
            }
            publishedAt
            title
            subtitle
            readTimeInMinutes
            content{
              html
            }
            tags {
              name
              slug
            }
            coverImage {
              url
            }
          }
        }
      }
    `,
    { slug: slug }
  );

  return data.publication.post;
};
