// assets
import { IconDashboard } from "@tabler/icons";

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const classmenu = {
  id: "class",
  title: "학급",
  type: "group",
  children: [
    {
      id: "default",
      title: "학급메인",
      type: "item",
      url: "/class",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "classconfig",
      title: "학급설정",
      type: "teacher",
      url: "/class/manage",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
  ],
};

export default classmenu;
