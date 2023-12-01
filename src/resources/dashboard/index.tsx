import { Grid, GridItem } from "@chakra-ui/react";
import { MemeCard } from "@components/meme-card";
import { IResourceComponentsProps } from "@refinedev/core";
import React from "react";

export const Dashboard: React.FC<IResourceComponentsProps> = () => {
  return (
    <Grid gridTemplateColumns="repeat(4, 1fr)">
      <GridItem>
        <MemeCard maxHeight="100%" height="auto" />
      </GridItem>
    </Grid>
  );
};
