import client from "client";
import { gql } from "@apollo/client";
import { cleanAndTransformBlocks } from 'utils/cleanAndTransformBlocks'
import { BlockRender } from "components/BlockRenderer/BlockRenderer";

export default function Home(props) {
  return <div>
    <BlockRender blocks={props.blocks}/>
  </div>;
}

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query NewQuery {
        nodeByUri(uri: "/") {
          ... on Page {
            id
            title
            blocksJSON
          }
        }
      }
    `,
  })

  // clean block data before sending to page.
  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocksJSON);

  return {
    props: {
      blocks,
    }
  }

}
