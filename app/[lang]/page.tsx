import HeroSection from "@/components/web/HeroSection";
import { getDictionary } from "@/dictionaries/dictionaries";
import HomePageContainer from "./_components/home-page-container";

const Page = async ({ params }: { params: { lang: string } }) => {
  const { lang } = params;

  await getDictionary(lang as "en" | "ar");

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      <HomePageContainer />
    </div>
  );
};

export default Page;
