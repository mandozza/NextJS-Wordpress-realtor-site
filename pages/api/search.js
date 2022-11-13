import { gql } from "@apollo/client";
import client from "client";

const handler = async (req, res) => {
    try {
    const { data } = await client.query({
      query: gql`
        query AllPropertiesQuery {
          properties{
            nodes {
              databaseId
              title
              uri
              featuredImage {
                node {
                  uri
                  sourceUrl
                }
              }
              propertyFeatures {
                bathrooms
                bedrooms
                hasParking
                petFriendly
                price
              }
            }
          }
        }
      `,
    });
    console.log("SERVER SIDE: ", data.properties.nodes);
    return res.status(200).json({
      properties: data.properties.nodes,
    });
  } catch (e) {
    console.log("ERROR: ", e);
  }
};

export default handler;

