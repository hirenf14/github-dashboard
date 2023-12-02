import { Box, BoxProps, Icon, Image, Text, Tooltip } from "@chakra-ui/react";
import { DashboardCard } from "@components/cards";
import { useCustom } from "@refinedev/core";
import { IconQuestionCircle } from "@tabler/icons";

export const MemeCard: React.FC<BoxProps> = (props) => {
  const { data } = useCustom({
    url: "https://meme-api.com/gimme/ProgrammerHumor",
    method: "get",
  });
  return (
    <DashboardCard
      title={data?.data.title || "Loading meme...."}
      actions={
        <Tooltip hasArrow label="Just a meme">
          <Box>
            <IconQuestionCircle />
          </Box>
        </Tooltip>
      }
    >
      <Image
        {...props}
        maxH={400}
        m="auto"
        objectFit="contain"
        src={data?.data.url}
      />
    </DashboardCard>
  );
};
