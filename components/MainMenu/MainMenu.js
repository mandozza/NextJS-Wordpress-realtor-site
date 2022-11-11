import Link from "next/link";
import { FaHouseUser, FaHeart } from "react-icons/fa";

export const MainMenu = ({ items, callToActionLabel, callToActionDestination }) => {
  //console.log(items);
  return (
    <nav className="bg-slate-800 text-white px-5 h-[66px] sticky top-0 z-20 flex">
      <div className="py-4 pl-5 flex text-pink-600">
        <FaHouseUser size={30} />
        <FaHeart size={30} />
      </div>
      <div className="flex flex-1 justify-end">
        {(items || []).map((item) => (
          <div
            key={item.id}
            className="hover:bg-slate-700 cursor-pointer relative group hover:text-pink-600"
          >
            <div>
              <Link href={item.destination}>
                <a className="p-5 block">{item.label}</a>
              </Link>
            </div>

            {!!item.subMenuItems?.length && (
              <div className="group-hover:block hidden bg-slate-800 text-right absolute right-0 top-full">
                {item.subMenuItems.map((subMenuItem) => (
                  <Link key={subMenuItem.id} href={subMenuItem.destination}>
                    <a className="block whitespace-nowrap p-5 hover:bg-slate-700">
                      {subMenuItem.label}
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="ml-3 my-auto">
          <Link key="cta-nav" href={callToActionDestination}>
            <a className="bg-pink-500 hover:bg-pink-700 inline-block my-2 px-4 py-2 uppercase rounded-md cursor-pointer font-bold text-white">
              {callToActionLabel}
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};
