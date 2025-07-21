import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import NavbarComponent from "@/components/NavbarComponent";

import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
} from "@nextui-org/react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

  export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "체험단 찾아줘",
    description: "체험단 찾아줘",
  };

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body>

          <NextUIProvider>
            <main className="w-full h-full flex flex-col justify-center items-center">
              {/* <NavbarComponent /> */}
              <Navbar isBlurred={false} className="w-full">
                <NavbarContent className="" justify="start">
                  <NavbarItem>
                    <Image
                      src="/logo/logo1.png"
                      alt="logo"
                      width={250}
                      height={50}
                    ></Image>
                  </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                  {/* <NavbarItem className="flex">
          <Link href="#">Login</Link>
        </NavbarItem> */}
                  <NavbarItem>
                    {/* <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button> */}
                    {/* {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />} */}
                  </NavbarItem>
                </NavbarContent>
              </Navbar>
              <div className="w-[90vw] md:w-[60vw] h-full">
                {children}
              </div>
            </main>
          </NextUIProvider>
      </body>
    </html>
  );
}
