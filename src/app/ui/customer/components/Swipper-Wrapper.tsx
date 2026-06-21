"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function SwipperWrapper({ children,}: {children: React.ReactNode[];}) {
    return (
        <Swiper  modules={[Autoplay]}  spaceBetween={10}  slidesPerView={1} autoplay={{  delay: 2500, disableOnInteraction: false, }} loop={true}
            breakpoints={{  640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 5 }, }} >
            {children.map((child, index) => (
                <SwiperSlide key={index}>{child}</SwiperSlide>
            ))}
        </Swiper>
    );
}
