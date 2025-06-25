import { Button } from "@/components/ui/button";
import { DictionaryType } from "@/dictionaries/dictionaries";
import Link from "next/link";

interface Props {
  dict: DictionaryType;
}
export default function HeroSection({ dict }: Props) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero.jpg')",
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight  text-white sm:text-5xl md:text-6xl lg:text-[60px]">
              {dict.home.banner.title}
            </h1>

            <p className=" text-lg text-white sm:text-xl md:text-2xl font-semibold mt-[30px] lg:w-[738px]">
              {dict.home.banner.desc}
            </p>

            <div className="mt-[60px] flex  gap-4  sm:gap-6">
              <Link href={"/products"}>
                <Button
                  size="lg"
                  className="bg-white text-[#000000] text-base hover:bg-white font-semibold px-8 h-[50px] rounded-[32px] sm:text-lg"
                >
                  Shop Now
                </Button>
              </Link>
              <Link href="/about" passHref>
                <Button
                  variant="outline"
                  size="lg"
                  className="
      relative
      bg-transparent
      text-white
      text-base
      font-semibold
      px-8
      h-[50px]
      rounded-[32px]
      sm:text-lg
      overflow-hidden
      border
      border-white
      transition
      duration-300
      ease-in-out
      before:absolute
      before:inset-0
      before:bg-white
      before:bg-opacity-0
      before:backdrop-blur-md
      before:transition
      before:duration-300
      before:ease-in-out
      hover:before:bg-opacity-20
      hover:before:backdrop-blur-lg
      hover:text-white
      z-0
    "
                >
                  <span className="relative z-10">About Us</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
