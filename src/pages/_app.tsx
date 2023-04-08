import { type AppType } from "next/app";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { type AppProps } from "next/app";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { dark } from "@clerk/themes";

import "~/styles/globals.css";
import Header from "~/components/Header";

const publicPages = [
  "/sign-in/[[...index]]",
  "/sign-up/[[...index]]",
  "/how",
  "/about",
];

const privatePages = ["/create"];

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname);
  const isPrivatePage = privatePages.includes(pathname);

  return (
    <>
      <ClerkProvider
        {...pageProps}
        appearance={{
          baseTheme: dark,
        }}
      >
        {isPublicPage ? (
          <>
            <Header />
            <Component {...pageProps} />
          </>
        ) : (
          <>
            {isPrivatePage ? (
              <SignedIn>
                <Header />
                <Component {...pageProps} />
              </SignedIn>
            ) : (
              <>
                <Header />
                <Component {...pageProps} />
              </>
            )}
            <SignedOut>{isPrivatePage && <RedirectToSignIn />}</SignedOut>
          </>
        )}
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
