import { useShow, IResourceComponentsProps, useParsed } from "@refinedev/core";
import { Breadcrumb } from "@refinedev/chakra-ui";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Repository } from "@interfaces/repository";
import { RepositoryCard } from "@components/repository-card";

export const RepositoryShow: React.FC<IResourceComponentsProps> = () => {
  const { resource, id, params } = useParsed();
  const { owner } = params as { owner: string };
  const {
    queryResult: { data, isLoading },
  } = useShow<Repository>({
    resource: resource!.name,
    id: `${owner}/${id}`,
  });
  const record = data?.data;

  return (
    <Box>
      <Breadcrumb />
      <Grid gridTemplateColumns="repeat(12, 1fr)" gap={4}>
        <GridItem colSpan={3}>
          <RepositoryCard repository={record} isLoading={isLoading} />
        </GridItem>
      </Grid>
    </Box>
  );
};
