import React from "react";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../../lib/consts/navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineLogout } from "react-icons/hi";

const linkClasses = `flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base`;

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/tripwonder-63139.appspot.com/o/images%2Favatar.jpg15d63347-2795-4265-960f-27892cad57bd?alt=media&token=bcfdb050-66c7-46cb-beaa-d16f63aa0d59"
          alt="Trip Wonder Avatar"
          className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
        />
        <span className="text-neutral-100 text-lg">Trip Wonder</span>
      </div>
      <div className="flex-1 py-4 flex flex-col gap-0.5 border-t-4 border-neutral-700">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t-4 border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div
          className={classNames("text-red-500 cursor-pointer", linkClasses)}
          onClick={handleLogout}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

let SidebarLink = ({ item }) => {
  const { pathname } = useLocation();

  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path
          ? `bg-neutral-700 text-white`
          : `text-neutral-400`,
        linkClasses
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
};
