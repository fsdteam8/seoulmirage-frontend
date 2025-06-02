
import BestSellers from "@/components/BestSerllers";
import NewArrive from "@/components/NewArrive";
import OurSkinCare from "@/components/OurSkinCare";
import ShopByCategory from "@/components/Product/ShopByCategory";
import HeroSection from "@/components/web/HeroSection";
import TestimonialCarousel from "@/components/web/Testimonial";


export default function Home() {
  return (
    <div >
      
     <HeroSection/>
     <BestSellers/>
     <ShopByCategory/>
     <NewArrive/>
     <OurSkinCare/>
     <TestimonialCarousel/>
   
    </div>
  );
}
