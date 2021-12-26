// assets
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconBuildingBank,
  IconChartInfographic,
  IconBusinessplan,
  IconAlertTriangle,
} from "@tabler/icons";

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconBuildingBank,
  IconChartInfographic,
  IconBusinessplan,
  IconAlertTriangle,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const institutions = {
  id: "utilities",
  title: "국가기관",
  type: "group",
  children: [
    //은행 사이드바
    {
      id: "bank",
      title: "은행",
      type: "collapse",
      icon: icons.IconBuildingBank,
      children: [
        {
          id: "deposit",
          title: "예금",
          type: "item",
          url: "/bank/default",
          breadcrumbs: false,
        },
        {
          id: "depositconfig",
          title: "예금 설정",
          type: "teacher",
          url: "/icons/material-icons",
          breadcrumbs: false,
        },
      ],
    },
    // 증권거래소 사이드바
    {
      id: "stock",
      title: "증권거래소",
      type: "collapse",
      icon: icons.IconChartInfographic,
      children: [
        {
          id: "stock",
          title: "주식",
          type: "item",
          url: "/stock/default",
          breadcrumbs: false,
        },
        {
          id: "stockconfig",
          title: "주식 설정",
          type: "teacher",
          url: "/icons/material-icons",
          breadcrumbs: false,
        },
        {
          id: "stockstatic",
          title: "주식 통계",
          type: "student",
          url: "/icons/material-icons",
          breadcrumbs: false,
        },
      ],
    },
    //국세청 사이드바
    {
      id: "executive",
      title: "국세청",
      type: "collapse",
      icon: icons.IconBusinessplan,
      children: [
        {
          id: "national-tax",
          title: "나라 세금 통계",
          type: "item",
          url: "/national-tax/default",
          breadcrumbs: false,
        },
        {
          id: "national-taxconfig",
          title: "세금 설정",
          type: "teacher",
          url: "/icons/material-icons",
          breadcrumbs: false,
        },
        {
          id: "mytax",
          title: "나의 세금",
          type: "student",
          url: "/icons/material-icons",
          breadcrumbs: false,
        },
      ],
    },
    // 법률
    {
      id: "laws",
      title: "입법부",
      type: "collapse",
      icon: icons.IconPalette,
      children: [
        {
          id: "national-law",
          title: "국가 법률",
          type: "item",
          url: "/law/default",
          breadcrumbs: false,
        },
      ],
    },

    //국회
    {
      id: "congress",
      title: "국회",
      type: "item",
      url: "/congress/default",
      icon: icons.IconPalette,
    },

    // 벌금
    {
      id: "fine",
      title: "사법부",
      type: "collapse",
      icon: icons.IconAlertTriangle,
      children: [
        {
          id: "fine",
          title: "벌금 통계",
          type: "teacher",
          url: "/fine/default",
          breadcrumbs: false,
        },
        {
          id: "fineconfig",
          title: "벌금 설정",
          type: "teacher",
          url: "/icons/tabler-icons",
          breadcrumbs: false,
        },

        {
          id: "myfine",
          title: "나의 벌금",
          type: "teacher",
          url: "/icons/tabler-icons",
          breadcrumbs: false,
        },
      ],
    },


  ],
};

export default institutions;
