import { MainMenu } from "components/MainMenu";
import { BlockRenderer } from "components/BlockRenderer";
import { PageWrapper } from "context/page";
export const Page = (props) => {
  return(
    <PageWrapper
      value={{
        propertyFeatures: props.propertyFeatures,
        title: props.title,
        featuredImage: props.featuredImage,
      }}
    >
    <MainMenu
      items={props.mainMenuItems}
      callToActionLabel={props.callToActionLabel}
      callToActionDestination={props.callToActionDestination}
    />
    <BlockRenderer blocks={props.blocks}/>
  </PageWrapper>
  )
}
