import client from "client";
import { gql } from "@apollo/client";
import { cleanAndTransformBlocks } from 'utils/cleanAndTransformBlocks'
import { BlockRenderer } from "components/BlockRenderer";

export default function Home(props) {
  return <div>
    <BlockRenderer blocks={props.blocks}/>
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
