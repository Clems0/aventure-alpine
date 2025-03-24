"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SocialLogin } from "./SocialLogin";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-4" action="/api/auth/register" method="POST">
      <div>
        <label className="text-gray-300 block mb-2">Adresse e-mail</label>
        <Input
          type="email"
          name="email"
          placeholder="steve@helosion.net"
          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-sky-400"
        />
      </div>

      <div>
        <label className="text-gray-300 block mb-2">
          Mot de passe
          <span className="text-gray-500 text-sm ml-2">
            Doit contenir au moins 10 caractères
          </span>
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            className="bg-slate-800/50 border-slate-700 text-white pr-10 focus-visible:ring-sky-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <Button className="w-full bg-sky-600 hover:bg-sky-500 text-white transition-colors">
        Continuer
      </Button>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-transparent px-4 text-sm text-gray-500">ou</span>
        </div>
      </div>

      <SocialLogin />

      <p className="text-gray-500 text-sm text-center mt-8">
        En vous inscrivant, vous acceptez les{" "}
        <Link
          href="/terms"
          className="text-sky-400 hover:text-sky-300 transition-colors"
        >
          conditions générales d&apos;utilisation
        </Link>{" "}
        et la{" "}
        <Link
          href="/privacy"
          className="text-sky-400 hover:text-sky-300 transition-colors"
        >
          politique de confidentialité
        </Link>
        .
      </p>
    </form>
  );
}
