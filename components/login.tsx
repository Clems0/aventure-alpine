"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const login = () => {
  return (
    <div>
      <Button onClick={() => signIn("github", { redirectTo: "/dashboard" })}>
        Login
      </Button>
    </div>
  );
};

export default login;
