import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineCog,
  HiOutlineQuestionMarkCircle,
  HiOutlineLocationMarker,
  HiOutlineServer,
} from "react-icons/hi";
import { TbCategory } from "react-icons/tb";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: `dashboard`,
    label: `Dashboard`,
    path: `/`,
    icon: <HiOutlineViewGrid />,
  },
  {
    key: `tour`,
    label: `Tours`,
    path: `/tours`,
    icon: <HiOutlineCube />,
  },
  {
    key: `orders`,
    label: `Orders`,
    path: `/orders`,
    icon: <HiOutlineShoppingCart />,
  },
  {
    key: `users`,
    label: `Users`,
    path: `/users`,
    icon: <HiOutlineUsers />,
  },
  {
    key: `suppliers`,
    label: `Suppliers`,
    path: `/suppliers`,
    icon: <HiOutlineServer />,
  },
  {
    key: `provinces`,
    label: `Provinces`,
    path: `/provinces`,
    icon: <HiOutlineLocationMarker />,
  },
  {
    key: `category`,
    label: `Category`,
    path: `/category`,
    icon: <TbCategory />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  // {
  //   key: `settings`,
  //   label: `Settings`,
  //   path: `/settings`,
  //   icon: <HiOutlineCog />,
  // },
  {
    key: `support`,
    label: `Help & Support`,
    path: `/support`,
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
