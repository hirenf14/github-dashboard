import { ChakraUIListInferencer } from "@refinedev/inferencer/chakra-ui";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default function BlogPostList() {
  return <ChakraUIListInferencer />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  
  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      props: {
        ...translateProps,
      },
      redirect: {
        destination: `/login?to=${encodeURIComponent("/blog-posts")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
};
