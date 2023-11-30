import { AuthBindings } from "@refinedev/core";
import { signIn, signOut, useSession } from "next-auth/react";

interface AuthProviderHookResult {
  authProvider: AuthBindings;
  isLoading: boolean;
}

export const useAuthProvider = (): AuthProviderHookResult => {
  const { data, status } = useSession();
  const authProvider: AuthBindings = {
    login: async ({ personalAccessToken }) => {
      const signInResponse = await signIn("git-pat", {
        personalAccessToken,
        callbackUrl: "/",
        redirect: false,
      });
      console.log("signin response", signInResponse);
      if (!signInResponse) {
        return {
          success: false,
        };
      }

      const { ok, error } = signInResponse;

      if (ok) {
        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
        error: new Error(error?.toString()),
      };
    },
    logout: async () => {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });

      return {
        success: true,
      };
    },
    onError: async (error) => {
      console.error(error);
      return {
        error,
      };
    },
    check: async () => {
      console.log(status, "status");
      if (status === "unauthenticated") {
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }

      return {
        authenticated: true,
      };
    },
    getPermissions: async () => {
      return null;
    },
    getIdentity: async () => {
      if (data?.user) {
        const { user } = data;
        return {
          ...user,
          avatar: user.image
        };
      }
      return null;
    },
  };
  return {
    authProvider,
    isLoading: status === "loading",
  };
};
