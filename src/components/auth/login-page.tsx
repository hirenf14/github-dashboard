import * as React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { cardProps, layoutProps, titleProps } from "./styles";
import { PageTitle } from "@components/page-title";
import { useLogin, useTranslate } from "@refinedev/core";

interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const methods = useForm();
  const translate = useTranslate();
  const { mutate: login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const importantTextColor = useColorModeValue("brand.500", "brand.200");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <FormProvider {...methods}>
      <Box {...layoutProps}>
        <PageTitle {...titleProps} />
        <Box
          bg="chakra-body-bg"
          borderWidth="1px"
          borderColor={borderColor}
          backgroundColor={bgColor}
          {...cardProps}
        >
          <Heading
            mb="8"
            textAlign="center"
            fontSize="2xl"
            color={importantTextColor}
          >
            {translate("pages.login.title", "Sign in to Github")}
          </Heading>
          <form
            onSubmit={handleSubmit((data) => {
              return login(data);
            })}
          >
            <FormControl mt="6" isInvalid={!!errors?.personalAccessToken}>
              <FormLabel htmlFor="token">
                {translate("pages.login.fields.token", "Personal Access Token")}
              </FormLabel>
              <Input
                id="token"
                placeholder="Personal Access Token"
                type="password"
                {...register("personalAccessToken", {
                  required: true,
                  // pattern: {
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   message: translate(
                  //     "pages.login.errors.validEmail",
                  //     "Invalid email address"
                  //   ),
                  // },
                })}
              />
              <FormErrorMessage>{`${errors.personalAccessToken?.message}`}</FormErrorMessage>
            </FormControl>
            <Checkbox {...register("remember")} mt="6">
              {translate("pages.login.buttons.rememberMe", "Remember me")}
            </Checkbox>

            <Button mt="6" type="submit" width="full" colorScheme="brand">
              {translate("pages.login.signin", "Sign in")}
            </Button>
          </form>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default LoginPage;
