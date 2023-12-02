import { Avatar, Card, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { DashboardCard } from "@components/cards";
import { GithubUser } from "@interfaces/contributions";
import React from "react";

interface IUserInfoProps {
  user: GithubUser;
}

export const UserInfo: React.FunctionComponent<IUserInfoProps> = ({ user }) => {
  const name = user.name || user.login;
  return (
    <DashboardCard p={2}>
      <Flex gap={4} flexDir="column">
        <Avatar p={4} size="3xl" name={name} src={user.avatarUrl} />
        <Flex flex={1}>
          <Stack>
            <Heading fontSize="xl" verticalAlign="middle">
              {name}{" "}
              <Text as="span" opacity={0.7} fontWeight={300} fontSize="md">
                {user.pronouns ? `(${user.pronouns})` : ""}
              </Text>
            </Heading>
            <Text>{user.bio}</Text>
          </Stack>
        </Flex>
      </Flex>
    </DashboardCard>
  );
};
