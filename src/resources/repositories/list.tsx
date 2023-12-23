import { HStack } from "@chakra-ui/react";
import {
  IResourceComponentsProps,
  useTranslate,
} from "@refinedev/core";
import ResourceTable from "@components/table";
import { ShowButton } from "@refinedev/chakra-ui";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export const RepositoriesList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: translate("repositories.fields.name"),
      },
      {
        id: "owner",
        accessorKey: "owner.login",
        header: translate("repositories.fields.owner"),
      },
      {
        id: "visibility",
        accessorKey: "visibility",
        header: translate("repositories.fields.visibility"),
      },
      {
        id: "actions",
        accessorKey: "name",
        header: "Actions",
        cell: function render({ getValue, row }) {
          return (
            <HStack>
              <ShowButton
                hideText
                recordItemId={getValue() as string}
                meta={{
                  owner: row.original.owner.login,
                }}
              />
            </HStack>
          );
        },
      },
    ],
    [translate]
  );

  return <ResourceTable columns={columns} />;
};
