
import BestSellers from "@/components/BestSerllers";
import NewArrive from "@/components/NewArrive";
import OurSkinCare from "@/components/OurSkinCare";
import HeroSection from "@/components/web/HeroSection";
import TestimonialCarousel from "@/components/web/Testimonial";


export default function Home() {
  return (
    <div >
      
     <HeroSection/>
     <BestSellers/>
     <NewArrive/>
     <OurSkinCare/>
     <TestimonialCarousel/>
   
    </div>
  );
}
