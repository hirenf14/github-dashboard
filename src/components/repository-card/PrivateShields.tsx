import { BoxProps, Flex } from "@chakra-ui/react";
import { Shield } from "@components/shield";
import { Repository } from "@interfaces/repository";
import React from "react";

export interface IPrivateShieldsProps extends BoxProps {
  repository: Repository;
}

export function PrivateShields({ repository, ...props }: IPrivateShieldsProps) {
  const owner = repository.owner;
  return (
    <Flex gap={2} wrap="wrap" {...props}>
      <Shield
        variant="topLanguage"
        params={{
          user: owner.login,
          repo: repository.name,
        }}
      />
      <Shield
        variant="languageCount"
        params={{
          user: owner.login,
          repo: repository.name,
        }}
      />
    </Flex>
  );
}
