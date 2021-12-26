import { lazy } from "react";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("../views/dashboard/Default"))
);

// utilities routing
const UtilsTypography = Loadable(
  lazy(() => import("../views/utilities/Typography"))
);
const UtilsColor = Loadable(lazy(() => import("../views/utilities/Color")));
const UtilsShadow = Loadable(lazy(() => import("../views/utilities/Shadow")));
const UtilsMaterialIcons = Loadable(
  lazy(() => import("../views/utilities/MaterialIcons"))
);
const UtilsTablerIcons = Loadable(
  lazy(() => import("../views/utilities/TablerIcons"))
);

// sample page routing
const SamplePage = Loadable(lazy(() => import("../views/sample-page")));

//===============TaxMate import======================================//
const ClassMain = Loadable(
  lazy(() => import("../views/pages/classmain/ClassMain"))
);
const Bank = Loadable(lazy(() => import("../views/Bank")));
const BankStatement = Loadable(lazy(() => import("../views/BankStatement")));


const Stock = Loadable(lazy(() => import("../views/pages/stock/Stock")));

const Congress = Loadable(
  lazy(() => import("../views/pages/congress/Congress"))
);

const NationalTax = Loadable(
  lazy(() => import("../views/pages/tax/NationalTax"))
);

const Law = Loadable(lazy(() => import("../views/pages/law/Law")));
const Fine = Loadable(lazy(() => import("../views/pages/fine/Fine")));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    //====taxmate================================
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "/classmain/default",
      element: <ClassMain />,
    },
    {
      path: "/bank/default",
      element: <Bank />,
    },
    {
      path: "/stock/default",
      element: <Stock />,
    },
    {
      path: "/congress/default",
      element: <Congress />,
    },
    {
      path: "/national-tax/default",
      element: <NationalTax />,
    },
    {
      path: "/law/default",
      element: <Law />,
    },
    {
      path: "/fine/default",
      element: <Fine />,
    },
    //=======================================
    {
      path: "/utils/util-typography",
      element: <UtilsTypography />,
    },
    {
      path: "/utils/util-color",
      element: <UtilsColor />,
    },
    {
      path: "/utils/util-shadow",
      element: <UtilsShadow />,
    },
    {
      path: "/icons/tabler-icons",
      element: <UtilsTablerIcons />,
    },
    {
      path: "/icons/material-icons",
      element: <UtilsMaterialIcons />,
    },
    {
      path: "/sample-page",
      element: <SamplePage />,
    },
    {
      path: "/bank",
      element: <Bank />,
    },
    {
      path: "/bankstatement",
      element: <BankStatement />,
    },
  ],
};

export default MainRoutes;
