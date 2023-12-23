import { BoxProps, Flex } from "@chakra-ui/react";
import { Shield } from "@components/shield";
import { Repository } from "@interfaces/repository";
import React from "react";

export interface IPublicShieldsProps extends BoxProps {
  repository: Repository;
}

export function PublicShields({ repository, ...props }: IPublicShieldsProps) {
  return (
    <Flex gap={2} wrap="wrap" {...props}>
      <Shield
        variant="static"
        params={{
          label: repository.language,
        }}
      />
    </Flex>
  );
}
