"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function About_Section() {
  const session = useSession();
  // const token = (session?.data?.user as { token: string })?.token || "";
  // console.log(token);
  const token = session?.data || "";
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
              <p className="text-base sm:text-lg lg:text-[24px] text-[#000000CC] w-[750px] leading-[120%] font-normal">
                Seoul Mirage was born from a passion for Korean skincare
                innovation and a commitment to creating luxury products that
                deliver exceptional results.
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
                  Founded in 2018 by skincare enthusiast and biochemist Dr.
                  Ji-Yoon Park, Seoul Mirage began as a small laboratory in the
                  heart of Seoul&apos;s beauty district. Frustrated by the
                  prevalence of products with harsh chemicals and unfulfilled
                  promises, Dr. Park set out to create a line that combined
                  traditional Korean ingredients with cutting-edge science.
                </p>
                <p className="text-base sm:text-[24px] md:text-[18px] text-[#000000CC] leading-[120%] font-normal mt-[30px]">
                  What started as a passion project quickly gained recognition
                  for its exceptional quality and remarkable results. Today,
                  Seoul Mirage has grown into a global brand, but our commitment
                  to purity, efficacy, and luxury remains unchanged.
                </p>
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
                Founded in 2018 by skincare enthusiast and biochemist Dr.
                Ji-Yoon Park, Seoul Mirage began as a small laboratory in the
                heart of Seoul&apos;s beauty district. Frustrated by the
                prevalence of products with harsh chemicals and unfulfilled
                promises, Dr. Park set out to create a line that combined
                traditional Korean ingredients with cutting-edge science.
              </p>

              <div className="space-y-6 lg:space-y-8">
                <div className="border-l-4 border-[#000000] pl-4 sm:pl-6">
                  <h3 className="text-xl sm:text-[40px] font-semibold text-[#000000] mb-2 sm:mb-[30px]">
                    Purity
                  </h3>
                  <p className="text-sm md:text-[18px] sm:text-xl text-[#000000] leading-[120%]">
                    We source the highest quality ingredients and maintain
                    rigorous standards to ensure our products are free from
                    harmful chemicals.
                  </p>
                </div>

                <div className="border-l-4 border-[#000000] pl-4 sm:pl-6">
                  <h3 className="text-xl sm:text-[40px] font-semibold text-[#000000] mb-2 sm:mb-[30px]">
                    Innovation
                  </h3>
                  <p className="text-sm sm:text-xl md:text-[18px] text-[#000000] leading-[120%]">
                    We continuously research and develop new formulations that
                    harness the power of both traditional Korean ingredients and
                    modern scientific breakthroughs.
                  </p>
                </div>

                <div className="border-l-4 border-[#000000] pl-4 sm:pl-6">
                  <h3 className="text-xl sm:text-[40px] font-semibold text-[#000000] mb-2 sm:mb-4">
                    Sustainability
                  </h3>
                  <p className="text-sm sm:text-xl md:text-[18px] text-[#000000] leading-[120%]">
                    We are committed to ethical practices, from responsible
                    sourcing to eco-friendly packaging, ensuring our beauty
                    doesn&apos;t come at the expense of our planet.
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
              We believe in the power of nature enhanced by science. Our
              formulations combine time-honored Korean botanical ingredients
              with advanced scientific compounds to create products that deliver
              visible results.
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
                      Botanical Extracts
                    </h3>
                    <p className="text-sm sm:text-xl text-[#FFFFFF] font-normal opacity-90">
                      From ginseng to green tea, our products harness the power
                      of traditional Korean botanical ingredients.
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
                      Fermented Ingredients
                    </h3>
                    <p className="text-sm sm:text-base opacity-90">
                      We utilize the ancient Korean practice of fermentation to
                      enhance the potency and bioavailability of our active
                      ingredients.
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
                      Scientific Compounds
                    </h3>
                    <p className="text-sm sm:text-base opacity-90">
                      Our formulations incorporate cutting-edge compounds like
                      peptides and ceramides for maximum efficacy.
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
