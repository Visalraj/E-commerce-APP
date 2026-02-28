import { Carousel } from "flowbite-react";
import Image from "next/image";

export default function Sliders() {
    return (
        <div className="w-full p-3">
            <Carousel slideInterval={4000} pauseOnHover>
                {/* Slide 1 */}
                <div className="relative w-full h-[50vh]">
                    {" "}
                    {/* Half of viewport height */}
                    <Image  src="/images/slider-one.jpg"  alt="Super Sale"  priority  className="object-cover w-full h-full"  fill  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
                            Super Sale
                        </h1>
                        <p className="text-white text-lg md:text-xl mb-6">
                            Up to 50% Off on Electronics
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">
                            Shop Now
                        </button>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="relative w-full h-[50vh]">
                    <Image src="/images/slider-two.jpg"   alt="Christmas Sale" fill className="object-fill w-full h-full" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
                            Christmas Sale
                        </h1>
                        <p className="text-white text-lg md:text-xl mb-6">
                            Limited Time Offer
                        </p>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">
                            Explore Deals
                        </button>
                    </div>
                </div>
            </Carousel>
        </div>
    );
}
