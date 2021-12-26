// assets
import { IconBrandChrome, IconHelp , IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconBuildingBank,
    IconChartInfographic,
    IconBusinessplan,
    IconAlertTriangle,} from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp , IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconBuildingBank,
    IconChartInfographic,
    IconBusinessplan,
    IconAlertTriangle,};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        //추후 주석처리

        {
            id: "util-typography",
            title: "Typography",
            type: "item",
            url: "/utils/util-typography",
            icon: icons.IconTypography,
            breadcrumbs: false,
        },
        {
            id: "util-color",
            title: "Color",
            type: "item",
            url: "/utils/util-color",
            icon: icons.IconPalette,
            breadcrumbs: false,
        },
        {
            id: "util-shadow",
            title: "Shadow",
            type: "item",
            url: "/utils/util-shadow",
            icon: icons.IconShadow,
            breadcrumbs: false,
        },
        {
            id: "icons",
            title: "Icons",
            type: "collapse",
            icon: icons.IconWindmill,
            children: [
                {
                    id: "tabler-icons",
                    title: "Tabler Icons",
                    type: "item",
                    url: "/icons/tabler-icons",
                    breadcrumbs: false,
                },
                {
                    id: "material-icons",
                    title: "Material Icons",
                    type: "item",
                    url: "/icons/material-icons",
                    breadcrumbs: false,
                },
            ],
        },
        {
            id: 'sample-page',
            title: 'Sample Page',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'documentation',
            title: 'Documentation',
            type: 'item',
            url: 'https://codedthemes.gitbook.io/berry/',
            icon: icons.IconHelp,
            external: true,
            target: true
        }
    ]
};

export default other;
