import React from 'react'
import Image from 'next/image'

type ServiceCardProps = {
  title: string;
  description: string;
  images: {
    imageLeft: { src: string, alt: string };
    imageRightTop: { src: string, alt: string };
    imageRightBottom: { src: string, alt: string };
  };
}

function ServiceCard({ title, description, images }: ServiceCardProps) {
  return (
    <div className="bg-background/30 backdrop-blur-3xl border border-gray-300 rounded-2xl p-4 shadow-xl">
      <div className="grid grid-cols-3 gap-2 cursor-pointer">
        {/* image left */}
        <div className="col-span-2 aspect-[4/3] relative">
          <Image
            src={images.imageLeft.src}
            alt={images.imageLeft.alt}
            fill
            style={{ objectFit: 'cover' }}
            className="expandable-img w-full h-full object-cover rounded-lg transition duration-300 hover:scale-105"
          />
        </div>
        {/* images right */}
        <div className="flex flex-col gap-2">
          <div className='relative h-1/2'>
            <Image
              src={images.imageRightTop.src}
              alt={images.imageRightTop.alt}
              fill
              style={{ objectFit: 'cover' }}
              className="expandable-img w-full h-1/2 object-cover rounded-lg transition duration-300 hover:scale-125"
            />
          </div>
          <div className='relative h-1/2'>
            <Image
              src={images.imageRightBottom.src}
              alt={images.imageRightBottom.alt}
              fill
              style={{ objectFit: 'cover' }}
              className="expandable-img w-full h-1/2 object-cover rounded-lg transition duration-300 hover:scale-125"
            />
          </div>
        </div>
      </div>
      {/* title and description */}
      <div className="pt-3">
        <h3 className="text-sm lg:text-base font-semibold text-center">{title}</h3>
        <p className="text-xs lg:text-sm text-center">{description}</p>
      </div>
    </div>
  )
}

export default ServiceCard