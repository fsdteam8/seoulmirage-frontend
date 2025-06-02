import { Button } from "@/components/ui/button"

export default function HeroSection() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/asset/hero.png')",
                }}
            >
                {/* Optional overlay for better text readability */}
                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex min-h-screen items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[60px]">
                            Discover your skin&apos;s true potential
                        </h1>

                        <p className=" text-lg text-white sm:text-xl md:text-2xl font-semibold mt-[30px] lg:w-[738px]">
                            Premium skincare that combines innovation with clean, effective ingredients for all skin types.
                        </p>

                        <div className="mt-[60px] flex  gap-4  sm:gap-6">
                            <Button
                                size="lg"
                                className="bg-white text-[#000000] text-base hover:bg-white font-semibold px-8 h-[50px] rounded-[32px] sm:text-lg"
                            >
                                Shop Now
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className=" bg-transparent text-white text-base hover:bg-transparent font-semibold px-8 h-[50px] rounded-[32px] sm:text-lg"
                            >
                                About Us
                            </Button>
                        </div>
                    </div>
                </div>
            </div> 
        </section>
    )
}
