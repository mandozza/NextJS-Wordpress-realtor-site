import {v4 as uuid} from 'uuid'

export const cleanAndTransformBlocks = (blocksJSON) => {
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
  const removeUnusedDataAndAssignKey = (theBlocks) => {
    theBlocks.forEach(block => {
      block.id = uuid();
      deleteKeys.forEach((deleteKey) => {
        delete block[deleteKey];
      })
      if(block.innerBlocks?.length){
        removeUnusedDataAndAssignKey(block.innerBlocks)
      } else {
        delete block.innerBlock
      }
    });

  };
  // run cleaning function
  removeUnusedDataAndAssignKey(blocks)
  // Return the cleaned blocks
  return blocks;
}
