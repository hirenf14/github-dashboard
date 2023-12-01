import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
    {
      name: "repositories",
      list: "/repositories",
      show: "/repositories/:id",
      meta: {
        canDelete: false,
        canCreate: false,
        canEdit: false,
      },
    },
  ];