import {
  BadgeDollarSign,
  BookUser,
  FileClock,
  FileCode2Icon,
  LandPlot,
  Layout,
  SquareDashedMousePointer,
  SquareGanttChartIcon,
  UsersRound,
} from "lucide-react";

export const adminRoutes = [
  {
    icon: Layout,
    label: "Trang chủ",
    href: "/admin",
  },
  {
    icon: SquareGanttChartIcon,
    label: "Lịch trình",
    href: "/schedule",
  },
  {
    icon: UsersRound,
    label: "Taxi",
    href: "/admin/taxi",
  },
  // {
  //   icon: FileCode2Icon,
  //   label: "Tài xế",
  //   href: "/admin/driver",
  // },
];

export const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
];
