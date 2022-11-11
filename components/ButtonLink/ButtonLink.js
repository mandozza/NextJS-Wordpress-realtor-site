import Link from "next/link";

export const ButtonLink = ({destination, label}) => {
  return (
    <Link key="cta-nav" href={destination}>
      <a className="btn">
        {label}
      </a>
    </Link>
  );
};
