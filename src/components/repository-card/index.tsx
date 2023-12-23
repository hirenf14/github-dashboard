import { Avatar, Badge, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { DashboardCard } from "@components/cards";
import { type Repository } from "@interfaces/repository";
import { IconLock, IconWorld } from "@tabler/icons";
import React from "react";
import { PrivateShields } from "./PrivateShields";
import { PublicShields } from "./PublicSheilds";

interface IRepositoryCardProps {
  repository?: Repository;
  isLoading?: boolean;
}

export const RepositoryCard: React.FunctionComponent<IRepositoryCardProps> = ({
  repository,
}) => {
  const owner = repository?.owner;
  const isPublic = repository?.visibility === "public";
  return (
    <DashboardCard p={2} pos="relative">
      <Box
        pos="absolute"
        right={0}
        bg={isPublic ? "blue.400" : "teal"}
        borderBottomLeftRadius={5}
        p={1}
        top={0}
        zIndex={1}
      >
        {isPublic ? <IconWorld /> : <IconLock />}
      </Box>
      <Flex flexDir="column" gap={2}>
        <Flex gap={2}>
          <Avatar name={owner?.login} src={owner?.avatar_url} />
          <Box>
            <Heading fontSize="2xl" textTransform="capitalize">
              {repository?.name}
            </Heading>
            <Badge
              colorScheme="black"
              py={1}
              px={2}
              textTransform="unset"
              opacity={0.7}
              fontWeight={400}
              borderRadius="md"
            >
              @{repository?.full_name}
            </Badge>
          </Box>
        </Flex>
        <Text>{repository?.description}</Text>
      </Flex>
      {isPublic && !!repository && (
        <PrivateShields mt={2} repository={repository} />
      )}
      {!isPublic && !!repository && (
        <PublicShields mt={2} repository={repository} />
      )}
    </DashboardCard>
  );
};
