import React, { useEffect, useState } from "react";
import { RefineErrorPageProps } from "@refinedev/ui-types";
import {
  useGo,
  useResource,
  useRouterType,
  useTranslate,
  useNavigation,
} from "@refinedev/core";
import {
  Box,
  Text,
  Tooltip,
  IconButton,
  Button,
  useColorModeValue,
  Stack,
  Image,
} from "@chakra-ui/react";
import { IconInfoCircle } from "@tabler/icons";

export const ErrorComponent: React.FC<RefineErrorPageProps> = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const translate = useTranslate();
  const { push } = useNavigation();
  const go = useGo();
  const routerType = useRouterType();

  const { resource, action } = useResource();

  useEffect(() => {
    if (resource && action) {
      setErrorMessage(
        translate(
          "pages.error.info",
          {
            action,
            resource: resource?.name,
          },
          `You may have forgotten to add the "${action}" component to "${resource?.name}" resource.`
        )
      );
    }
  }, [resource, action]);

  const color = useColorModeValue("gray.500", "gray.400");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="calc(100vh - 150px)"
    >
      <Image src="/images/bear-cavalry.png" maxH={400} />
      <Stack direction={["column", "row"]} alignItems="center" spacing={2}>
        <Text color={color} fontSize="xl" align="center">
          {translate(
            "pages.error.404",
            "Stop wandering, and go back to your home."
          )}
        </Text>
        {errorMessage && (
          <Tooltip openDelay={0} label={errorMessage}>
            <IconButton
              aria-label="info"
              color={color}
              data-testid="error-component-tooltip"
            >
              <IconInfoCircle />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      <Button
        mt={6}
        variant="outline"
        onClick={() => {
          if (routerType === "legacy") {
            push("/");
          } else {
            go({ to: "/" });
          }
        }}
      >
        {translate("pages.error.backHome", "Back Home")}
      </Button>
    </Box>
  );
};
