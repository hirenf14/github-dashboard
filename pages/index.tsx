import { Dashboard } from "@resources/dashboard";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  return <Dashboard />;
}

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
