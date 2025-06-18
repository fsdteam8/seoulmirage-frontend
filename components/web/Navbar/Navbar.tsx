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

export default function Navbar() {
  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token || "";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSkincareOpen, setIsSkincareOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

  const { data, isLoading } = useQuery<CategorizedData>({
    queryKey: ["categoriesData"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories-by-type`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      return res.json();
    },
  });

  // Helper function to generate href from name
  const generateHref = (type: string, name: string) =>
    `/${type.toLowerCase()}/${name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Logo + Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/asset/logo.png"
                  alt="Serendipity"
                  width={106.283}
                  height={60}
                  className="w-[106.283px] h-[60px] flex-shrink-0"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="space-x-6">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="nav-text">
                    Skincare
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-12 p-4 w-[400px]">
                      {isLoading ? (
                        <div>Loading...</div>
                      ) : (
                        data?.Skincare?.map((item) => (
                          <NavigationMenuLink key={item.id} asChild>
                            <Link
                              href={generateHref("skincare", item.name)}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900 font-raleway text-base"
                            >
                              <div className="font-raleway text-base font-medium leading-tight">
                                {item.name}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        )) || <div>No Skincare items</div>
                      )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="nav-text">
                    Collections
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-12 p-4 w-[400px]">
                      {isLoading ? (
                        <div>Loading...</div>
                      ) : (
                        data?.Collections?.map((item) => (
                          <NavigationMenuLink key={item.id} asChild>
                            <Link
                              href={generateHref("collections", item.name)}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900 font-raleway text-base"
                            >
                              <div className="font-raleway text-base font-medium leading-tight">
                                {item.name}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        )) || <div>No Collections items</div>
                      )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* <NavigationMenuItem>
                  <NavigationMenuTrigger className="nav-text">Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-12 p-4 w-[400px]">
                      {isLoading ? (
                        <div>Loading...</div>
                      ) : (
                        data?.Products?.map((item) => (
                          <NavigationMenuLink key={item.id} asChild>
                            <Link
                              href={generateHref("products", item.name)}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900 font-raleway text-base"
                            >
                              <div className="font-raleway text-base font-medium leading-tight">{item.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        )) || <div>No Products items</div>
                      )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem> */}

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
            {/* Search */}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsSearchDialogOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {token ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link href="/login" className="w-full font-raleway">
                        Sign in
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/sign-up" className="w-full font-raleway">
                        Sign up
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ShoppingBag className="h-4 w-4" />
              </Button>
            </Link>

            {/* Mobile Menu Button */}
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
                    {/* Mobile Skincare Collapsible */}
                    <Collapsible
                      open={isSkincareOpen}
                      onOpenChange={setIsSkincareOpen}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-left font-raleway font-medium text-black hover:text-gray-900 hover:bg-gray-50 rounded-md px-3 text-lg">
                        Skincare
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isSkincareOpen ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-3 mt-1 space-y-1">
                        {isLoading ? (
                          <div>Loading...</div>
                        ) : (
                          data?.Skincare?.map((item) => (
                            <Link
                              key={item.id}
                              href={generateHref("skincare", item.name)}
                              className="block py-2 px-3 font-raleway text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )) || <div>No Skincare items</div>
                        )}
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Mobile Collections Collapsible */}
                    <Collapsible
                      open={isCollectionsOpen}
                      onOpenChange={setIsCollectionsOpen}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-left font-raleway font-medium text-black hover:text-gray-900 hover:bg-gray-50 rounded-md px-3 text-lg">
                        Collections
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isCollectionsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-3 mt-1 space-y-1">
                        {isLoading ? (
                          <div>Loading...</div>
                        ) : (
                          data?.Collections?.map((item) => (
                            <Link
                              key={item.id}
                              href={generateHref("collections", item.name)}
                              className="block py-2 px-3 font-raleway text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )) || <div>No Collections items</div>
                        )}
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Mobile Products Collapsible */}
                    <Collapsible
                      open={isProductsOpen}
                      onOpenChange={setIsProductsOpen}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-left font-raleway font-medium text-black hover:text-gray-900 hover:bg-gray-50 rounded-md px-3 text-lg">
                        Products
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isProductsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-3 mt-1 space-y-1">
                        {isLoading ? (
                          <div>Loading...</div>
                        ) : (
                          data?.Products?.map((item) => (
                            <Link
                              key={item.id}
                              href={generateHref("products", item.name)}
                              className="block py-2 px-3 font-raleway text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )) || <div>No Products items</div>
                        )}
                      </CollapsibleContent>
                    </Collapsible>

                    <Link
                      href="/about"
                      className="py-3 px-3 font-raleway font-medium text-black hover:text-gray-900 hover:bg-gray-50 rounded-md text-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="py-3 px-3 font-raleway font-medium text-black hover:text-gray-900 hover:bg-gray-50 rounded-md text-lg"
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
