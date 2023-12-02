import {
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

interface IDashboardCardProps extends CardProps {
  title?: string;
  actions?: React.ReactNode;
}

export const DashboardCard: React.FunctionComponent<IDashboardCardProps> = ({
  title,
  children,
  actions,
  ...props
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const titleBgColor = useColorModeValue("gray.100", "gray.700");
  return (
    <Card overflow="hidden" bgColor={bgColor} {...props}>
      {title && (
        <CardHeader py={3} bgColor={titleBgColor}>
          <Flex gap={2} align="center">
            <Flex flex={1} flexWrap="wrap">
              <Heading fontSize="lg" fontWeight={600}>
                {title}
              </Heading>
            </Flex>
            {actions}
          </Flex>
        </CardHeader>
      )}
      <CardBody p={2}>{children}</CardBody>
    </Card>
  );
};
