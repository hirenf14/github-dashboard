import LoginPage from "@components/auth/login-page";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


const Login = () => {
  return <LoginPage />
};

Login.noLayout = true;

export default Login;


export const getServerSideProps: GetServerSideProps<{}> = async (context) => {

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  return {
    props: {
      ...translateProps,
    },
  };
};
