import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
} from "@nextui-org/react";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import HeaderAuth from "@/components/header-auth";

function NavbarComponent() {
  return (
    <Navbar>
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
          {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavbarComponent;
