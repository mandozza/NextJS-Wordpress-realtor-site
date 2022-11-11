import { MainMenu } from "components/MainMenu";
import { BlockRenderer } from "components/BlockRenderer";

export const Page = (props) => {
  return(
  <div>
    <MainMenu
      items={props.mainMenuItems}
      callToActionLabel={props.callToActionLabel}
      callToActionDestination={props.callToActionDestination}
    />
    <BlockRenderer blocks={props.blocks}/>
  </div>
  )
}
