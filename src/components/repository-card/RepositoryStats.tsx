import {
  Box,
  BoxProps,
  Flex,
  Grid,
  HStack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Repository } from "@interfaces/repository";
import { IconCircleDot, IconEye, IconGitFork, IconStar } from "@tabler/icons";
import React from "react";

interface IRepositoryStatsProps extends BoxProps {
  repository?: Repository;
  isLoading?: boolean;
}

export const RepositoryStats: React.FC<IRepositoryStatsProps> = ({
  repository,
  ...props
}) => {
  return (
    <Box {...props}>
      <Grid gridTemplateColumns="repeat(1, 1fr)" gap={3} color="gray.300">
        <Flex gap={2}>
          <IconGitFork />
          <Text>{repository?.forks} Forks</Text>
        </Flex>
        <Flex gap={2}>
          <IconStar />
          <Text>{repository?.stargazers_count} Stars</Text>
        </Flex>
        <Flex gap={2}>
          <IconEye />
          <Text>{repository?.watchers} Watchers</Text>
        </Flex>
        <Flex gap={2}>
          <IconCircleDot />
          <Text>{repository?.open_issues} Issues</Text>
        </Flex>
      </Grid>
      <HStack
        justify="space-evenly"
        align="center"
        divider={<StackDivider borderColor="gray.700" />}
      ></HStack>
    </Box>
  );
};
