import CartPage from "@/components/cart/cart-page";
import { getDictionary } from "@/dictionaries/dictionaries";
import React from "react";

export default async function page({ params }: { params: { lang: string } }) {
  const { lang } = params;

  const dict = await getDictionary(lang as "en" | "ar");
  return <CartPage dict={dict} />;
}
