import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { TooltipProps } from "recharts";

interface IChartToolTipProps<T extends string | number>
  extends TooltipProps<any, T> {}

export const ChartToolTip: React.FC<IChartToolTipProps<number | string>> = ({
  payload,
  label,
  labelFormatter,
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  if (!label || !payload?.length) return <></>;
  return (
    <Box
      bg={bgColor}
      p={2}
      borderWidth={1}
      borderColor={borderColor}
      borderRadius={5}
    >
      <Text fontSize="md">
        {labelFormatter ? labelFormatter(label, payload) : label}
      </Text>
      {payload
        .filter((indicator) => indicator.value)
        .map((indicator, index) => (
          <Text key={index} fontSize="sm" fontWeight={600} color={indicator.color}>
            {indicator.name}:{" "}
            <Text as="span" color="initial">
              {indicator.value}
            </Text>
          </Text>
        ))}
    </Box>
  );
};
