import { Box, BoxProps, Icon, IconButton, Image, Text, Tooltip } from "@chakra-ui/react";
import { DashboardCard } from "@components/cards";
import { useCustom } from "@refinedev/core";
import { IconQuestionCircle, IconRefresh } from "@tabler/icons";

export const MemeCard: React.FC<BoxProps> = (props) => {
  const { data, refetch } = useCustom({
    url: "https://meme-api.com/gimme/ProgrammerHumor",
    method: "get",
  });
  return (
    <DashboardCard
      title={data?.data.title || "Loading meme...."}
      actions={
        <>
          <Tooltip hasArrow label="Take 💸, Fetch me new one.">
            <IconButton variant="ghost" size="sm" onClick={() => refetch()} aria-label="refresh">
              <IconRefresh />
            </IconButton>
          </Tooltip>
          <Tooltip hasArrow label="Just a meme">
            <Box>
              <IconQuestionCircle />
            </Box>
          </Tooltip>
        </>
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
