'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'

const images = [
  '/images/housing/cabin1.png',
  '/images/housing/cabin2.png',
  '/images/housing/cabin3.png',
]

const Carousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation
      autoplay={{ delay: 3000 }}
      style={{
        '--swiper-navigation-color': '#FFF',
        '--swiper-navigation-size': '20px',
        '--swiper-pagination-color': '#FFF',
      } as React.CSSProperties}
      loop
      className="w-full min-h-screen"
    >
      {images.map((src) => (
        <SwiperSlide key={src} className="h-screen" style={{ position: 'relative' }}>
          <Image
            src={src}
            alt="Image slide"
            className="w-full h-full object-cover"
            fill
          />
        </SwiperSlide>
      ))}
    </Swiper>

  );
}

export default Carousel;
