import client from "client";
import { gql } from "@apollo/client";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks"
import { BlockRenderer } from "components/BlockRenderer";
import { mapMainMenuItems } from "utils/mapMainMenuItems"

export default function Home(props) {
  console.log(props)
  return <div>
    <BlockRenderer blocks={props.blocks}/>
  </div>;
}

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query PageQuery {
        nodeByUri(uri: "/") {
          ... on Page {
            id
            title
            blocksJSON
          }
        }
        acfOptionsMainMenu {
          mainMenu {
            menuItems {
              menuItem {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
              items {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
            }
          }
        }
      }
    `,
  });

  // clean block data before sending to page.
  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocksJSON);

  return {
    props: {
      mainMenuItems: mapMainMenuItems(
        data.acfOptionsMainMenu.mainMenu.menuItems
      ),
      blocks,
    },
  };

}
