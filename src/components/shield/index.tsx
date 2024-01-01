import { type ShieldVariant, shieldTypes, type ShieldProps } from "./types";
import { Image, BoxProps } from "@chakra-ui/react";
import React, { useMemo } from "react";

interface IShieldProps<T extends ShieldVariant> extends BoxProps {
  variant: T;
  params: ShieldProps<T>;
}

export const Shield: React.FunctionComponent<IShieldProps<ShieldVariant>> = ({
  variant,
  params,
  ...props
}) => {
  const src = useMemo<string>(() => {
    // @ts-expect-error Need to figure out proper way for this
    return shieldTypes[variant](params);
  }, [variant, params]);
  return <Image alt={variant} src={src} {...props} />;
};
