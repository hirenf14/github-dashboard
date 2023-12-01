import { BoxProps, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const fetchMeme = async () => {
  const response = await fetch("https://meme-api.com/gimme");
  const { url } = await response.json();
  return url;
};

export const MemeCard: React.FC<BoxProps> = (props) => {
  const [img, setImg] = useState();
  useEffect(() => {
    fetchMeme()
      .then((url) => setImg(url))
      .catch(() => console.log("Bad luck!, can't get you a meme."));
  }, []);
  if (!img) return <></>;
  return <Image {...props} src={img} />;
};
