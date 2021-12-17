// assets
import { IconDashboard } from "@tabler/icons";

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "class",
  title: "학급",
  type: "group",
  children: [
    {
      id: "default",
      title: "학급메인",
      type: "item",
      url: "/classmain/default",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "classconfig",
      title: "학급설정",
      type: "teacher",
      url: "/dashboard/default",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
