"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Search, User, ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import type { CategorizedData } from "@/types/CategoryDataTypeByNavbar";
import SearchDialog from "@/components/search-dialog";
import { useCartStore } from "@/store/cart-store";

export default function Navbar() {
  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token || "";
  const { items } = useCartStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSkincareOpen, setIsSkincareOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

  console.log(items);
  console.log(session.status)

  const { data, isLoading } = useQuery<CategorizedData>({
    queryKey: ["categoriesData"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories-by-type`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });

  const generateHref = (type: string, name: string) =>
    `/products?${name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center py-12 justify-between h-16">
          {/* Logo + Desktop Nav */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Serendipity"
                quality={90}
                width={900}
                height={900}
                className="w-[140px] h-[140px]"
              />
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="space-x-6">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="nav-text">
                    Skincare
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-4 p-4 w-[400px]">
                      {isLoading ? (
                        <div>Loading...</div>
                      ) : (
                        data?.Skincare?.map((item) => (
                          <NavigationMenuLink key={item.id} asChild>
                            <Link
                              href={generateHref("category", item.name)}
                              className="block rounded-md p-2 text-sm hover:bg-gray-50"
                            >
                              {item.name}
                            </Link>
                          </NavigationMenuLink>
                        ))
                      )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="nav-text">
                    Collections
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-4 p-4 w-[400px]">
                      {isLoading ? (
                        <div>Loading...</div>
                      ) : (
                        data?.Collections?.map((item) => (
                          <NavigationMenuLink key={item.id} asChild>
                            <Link
                              href={generateHref("collections", item.name)}
                              className="block rounded-md p-2 text-sm hover:bg-gray-50"
                            >
                              {item.name}
                            </Link>
                          </NavigationMenuLink>
                        ))
                      )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/about" className="nav-text">
                    About
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contact" className="nav-text">
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side: Icons */}
          <div className="flex items-center space-x-2">
            {/* Search icon (always visible) */}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsSearchDialogOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Cart icon (always visible) */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ShoppingBag className="h-4 w-4" />
              </Button>
              {items.length === 0 ? (
                ""
              ) : (
                <span className="absolute left-4 -top-1 bg-red-500 py-1 px-2 text-[8px] rounded-full text-white">
                  {items.length}
                </span>
              )}
            </Link>

            {token || session.status === "authenticated" ? (
              // Logged-in user: show user dropdown
              <DropdownMenu >
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Link href="/account" className="w-full font-raleway">
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/account" className="w-full font-raleway">
                      Order History
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-red-600 font-raleway"
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Guest user: show login link
              <Link
                href="/login"
                className="font-raleway bg-black text-white  px-3 py-1 rounded-lg font-medium text-sm hover:underline"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[280px] sm:w-[350px] p-0"
                >
                  <SheetHeader className="p-6 pb-4 border-b">
                    <SheetTitle className="text-left font-raleway">
                      Menu
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col p-6 space-y-1">
                    {/* Mobile Skincare */}
                    <Collapsible
                      open={isSkincareOpen}
                      onOpenChange={setIsSkincareOpen}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-3 text-lg font-medium text-black hover:bg-gray-50 rounded-md">
                        Skincare
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isSkincareOpen ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-3 mt-1 space-y-1">
                        {data?.Skincare?.map((item) => (
                          <Link
                            key={item.id}
                            href={generateHref("skincare", item.name)}
                            className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Mobile Collections */}
                    <Collapsible
                      open={isCollectionsOpen}
                      onOpenChange={setIsCollectionsOpen}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-3 text-lg font-medium text-black hover:bg-gray-50 rounded-md">
                        Collections
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isCollectionsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-3 mt-1 space-y-1">
                        {data?.Collections?.map((item) => (
                          <Link
                            key={item.id}
                            href={generateHref("collections", item.name)}
                            className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>

                    <Link
                      href="/about"
                      className="py-3 px-3 text-lg font-medium hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="py-3 px-3 text-lg font-medium hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Search Dialog */}
        <SearchDialog
          open={isSearchDialogOpen}
          onOpenChange={setIsSearchDialogOpen}
        />
      </div>
    </header>
  );
}
