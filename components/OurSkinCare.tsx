import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const OurSkinCare = () => {
  return (
    <div>
      <section className="bg-[#F9E4CB] py-8 md:py-16 lg:py-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[80px] items-center">
            <div className="order-2 lg:order-1">
              <h2 className=" text-2xl lg:text-[32px] font-semibold text-[#000000CC] mb-6 lg:mb-[30px]">
                Our Skincare Philosophy
              </h2>
              <p className="text-base  lg:text-[18px] text-[#000000CC] w-full text-justify leading-[120%] font-normal ">
                Seoul Mirage was born from a deep appreciation for Korean
                skincare innovation and the belief that effective products
                should be accessible to everyone. <br /> <br />
                We combine time-tested Korean ingredients with modern science to
                create formulations that deliver visible results. Each product
                is meticulously crafted to honor the tradition of the multi-step
                skincare ritual while fitting seamlessly into your daily
                routine.
              </p>
             <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className=" bg-transparent text-black bg-white my-5 text-base hover:bg-transparent font-semibold px-8 h-[50px] rounded-[32px] sm:text-lg"
              >
                About Us
              </Button>
              </Link>
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
    </div>
  );
};

export default OurSkinCare;
