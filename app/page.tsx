
import BestSellers from "@/components/BestSerllers";
import NewArrive from "@/components/NewArrive";
import OurSkinCare from "@/components/OurSkinCare";
// import AllProducts from "@/components/Product/AllProduct";
import ShopByCategory from "@/components/Product/ShopByCategory";
import HeroSection from "@/components/web/HeroSection";
import TestimonialCarousel from "@/components/web/Testimonial";


export default function Home() {
  return (
    <div >
      
     <HeroSection/>
     <BestSellers/>
     {/* <AllProducts/> */}
     <ShopByCategory/>
     <NewArrive/>
     <OurSkinCare/>
     <TestimonialCarousel/>
   
    </div>
  );
}
