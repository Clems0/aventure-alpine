"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
//import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            🌄 Aventures Alpines
          </Link>

          {/* Menu desktop */}
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              Accueil
            </Link>
            <Link
              href="/explorer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              Explorer
            </Link>
            <Link
              href="/activites"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              Activités
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* Mode clair/sombre */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* Bouton Connexion */}
            {session?.user ? (
              <>
                {session?.user?.image && (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage src={session?.user?.image} alt="Avatar" />
                        <AvatarFallback>Photo de profile</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href="/profile">Profil</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings">Paramètres</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link onClick={() => signOut()} href="">
                          Déconnexion
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  //     <Image
                  //     src={session.user.image}
                  //     width={50}
                  //     height={50}
                  //     alt=""
                  //   />
                )}
              </>
            ) : (
              <Button asChild>
                <Link href="/login">Connexion</Link>
              </Button>
            )}

            {/* Bouton menu mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Menu mobile */}
        {isOpen && (
          <nav className="md:hidden flex flex-col space-y-3 py-4">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              Accueil
            </Link>
            <Link
              href="/explorer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              Explorer
            </Link>
            <Link
              href="/activites"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              Activités
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
