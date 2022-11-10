import { Cover } from "components/Cover"


export const BlockRender = ({ blocks }) => {

  return blocks.map(block => {
    switch(block.name){
      case 'core/cover': {
        return <Cover key={block.id} background={block.attributes.url}>Core Cover</Cover>
      }
      default:
        return null
    }
  })
}
