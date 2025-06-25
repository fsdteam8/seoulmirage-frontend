"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function About_Section() {
  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token || "";

  console.log(token);
  return (
    <div className="w-full">
      {/* Our Story Section */}
      <section className="bg-[#F9E4CB] py-8 md:py-16 lg:py-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[80px] items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl lg:text-[60px] font-semibold text-[#000000CC] mb-6 lg:mb-[30px]">
                Our <span className="font-bold">Story</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-[18px] text-[#000000CC]  leading-[120%] font-normal">
                At Seoul Mirage, we’re passionate about sharing the unmatched
                quality and innovation of Korean beauty with the world. Our
                journey began with a simple mission: to bring trusted,
                effective, and science-driven skincare and haircare solutions
                from Korea to individuals and professionals across the UAE. We
                carefully select each product for its proven results, clean
                ingredients, and cutting-edge formulations so you can glow
                confidently, inside and out. Inspired by Korea. Curated for You.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative w-full h-64 sm:h-80 lg:h-[500px]">
                <Image
                  src="/asset/about1.png"
                  // width={1000}
                  // height={1000}
                  alt="Luxury skincare products including bottles, jars, and droppers"
                  fill
                  className="w-full h-full "
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="bg-white py-8 md:py-16 lg:py-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 lg:gap-x-12 items-center mb-12 lg:mb-0">
            <div className="relative w-full h-64 sm:h-80 lg:h-[600px]">
              <Image
                src="/asset/about2.png"
                alt="Woman in pink hijab representing our journey"
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[60px] font-medium text-gray-[#000000CC] mb-6 lg:mb-8">
                Our Journey
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-[24px] md:text-[18px] text-[#000000CC] leading-[120%] font-normal">
                  Our journey began with a vision: to connect people with beauty
                  that truly works. Through years of exploration, collaboration,
                  and research, we’ve partnered with leading creators of Korean
                  cosmetics to offer products that are as effective as they are
                  elegant. Seoul Mirage is the result of dedication to quality,
                  to authenticity, and to the belief that self-care should feel
                  as good as it looks. And this is just the beginning.
                </p>
                {/* <p className="text-base sm:text-[24px] md:text-[18px] text-[#000000CC] leading-[120%] font-normal mt-[30px]">
                  What started as a passion project quickly gained recognition
                  for its exceptional quality and remarkable results. Today,
                  Seoul Mirage has grown into a global brand, but our commitment
                  to purity, efficacy, and luxury remains unchanged.
                </p> */}
              </div>
            </div>
          </div>

          {/* Our Philosophy Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[60px]  text-[#000000] font-medium mb-6 lg:mb-[60px]">
                Our Philosophy
              </h2>
              <p className="text-base sm:text-[24px] md:text-[18px] text-[#000000] leading-[120%] mb-8 lg:mb-12">
                At Seoul Mirage, we believe that beauty should be intentional
                not overwhelming. That’s why we focus on what truly matters:
                clean, effective, and carefully crafted products that deliver
                real results. We value transparency, innovation, and
                self-respect. Every product we offer is chosen with purpose,
                backed by science, and rooted in the principles of gentle yet
                powerful care. To us, skincare and haircare are daily acts of
                self-worth and everyone deserves access to quality that elevates
                their glow. With Seoul Mirage, it’s not about trends. It’s about
                timeless beauty, made simple.
              </p>

              <div className="space-y-6 lg:space-y-8">
                <div className="border-l-4 border-[#000000] pl-4 sm:pl-6">
                  <h3 className="text-xl sm:text-[40px] font-semibold text-[#000000] mb-2 sm:mb-[30px]">
                    Curated with Purpose
                  </h3>
                  <p className="text-sm md:text-[18px] sm:text-xl text-[#000000] leading-[120%]">
                    We carefully select each product based on its performance,
                    ingredients, and integrity, only offering what we truly
                    believe in.
                  </p>
                </div>

                <div className="border-l-4 border-[#000000] pl-4 sm:pl-6">
                  <h3 className="text-xl sm:text-[40px] font-semibold text-[#000000] mb-2 sm:mb-[30px]">
                    Powered by Innovation
                  </h3>
                  <p className="text-sm sm:text-xl md:text-[18px] text-[#000000] leading-[120%]">
                    We bring you cutting-edge Korean skincare and haircare
                    solutions developed with the latest beauty science and
                    time-tested traditions.
                  </p>
                </div>

                <div className="border-l-4 border-[#000000] pl-4 sm:pl-6">
                  <h3 className="text-xl sm:text-[40px] font-semibold text-[#000000] mb-2 sm:mb-4">
                    Beauty with Intention{" "}
                  </h3>
                  <p className="text-sm sm:text-xl md:text-[18px] text-[#000000] leading-[120%]">
                    We believe in mindful routines, lasting results, and
                    products that enhance your natural glow because self-care
                    should feel as good as it looks.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative w-full h-64 sm:h-80 lg:h-[1007px] xl:h-[1000px] mt-10 md:mt-0">
              <Image
                src="/asset/about3.png"
                alt="Natural skincare products with botanical elements"
                fill
                className="w-full h-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Ingredients Section */}
      <section className="bg-[#F9E4CB] py-8 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[60px]  text-[#000000cc] font-medium mb-4 lg:mb-[30px]">
              Our Ingredients
            </h2>
            <p className="text-base sm:text-lg lg:text-[24px] text-[#000000CC] leading-[120%] w-full p-2 mx-auto">
              We believe that effective beauty starts with exceptional
              ingredients, selected for their purity, performance, and purpose.
              Our collection features formulas developed by leading Korean
              laboratories, where tradition meets technology. Every product is
              carefully crafted to nourish, protect, and transform your skin and
              hair without compromise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 sm:h-56 lg:h-64">
                <Image
                  src="/asset/card1.png"
                  alt="Botanical extracts with natural ingredients"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                  <div className="p-4 sm:p-6 text-white flex flex-col justify-center text-center">
                    <h3 className="text-xl sm:text-[30px] text-white font-bold  mb-2">
                      Botanical Heroes
                    </h3>
                    <p className="text-sm sm:text-xl text-[#FFFFFF] font-normal opacity-90">
                      Green tea, centella asiatica, ginseng calming,
                      antioxidant-rich ingredients rooted in centuries of Korean
                      skincare wisdom.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 sm:h-56 lg:h-64">
                <Image
                  src="/asset/card2.png"
                  alt="Fermented ingredients showcasing traditional Korean practices"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                  <div className="p-4 sm:p-6 text-white flex flex-col justify-center text-center">
                    <h3 className="text-xl sm:text-[30px] text-white font-bold  mb-2">
                      Fermented Elements
                    </h3>
                    <p className="text-sm sm:text-base opacity-90">
                      A hallmark of K-beauty, fermented extracts improve
                      absorption and support long-term skin and scalp health.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2 lg:col-span-1">
              <div className="relative h-48 sm:h-56 lg:h-64">
                <Image
                  src="/asset/card3.png"
                  alt="Scientific compounds and laboratory equipment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                  <div className="p-4 sm:p-6 text-white flex flex-col justify-center text-center">
                    <h3 className="text-xl sm:text-[30px] text-white font-bold  mb-2">
                      Clean & Conscious Formulas
                    </h3>
                    <p className="text-sm sm:text-base opacity-90">
                      We prioritize high-quality, skin-friendly compositions,
                      free from harsh chemicals, unnecessary additives, and
                      animal testing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
