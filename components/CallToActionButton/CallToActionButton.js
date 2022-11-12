import { ButtonLink } from "components/ButtonLink"

export const CallToActionButton = ({ destination, buttonLabel, align }) => {
  // Key value to define class to use for alignment.
  const alignMap = {
    left: "text-align",
    center: "text-center",
    right: "text-right",
  }

  return (
  <div className={alignMap[align]}>
    <ButtonLink destination={destination} label={buttonLabel} />
  </div>
  )
};
