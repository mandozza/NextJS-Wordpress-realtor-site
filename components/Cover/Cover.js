import { usePageContext } from "context/page";
import Image from "next/image";

export const Cover = ({ children, background }) => {
  const { featuredImage } = usePageContext();

  return (
    <div
      className="
      h-screen
      bg-slate-800
      text-white
      relative min-h-[400px]
      flex
      justify-center
      items-center"
    >
      {(!!background || !!featuredImage) && (
        <Image
          alt="Cover"
          src={background || featuredImage}
          layout="fill"
          objectFit="cover"
          className="mix-blend-soft-light"
        />
      )}
      <div className="max-w-5xl z-10">{children}</div>
    </div>
  );
};
