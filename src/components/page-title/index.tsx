import { AppIcon } from "@components/app-icon";
import {
  RefineLayoutThemedTitleProps,
  ThemedTitleV2,
} from "@refinedev/chakra-ui";
import React from "react";

export const PageTitle: React.FC<Partial<RefineLayoutThemedTitleProps>> = (
  props
) => {
  return (
    <ThemedTitleV2
      collapsed={false}
      text="Github Dashboard"
      icon={<AppIcon />}
      {...props}
    />
  );
};
