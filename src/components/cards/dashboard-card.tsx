import {
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

interface IDashboardCardProps extends CardProps {
  title: string;
}

export const DashboardCard: React.FunctionComponent<IDashboardCardProps> = ({
  title,
  children,
  ...props
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const titleBgColor = useColorModeValue("gray.100", "gray.700");
  return (
    <Card overflow="hidden" bgColor={bgColor} {...props}>
      <CardHeader py={3} bgColor={titleBgColor}>
        <Heading fontSize="lg" fontWeight={600}>{title}</Heading>
      </CardHeader>
      <CardBody p={2}>{children}</CardBody>
    </Card>
  );
};
