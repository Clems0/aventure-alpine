"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SocialLogin() {
  return (
    <div className="flex gap-4 justify-center">
      <Button
        variant="outline"
        className="bg-slate-800/50 border-slate-700 hover:bg-slate-700 text-white transition-colors"
      >
        <Image
          src="https://www.google.com/favicon.ico"
          alt="Google"
          width={20}
          height={20}
          className="mr-2"
        />
        Google
      </Button>
      <Button
        variant="outline"
        className="bg-slate-800/50 border-slate-700 hover:bg-slate-700 text-white transition-colors"
        onClick={() => signIn("github", { redirectTo: "/profil" })}
      >
        <Image
          src="https://github.com/favicon.ico"
          alt="Github"
          width={20}
          height={20}
          className="mr-2"
        />
        Github
      </Button>
    </div>
  );
}
