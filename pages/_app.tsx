import {
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
} from "@refinedev/chakra-ui";
import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "@components/header";
import dataProvider from "@refinedev/simple-rest";
import { appWithTranslation, useTranslation } from "next-i18next";
import { PageTitle } from "@components/page-title";
import { useAuthProvider } from "@hooks/useAuthProvider";

const API_URL = "/api/";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const RefineApp = (props: React.PropsWithChildren) => {
  const { t, i18n } = useTranslation();
  const { authProvider, isLoading } = useAuthProvider();
  const i18nProvider = {
    translate: t,
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  if (isLoading) {
    return <span>loading...</span>;
  }

  return (
    <>
      <RefineKbarProvider>
        {/* You can change the theme colors here. example: theme={RefineThemes.Magenta} */}
        <ChakraProvider theme={RefineThemes.Blue}>
          <DevtoolsProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(API_URL)}
              notificationProvider={notificationProvider}
              authProvider={authProvider}
              i18nProvider={i18nProvider}
              resources={[
                {
                  name: "repositories",
                  list: "/repositories",
                  show: "/repositories/:id",
                  meta: {
                    canDelete: false,
                    canCreate: false,
                    canEdit: false,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                disableTelemetry: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
              }}
            >
              {props.children}
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ChakraProvider>
      </RefineKbarProvider>
    </>
  );
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2
        Header={() => <Header sticky />}
        Title={({ collapsed }) => <PageTitle collapsed={collapsed} />}
      >
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };
  return (
    <SessionProvider session={session}>
      <RefineApp>{renderComponent()}</RefineApp>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);
