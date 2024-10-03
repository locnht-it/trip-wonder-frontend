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
} from "react-icons/hi";

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
    key: `rating-reviews`,
    label: `Rating Reviews`,
    path: `/rating-reviews`,
    icon: <HiOutlineAnnotation />,
  },
  {
    key: `provinces`,
    label: `Provinces`,
    path: `/provinces`,
    icon: <HiOutlineLocationMarker />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: `settings`,
    label: `Settings`,
    path: `/settings`,
    icon: <HiOutlineCog />,
  },
  {
    key: `support`,
    label: `Help & Support`,
    path: `/support`,
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
