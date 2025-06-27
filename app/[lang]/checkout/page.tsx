import React from 'react'
import CheckoutPage from './_components/checkoutContainer'
import { getDictionary } from '@/dictionaries/dictionaries';

const page = async ({ params }: { params: { lang: string } }) => {
   const { lang } = params;
  
    const dict = await getDictionary(lang as "en" | "ar");
  return (
    <div>
      <CheckoutPage dict={dict}/>
    </div>
  )
}

export default page