import { BoxProps, Image } from "@chakra-ui/react";
import { useCustom } from "@refinedev/core";


export const MemeCard: React.FC<BoxProps> = (props) => {
  const { data, isLoading } = useCustom({
    url: "https://meme-api.com/gimme/webdevmemes",
    method: "get"
  });
  if (isLoading) return <></>;
  return <Image {...props} src={data?.data.url} />;
};
