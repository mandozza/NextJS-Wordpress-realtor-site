import { gql } from "@apollo/client";
import client from "client";
import {v4 as uuid} from 'uuid'

export const cleanAndTransformBlocks = async (blocksJSON) => {
  const {data} = await client.query({
    query: gql `
      query ExtraDataQuery {
        pages {
          nodes {
            uri
            databaseId
          }
        }
      }
    `
  })
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
      if(block.name === 'acf/ctabutton'){
        const associatedPage = data.pages.nodes.find((page) => page.databaseId === block.attributes.data.destination );
        if(associatedPage) {
          block.attributes.data.destination = associatedPage.uri;
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
