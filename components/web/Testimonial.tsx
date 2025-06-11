"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: number;
  name: string;
  quote: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Devon Lane",
    quote:
      '"We love Landingfolio! Our designers were using it for their projects, so we already know what kind of design they want."',
    image: "/asset/reveiw1.png",
    rating: 5,
  },
  {
    id: 2,
    name: "Devon Lane",
    quote:
      '"We love Landingfolio! Our designers were using it for their projects, so we already know what kind of design they want."',
    image: "/asset/reveiw2.png",
    rating: 5,
  },
  {
    id: 3,
    name: "Alex Morgan",
    quote:
      '"The platform has completely transformed how we approach design projects. The templates are both beautiful and functional."',
    image: "/asset/reveiw1.png",
    rating: 5,
  },
  {
    id: 4,
    name: "Sarah Johnson",
    quote:
      '"I\'ve recommended this to all my colleagues. The customer support is exceptional and the design quality is outstanding."',
    image: "/asset/reveiw2.png",
    rating: 5,
  },
  {
    id: 5,
    name: "Michael Chen",
    quote:
      '"The user interface is intuitive and the results exceed our expectations. It\'s become an essential tool for our team."',
    image: "/asset/reveiw1.png",
    rating: 5,
  },
  {
    id: 6,
    name: "Emma Wilson",
    quote:
      '"Outstanding service and incredible attention to detail. The team really understands what modern businesses need."',
    image: "/asset/reveiw2.png",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center mb-10">
        <div className="text-[18px] font-medium text-[#000000CC] mb-4">
          {testimonials.length * 640}+ Happy Users
        </div>
        <h2 className="text-3xl md:text-[40px] font-bold text-center text-[#C7A18A]">
          Don&apos;t just take our words
        </h2>
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/2"
            >
              <Card className="border-0 shadow-sm h-full">
                <CardContent className="p-6 mt-[40px] flex flex-col h-full justify-between">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-[258px] md:h-[257px] relative flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex flex-col text-center sm:text-left">
                      <div className="flex justify-center sm:justify-start text-[#F092B0] mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 sm:h-5 sm:w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-[#090914] text-base sm:text-[18px] font-medium leading-relaxed">
                        {testimonial.quote}
                      </p>
                      <p className="font-medium text-[#595959] text-[16px] pt-6">
                        {testimonial.name}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots */}
      <div className="flex justify-center mt-8">
        <div className="flex gap-2">
          {Array.from({ length: count }, (_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index + 1 === current
                  ? "bg-[#F092B0] w-6"
                  : "bg-gray-300 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
