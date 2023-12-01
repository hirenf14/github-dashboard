import { IResourceItem } from "@refinedev/core";
import { IconBooks, IconDashboard } from "@tabler/icons";

export const resources: IResourceItem[] = [
    {
        name: "dashboard",
        list: "/",
        meta: {
            label: "Dashboard",
            icon: <IconDashboard stroke={1} />
        }
    },
    {
      name: "repositories",
      list: "/repositories",
      show: "/repositories/:id",
      meta: {
        canDelete: false,
        canCreate: false,
        canEdit: false,
        icon: <IconBooks stroke={1} />
      },
    },
  ];