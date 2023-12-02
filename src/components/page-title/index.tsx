import { useRouterContext, useRouterType, useLink } from "@refinedev/core";
import { Link as ChakraLink, HStack, Heading } from "@chakra-ui/react";
import { AppIcon } from "@components/app-icon";
import { RefineLayoutThemedTitleProps } from "@refinedev/chakra-ui";
import React from "react";

export const PageTitle: React.FC<Partial<RefineLayoutThemedTitleProps>> = ({
  collapsed,
  text = "Github Refined",
  wrapperStyles,
}) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <ChakraLink
      as={ActiveLink}
      to="/"
      fontSize="inherit"
      textDecoration="none"
      _hover={{
        textDecoration: "none",
      }}
    >
      <HStack
        spacing="8px"
        justifyContent="center"
        alignItems="center"
        fontSize="inherit"
        style={{
          ...wrapperStyles,
        }}
      >
        <AppIcon />
        {!collapsed && (
          <Heading as="h6" fontWeight={700} fontSize="inherit">
            {text}
          </Heading>
        )}
      </HStack>
    </ChakraLink>
  );
};
