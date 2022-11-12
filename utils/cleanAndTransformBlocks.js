import { gql } from "@apollo/client";
import client from "client";
import {v4 as uuid} from 'uuid'

export const cleanAndTransformBlocks = async (blocksJSON) => {
  const { data } = await client.query({
    query: gql`
      query ExtraDataQuery {
        pages {
          nodes {
            uri
            databaseId
          }
        }
        mediaItems(where: { offsetPagination: { size: 10000 } }) {
          nodes {
            databaseId
            mediaDetails {
              height
              width
            }
          }
        }
      }
    `,
  });
  const blocks = JSON.parse(blocksJSON)
  // Define keys to remove from block data that wont's be needed.
  const deleteKeys = [
    "attributesType",
    "blockType",
    "dynamicContent",
    "originalContent",
    "saveContent",
    "postId",
    "get_parent",
    "order",
  ]
  // loop thru remove key's of values defined above.
  const cleanBlocks = (theBlocks) => {
    theBlocks.forEach(block => {
      block.id = uuid();
      deleteKeys.forEach((deleteKey) => {
        delete block[deleteKey];
      })
      // check if its a cta button
      if(block.name === 'acf/ctabutton'){
        const associatedPage = data.pages.nodes.find((page) => page.databaseId === block.attributes.data.destination );
        if(associatedPage) {
          block.attributes.data.destination = associatedPage.uri;
        }
      }
      // check if it's an image
      if (block.name === "core/image") {
        const associatedMediaItem = data.mediaItems.nodes.find(
          (mediaItem) => mediaItem.databaseId === block.attributes.id
        );
        if (associatedMediaItem) {
          block.attributes.originalHeight =
            associatedMediaItem.mediaDetails.height;
          block.attributes.originalWidth =
            associatedMediaItem.mediaDetails.width;
        }
      }

      if(block.innerBlocks?.length){
        cleanBlocks(block.innerBlocks)
      } else {
        delete block.innerBlock
      }
    });

  };
  // run cleaning function
  cleanBlocks(blocks)
  // Return the cleaned blocks
  return blocks;
}
